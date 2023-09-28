'use strict';
//*Constantes:
const searchInput = document.querySelector('.js-search-input'); //input
const searchBtn = document.querySelector('.js-search-btn'); //botón buscar
const matches = document.querySelector('.js-matches'); //ul
let inputValue = '';

//*Manejadora
function handleSearch(event) {
  event.preventDefault();
  inputValue = searchInput.value;
  let url = `https://api.tvmaze.com/search/shows?q=${inputValue}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

//*Listener
searchBtn.addEventListener('click', handleSearch);
