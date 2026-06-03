// import API_CONFIG from "./config.js";

// async function carregarRelatos() {
//   const container = document.querySelector(".row.align-items-start");
//   container.innerHTML = `
//     <div class="col-12 text-center text-secondary">
//       <p>Carregando relatos...</p>
//     </div>
//   `;

//   try {
//     const resposta = await fetch(`${API_CONFIG.baseURL}/relatos`);
//     const relatos = await resposta.json();
//     container.innerHTML = "";

//     if (!relatos || relatos.length === 0) {
//       container.innerHTML = `
//         <div class="col-12 text-center text-muted">
//           <p>Nenhum relato disponível no momento. Seja o primeiro a compartilhar sua história 💬</p>
//         </div>
//       `;
//       return;
//     }
//     relatos.forEach((r) => {
//       const nome = r.nome || "Anônimo";

//       const data = r.data_relato
//         ? new Date(r.data_relato).toLocaleDateString("pt-BR")
//         : "Data desconhecida";

//       const card = document.createElement("div");
//       card.classList.add("col");
// card.innerHTML = `
//   <div class="card border-success mb-3 h-100">
//     <div class="card-header">
//       <span class="fw-bold">${nome}</span>
//     </div>
//     <div class="card-body text-success">
//       <p class="card-text">${r.descricao}</p>
//     </div>
//     <div class="card-footer text-muted">
//       <small>📅 ${data}</small>
//     </div>
//   </div>
// `;
//       container.appendChild(card);
//     });

//   } catch (erro) {
//     console.error("Erro ao carregar relatos:", erro);
//     container.innerHTML = `
//       <div class="col-12 text-center text-danger">
//         <p>Ocorreu um erro ao carregar os relatos. Tente novamente mais tarde.</p>
//       </div>
//     `;
//   }
// }

// document.addEventListener("DOMContentLoaded", carregarRelatos);



import API_CONFIG from "./config.js";

const POR_PAGINA = 6;
let paginaAtual = 1;
let todosRelatos = [];

async function carregarRelatos() {
  const container = document.querySelector(".row.align-items-start");
  container.innerHTML = `
    <div class="col-12 text-center text-secondary">
      <p>Carregando relatos...</p>
    </div>
  `;

  try {
    const resposta = await fetch(`${API_CONFIG.baseURL}/relatos`);
    todosRelatos = await resposta.json();
    container.innerHTML = "";

    if (!todosRelatos || todosRelatos.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center text-muted">
          <p>Nenhum relato disponível no momento. Seja o primeiro a compartilhar sua história 💬</p>
        </div>
      `;
      return;
    }

    renderizarRelatos(container);

  } catch (erro) {
    console.error("Erro ao carregar relatos:", erro);
    container.innerHTML = `
      <div class="col-12 text-center text-danger">
        <p>Ocorreu um erro ao carregar os relatos. Tente novamente mais tarde.</p>
      </div>
    `;
  }
}

function renderizarRelatos(container) {
  const ate = paginaAtual * POR_PAGINA;
  const relatosPagina = todosRelatos.slice(0, ate);

  container.innerHTML = "";

  relatosPagina.forEach((r) => {
    const nome = r.nome || "Anônimo";
    const data = r.data_relato
      ? new Date(r.data_relato).toLocaleDateString("pt-BR")
      : "Data desconhecida";

    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
      <div class="card border-success h-100">
        <div class="card-header">
          <span class="fw-bold">${nome}</span>
        </div>
        <div class="card-body text-success">
          <p class="card-text">${r.descricao}</p>
        </div>
        <div class="card-footer text-muted">
          <small>📅 ${data}</small>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // mostra ou esconde o botão "ver mais"
  const btnContainer = document.getElementById("btn-ver-mais-container");
  if (ate >= todosRelatos.length) {
    btnContainer.style.display = "none"; // sem mais relatos
  } else {
    btnContainer.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarRelatos();

  document.getElementById("btn-ver-mais").addEventListener("click", () => {
    paginaAtual++;
    const container = document.querySelector(".row.align-items-start");
    renderizarRelatos(container);
  });
});