import API_CONFIG from "./config.js";

const campos = [
  { titulo: "Nome",        id: "campo-nome",       tipo: "input"    },
  { titulo: "Formação",    id: "campo-formacao",   tipo: "input"    },
  { titulo: "Faculdade",   id: "campo-faculdade",  tipo: "input"    },
  { titulo: "CRM/CRP",     id: "campo-crm",        tipo: "input"    },
  { titulo: "Email",       id: "campo-email",      tipo: "input"    },
  { titulo: "Cidade",      id: "campo-cidade",     tipo: "input"    },
  { titulo: "Logradouro",  id: "campo-logradouro", tipo: "input"    },
  { titulo: "RQE",         id: "campo-rqe",        tipo: "input"    },
  { titulo: "Especialidade", id: "campo-especialidade", tipo: "input"    },
  { titulo: "CPF",         id: "campo-cpf",        tipo: "input"    },
  { titulo: "Abordagem",   id: "campo-abordagem",  tipo: "input"    },
  { titulo: "Estado",      id: "campo-estado",     tipo: "input"    },
  { titulo: "Experiência", id: "campo-exp",        tipo: "textarea" },
];

function inicializar() {
  const titulos = document.querySelectorAll(".card-title");
  titulos.forEach((h5, i) => {
    const p = h5.nextElementSibling;
    if (p && campos[i]) {
      p.id = campos[i].id;
      p.dataset.tipo = campos[i].tipo;
    }
  });
}

function toggleEdicao() {
  const btn = document.getElementById("btn-editar");
  const editando = btn.textContent.trim() === "Salvar";

  if (!editando) {
    campos.forEach(({ id, tipo }) => {
      const p = document.getElementById(id);
      if (!p) return;
      const valor = p.textContent.trim();
      let campo;

      if (tipo === "textarea") {
        campo = document.createElement("textarea");
        campo.className = "form-control mt-1";
        campo.rows = 4;
        campo.value = valor;
      } else {
        campo = document.createElement("input");
        campo.type = "text";
        campo.className = "form-control mt-1";
        campo.value = valor;
      }

      campo.dataset.campoId = id;
      p.replaceWith(campo);
    });

    btn.textContent = "Salvar";
    btn.className = "btn btn-success";

  } else {
    const id = sessionStorage.getItem("profissional_id");
    const dadosAtualizados = {};
    const especialidadeAtualizada = {};

    campos.forEach(({ id: campoId }) => {
      const input = document.querySelector(`[data-campo-id="${campoId}"]`);
      if (!input) return;
      const p = document.createElement("p");
      p.className = "card-text";
      p.id = campoId;
      p.textContent = input.value;
      input.replaceWith(p);

      const mapa = {
        "campo-nome":          ["prof", "nome"],
        "campo-formacao":      ["prof", "formacao"],
        "campo-faculdade":     ["prof", "faculdade"],
        "campo-crm":           ["prof", "crm_crp"],
        "campo-email":         ["prof", "email"],
        "campo-cidade":        ["prof", "cidade"],
        "campo-logradouro":    ["prof", "logradouro"],
        "campo-cpf":           ["prof", "cpf"],
        "campo-estado":        ["prof", "estado"],
        "campo-exp":           ["prof", "resumo"],
        "campo-especialidade": ["esp",  "nome"],
        "campo-rqe":           ["esp",  "rqe"],
        "campo-abordagem":     ["esp",  "abordagem"],
      };

      const destino = mapa[campoId];
      if (!destino) return;

      if (destino[0] === "prof") {
        dadosAtualizados[destino[1]] = input.value;
      } else {
        especialidadeAtualizada[destino[1]] = input.value;
      }
    });

    fetch(`${API_CONFIG.baseURL}/profissionais/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosAtualizados)
    }).catch(err => console.error("Erro ao salvar profissional:", err));


    const espId = sessionStorage.getItem("especialidade_id");
    if (espId && Object.keys(especialidadeAtualizada).length > 0) {
      fetch(`${API_CONFIG.baseURL}/especialidades/${espId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(especialidadeAtualizada)
      }).catch(err => console.error("Erro ao salvar especialidade:", err));
    }

    btn.textContent = "Editar Perfil";
    btn.className = "btn btn-primary";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inicializar();
  document.getElementById("btn-editar").addEventListener("click", toggleEdicao);
});