// Funciones
const URL_API_POKEMON = "https://pokeapi.co/api/v2/pokemon/";

// Función para pedir los datos de la API y preparar una tarjeta para cada Pokémon.
export async function pokeApi(resultado, plantillaTarjeta) {
  try {
    const peticiones = [];

    for (let i = 1; i <= 151; i++) {
      peticiones.push(
        fetch(`${URL_API_POKEMON}${i}`).then((response) => response.json())
      );
    }

    const pokemones = await Promise.all(peticiones);

    // Completar cada tarjeta con la imagen, el número, el nombre y sus tipos.
    for (const pokemon of pokemones) {
      const tarjeta = plantillaTarjeta.content.cloneNode(true);
      const boton = tarjeta.querySelector(".pokemon-card__trigger");
      const imagen = tarjeta.querySelector(".pokemon-card__image");
      const imagenPokemon = pokemon.sprites.other["official-artwork"].front_default;
      const tipos = tarjeta.querySelector(".pokemon-card__types");

      boton.dataset.pokemonId = pokemon.id;

      if (imagenPokemon) {
        imagen.src = imagenPokemon;
        imagen.alt = `Imagen de ${pokemon.name}`;
      } else {
        imagen.hidden = true;
      }

      tarjeta.querySelector(".pokemon-card__number").textContent = `#${String(pokemon.id).padStart(3, "0")}`;
      tarjeta.querySelector(".pokemon-card__name").textContent = pokemon.name;

      // Agregar todos los tipos que devuelve la API para este Pokémon.
      for (const entradaTipo of pokemon.types) {
        const tipo = document.createElement("span");
        tipo.className = "pokemon-card__type";
        tipo.setAttribute("role", "listitem");
        tipo.textContent = entradaTipo.type.name;
        tipos.append(tipo);
      }

      resultado.append(tarjeta);
    }

    return pokemones;
  } catch (error) {
    console.error("No se pudieron cargar los Pokémon.", error);
    return [];
  }
}

// Función para mostrar el modal con la información del Pokémon seleccionado.
export function mostrarModal(pokemon, modal) {
  modal.querySelector(".pokemon-modal__number").textContent = `#${String(
    pokemon.id
  ).padStart(3, "0")}`;
  modal.querySelector(".pokemon-modal__name").textContent = pokemon.name;

  const imagen = modal.querySelector(".pokemon-modal__image");
  const imagenPokemon = pokemon.sprites.other["official-artwork"].front_default;

  if (imagenPokemon) {
    imagen.src = imagenPokemon;
    imagen.alt = `Imagen de ${pokemon.name}`;
    imagen.hidden = false;
  } else {
    imagen.hidden = true;
  }

  const tipos = modal.querySelector(".pokemon-modal__types");
  tipos.replaceChildren();

  // Mostrar los tipos del Pokémon.
  for (const entradaTipo of pokemon.types) {
    const tipo = document.createElement("span");
    tipo.className = "pokemon-modal__type";
    tipo.setAttribute("role", "listitem");
    tipo.textContent = entradaTipo.type.name;
    tipos.append(tipo);
  }

  // Mostrar la altura y el peso.
  modal.querySelector(".pokemon-modal__height").textContent = pokemon.height;
  modal.querySelector(".pokemon-modal__weight").textContent = pokemon.weight;

  // Mostrar habilidades e indicar si es una habilidad oculta.
  const habilidades = modal.querySelector(".pokemon-modal__abilities");
  habilidades.replaceChildren();

  for (const entradaHabilidad of pokemon.abilities) {
    const habilidad = document.createElement("li");
    habilidad.className = "pokemon-modal__ability";
    habilidad.textContent = entradaHabilidad.ability.name;

    if (entradaHabilidad.is_hidden) {
      habilidad.textContent += " (oculta)";
    }

    habilidades.append(habilidad);
  }

  const estadisticas = modal.querySelector(".pokemon-modal__stats");
  estadisticas.replaceChildren();

  // Agregar cada estadística con su nombre y valor base.
  for (const entradaEstadistica of pokemon.stats) {
    const fila = document.createElement("div");
    const nombre = document.createElement("dt");
    const valor = document.createElement("dd");

    nombre.textContent = entradaEstadistica.stat.name.replaceAll("-", " ");
    valor.textContent = entradaEstadistica.base_stat;
    fila.append(nombre, valor);
    estadisticas.append(fila);
  }

  modal.showModal();
}
