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
   <h3>${showName.toUpperCase()} </h3>
     <img
       src=${showPic}
       alt="show´s picture"
     />
   </article>
 </li>`;
  return html;
}

function renderMatches(matches) {
  for (const match of matches) {
    main.innerHTML += renderShow(match);
  }
}
//*Listener
searchBtn.addEventListener('click', handleSearch);
