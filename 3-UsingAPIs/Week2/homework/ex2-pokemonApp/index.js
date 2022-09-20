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
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('HTTP Error');
  } else {
    const data = await response.json();
    return data;
  }
}

function fetchAndPopulatePokemons(data) {
  const selectDiv = document.createElement('div');
  const selectEl = document.createElement('select');
  const imgEl = document.createElement('img');
  document.body.appendChild(imgEl);
  imgEl.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png`;
  imgEl.alt = 'Pokemon Logo';
  document.body.appendChild(selectDiv);
  selectDiv.appendChild(selectEl);
  const optionElFirst = document.createElement('option');
  optionElFirst.textContent = 'Choose Your Pokemon';
  optionElFirst.disabled = true;
  optionElFirst.selected = true;
  selectEl.appendChild(optionElFirst);
  data.results.forEach((item) => {
    const optionEl = document.createElement('option');
    optionEl.textContent = item.name;
    optionEl.value = item.url;
    selectEl.appendChild(optionEl);
  });
  selectEl.addEventListener('change', (e) => {
    const selectedPokeUrl = e.target.value;
    fetchImage(selectedPokeUrl, imgEl);
  });
}

async function fetchImage(selectedPokeUrl, imgEl) {
  const response = await fetch(selectedPokeUrl);
  if (!response.ok) {
    throw new Error('HTTP Error');
  } else {
    const data = await response.json();
    imgEl.src = data.sprites.other.dream_world.front_default;
    imgEl.alt = data.species.name;
  }
}

async function main() {
  try {
    const data = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=151');
    fetchAndPopulatePokemons(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', main);
