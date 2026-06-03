import API_CONFIG from './config.js'

document.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("selectDoenca");

  try {
    const response = await fetch(`${API_CONFIG.baseURL}/transtornos`);
    const doencas = await response.json();
    doencas.forEach(doenca => {
      const option = document.createElement("option");
      option.value = doenca.id;
      option.textContent = doenca.nome;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar doenças:", error);
  }

  const checkbox = document.getElementById("ja-tenho-cadastro");
  const camposNovo = document.getElementById("campos-novo-usuario");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      camposNovo.style.opacity = "0.4";
      camposNovo.style.pointerEvents = "none";
    } else {
      camposNovo.style.opacity = "1";
      camposNovo.style.pointerEvents = "auto";
    }

  });
});

document.getElementById("btnPublicar").addEventListener("click", async () => {
  let nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const descricao = document.getElementById("relato").value.trim();
  const idDoenca = document.getElementById("selectDoenca").value;
  const termos = document.getElementById("aceitar-uso");
  const temCadastro = document.getElementById("ja-tenho-cadastro").checked;

  if (!email) {
    document.getElementById("alert").innerText = "Favor preencher Email";
    return;
  }
  if (!descricao) {
    document.getElementById("alert2").innerText = "Descrição não pode estar vazio";
    return;
  }
  if (!idDoenca || idDoenca === "") {
    document.getElementById("alert3").innerText = "Selecione um transtorno";
    return;
  }
  if (!termos.checked) {
    alert("Precisa aceitar os termos de uso");
    return;
  }

  if (!nome) nome = "Anônimo";

  try {
    let usu_ref;

    if (temCadastro) {
      const respUsuario = await fetch(`${API_CONFIG.baseURL}/usuarios/email/${email}`);

      if (!respUsuario.ok) {
        alert("Email não encontrado. Desmarque a opção de cadastro para criar um novo.");
        return;
      }

      const usuario = await respUsuario.json();
      usu_ref = usuario.id;

    } else {
      const genero = document.getElementById("genero").value;

      if (!genero) {
        alert("Selecione um gênero");
        return;
      }

      const verificar = await fetch(`${API_CONFIG.baseURL}/usuarios/email/${email}`);

      if (verificar.ok) {
        const usuarioExistente = await verificar.json();
        usu_ref = usuarioExistente.id;
      } else {
        const respNovo = await fetch(`${API_CONFIG.baseURL}/usuarios`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome,
            email,
            genero,
            data_cadastro: new Date().toISOString()
          })
        });

        if (!respNovo.ok) {
          alert("Erro ao criar usuário");
          return;
        }

        const novoUsuario = await respNovo.json();
        usu_ref = novoUsuario.id;
      }
    }

    const response = await fetch(`${API_CONFIG.baseURL}/relatos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        email,
        descricao,
        transt_ref: [idDoenca],
        data_relato: new Date().toISOString(),
        status: "ativo",
        usu_ref
      })
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const result = await response.json();
    if (result && result.id) {
      window.location.href = "cadastrosucesso.html";
    }

  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao enviar relato. Verifique se o servidor está rodando!");
  }
});

const textarea = document.getElementById('relato');
const contador = document.getElementById('contador');
const max = textarea.getAttribute('maxlength');

textarea.addEventListener('input', () => {
  const length = textarea.value.length;
  contador.textContent = `${length} / ${max} caracteres`;
});