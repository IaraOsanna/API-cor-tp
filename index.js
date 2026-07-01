let CLAVE_API = "jZh8YKsIhED48rN930rcW2yPo2H9tKKyEWjcz9dk";
let URL_BASE = "https://api.nasa.gov/planetary/apod";

let galeria = document.getElementById("galeria");
let textoError = document.getElementById("textoError");

// Mostrar datos
function mostrarDatos(arrayDatos) {
  galeria.innerHTML = "";

  arrayDatos.forEach(dato => {
    if (dato.media_type === "image") {
      galeria.innerHTML += `
        <div class="tarjeta">
          <h3>${dato.title}</h3>
          <img src="${dato.url}" alt="${dato.title}">
          <p>${dato.date}</p>
          <p>${dato.explanation.substring(0, 100)}...</p>
        </div>
      `;
    }
  });
}

// Foto del día
function obtenerHoy() {
  textoError.textContent = "";

  fetch(`${URL_BASE}?api_key=${CLAVE_API}`)
    .then(respuesta => respuesta.json())
    .then(dato => mostrarDatos([dato]))
    .catch(() => textoError.textContent = "Error al cargar datos");
}

// Por fecha
function obtenerPorFecha() {
  textoError.textContent = "";
  let fecha = document.getElementById("inputFecha").value;

  if (!fecha) {
    textoError.textContent = "Seleccioná una fecha";
    return;
  }

  let hoy = new Date().toISOString().split("T")[0];

  if (fecha > hoy) {
    textoError.textContent = "No podés elegir una fecha futura";
    return;
  }

  fetch(`${URL_BASE}?api_key=${CLAVE_API}&date=${fecha}`)
    .then(respuesta => respuesta.json())
    .then(dato => mostrarDatos([dato]))
    .catch(() => textoError.textContent = "Error al cargar datos");
}

// Aleatorias
function obtenerAleatorias() {
  textoError.textContent = "";
  let cantidad = document.getElementById("inputCantidad").value;

  if (!cantidad || cantidad < 1 || cantidad > 10) {
    textoError.textContent = "Elegí un número entre 1 y 10";
    return;
  }

  fetch(`${URL_BASE}?api_key=${CLAVE_API}&count=${cantidad}`)
    .then(respuesta => respuesta.json())
    .then(datos => mostrarDatos(datos))
    .catch(() => textoError.textContent = "Error al cargar datos");
}
