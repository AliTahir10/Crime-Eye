// Check latest crime data date
fetch('https://data.police.uk/api/crime-last-updated')
  // parses JSON response into a JS object literal
  .then(response => response.json())
  // coordinates belong to Guildford area
  .then(data => fetchLocationAPI(getLocationAPI('51.235', '-0.565', data.date)));

// Takes the longitude and latitude of area, and the date of data for API
// Date takes the format of YYYY-MM e.g. 2021-01
function getLocationAPI(lat, lng, date) {
  var formatDate = date.toString().split('-');
  var locationAPIurl = "https://data.police.uk/api/crimes-street/all-crime?lat="+lat+"&lng="+lng+"&date="+formatDate[0]+"-"+formatDate[1];
  return locationAPIurl;
}

function fetchLocationAPI(apiURL) {
  fetch(apiURL)
  .then(response => response.json())
  .then(data => useAPIData(data));
}

var currentMarkers = [];

function useAPIData(data) {
  for (i = 0; i < data.length; i++) {

    var lng = data[i].location.longitude;
    var lat = data[i].location.latitude;
    var id = data[i].id;
    var category = data[i].category;
    var street = data[i].location.street.name;
    var date = data[i].month;
    console.log(date);
    var outcome;

    if (data[i].outcome_status != null) {
      outcome = data[i].outcome_status.category;
    } else {
      outcome = "unknown";
    }

    var geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        // In the order of: longitude, latitude
        coordinates: [lng, lat]
      },
      properties: {
        id: "Crime id: " + id,
        date: "<b>Date:</b> " + date,
        crime_category: "<b>Type of crime:</b> " + category,
        street: "<b>Location: </b>" + street,
        coordinates: "<b>Coordinates: </b>" + lng + ", " + lat,
        outcome_status: "<b>Outcome Status: </b>" + outcome
      }
    }]
  };


    geojson.features.forEach(function(marker) {
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      var marker = new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + marker.properties.id + '</h3><p>' + marker.properties.date + '</p><p>' + marker.properties.crime_category + '</p><p>' + marker.properties.street + '</p><p>' + marker.properties.coordinates + '</p><p>' + marker.properties.outcome_status + '</p>'))
      .addTo(map);

      currentMarkers.push(marker);

    });
  }
}

function removeAllCurrentMarkers() {
  for (i in currentMarkers) {
    currentMarkers[i].remove();
  }
}
