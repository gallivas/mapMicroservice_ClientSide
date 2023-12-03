var geocoder;
var map;

function codeAddress() {
  // Get the selected country from the dropdown
  var countrySelect = document.getElementById('country');
  var selectedCountry = countrySelect.value;
  // Redirect to the displayCountry.html page with the selected country as a parameter
  window.location.href = `displayCountry.html?country=${selectedCountry}`;
}
// This is called when the page loads - it makes a call to the microservice for lat/lng coordinates
async function apiCaller(selectedCountry) {
  try {
      const response = await fetch(`http://localhost:3500/mapMicroservice?country=${encodeURIComponent(selectedCountry)}`);
      const awaitedResponse = await response.json();
      console.log(awaitedResponse);
      populateMap(selectedCountry, awaitedResponse);

    } catch (error) {
        console.error('Error fetching map:', error);
    }
}

// Creates the map from the coordinates and displays it on the webpage
async function populateMap(selectedCountry, coordinates) {
  const { Map } = await google.maps.importLibrary("maps");
  const { Geocoder } = await google.maps.importLibrary("geocoding");
  geocoder = new Geocoder();
  geocoder.geocode( { address : selectedCountry}, function(results, status) {
    if (status == 'OK') {
      const latitude = coordinates['lat'];
      const longitude = coordinates['lng'];
      map = new Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 5,
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  })
}
