import API_CONFIG from "./config.js";

async function carregarProfissionais() {
  const container = document.getElementById("container-profissionais");

  try {
    const resposta = await fetch(`${API_CONFIG.baseURL}/profissionais`);
    const profissionais = await resposta.json();

    container.innerHTML = "";

    if (!profissionais || profissionais.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center text-muted">
          <p>Nenhum profissional cadastrado no momento.</p>
        </div>
      `;
      return;
    }

profissionais.forEach((prof) => {
  const especialidade = prof.especialidades?.[0];
  const col = document.createElement("div");
  col.classList.add("col");
  col.innerHTML = `
<div class="card h-100" id="card-profissional">
  <div class="card-header" style="font-size: 1.25rem; font-weight: bold;">
    ${prof.nome}
  </div>
  <div class="card-body">
    <div class="row">
      <div class="col-md-6">
        <p class="card-title">Formação</p>
        <h6 class="card-text">${prof.formacao}</h6>
      </div>
      <div class="col-md-6">
        <p class="card-title">Faculdade</p>
        <h6 class="card-text">${prof.faculdade}</h6>
      </div>
      <div class="col-md-6">
        <p class="card-title">Especialidade</p>
        <h6 class="card-text">${especialidade ? especialidade.nome : "-"}</h6>
      </div>
      <div class="col-md-6">
        <p class="card-title">Abordagem</p>
        <h6 class="card-text">${especialidade ? especialidade.abordagem : "-"}</h6>
      </div>
      <div class="col-md-6">
        <p class="card-title">RQE</p>
        <h6 class="card-text">${especialidade?.rqe || "Não informado"}</h6>
      </div>
      <div class="col-md-6">
        <p class="card-title">CRM/CRP</p>
        <h6 class="card-text">${prof.crm_crp}</h6>
      </div>
      <div class="col-md-6">
        <p class="card-title">Email</p>
        <h6 class="card-text">${prof.email}</h6>
      </div>
      <div class="col-md-6">
        <p class="card-title">Cidade</p>
        <h6 class="card-text">${prof.cidade}</h6>
      </div>
      <div class="col-md-6">
        <p class="card-title">Estado</p>
        <h6 class="card-text">${prof.estado}</h6>
      </div>
      <div class="col-md-6">
        <p class="card-title">Logradouro</p>
        <h6 class="card-text">${prof.logradouro}</h6>
      </div>
      <div class="col-md-12">
        <p class="card-title">Experiência</p>
        <h6 class="card-text">${prof.resumo}</h6>
      </div>
    </div>
  </div>
</div>
  `;
  container.appendChild(col);
});

  } catch (erro) {
    console.error("Erro ao carregar profissionais:", erro);
    container.innerHTML = `
      <div class="col-12 text-center text-danger">
        <p>Erro ao carregar profissionais. Tente novamente mais tarde.</p>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", carregarProfissionais);