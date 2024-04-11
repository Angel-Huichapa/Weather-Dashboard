// Function to fetch and display weather data
function displayWeather(latitude, longitude) {
    const apiKey = '32466c64e9251fccf6dfd8df0d92a6af';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Store weather data locally
            localStorage.setItem('weatherData', JSON.stringify(data));

            // Update the weather-info element with the fetched data
            const weatherInfoElement = document.getElementById('weather-info');
            weatherInfoElement.innerHTML = `
                <p>Temperature: ${data.main.temp}°C</p>
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
        recentSearchesElement.innerHTML += `<p>${query}</p>`;
    });
}

// Function to handle the search button click
function handleSearch() {
    const cityInput = document.getElementById('city-input').value;
    const geocodingApiUrl = `https://api.example.com/geocoding?q=${cityInput}&apiKey=YOUR_GEOCODING_API_KEY`;

    // Fetch latitude and longitude for the city
    fetch(geocodingApiUrl)
        .then(response => response.json())
        .then(data => {
            const latitude = data.latitude;
            const longitude = data.longitude;
            // Display weather based on latitude and longitude
            displayWeather(latitude, longitude);
        })
        .catch(error => {
            console.error('Error fetching city coordinates:', error);
        });
}

// Add event listener to the search button
document.getElementById('search-btn').addEventListener('click', handleSearch);

// Call displayRecentSearches function when the page loads
window.onload = function() {
    displayRecentSearches();
};