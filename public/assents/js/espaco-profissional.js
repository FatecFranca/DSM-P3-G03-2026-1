import API_CONFIG from "./config.js";

async function carregarProfissional() {
  const id = sessionStorage.getItem("profissional_id");
  console.log("ID encontrado:", id);

  if (!id) {
    window.location.href = "login.html";
    return;
  }

  try {
    const resposta = await fetch(`${API_CONFIG.baseURL}/profissionais/${id}`);
    const prof = await resposta.json();
    console.log("Dados do profissional:", prof);

    document.querySelector(".card-header").textContent  = prof.nome;
    document.getElementById("campo-formacao").textContent   = prof.formacao;
    document.getElementById("campo-faculdade").textContent  = prof.faculdade;
    document.getElementById("campo-crm").textContent        = prof.crm_crp;
    document.getElementById("campo-email").textContent      = prof.email;
    document.getElementById("campo-cidade").textContent     = prof.cidade;
    document.getElementById("campo-logradouro").textContent = prof.logradouro;
    document.getElementById("campo-exp").textContent     = prof.resumo;

  } catch (erro) {
    console.error("Erro ao carregar profissional:", erro);
  }
}
document.addEventListener("DOMContentLoaded", carregarProfissional);