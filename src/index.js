'use strict';

import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;


const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('ul.country-list');
const countryInfo = document.querySelector('div.country-info');

// _.debounce(func, [(wait = 0)], [(options = {})]);
// function debounce(func, wait, options)

const findCountry = () => {
  let name = searchBox.value.trim();
  
  if (name === "") {
    Notiflix.Notify.info('Please type in a country name');  
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  } else {
    fetchCountries(name)
      // .then(data => console.log('albo tu sa potrzebne dane:', data)) // nie moze byc 2 thenow  z data? albo ten albo render, bo ten nic nie zwraca?
      // .then(data => renderList(data))
      // .then(data => renderInfo(data))
      .then(data => {
        console.log('albo tu sa potrzebne dane:', data);
        console.log('ilosc', data.length);
        if (data.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
        } else if (data.length >= 2 && data.length <= 10) {
          renderList(data);
          countryInfo.innerHTML = '';
        } else if ((data.length = 1)) {
          renderInfo(data);
          countryList.innerHTML = '';
        }
        // else 
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      })
    }
    // .catch(error => console.log('error fetchCountries:', error));
  };
  
  const renderList = (data) => {
    const markup = data
    .map(d => {
      return `<li class="list__item">
      <img class="list__flag" src="${d.flag}" alt="Flag of ${d.name}" width="55" >
      <p class="list__name">${d.name}</p>
      </li>`;
    })
    .join('');
    countryList.innerHTML = markup;
  }
  
  const renderInfo = data => {
    const markup = data
    .map(d => {
      return `<img class="info__flag" src="${d.flag}" alt="Flag of ${d.name}" width="55" >
      <span class="info__name">${d.name}</span>
      <p class="info__data"><b>Capital</b>: ${d.capital}</p>
      <p class="info__data"><b>Population</b>: ${d.population}</p>
      <p class="info__data"><b>Languages</b>: ${d.languages.map(language => " " + language.name)}</p>`;
    })
    .join('');
    countryInfo.innerHTML = markup;
  };
  
  searchBox.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));
  

  ////////////////////////////////////////////////////
  // sprawdzenie na dzien dobry czy cos dziala
  // fetchCountries("asia");
  // console.log("cos");
  ////////////////////////////////////////////////////
  // sprawdzajace logi z findCountry
  // console.log('findCountry - name:', name);
  // console.log(
    //     'findCountry - tu sie drukuje promise(pending) - fetchCountries(name):',
  //     fetchCountries(name),
  //   );
  ////////////////////////////////////////////////////
  // logi z fetch countries - nie wszystkie dzialaja
  // .then(data => console.log(data))
  // console.log('same name?', data[0].name))
  // .then(data => console.log('same name?', data[0].name))
// .then(data => data.forEach(d => console.log(d.name)))
// .then(data => console.log(data[0]))
////////////////////////////////////////////////////
// druga wersja z renderList
// return `<li class="list__item"><img class="list__flag" src="${d.flag}" alt="Flag of ${d.name}" width="55" height="35"></li>
//   <li class="list__item"><p class="list__name">${d.name}</p></li>`;
// console.log(markup);