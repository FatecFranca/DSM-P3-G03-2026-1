import API_CONFIG from "./config.js";

  async function carregarRelatos() {
    const container = document.querySelector(".row.align-items-start");
    container.innerHTML = `
      <div class="col-12 text-center text-secondary">
        <p>Carregando relatos...</p>
      </div>
    `;

    try {
      const resposta = await fetch(`${API_CONFIG.baseURL}/relatos`);
      const relatos = await resposta.json();

      container.innerHTML = "";

      if (!relatos || relatos.length === 0) {
        container.innerHTML = `
          <div class="col-12 text-center text-muted">
            <p>Nenhum relato disponível no momento. Seja o primeiro a compartilhar sua história 💬</p>
          </div>
        `;
        return;
      }

      relatos.forEach((r) => {
        const card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
          <div class="card border-success mb-3" style="max-width: 18rem;">
            <div class="card-header fw-bold">${r.nome}</div>
            <div class="card-body text-success">
              <p class="card-text">${r.relato}</p>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    } catch (erro) {
      console.error("Erro ao carregar relatos:", erro);
      container.innerHTML = `
        <div class="col-12 text-center text-danger">
          <p>Ocorreu um erro ao carregar os relatos. Tente novamente mais tarde.</p>
        </div>
      `;
    }
  }

  document.addEventListener("DOMContentLoaded", carregarRelatos);