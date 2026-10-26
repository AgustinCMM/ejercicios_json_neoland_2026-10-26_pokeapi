const URL_API_POKEMON = "https://pokeapi.co/api/v2/pokemon/";

export async function pokeApi(resultado, plantillaTarjeta) {
  try {
    const peticiones = [];

    for (let i = 1; i <= 151; i++) {
      peticiones.push(
        fetch(`${URL_API_POKEMON}${i}`).then((response) => response.json())
      );
    }

    const pokemones = await Promise.all(peticiones);

    for (const pokemon of pokemones) {
      const tarjeta = plantillaTarjeta.content.cloneNode(true);
      const imagen = tarjeta.querySelector(".pokemon-card__image");
      const imagenPokemon = pokemon.sprites.other["official-artwork"].front_default;
      const tipos = tarjeta.querySelector(".pokemon-card__types");

      if (imagenPokemon) {
        imagen.src = imagenPokemon;
        imagen.alt = `Imagen de ${pokemon.name}`;
      } else {
        imagen.hidden = true;
      }

      tarjeta.querySelector(".pokemon-card__number").textContent = `#${String(
        pokemon.id
      ).padStart(3, "0")}`;
      tarjeta.querySelector(".pokemon-card__name").textContent = pokemon.name;

      for (const entradaTipo of pokemon.types) {
        const tipo = document.createElement("span");
        tipo.className = "pokemon-card__type";
        tipo.setAttribute("role", "listitem");
        tipo.textContent = entradaTipo.type.name;
        tipos.append(tipo);
      }

      resultado.append(tarjeta);
    }
  } catch (error) {
    console.error("No se pudieron cargar los Pokémon.", error);
  }
}
