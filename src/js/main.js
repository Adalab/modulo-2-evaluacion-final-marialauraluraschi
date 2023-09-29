'use strict';
//*Constantes:
const searchInput = document.querySelector('.js-search-input'); //input
const searchBtn = document.querySelector('.js-search-btn'); //botón buscar
const main = document.querySelector('.js-search');
let inputValue = '';

//*Manejadora
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

function renderShow(match) {
  let showName = match.show.name;
  let showPic = match.show.image.medium;
  let html = '';
  html += `<li><article>
  <img
  src=${showPic}
  alt="show´s picture"
  />
  <h3>${showName.toUpperCase()} </h3>
   </article>
 </li>`;
  return html;
}

function renderMatches(matches) {
  main.innerHTML += `<ul class="js-match-list"></ul>`;
  let matchList = document.querySelector('.js-match-list');
  for (const match of matches) {
    matchList.innerHTML += renderShow(match);
  }
}
//*Listener
searchBtn.addEventListener('click', handleSearch);
