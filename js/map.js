var map = null;

var Map = function() {
    map = L.map('map', { zoomControl:false, attributionControl:false }).fitWorld(); 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    map.locate({setView: true, maxZoom: 14});

    function onLocationFound(e) {
        L.marker(e.latlng).addTo(map);

        var lat = e.latlng.lat;
        var lon = e.latlng.lng;

        // Make a GET request to the OpenWeatherMap API
        // apiKey comes from config.js file
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${owmApiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                var locationName = `Location: ${data.name}`;
                document.getElementById('current_location').innerText = locationName;
                var weatherInfo = `Weather: ${data.weather[0].description}`;
                document.getElementById('weather_desc').innerText = weatherInfo;
                var temp = Math.floor(data.main.temp - 273.15);
                temp = `Temperature: ${temp}`;
                temp = temp + "c";
                document.getElementById('temperature').innerText = temp;
                var windSpeed = data.wind.speed;
                windSpeed = Math.floor(windSpeed * 3.6);
                windSpeed = `Wind Speed: ${windSpeed}`;
                windSpeed = windSpeed + "km/h"
                document.getElementById('wind_speed').innerText = windSpeed;
                var humidity = `Humidity: ${data.main.humidity}`;
                humidity = humidity + "%";
                document.getElementById('humidity').innerText = humidity;
            })
            .catch(error => {
                console.error('Error fetching data from OpenWeatherMap API:', error);
        });
    }

    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationerror', onLocationError);
    map.on('locationfound', onLocationFound);
}

