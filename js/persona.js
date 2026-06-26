const people = [
  { id: crypto.randomUUID(), nombre: "Ana", apellido: "Lopez", edad: 22, altura: 1.7, peso: 68 },
  { id: crypto.randomUUID(), nombre: "Mateo", apellido: "Ruiz", edad: 28, altura: 1.78, peso: 82 },
];

const form = document.querySelector("#person-form");
const peopleBody = document.querySelector("#people-body");
const nombreInput = document.querySelector("#nombre");
const apellidoInput = document.querySelector("#apellido");
const edadInput = document.querySelector("#edad");
const alturaInput = document.querySelector("#altura");
const pesoInput = document.querySelector("#peso");

function calculateImc(peso, altura) {
  return peso / (altura * altura);
}

function getImcText(peso, altura) {
  const imc = calculateImc(peso, altura);
  let category = "";

  if (imc < 18.5) {
    category = "Bajo";
  } else if (imc < 25) {
    category = "Normal";
  } else if (imc < 30) {
    category = "Sobrepeso";
  } else {
    category = "Alto";
  }

  return `${imc.toFixed(2)} - ${category}`;
}

function renderPeople() {
  peopleBody.innerHTML = "";

  people.forEach((person) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${person.nombre}</td>
      <td>${person.apellido}</td>
      <td>${person.edad}</td>
      <td>${person.altura.toFixed(2)} m</td>
      <td>${person.peso.toFixed(1)} kg</td>
      <td><span class="imc-badge">${getImcText(person.peso, person.altura)}</span></td>
      <td><button class="delete-button" type="button" data-id="${person.id}">Quitar</button></td>
    `;

    peopleBody.appendChild(row);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  const edad = Number(edadInput.value);
  const altura = Number(alturaInput.value);
  const peso = Number(pesoInput.value);

  if (!nombre || !apellido || edad <= 0 || altura <= 0 || peso <= 0) {
    return;
  }

  people.push({
    id: crypto.randomUUID(),
    nombre,
    apellido,
    edad,
    altura,
    peso,
  });

  form.reset();
  nombreInput.focus();
  renderPeople();
});

peopleBody.addEventListener("click", (event) => {
  if (!event.target.matches(".delete-button")) {
    return;
  }

  const id = event.target.dataset.id;
  const index = people.findIndex((person) => person.id === id);

  if (index !== -1) {
    people.splice(index, 1);
    renderPeople();
  }
});

renderPeople();