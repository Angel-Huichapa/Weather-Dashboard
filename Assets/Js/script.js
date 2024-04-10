// Define the function to fetch and display weather data
function displayWeather(latitude, longitude) {
    // Construct the API URL with provided latitude, longitude, and API key
    const apiKey = '714ce02d37192582c0ce631735181589';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update the weather-info element with the fetched data
            const weatherInfoElement = document.getElementById('weather-info');
            weatherInfoElement.innerHTML = `
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Condition: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Function to handle the search button click
function handleSearch() {
    const cityInput = document.getElementById('city-input').value;
    // Assuming you have a geocoding API to get latitude and longitude for the city
    // You need to replace 'YOUR_GEOCODING_API_KEY' and construct the URL accordingly
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