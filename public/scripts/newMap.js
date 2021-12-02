

function initMap() {
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    currentInfoWindow = infoWindow;
    /* TODO: Step 4A3: Add a generic sidebar */
    infoPane = document.getElementById('panel');
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15
    });

    infoWindow.open(map);

    geoFunc("", document.getElementById('location').innerText);
    const rows = document.getElementById('markers').innerHTML;
    const markers = JSON.parse(rows);
    console.log(markers);

//Markers -- needs to be updated to grab markers
var infowindow =  new google.maps.InfoWindow({});
var marker, count;
for (count = 0; count < markers.length; count++) {

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(markers[count].lat, markers[count].lng),
      map: map,
      title: markers[count].name
    });
google.maps.event.addListener(marker, 'click', (function (marker, count) {
      return function () {
        infowindow.setContent(name);
        infowindow.open(map, marker);
      }
    })(marker, count));
  }
}
//Geo Function to center in on a location
function geoFunc(keyword, location) {
  geocoder =  new google.maps.Geocoder();
    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const params = Object.fromEntries(urlSearchParams.entries());
    // console.log(params);
    geocoder
      .geocode({ 'address': location })
      .then((result) => {
        const { results } = result;
        pos = results[0].geometry.location
        infoWindow.setPosition(pos);
        infoWindow.setContent('Searching near here.');
        map.setCenter(pos);

        /* TODO: Step 3B2, Call the Places Nearby Search */
        // Call Places Nearby Search on user's location
        getNearbyPlaces(pos, keyword);
      })
}

