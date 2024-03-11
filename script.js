let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");

searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data[0]);

        if (data.length === 0) {
            console.log("No country found");
            return;
        }

        let countryData = data[0];

        console.log(countryData.capital);
        console.log(countryData.flags.svg);
        console.log(countryData.name.common);
        console.log(countryData.continents[0]);

        let currencies = Object.values(countryData.currencies).map(currency => `${currency.name} (${currency.code})`);
        console.log(currencies.join(", "));

        let languages = Object.values(countryData.languages).join(", ");
        console.log(languages);

        result.innerHTML = `
            <img src="${countryData.flags.svg}" class="flag-img">
            <h2>${countryData.name.common}</h2>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Capital:</h4>
                    <span>${countryData.capital}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Continent</h4>
                    <span>${countryData.continents[0]}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Population</h4>
                    <span>${countryData.population}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Currencies</h4>
                    <span>${currencies.join(", ")}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Languages</h4>
                    <span>${languages}</span>
                </div>
            </div>
        `;
    })
    .catch(error => console.log('Error:', error));
});
