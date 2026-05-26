const campos = [
  { titulo: "Formação",    id: "campo-formacao",   tipo: "input"    },
  { titulo: "Faculdade",   id: "campo-faculdade",  tipo: "input"    },
  { titulo: "CRM/CRP",     id: "campo-crm",        tipo: "input"    },
  { titulo: "Email",       id: "campo-email",      tipo: "input"    },
  { titulo: "Cidade",      id: "campo-cidade",     tipo: "input"    },
  { titulo: "Logradouro",  id: "campo-logradouro", tipo: "input"    },
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
    campos.forEach(({ id }) => {
      const input = document.querySelector(`[data-campo-id="${id}"]`);
      if (!input) return;
      const p = document.createElement("p");
      p.className = "card-text";
      p.id = id;
      p.textContent = input.value;
      input.replaceWith(p);
    });

    btn.textContent = "Editar Perfil";
    btn.className = "btn btn-primary";
  }
}

inicializar();