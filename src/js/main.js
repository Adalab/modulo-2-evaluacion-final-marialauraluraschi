'use strict';
//*Constantes:
const searchInput = document.querySelector('.js-search-input'); //input
const searchBtn = document.querySelector('.js-search-btn'); //botón buscar
const main = document.querySelector('.js-main');
const aside = document.querySelector('.js-aside');
let favs = [];
let matches = [];
let inputValue = '';
renderList(favs, aside);
//*Manejadora del click en search
function handleSearch(event) {
  event.preventDefault();
  inputValue = searchInput.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      matches = data;
      renderList(matches, main);
    });
}

//*Renderizadora de serie
function renderShow(item) {
  let showId = item.show.id;
  let showName = item.show.name;
  let showPic = item.show.image
    ? item.show.image.medium
    : `https://via.placeholder.com/210x295/ffffff/666666/?text=${showName}`;
  let showItem = '';
  showItem += `<li class="js-item" id="${showId}"><article>
  <img
  src=${showPic}
  alt="Picture of ${showName}"
  />
  <h3>${showName.toUpperCase()} </h3>
   </article>
 </li>`;
  return showItem;
}

//*Renderizadora de lista de series
function renderList(list, tag) {
  tag.innerHTML = `<ul class="js-list"></ul>`;
  let showList = document.querySelector('.js-list');
  for (const item of list) {
    showList.innerHTML += renderShow(item);
  }
  addShowListeners();
}
//*Manejadora del click en show
function handleShow(event) {
  const clicked = event.currentTarget;
  const clickedId = parseInt(clicked.id);
  const clickedMatch = matches.find((item) => item.show.id === clickedId);
  const indexFav = favs.indexOf(clicked);
  if (indexFav === -1) {
    favs.push(clickedMatch);
  } else {
    favs.splice(indexFav, 1);
  }
  console.log(favs);
  renderList(favs, aside);
}

//*Arega event listeners a cada show
function addShowListeners() {
  const items = document.querySelectorAll('.js-item');
  for (const item of items) {
    item.addEventListener('click', handleShow);
  }
}

//*Listener
searchBtn.addEventListener('click', handleSearch);
