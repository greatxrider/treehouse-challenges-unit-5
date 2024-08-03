let countries = [];
const modalContent = document.querySelector('.modal-content');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.modal-close');
const container = document.querySelector('.countries');

/**
 * Fetches data from a given URL.
 * 
 * This function makes an HTTP GET request to the specified URL, processes the response as JSON, and returns the data. 
 * If the request fails or the response is not successful, an error is thrown.
 * 
 * @async
 * @function fetchData
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} A promise that resolves to the data retrieved from the URL.
 * @throws {Error} Throws an error if the fetch request fails or the response is not ok.
 */
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Something went wrong.');
    const data = await response.json();
    countries = data;
    return data;
  } catch (error) {
    throw error;
  }
};

const getCountries = () => {
  const countriesData = fetchData('https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region');
  return countriesData;
}

/**
 * Displays a list of countries on the web page.
 * 
 * This function takes an array of country objects and generates HTML for each country. 
 * The generated HTML is then inserted into the container element.
 * 
 * @param {Object[]} countries - An array of country objects.
 * @param {string} countries[].name.common - The common name of the country.
 * @param {Object} countries[].flags - The flag information of the country.
 * @param {string} countries[].flags.svg - The URL of the country's flag image in SVG format.
 * @returns {void}
 */
const displayCountries = (countries) => {
  const countriesHtml = countries
    .map((country) =>
      `<div class="country" data-name="${country.name.common}">
              <h3 class="country-name">${country.name.common}</h3>
              <img class="country-flag" src="${country.flags.svg}" />
          </div>`).join('');
  container.insertAdjacentHTML('beforeend', countriesHtml);
}

getCountries()
  .then(displayCountries)
  .catch(e => {
    container.innerHTML = '<h3>Something went wrong!</h3>';
  });

/**
 * Handles click events on the container to display modal information about a country.
 * 
 * This function listens for click events on the container element, identifies the clicked country,
 * retrieves its details, and displays them in a modal. It also adds event listeners for closing
 * the modal when the close button is clicked, when clicking outside the modal, or when pressing the
 * 'Escape' key.
 * 
 * @param {Event} e - The click event object.
 * @returns {void}
 */
container.addEventListener('click', (e) => {
  const countryElement = e.target.closest('.country');
  const countryName = countryElement.firstElementChild.textContent;
  const findCountry = countries.find((country) => country.name.common === countryName);

  const countryHtml =
    `<h2>${findCountry.name.common}</h2>
      <div class="flag">
        <img src="${findCountry.flags.svg}" alt="" />
      </div>
      <div class="content">
        <h3>Population:</h3>
        <p>${findCountry.population}</p>
        <h3>Region:</h3>
        <p>${findCountry.region}</p>
        <h3>Capital:</h3>
        <p>${findCountry.capital}</p>
      </div>`;
  modalContent.innerHTML = countryHtml;
  overlay.classList.add('open');

  // Close the modal when the close button is clicked
  closeButton.addEventListener('click', () => {
    overlay.classList.remove('open');
  });

  // Close the modal when clicking outside of the modal content
  overlay.addEventListener('click', () => {
    overlay.classList.remove('open');
  })

  // Close the modal when the 'Escape' key is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlay.classList.remove('open');
    }
  });
});
