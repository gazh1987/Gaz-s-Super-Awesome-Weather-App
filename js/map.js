var map = null;
var latlng = null;

var Map = function() {

    map = L.map('map', { zoomControl:false, attributionControl:false }).fitWorld(); 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    map.locate({setView: true, maxZoom: 14});

    function onLocationFound(e) {
        L.marker(e.latlng).addTo(map);
        reverseGeocode(e.latlng);
    }

    function onLocationError(e) {
        alert(e.message);
    }

    // Function to perform reverse geocoding
    function reverseGeocode(latlng) {
        // Using Nominatim API for reverse geocoding
        var url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + latlng.lat + '&lon=' + latlng.lng;

        // Make a GET request to the Nominatim API
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Get the place name from the response
                var locationName = data.display_name;
                document.getElementById('current_location').innerText = locationName;
            })
            .catch(error => console.error('Error:', error));
    }
    
    map.on('locationerror', onLocationError);
    map.on('locationfound', onLocationFound);
}

