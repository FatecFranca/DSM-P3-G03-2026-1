import API_CONFIG from "./config.js";

document.getElementById("btnPublicar").addEventListener("click", async () => {
  const nome = document.getElementById("nome").value.trim();
  const formacao = document.getElementById("formacao").value.trim();
  const faculdade = document.getElementById("faculdade").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const crm_crp = document.getElementById("crm_crp").value.trim();
  const especialidadeNome = document.getElementById("especialidade-nome").value.trim();
  const especialidadeRqe = document.getElementById("especialidade-rqe").value.trim();
  const especialidadeAbordagem = document.getElementById("especialidade-abordagem").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();
  const logradouro = document.getElementById("logradouro").value.trim();
  const resumo = document.getElementById("resumo").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("inputPassword5").value.trim();
  const checkbox = document.getElementById("aceitar-uso");

  if (!nome) { alert("Nome é obrigatório"); return; }
  if (!formacao) { alert("Formação é obrigatória"); return; }
  if (!faculdade) { alert("Faculdade é obrigatória"); return; }
  if (!cpf) { alert("CPF é obrigatório"); return; }
  if (!crm_crp) { alert("CRM/CRP é obrigatório"); return; }
  if (!especialidadeNome) { alert("Especialidade é obrigatória"); return; }
  if (!especialidadeAbordagem) { alert("Abordagem é obrigatória"); return; }
  if (!cidade) { alert("Cidade é obrigatória"); return; }
  if (!estado) { alert("Estado é obrigatório"); return; }
  if (!logradouro) { alert("Logradouro é obrigatório"); return; }
  if (!resumo) { alert("Experiência é obrigatória"); return; }
  if (!email) { alert("E-mail é obrigatório"); return; }
  if (!senha || senha.length < 8 || senha.length > 20) {
    alert("Senha deve ter entre 8 e 20 caracteres");
    return;
  }
  if (!checkbox.checked) {
    alert("Você precisa aceitar os termos de uso");
    return;
  }

  try {
  const response = await fetch(`${API_CONFIG.baseURL}/profissionais`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome, formacao, faculdade, cpf, crm_crp,
      cidade, estado, logradouro, resumo, email, senha,
      status: "pendente",
      inst_ref: []
    })
  });

  if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);

  const result = await response.json();

  await fetch(`${API_CONFIG.baseURL}/especialidades`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: especialidadeNome,
      rqe: especialidadeRqe || null,
      abordagem: especialidadeAbordagem,
      profissional_id: result.id
    })
  });

  sessionStorage.setItem("profissional_id", result.id);
  window.location.href = "espaçoprofissional.html";

} catch (error) {
  console.error("Erro:", error);
  alert("Erro ao enviar cadastro. Verifique se o servidor está rodando!");
}
});