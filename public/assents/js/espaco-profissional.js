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
    const especialidade = prof.especialidades?.[0];
    if (especialidade) {
  sessionStorage.setItem("especialidade_id", especialidade.id); 
}
    console.log("Dados do profissional:", prof);
    console.log("Especialidades:", prof.especialidades);

    document.querySelector(".card-header").textContent  = prof.nome;
    document.getElementById("campo-nome").textContent   = prof.nome;
    document.getElementById("campo-formacao").textContent   = prof.formacao;
    document.getElementById("campo-faculdade").textContent  = prof.faculdade;
    document.getElementById("campo-crm").textContent        = prof.crm_crp;
    document.getElementById("campo-email").textContent      = prof.email;
    document.getElementById("campo-cidade").textContent     = prof.cidade;
    document.getElementById("campo-logradouro").textContent = prof.logradouro;
    document.getElementById("campo-rqe").textContent        = especialidade ? especialidade.rqe       : "Não informado";
    document.getElementById("campo-especialidade").textContent = especialidade ? especialidade.nome      : "-";
    document.getElementById("campo-cpf").textContent = prof.cpf;
    document.getElementById("campo-abordagem").textContent     = especialidade ? especialidade.abordagem : "-";
    document.getElementById("campo-estado").textContent = prof.estado;
    document.getElementById("campo-exp").textContent     = prof.resumo;



  } catch (erro) {
    console.error("Erro ao carregar profissional:", erro);
  }
}
document.addEventListener("DOMContentLoaded", carregarProfissional);