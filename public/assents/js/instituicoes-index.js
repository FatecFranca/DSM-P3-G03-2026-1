import API_CONFIG from "./config.js";

async function carregarInstituicoes() {
    const container = document.getElementById("container-instituicoes");

    try {
        const resposta = await fetch(`${API_CONFIG.baseURL}/instituicoes`);
        const instituicoes = await resposta.json();

        container.innerHTML = "";

        if (!instituicoes || instituicoes.length === 0) {
            container.innerHTML = `
        <div class="col-12 text-center text-muted">
          <p>Nenhuma instituição cadastrada no momento.</p>
        </div>
      `;
            return;
        }

        instituicoes.forEach((inst) => {
            const col = document.createElement("div");
            col.classList.add("col");
            col.innerHTML = `
                <div class="card h-100">
                    <div class="card-header" style="font-size: 1.25rem; font-weight: bold;">
                    ${inst.nome}
                    </div>
                    <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                        <p class="card-text">${inst.descricao}</p>
                        </div>
                        <div class="col-md-6">
                        <h5 class="card-title">Endereço</h5>
                        <p class="card-text">${inst.endereco}</p>
                        </div>
                        <div class="col-md-6">
                        <h5 class="card-title">Telefone</h5>
                        <p class="card-text">${inst.telefone}</p>
                        </div>
                    </div>
                    </div>
                </div>
                `;
            container.appendChild(col);
        });

    } catch (erro) {
        console.error("Erro ao carregar instituições:", erro);
        container.innerHTML = `
      <div class="col-12 text-center text-danger">
        <p>Erro ao carregar instituições. Tente novamente mais tarde.</p>
      </div>
    `;
    }
}

document.addEventListener("DOMContentLoaded", carregarInstituicoes);