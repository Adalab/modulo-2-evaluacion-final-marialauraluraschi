'use strict';
//*Constantes:
const searchInput = document.querySelector('.js-search-input'); //input
const searchBtn = document.querySelector('.js-search-btn'); //botón buscar
const main = document.querySelector('.js-search');
let inputValue = '';

//*Manejadora del click en search
function handleSearch(event) {
  event.preventDefault();
  inputValue = searchInput.value;
  let url = `//api.tvmaze.com/search/shows?q=${inputValue}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderMatches(data);
    });
}

//*Renderizadora de serie
function renderShow(match) {
  let showId = match.show.id;
  let showName = match.show.name;
  let showPic = match.show.image
    ? match.show.image.medium
    : `https://via.placeholder.com/210x295/ffffff/666666/?text=${showName}`;
  let matchItem = '';
  matchItem += `<li class="js-match-item" id="${showId}"><article>
  <img
  src=${showPic}
  alt="Picture of ${showName}"
  />
  <h3>${showName.toUpperCase()} </h3>
   </article>
 </li>`;
  return matchItem;
}

//*Renderizadora de lista de series
function renderMatches(matches) {
  main.innerHTML = `<ul class="js-match-list"></ul>`;
  let matchList = document.querySelector('.js-match-list');
  for (const match of matches) {
    matchList.innerHTML += renderShow(match);
  }
  addShowListeners();
}
//*Manejadora del click en show
function handleShow(event) {
  console.log(event.currentTarget);
}
//*Arega event listeners a cada show
function addShowListeners() {
  const matchItems = document.querySelectorAll('.js-match-item');
  for (const item of matchItems) {
    item.addEventListener('click', handleShow);
  }
}

//*Listener
searchBtn.addEventListener('click', handleSearch);
