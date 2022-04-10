'use strict';

import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;


const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('ul.country-list');
const countryInfo = document.querySelector('div.country-info');

const findCountry = () => {
  let name = searchBox.value.trim();
  
  if (name === "") {
    Notiflix.Notify.info('Please type in a country name');  
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  } else {
    fetchCountries(name)
      
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
  

  