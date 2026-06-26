const topics = [
  {
    name: "Fiat Mobi",
    level: "Barato",
    important: true,
    description: "El Fiat Mobi es un automóvil de turismo del segmento A que el fabricante italiano Fiat produce en Brasil para Latinoamérica desde el año 2016.",
  },
  {
    name: "Renault Kwid",
    level: "Barato",
    important: true,
    description: "El Renault Kwid es un vehículo compacto del segmento A, diseñado principalmente para el entorno urbano.",
  },
  {
    name: "JMEV Easy 3",
    level: "Barato",
    important: false,
    description: "El JMEV E300 es un vehículo eléctrico compacto del segmento A, diseñado para la movilidad urbana y fabricado por JMEV, una marca de vehículos eléctricos de China.",
  },
  {
    name: "Porche 911",
    level: "Caro",
    important: true,
    description: "Permite modificar el contenido HTML desde JavaScript.",
  },
  {
    name: "Lamborghini Revuelto",
    level: "Caro",
    important: true,
    description: "Detectan acciones del usuario, como hacer clic o enviar un formulario.",
  },
  {
    name: "Rolls-Royce Boat Tail",
    level: "Caro",
    important: false,
    description: "Ayuda a crear interfaces con componentes, estado y eventos.",
  },
];

const topicsList = document.querySelector("#topics-list");
const showAllButton = document.querySelector("#show-all");
const filterBasicButton = document.querySelector("#filter-basic");
const sortNameButton = document.querySelector("#sort-name");
const highlightButton = document.querySelector("#highlight");

let currentTopics = [...topics];
let highlightImportant = false;

function renderTopics() {
  topicsList.innerHTML = "";

  currentTopics.forEach((topic) => {
    const card = document.createElement("article");
    card.className = "topic-card";

    if (highlightImportant && topic.important) {
      card.classList.add("highlight");
    }

    card.innerHTML = `
      <div>
        <h3>${topic.name}</h3>
        <p>${topic.description}</p>
      </div>
      <div class="topic-meta">
        <span>${topic.level}</span>
        <span>${topic.important ? "Importante" : "Complementario"}</span>
      </div>
    `;

    topicsList.appendChild(card);
  });
}

showAllButton.addEventListener("click", () => {
  currentTopics = [...topics];
  renderTopics();
});

filterBasicButton.addEventListener("click", () => {
  currentTopics = topics.filter((topic) => topic.level === "Barato");
  renderTopics();
});

sortNameButton.addEventListener("click", () => {
  currentTopics = [...currentTopics].sort((a, b) => a.name.localeCompare(b.name));
  renderTopics();
});

highlightButton.addEventListener("click", () => {
  highlightImportant = !highlightImportant;
  renderTopics();
});

renderTopics();