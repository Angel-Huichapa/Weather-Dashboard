let temperatureFahrenheit; // Declare temperatureFahrenheit as a global variable

// Function to fetch and display weather data
function displayWeather(latitude, longitude) {
    const apiKey = '32466c64e9251fccf6dfd8df0d92a6af';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Store weather data locally
            localStorage.setItem('weatherData', JSON.stringify(data));

            // Set the value of temperatureFahrenheit
            temperatureFahrenheit = Math.round(data.main.temp); // Temperature should already be in Fahrenheit

            // Update the weather-info element with the fetched data
            const weatherInfoElement = document.getElementById('weather-info');
            weatherInfoElement.innerHTML = `
                <p>Temperature: ${temperatureFahrenheit}°F</p>
                <p>Condition: ${data.weather[0].description}</p>
            `;
            
            // Add the search query to recent searches
            addRecentSearch(data.name);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Function to add a search query to recent searches
function addRecentSearch(query) {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    // Add the query to the beginning of the array
    recentSearches.unshift(query);
    // Keep only the latest 5 searches
    recentSearches = recentSearches.slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    // Display recent searches
    displayRecentSearches();
}

// Function to display recent searches
function displayRecentSearches() {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    const recentSearchesElement = document.getElementById('recent-searches');
    recentSearchesElement.innerHTML = '<h3>Recent Searches</h3>';
    recentSearches.forEach(query => {
        const searchItem = document.createElement('p');
        searchItem.textContent = query;
        searchItem.classList.add('recent-search-item');
        recentSearchesElement.appendChild(searchItem);

        // Add event listener to each recent search item
        searchItem.addEventListener('click', function() {
            // Call handleSearch function with the clicked city name
            handleSearch(query);
        });
    });
}

// Function to handle the search button click or recent search click for 5-day forecast
function handleSearch(cityInput) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=32466c64e9251fccf6dfd8df0d92a6af`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract latitude and longitude from the API response
            const latitude = data.city.coord.lat;
            const longitude = data.city.coord.lon;
            
            // Display weather based on latitude and longitude
            displayWeather(latitude, longitude);

            // Display 5-day forecast
            displayForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayForecast(forecastData) {
    // Clear previous forecast data
    const forecastInfoElement = document.getElementById('forecast-info');
    forecastInfoElement.innerHTML = '';

    // Loop through the forecast data and display one forecast card per date
    forecastData.forEach(forecast => {
        // Extract relevant forecast information
        const date = new Date(forecast.dt * 1000); // Convert timestamp to date object
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });

        // Convert temperature from Celsius to Fahrenheit and round to two decimal places
        const temperatureCelsius = forecast.main.temp;
        const temperatureFahrenheit = Math.round((temperatureCelsius * 9/5) + 32); // Convert to Fahrenheit

        const condition = forecast.weather[0].description;

        // Create forecast card
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = `
            <p>Date: ${day}</p>
            <p>Temperature: ${temperatureFahrenheit}°F</p> <!-- Display temperature in Fahrenheit -->
            <p>Condition: ${condition}</p>
        `;

        // Append forecast card to forecast info element
        forecastInfoElement.appendChild(forecastCard);
    });
}

// Add event listener to the search button
document.getElementById('search-btn').addEventListener('click', function() {
    const cityInput = document.getElementById('city-input').value;
    handleSearch(cityInput);
});

// Call displayRecentSearches function when the page loads
window.onload = function() {
    displayRecentSearches();
};