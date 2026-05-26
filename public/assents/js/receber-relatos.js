import API_CONFIG from './config.js'


document.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("selectDoenca");

  try {
    const response = await fetch(`${API_CONFIG.baseURL}/transtornos`);
    const doencas = await response.json();
    doencas.forEach(doenca => {
      const option = document.createElement("option");
      option.value = doenca.id_doenca;
      option.textContent = doenca.nome;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar doenças:", error);
  }
});




document.getElementById("btnPublicar").addEventListener("click", async () => {
  let nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const relato = document.getElementById("relato").value.trim();
  const idDoenca = document.getElementById("selectDoenca").value;
  const checkbox = document.getElementById("aceitar-uso");

  if (!nome) {
    nome = "Anônimo";
  }

  if (!email) {
    document.getElementById("alert").innerText = "Favor prencher Email";
    return;
  }

  if (!relato) {
    document.getElementById("alert2").innerText = "Relato não pode estar vazio";
    return;
  }

  if (!idDoenca || idDoenca === "") {
    document.getElementById("alert3").innerText = "Selecione um transtorno";
    return;
  }

  if (!checkbox.checked) {
    document.getElementById("alert4").innerText = "Precisa aceitar os termos de uso";
    return;
  }



  try {
    const response = await fetch(`${API_CONFIG.baseURL}/relato`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, relato, idDoenca })
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result.message) {
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

