// Global Varaibles
var currentMarkers = [];
var categoryCrimeCount = [];
var outcomeCrimeCount = [];

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
  .then(data => {useAPIData(data); countCategoryCrimes(data); refreshGraph();});
}

function countCategoryCrimes(data) {
  categoryCrimeCount = [
  ['anti-social-behaviour', 0],
  ['bicycle-theft', 0],
  ['burglary', 0],
  ['criminal-damage-arson', 0],
  ['drugs', 0],
  ['other-crime', 0],
  ['other-theft', 0],
  ['posession-of-weapons', 0],
  ['public-order', 0],
  ['robbery', 0],
  ['shoplifting', 0],
  ['theft-from-person', 0],
  ['vehicle-crime', 0],
  ['violent-crime', 0] ];

  for (i = 0; i < data.length; i++) {
    if (data[i].category == categoryCrimeCount[0][0]) {
      categoryCrimeCount[0][1]++;
    } else if (data[i].cateogry == categoryCrimeCount[1][0]) {
      categoryCrimeCount[1][1]++;
    } else if (data[i].category == categoryCrimeCount[2][0]) {
      categoryCrimeCount[2][1]++;
    } else if (data[i].category == categoryCrimeCount[3][0]) {
      categoryCrimeCount[3][1]++;
    } else if (data[i].category == categoryCrimeCount[4][0]) {
      categoryCrimeCount[4][1]++;
    } else if (data[i].category == categoryCrimeCount[5][0]) {
      categoryCrimeCount[5][1]++;
    } else if (data[i].cateogry == categoryCrimeCount[6][0]) {
      categoryCrimeCount[6][1]++;
    } else if (data[i].cateogry == categoryCrimeCount[7][0]) {
      categoryCrimeCount[7][1]++;
    } else if (data[i].category == categoryCrimeCount[8][0]) {
      categoryCrimeCount[8][1]++;
    } else if (data[i].category == categoryCrimeCount[9][0]) {
      categoryCrimeCount[9][1]++;
    } else if (data[i].category == categoryCrimeCount[10][0]) {
      categoryCrimeCount[10][1]++;
    } else if (data[i].category == categoryCrimeCount[11][0]) {
      categoryCrimeCount[11][1]++;
    } else if (data[i].category == categoryCrimeCount[12][0]) {
      categoryCrimeCount[12][1]++;
    } else {
      categoryCrimeCount[13][1]++;
    }
  }
}

// define a dictionary for crime category to css class name
let crimeCategories = {
  "anti-social-behaviour": "markerAnti-social",
  "bicycle-theft": "markerBicycle",
  "burglary": "markerBurglary",
  "criminal-damage-arson": "markerCriminal-damage-arson",
  "drugs": "markerDrugs",
  "other-crime": "markerOther-crime",
  "other-theft": "markerOther-theft",
  "possession-of-weapons": "markerPossession-of-weapons",
  "public-order": "markerPublic-order",
  "robbery": "markerRoberry",
  "shoplifting": "markerShoplift",
  "theft-from-the-person": "markerTheft-from-person",
  "violent-crime": "markerViolent",
  "vehicle-crime": "markerVehicle"
};

function useAPIData(data) {
  outcomeCrimeCount = [
    ["Awaiting court outcome", 0],
    ["Investigation complete; no suspect identified", 0],
    ["Under investigation", 0],
    ["Local resolution", 0],
    ["Unknown", 0]
  ];

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
      outcome = "Unknown";
    }

    if (outcome == outcomeCrimeCount[0][0]) {
      outcomeCrimeCount[0][1]++;
    } else if (outcome == outcomeCrimeCount[1][0]) {
      outcomeCrimeCount[1][1]++;
    } else if (outcome == outcomeCrimeCount[2][0]) {
      outcomeCrimeCount[2][1]++;
    } else if (outcome == outcomeCrimeCount[3][0]) {
      outcomeCrimeCount[3][1]++;
    } else if (outcome == outcomeCrimeCount[4][0]) {
      outcomeCrimeCount[4][1]++;
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
        outcome_status: "<b>Outcome Status: </b>" + outcome,
        category: category
      }
    }]
  };


    geojson.features.forEach(function(marker) {
      // create a HTML element for each feature
      var el = document.createElement('div');
      // create a variable with the appropriate class name for the crime category
      let cssClass = crimeCategories[marker.properties.category];
      // add class to element
      if (cssClass !== undefined) {
        el.classList.add(cssClass);
      } else {
        el.classList.add("marker");
      }

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
