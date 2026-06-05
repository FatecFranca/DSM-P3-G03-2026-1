import API_CONFIG from "./config.js";

document.getElementById("btn-login").addEventListener("click", async () => {

  const email = document.getElementById("exampleInputEmail1").value.trim();
  const senha = document.getElementById("exampleInputPassword1").value.trim();

  if (!email) { alert("Informe o email"); return; }
  if (!senha) { alert("Informe a senha"); return; }

  try {
    const resposta = await fetch(`${API_CONFIG.baseURL}/profissionais/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    if (!resposta.ok) {
      alert("Email ou senha incorretos");
      return;
    }

    const prof = await resposta.json();
    sessionStorage.setItem("profissional_id", prof.id);
    window.location.href = "espaçoprofissional.html";

  } catch (erro) {
    console.error("Erro no login:", erro);
    alert("Erro ao conectar com o servidor");
  }
});