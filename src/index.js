import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener('input', () => {
    fetchCountries()
        .then((countries) => renderCountryList(countries))
        .catch((error) => console.log(error));
})

const fetchCountries = () => {
    const name = inputCountry.value;
    return fetch(`https://restcountries.com/v3.1/name/${name}?`).then(
      response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
}

const renderCountryList = (countries) => {
    const howMuch = countries.length;

    if (howMuch > 4) {
        console.log(`Too many options! Tell me something more! Actual results: ${howMuch}`);
    } else if (howMuch <= 4 && howMuch > 1) {
        const markup = countries.map(country => {
            return `<li>${country.name.common}</li>`
        })
            .join('');
        countryList.innerHTML = markup;
        
    }
    else {
        const markup = countries
         .map(country => {
           return `<li>
        <p>Country: ${country.name.common}</p>
        <p>Official: ${country.name.official}</p>`;
         })
         .join('');
       countryList.innerHTML = markup; 
    }
}
