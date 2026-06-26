const { useMemo, useState } = React;

function calculateReactImc(peso, altura) {
  return peso / (altura * altura);
}

function getReactImcText(peso, altura) {
  const imc = calculateReactImc(peso, altura);

  if (imc < 18.5) {
    return `${imc.toFixed(2)} - Bajo`;
  }

  if (imc < 25) {
    return `${imc.toFixed(2)} - Normal`;
  }

  if (imc < 30) {
    return `${imc.toFixed(2)} - Sobrepeso`;
  }

  return `${imc.toFixed(2)} - Alto`;
}

function PersonForm({ onAddPerson }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    altura: "",
    peso: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nombre = formData.nombre.trim();
    const apellido = formData.apellido.trim();
    const edad = Number(formData.edad);
    const altura = Number(formData.altura);
    const peso = Number(formData.peso);

    if (!nombre || !apellido || edad <= 0 || altura <= 0 || peso <= 0) {
      return;
    }

    onAddPerson({
      id: crypto.randomUUID(),
      nombre,
      apellido,
      edad,
      altura,
      peso,
    });

    setFormData({
      nombre: "",
      apellido: "",
      edad: "",
      altura: "",
      peso: "",
    });
  }

  return React.createElement(
    "form",
    { className: "form-box", onSubmit: handleSubmit },
    React.createElement("label", null, "Nombre",
      React.createElement("input", {
        name: "nombre",
        type: "text",
        value: formData.nombre,
        onChange: handleChange,
        required: true,
      })
    ),
    React.createElement("label", null, "Apellido",
      React.createElement("input", {
        name: "apellido",
        type: "text",
        value: formData.apellido,
        onChange: handleChange,
        required: true,
      })
    ),
    React.createElement("label", null, "Edad",
      React.createElement("input", {
        name: "edad",
        type: "number",
        min: "1",
        max: "120",
        value: formData.edad,
        onChange: handleChange,
        required: true,
      })
    ),
    React.createElement("label", null, "Altura en metros",
      React.createElement("input", {
        name: "altura",
        type: "number",
        min: "0.5",
        step: "0.01",
        placeholder: "Ej: 1.70",
        value: formData.altura,
        onChange: handleChange,
        required: true,
      })
    ),
    React.createElement("label", null, "Peso en kg",
      React.createElement("input", {
        name: "peso",
        type: "number",
        min: "1",
        step: "0.1",
        placeholder: "Ej: 68",
        value: formData.peso,
        onChange: handleChange,
        required: true,
      })
    ),
    React.createElement("button", { type: "submit" }, "Agregar persona")
  );
}

function PeopleTable({ people, onRemovePerson }) {
  return React.createElement(
    "div",
    { className: "table-box" },
    React.createElement(
      "table",
      null,
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement("th", null, "Nombre"),
          React.createElement("th", null, "Apellido"),
          React.createElement("th", null, "Edad"),
          React.createElement("th", null, "Altura"),
          React.createElement("th", null, "Peso"),
          React.createElement("th", null, "IMC"),
          React.createElement("th", null, "Accion")
        )
      ),
      React.createElement(
        "tbody",
        null,
        people.map((person) =>
          React.createElement(
            "tr",
            { key: person.id },
            React.createElement("td", null, person.nombre),
            React.createElement("td", null, person.apellido),
            React.createElement("td", null, person.edad),
            React.createElement("td", null, `${person.altura.toFixed(2)} m`),
            React.createElement("td", null, `${person.peso.toFixed(1)} kg`),
            React.createElement(
              "td",
              null,
              React.createElement("span", { className: "imc-badge" }, getReactImcText(person.peso, person.altura))
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "button",
                {
                  className: "delete-button",
                  type: "button",
                  onClick: () => onRemovePerson(person.id),
                },
                "Quitar"
              )
            )
          )
        )
      )
    )
  );
}

function StatsBox({ people }) {
  const averageImc = useMemo(() => {
    if (people.length === 0) {
      return 0;
    }

    const total = people.reduce((sum, person) => {
      return sum + calculateReactImc(person.peso, person.altura);
    }, 0);

    return total / people.length;
  }, [people]);

  return React.createElement(
    "aside",
    { className: "stats-box" },
    React.createElement("div", { className: "stats-item" },
      React.createElement("strong", null, "Registros"),
      React.createElement("span", null, people.length)
    ),
    React.createElement("div", { className: "stats-item" },
      React.createElement("strong", null, "IMC promedio"),
      React.createElement("span", null, averageImc ? averageImc.toFixed(2) : "-")
    )
  );
}

function App() {
  const [people, setPeople] = useState([
    { id: crypto.randomUUID(), nombre: "Carlos", apellido: "Perez", edad: 25, altura: 1.64, peso: 61 },
    { id: crypto.randomUUID(), nombre: "Gustavo", apellido: "Diaz", edad: 31, altura: 1.96, peso: 120 },
  ]);

  function addPerson(person) {
    setPeople((currentPeople) => [...currentPeople, person]);
  }

  function removePerson(id) {
    setPeople((currentPeople) => {
      return currentPeople.filter((person) => person.id !== id);
    });
  }

  return React.createElement(
    "div",
    { className: "react-layout" },
    React.createElement(PersonForm, { onAddPerson: addPerson }),
    React.createElement(PeopleTable, { people, onRemovePerson: removePerson }),
    React.createElement(StatsBox, { people })
  );
}

ReactDOM.createRoot(document.querySelector("#react-root")).render(React.createElement(App));