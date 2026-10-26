import { pokeApi } from "./functions.js";

const resultado = document.getElementById("pokemon-results");
const plantillaTarjeta = document.getElementById("pokemon-card-template");

if (resultado && plantillaTarjeta) {
  pokeApi(resultado, plantillaTarjeta);
}
