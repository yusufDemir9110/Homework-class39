'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
function fetchData(url) {
  return fetch(url);
}

function fetchAndPopulatePokemons(data) {
  const selectDiv = document.createElement('div');
  const selectEl = document.createElement('select');
  const imgEl = document.createElement('img');
  document.body.appendChild(imgEl);
  imgEl.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg`;
  imgEl.alt = 'Poke-Image-1';
  document.body.appendChild(selectDiv);
  selectDiv.appendChild(selectEl);
  data.results.forEach((item) => {
    const optionEl = document.createElement('option');
    optionEl.textContent = item.name;
    optionEl.value = item.url;
    selectEl.appendChild(optionEl);
  });
  selectEl.addEventListener('change', (e) => {
    const selectedPokeImgUrl = e.target.value;
    let pokeId = '';
    switch (selectedPokeImgUrl.length) {
      case 36:
        pokeId = selectedPokeImgUrl.slice(34, 35);
        break;
      case 37:
        pokeId = selectedPokeImgUrl.slice(34, 36);
        break;
      case 38:
        pokeId = selectedPokeImgUrl.slice(34, 37);
        break;
    }

    fetchImage(pokeId, imgEl);
  });
}

function fetchImage(pokeId, imgEl) {
  imgEl.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`;
  imgEl.alt = `Poke-Image-${pokeId}`;
}

async function main() {
  try {
    const res = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await res.json();
    fetchAndPopulatePokemons(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', main);
