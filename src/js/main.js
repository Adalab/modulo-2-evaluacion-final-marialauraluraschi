'use strict';
//*Constantes:
const searchInput = document.querySelector('.js-search-input');//input
const searchBtn = document.querySelector('.js-search-btn');//botón buscar
const matches = document.querySelector('.js-matches');//ul
let inputValue = '';
let url= `https://api.tvmaze.com/search/shows?q=${inputValue}`;

//*Manejadora
function handleSearch(event) {
  event.preventDefault();
  const searched = searchInput.value;
  inputValue = searched.toLowerCase();
  console.log(inputValue);
  matches.innerHTML+=inputValue;
}

//*Listener
searchBtn.addEventListener('click', handleSearch);
