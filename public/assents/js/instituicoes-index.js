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
                    <div class="card-header" style="padding: 15px; margin: 5px; font-weight: bold;">
                    ${inst.nome}
                    </div>
                    <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                        <h6 class="card-text" style="padding: 2.5px; margin: 2.5px;">${inst.descricao}</h6>
                        </div>
                        <div class="col-md-6">
                        <p class="card-title" style="padding: 2.5px; margin: 2.5px;">Endereço</p>
                        <h6 class="card-text" style="padding: 2.5px; margin: 2.5px;">${inst.endereco}</h6>
                        </div>
                        <div class="col-md-6">
                        <p class="card-title" style="padding: 2.5px; margin: 2.5px;">Telefone</p>
                        <h6 class="card-text" style="padding: 2.5px; margin: 2.5px;">${inst.telefone}</h6>
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