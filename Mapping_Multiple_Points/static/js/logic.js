// all js and leaflet related code

// help confirmes whether logic file is being accessed
console.log("working");

// create a map object with a center and zoom level

// let testmap = L.map('leafmap').setview([40.7,-94.5],4);

// alternate way to create map box: zoom in LA
let testmap = L.map("leafmap", {
    center: [
        40.997, -102.048
    ],
    zoom: 4
});

// An array containing each city's location, state, and population.
let cityData = cities;

// cities.forEach(lats => console.log(lats));

// mapping multiple points from an iterater array
// cityData.forEach(function(city){
//     console.log(city);
//     L.marker(city.location)
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(testmap);

// });


// multiple points with radius marker proportional to population 
// cityData.forEach(function(city){
//     console.log(city);
//     L.circleMarker(city.location, {
//         radius:(city.population/100000)
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(testmap);

// });

// multiple points with radius marker proportional to population: dark edition (skilldrill)
cityData.forEach(function(city){
    console.log(city);
    L.circleMarker(city.location, {
        color:"yellow",
        fillcolor:"yellow",
        radius:(city.population/200000)
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(testmap);

});








// tile layer method: street level edition
// create tile layer that will be the map background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', { //map box styles api: street level tiles

    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    
    maxZoom: 18, //from 0-18, zoomed 18x since street level view
    
    accessToken: API_KEY
});

// Then add 'graymap' tile layer to the map.
streets.addTo(testmap);















// // single points mapping: los angeles
// // var marker = L.marker([34.0522, -118.2437]).addTo(testmap);


// // circle: LA
// // var laCircle = L.circle(
// //     [34.0522, -118.2437],
// //     {radius: 100}).addTo(testmap);

// // skill circle: LA
// // create a light-yellow circle with black lines indicating a 300-meter radius of
// // Central Los Angeles on a dark map
// var darkLACircle = L.circleMarker(
//     [34.0522, -118.2437], {
//         color: 'black',
//         fillColor: '#fee8c8', //light-yellow hex
//         radius:300
//     }
// ).addTo(testmap);