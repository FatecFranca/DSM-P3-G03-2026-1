
const apiKey = "AIzaSyCto1uEJb-288pdALAL_tO39r4e5r9yid4";
const cx = "e7b446292de864b91";


const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");

const cardBody = document.querySelector("#resultadodabusca");


async function buscar() {
  if (!query) {
    cardBody.innerHTML = "<p>Nenhum termo de busca informado.</p>";
    return;
  }

  cardBody.innerHTML = `<p>🔎 Buscando resultados para <strong>${query}</strong>...</p>`;

  try {
    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      cardBody.innerHTML = `<p>Nenhum resultado encontrado para <strong>${query}</strong>.</p>`;
      return;
    }

    const resultsHTML = data.items
      .map(
        (item) => `
          <div class="resultado-item" style="text-align: left; margin-bottom: 20px;">
            <h5><a href="${item.link}" target="_blank" style="color: #17375F;">${item.title}</a></h5>
            <p>${item.snippet || ""}</p>
            <a href="${item.link}" target="_blank" style="font-size: 0.9em; color: gray;">${item.link}</a>
            <hr/>
          </div>
        `
      )
      .join("");

    cardBody.innerHTML = `
        <p style="text-align:left;">Resultados para: <strong>${query}</strong></p>
        ${resultsHTML}
       
      `;
  } catch (error) {
    console.error(error);
    cardBody.innerHTML =
      "<p>Ocorreu um erro ao buscar resultados. Tente novamente mais tarde.</p>";
  }
}

buscar();

