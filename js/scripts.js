document.addEventListener("DOMContentLoaded", cargarDatosAPI);

function cargarDatosAPI() {
  const fallecidos = document.getElementById("fallecidos");
  const totalCasos = document.getElementById("totalCasos");
  const recuperados = document.getElementById("recuperados");
  const fecha = document.getElementsByClassName("dateUpdate");

  axios({
    method: "GET",
    url:
      "https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?search=COLOMBIA&order=total_cases",
  }).then((res) => {
    console.log(res.data.data.last_update);
    for (const elem of fecha) {
      elem.innerHTML = res.data.data.last_update;
    }

    fallecidos.innerHTML = res.data.data.rows[0].total_deaths;
    recuperados.innerHTML = res.data.data.rows[0].total_recovered;
    totalCasos.innerHTML = res.data.data.rows[0].total_cases;
  });
}
