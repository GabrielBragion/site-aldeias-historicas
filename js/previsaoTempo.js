// Guarda Global ID Local : 1090700
// Castelo Branco Global Id Local: 1050200 - apenas monsanto

//EndPoint : https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/{globalIdLocal}.json

const queryString = window.location.pathname;
let endPoint;

if (queryString == "/monstanto.html")
  endPoint =
    "https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1050200.json";
else
  endPoint =
    "https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1090700.json";

  
console.log(queryString)

const dias = document.querySelectorAll(".temperatura-dia");
const min = document.querySelectorAll(".temperatura-min");
const max = document.querySelectorAll(".temperatura-max");
const icone = document.querySelectorAll(".temperatura-icon");
const meses = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];


const data = fetch(endPoint)
  .then((res) => res.json())
  .then((data) => {
    const arrayInfo = data.data;

    arrayInfo.forEach((dia, index) => {
      const dataObj = new Date(dia.forecastDate);
      const diaFormatado = `${dataObj.getDate()}/${meses[dataObj.getMonth()]}`;

      if (index < dias.length) {
        dias[index].textContent = diaFormatado;
        min[index].textContent = `${dia.tMin}°`;
        max[index].textContent = `${dia.tMax}°`;
        if (+dia.precipitaProb > 75) {
          icone[index].src = "../assets/icones/chuva.png";
        } else if (+dia.precipitaProb > 50) {
          icone[index].src = "../assets/icones/aguaceiros.png";
        } else if (+dia.precipitaProb > 25) {
          icone[index].src = "../assets/icones/nublado.png";
        } else {
          icone[index].src = "../assets/icones/sol.png";
        }
      }
    });
  })
  .catch((error) => console.error("Erro ao buscar os dados:", error));
