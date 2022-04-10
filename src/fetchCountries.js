// Napisz funkcję fetchCountries(name) która tworzy żądanie HTTP na nazwa źródła i przekazuje obietnicę z tablicą krajów - wynikiem żądania. Przenieś ją do oddzielnego pliku fetchCountries.js i utwórz eksport nazwany.


const fetchCountries = name => {
  // console.log("fetchCountries, przekazane name:", name);
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`,
  )
    .then(response => {
      console.log('fetchCountries response', response);
      if (!response.ok) {
        throw new Error('fetchCountries response error', response.status);
      }
      return response.json();
    })
    // .then(data => console.log('tu sa potrzebne dane: ', data))
    // .then(data => renderCountryList(data))
    // .catch(error => console.log('Error 404?: ', error));
}

export { fetchCountries };