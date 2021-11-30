let pos;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;
let GeocoderResult;
let geocoder;

function initMap() {
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    currentInfoWindow = infoWindow;
    //Sidebar Creation
    infoPane = document.getElementById('panel');
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15
    });

    infoWindow.open(map);

    geoFunc("", "tokyo");
}

function geoFunc(keyword, location) {
  geocoder =  new google.maps.Geocoder();
    geocoder
      .geocode({ 'address': location })
      .then((result) => {
        const { results } = result;
        pos = results[0].geometry.location
        infoWindow.setPosition(pos);
        infoWindow.setContent('Searching near here.');
        map.setCenter(pos);

        // Call Places Nearby Search on user's location
        getNearbyPlaces(pos, keyword);
      })
}
