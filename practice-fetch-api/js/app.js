const countriesDiv = document.querySelector('.countries');
//1. Create an async function called getCountries
//  - retrieve the name, capital, population and flags for all countries.
//  - Convert the response to JSON.
//  - pass the data to the displayCountries function.
//  - Catch any errors and log them to the console.
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const getCountries = () => {
    const countriesData = fetchData('https://restcountries.com/v3.1/all');
    return countriesData;
}

//2. Create a displayCountries function that takes in an array of countries.
//  - Loop over the array of countries.
//      - Create a div for each country.
//      - Add the country name and flag to the div with the provided HTML structure.
//      - Add the created div to the `.countries` container element.
const displayCountries = (countries) => {
    countries.forEach((country) => {
        if (country.capital) {
            let html = `
            <div class="country">
                <h3 class="country-name">${country.name.common}</h3>
                <img class="country-flag" src="${country.flags.png}"/>
                <div class="content">
                    <h3>Capital</h3>
                    <p>${country.capital[0]}</p>
                    <h3>Population</h3>
                    <p>${country.population}</p>
                    <h3>Region</h3>
                    <p>${country.region}</p>
                </div>
            </div>
        `;
            countriesDiv.innerHTML += html;
        }
    })
}

//3. Call the getCountries function.
getCountries()
    .then(displayCountries)
    .catch(e => {
        countriesDiv.innerHTML = '<h3>Something went wrong!</h3>';
    });
