document.addEventListener("DOMContentLoaded", cargarDatosAPI);

function cargarDatosAPI() {
  const fallecidos = document.getElementById("fallecidos");
  const hombresFalle = document.getElementById("hombresFalle");
  const mujeresFalle = document.getElementById("mujeresFalle");

  const recuperados = document.getElementById("recuperados");
  const hombresRecu = document.getElementById("hombresRecu");
  const mujeresRecu = document.getElementById("mujeresRecu");

  const activosTotal = document.getElementById("activosTotal");
  const mujeresActi = document.getElementById("mujeresActi");
  const hombresActi = document.getElementById("hombresActi");

  const totalCasos = document.getElementById("totalCasos");
  const totalCasosMujeres = document.getElementById("totalCasosMujeres");
  const totalCasosHombres = document.getElementById("totalCasosHombres");

  axios({
    method: "GET",
    url:
      "https://www.datos.gov.co/resource/gt2j-8ykr.json?$limit=100000000&$$app_token=6NxYR4xTp2BUlQawpjqYrnm80",
  }).then((res) => {
    const arrayRes = res.data; // TOTAL DE CONTAGIADOS.

    const totalCasosActivos = arrayRes.filter(
      (a) =>
        a.atenci_n == "Hospital" ||
        a.atenci_n == "Casa" ||
        a.atenci_n == "Hospital UCI"
    );

    const totalMujeresActivas = totalCasosActivos.filter((mujerActi) =>
      mujerActi.sexo !== undefined ? mujerActi.sexo.toUpperCase() == "F" : ""
    );

    const totalHombresActivas = totalCasosActivos.filter((hombreActi) =>
      hombreActi.sexo !== undefined ? hombreActi.sexo.toUpperCase() == "M" : ""
    );
    const totalMujeres = arrayRes.filter((total) =>
      total.sexo !== undefined ? total.sexo.toUpperCase() == "F" : ""
    );

    const totalHombres = arrayRes.filter(
      (total) => total.sexo !== undefined ? total.sexo.toUpperCase() == "M" : ""
    );

    const recuperadosTotal = arrayRes.filter(
      (ate) => ate.atenci_n == "Recuperado"
    );

    const mujeresRecuperadas = recuperadosTotal.filter((mujer) =>
      mujer.sexo !== undefined ? mujer.sexo.toUpperCase() == "F" : ""
    );

    const hombresRecuperadas = recuperadosTotal.filter(
      (hombre) => hombre.sexo !== undefined  ? hombre.sexo.toUpperCase() == "M" : ""
    );

    const fallecidosTotal = arrayRes.filter(
      (ate) => ate.atenci_n == "Fallecido"
    );

    const mujeresFallecidas = fallecidosTotal.filter(
      (mujerFalle) => mujerFalle.sexo  !== undefined ? mujerFalle.sexo.toUpperCase() == "F": ""
    );

    const hombresFallecidos = fallecidosTotal.filter(
      (hombreFalle) => hombreFalle.sexo   !== undefined ?   hombreFalle.sexo.toUpperCase() == "M" : ""
    );

    totalCasosHombres.innerHTML = totalHombres.length;
    totalCasosMujeres.innerHTML = totalMujeres.length;
    hombresRecu.innerHTML = hombresRecuperadas.length;
    mujeresRecu.innerHTML = mujeresRecuperadas.length;
    hombresFalle.innerHTML = hombresFallecidos.length;
    mujeresFalle.innerHTML = mujeresFallecidas.length;
    fallecidos.innerHTML = fallecidosTotal.length;
    recuperados.innerHTML = recuperadosTotal.length;
    totalCasos.innerHTML = arrayRes.length;
    activosTotal.innerHTML = totalCasosActivos.length;
    mujeresActi.innerHTML = totalMujeresActivas.length;
    hombresActi.innerHTML = totalHombresActivas.length;
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
