// Define the function to fetch and display weather data
function displayWeather() {
    // Fetch weather data from an example API (you may replace this URL with an actual weather API)
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={714ce02d37192582c0ce631735181589}')
        .then(response => response.json())
        .then(data => {
            // Update the weather-info element with the fetched data
            const weatherInfoElement = document.getElementById('weather-info');
            weatherInfoElement.innerHTML = `
                <p>Temperature: ${data.temperature}°C</p>
                <p>Condition: ${data.condition}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Call the displayWeather function when the page loads
window.onload = function() {
    displayWeather();
};
