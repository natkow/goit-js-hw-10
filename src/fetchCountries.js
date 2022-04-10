const fetchCountries = name => {
  
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
    
}

export { fetchCountries };