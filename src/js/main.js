'use strict';
//*Constantes:
const searchInput = document.querySelector('.js-search-input'); //input
const searchBtn = document.querySelector('.js-search-btn'); //botón buscar
let inputValue = '';

//*Manejadora
function handleSearch(event) {
  event.preventDefault();
  inputValue = searchInput.value;
  let url = `//api.tvmaze.com/search/shows?q=${inputValue}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let showId= data[i].show.id;
        console.log(showId);
        let showName= data[i].show.name;
        console.log(showName);
        let showPic= data[i].show.image.medium;
        console.log(showPic);
      }
    });
}

//*Listener
searchBtn.addEventListener('click', handleSearch);
