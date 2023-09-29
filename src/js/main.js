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
      for (let i = 0; i < data.length; i++) {
        let showName= data[i].show.name;
        console.log(showName);
        let showPic= data[i].show.image.medium;
        console.log(showPic);
      }
    });
}

//*Listener
searchBtn.addEventListener('click', handleSearch);
