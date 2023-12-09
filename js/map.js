var map = null;

var Map = function() {

    map = L.map('map', { zoomControl:false, attributionControl:false }).fitWorld(); 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    map.locate({setView: true, maxZoom: 14});

    function onLocationFound(e) {
        var radius = e.accuracy;
    
        L.marker(e.latlng).addTo(map);
        //L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
        alert(e.message);
    }
    
    map.on('locationerror', onLocationError);
    map.on('locationfound', onLocationFound);

}