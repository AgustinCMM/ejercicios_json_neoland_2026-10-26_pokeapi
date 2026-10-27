// Imports
import { mostrarModal, pokeApi } from "./functions.js";

// Variables para guardar los elementos del HTML
const resultado = document.getElementById("pokemon-results");
const plantillaTarjeta = document.getElementById("pokemon-card-template");
const plantillaModal = document.getElementById("pokemon-modal-template");

if (resultado && plantillaTarjeta && plantillaModal) {
  // Clonar la plantilla una vez para reutilizar el mismo modal.
  const modal = plantillaModal.content.firstElementChild.cloneNode(true);
  let pokemones = [];

  document.body.append(modal);

  // Detectar qué tarjeta se pulsó y abrir el modal con sus datos.
  resultado.addEventListener("click", (event) => {
    const boton = event.target.closest(".pokemon-card__trigger");

    if (!boton) {
      return;
    }

    // Buscar el Pokémon que coincide con el ID de la tarjeta pulsada.
    const pokemon = pokemones.find(
      (elemento) => elemento.id === Number(boton.dataset.pokemonId)
    );

    if (pokemon) {
      mostrarModal(pokemon, modal);
    }
  });

  // Cerrar modal
  modal
    .querySelector(".pokemon-modal__close")
    .addEventListener("click", () => modal.close());

  // Cerrar modal si se pulsa fuera de su contenido.
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  // Cargar las tarjetas y guardar los datos para usarlos al abrir cada modal.
  pokeApi(resultado, plantillaTarjeta).then((listaPokemones) => {
    pokemones = listaPokemones;
  });
}
