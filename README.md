# ejercicios_json_neoland_2026-10-26_pokeapi

## Propósito

Entorno de práctica de JSON sobre la PokeAPI. Incluye una consigna única con dos partes integradas: crear tarjetas de Pokémon y abrir un modal con detalles al pulsar cada tarjeta.

## Criterio de selección

Se incluye la consigna completa del documento Pokeapi.docx en su orden original: primero, recorrer los Pokémon del 1 al 151 y generar una tarjeta HTML con imagen, nombre, número y tipos; después, al hacer clic en cada tarjeta, mostrar un modal con más datos del mismo Pokémon. Ambas partes forman un solo ejercicio y un mismo resultado integrado.

La consigna no tiene título ni número original; por eso se usa el identificador técnico estable ejercicio-pokeapi para su carpeta. Los resultados se presentan en el HTML mediante tarjetas y su modal de detalle.

## Estructura

- index.html: página principal con el acceso al ejercicio.
- assets/css/styles.css: estilos compartidos y diseño responsive.
- assets/favicon.svg: favicon local con temática de Poké Ball.
- ejercicio-pokeapi/index.html: consigna, área de resultados y plantillas de tarjeta y modal.
- ejercicio-pokeapi/css/styles.css: estilos de las tarjetas y del modal.
- ejercicio-pokeapi/js/script.js: declara los elementos del DOM, conecta los eventos y llama a las funciones.
- ejercicio-pokeapi/js/functions.js: consulta la PokeAPI, genera las tarjetas y rellena el modal.
- Pokeapi.docx: documento fuente, conservado sin cambios.

## Cómo abrir el proyecto

1. Abre esta carpeta en Visual Studio Code.
2. Inicia Live Server desde el archivo raíz index.html.
3. Abre el ejercicio desde la tarjeta de la página principal.

Live Server es necesario porque el proyecto carga JavaScript como módulos ES; los navegadores suelen bloquear esos módulos si se abre el archivo directamente con file://.

## Dónde escribir y consultar resultados

El ejercicio consulta en paralelo los datos de los Pokémon del 1 al 151 y genera las tarjetas en el orden de la API con la imagen `sprites.other["official-artwork"].front_default`, nombre, número y tipos. Al pulsar una tarjeta se abre un modal con su imagen encima del resto de información: tipos, altura, peso, habilidades y estadísticas. Los datos del modal provienen de la respuesta ya cargada para esa tarjeta. `script.js` conecta los elementos y eventos con las funciones de `functions.js`.

Los 151 resultados se presentan en la página del ejercicio. La NOTA original aparece debajo de las dos partes de la consigna. El proyecto no define salida por consola.

## Restricciones técnicas

El entorno usa HTML, CSS y JavaScript vanilla, sin dependencias ni frameworks. Se conecta a la PokeAPI y carga las imágenes indicadas por sus respuestas, por lo que necesita conexión a internet. No incorpora seguimiento de estado ni importación/exportación de progreso.
