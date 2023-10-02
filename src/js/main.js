'use strict';
//*Constantes:
const searchInput = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');
const main = document.querySelector('.js-main');
const aside = document.querySelector('.js-aside');
let favs = [];
let matches = [];
let inputValue = '';

// *Recuperar los favoritos de localStorage
let favsJSON = localStorage.getItem('favoritos');
if (favsJSON !== null) {
  favs = JSON.parse(favsJSON);
}

renderList(favs, aside);

//*Manejadora del click en search
function handleSearch(event) {
  event.preventDefault();
  inputValue = searchInput.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      matches = data;
      renderList(matches, main, 'matches');
    });
}

//*Renderizadora de serie
function renderShow(item) {
  let showId = item.show.id;
  let showName = item.show.name;

  let showPic = item.show.image
    ? item.show.image.medium
    : `https://via.placeholder.com/210x295/ffffff/666666/?text=${showName}`;
  const isFav = favs.findIndex((fav) => fav.show.id === item.show.id);
  let showClass = isFav === -1 ? '' : 'selected';
  let showItem = '';
  showItem += `<li class="js-item ${showClass}" id="${showId}"><article>
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
function renderList(array, tag, list) {
  tag.innerHTML = `<ul class="js-${list}"></ul>`;
  let showList = document.querySelector(`.js-${list}`);
  for (const item of array) {
    showList.innerHTML += renderShow(item);
  }
  addShowListeners();
}

//*Manejadora del click en show
function handleShow(event) {
  const clicked = event.currentTarget;
  const clickedId = parseInt(clicked.id);
  const clickedMatch = matches.find((item) => item.show.id === clickedId);
  const indexFav = favs.findIndex((item) => item.show.id === clickedId);
  if (indexFav === -1) {
    favs.push(clickedMatch);
    // clicked.classList.add('selected');
  } else {
    favs.splice(indexFav, 1);
    // clicked.classList.remove('selected');
  }
  let favsJSON = JSON.stringify(favs);
  localStorage.setItem('favoritos', favsJSON);
  renderList(favs, aside, 'favs');
  renderList(matches, main, 'matches');
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
