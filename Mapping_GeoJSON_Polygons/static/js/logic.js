// all js and leaflet related code

// help confirmes whether logic file is being accessed
console.log("working");

// light and dark titlelayers
let satelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', { //map box styles api: street level tiles

    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    
    maxZoom: 18, //from 0-18, zoomed 18x since street level view
    
    accessToken: API_KEY
});


let streetLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', { //map box styles api: street level tiles

    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',

    maxZoom: 18, //from 0-18, zoomed 18x since street level view

    accessToken: API_KEY

});

// holds both layers as baseMaps
let baseMaps = {
    "<span style='color: black'>Streets Mode</span>": streetLayer,
    "<span style='color: green'>Satellite Mode</span>": satelliteLayer
};

// // alternate way to create map box
let testmap = L.map("leafmap", {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streetLayer]
});

// leaflet control layers to control layers on the map
L.control.layers(baseMaps).addTo(testmap);

//torronts neighborhood mapping

//access raw json
let torrontoMapping = "https://raw.githubusercontent.com/SiMewL8/Mapping_Earthquakes_JS/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

d3.json(torrontoMapping).then(function(data) {
    console.log(data);
    L.geoJSON(data, {
        color: "blue",
        weight: 1,
        fillColor: "yellow",
        onEachFeature: (function(feature,layer) {
            layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>")
            })
        }).addTo(testmap);
    }
);

        




















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





// An array containing each city's location, state, and population.
// let cityData = cities;

// cities.forEach(lats => console.log(lats));

// mapping multiple points from an iterater array
// cityData.forEach(function(city){
//     console.log(city);
//     L.marker(city.location)
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(testmap);

// });add commit push/ branch delete to map geojson map





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
// cityData.forEach(function(city){
//     console.log(city);
//     L.circleMarker(city.location, {
//         color:"yellow",
//         fillcolor:"yellow",
//         radius:(city.population/200000)
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(testmap);

// });





//coordinates for each point for multiple lines in an array
// let line1 = [
//     [33.9416, -118.4085], //sfo
//     [37.6213, -122.3790], //lax
//     [40.7899, -111.9791], //slc
//     [47.4502, -122.3088] //sea
// ];

// //polyline() to make a red line from LAX to SFO
// L.polyline(
//     line1, {
//         color:"yellow"
//     }
// ).addTo(testmap);

// //skill drill sfo 2 jfk with some stops
// let line2 = [
//     [37.6213, -122.3790],//sfo
//     [38.6906, -121.5878],//sac
//     [30.1899, -97.6686],//aus
//     [43.6766, -79.6305],//yyz
//     [40.6397, -73.7788],//jfk
// ];

// L.polyline(
//     line2, {
//         color: "blue",
//         weight: 4,
//         opacity: 0.5,
//         dashArray: "20,20"
//     }   
// ).addTo(testmap);





// Add GeoJSON data: SFO
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};


// // add popups for features using onEachFeature() function
// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h3> Airport Code: " + feature.properties.faa + "</h3> <hr> <h3> Airport Name: " + feature.properties.name + "</h3>");
//     }




// }).addTo(testmap);


// // geojson data acquired
// // add marker using pointToLayer() function and add data to popup marker
// L.geoJSON(sanFranAirport, {
//     //turning each feature into a marker on map
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " +feature.properties.country)
//     }
// }).addTo(testmap);




//d3 json read with a .then promise
//creating multiple popups with a function and d3 json read
// d3.json(airportData).then(function(collect){
    
//     console.log(collect);

//     //leaflet geojson() layer
//     L.geoJson(collect, {
//         pointToLayer: function(feature, props) { //pointToLayer() features and properties
//                     console.log(feature);
//                     return L.marker(props)
//                     .bindPopup("<h3> Airport Code: " + feature.properties.faa + "</h3> <hr> <h3> Airport Name: " + feature.properties.name)
//                 }
//             }).addTo(testmap)

// });




// let airportData = "https://raw.githubusercontent.com/SiMewL8/Mapping_Earthquakes_JS/Mapping_GeoJSON_Points/majorAirports.json";


// var airportPopups = d3.json(airportData).then(function(collect) {
//     console.log(collect);
//     L.geoJson(collect, {
//                 pointToLayer: function(feature, props) { //pointToLayer() features and properties
//                             console.log(feature);
//                             return L.marker(props)
//                             .bindPopup("<h3> Airport Code: " + feature.properties.faa + "</h3> <hr> <h3> Airport Name: " + feature.properties.name)
//                         }
//                     }).addTo(testmap)
//     }
// );

// // tile layer method: toggled layered maps (street, dark) 
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', { //map box styles api: street level tiles

//     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    
//     maxZoom: 18, //from 0-18, zoomed 18x since street level view
    
//     accessToken: API_KEY
// });


// let darkMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', { //map box styles api: street level tiles

//     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',

//     maxZoom: 18, //from 0-18, zoomed 18x since street level view

//     accessToken: API_KEY

// });

// // holds both layers as baseMaps
// let baseMaps = {
//     "<span style='color: green'>Street</span>": streets,
//     "<span style='color: gray'>Dark Mode</span>": darkMap
// };

// // alternate way to create map box: zoom in LAX
// let testmap = L.map("leafmap", {
//     center: [30, 30],
//     zoom: 2,
//     layers: [streets]
// });

// // leaflet control layers to control layers on the map
// L.control.layers(baseMaps).addTo(testmap);




// airline routes in yellow with weight of 2
// Each airline route has popup marker that shows airline code and destination
// accessing airport geojson url
// var torrontoFlights = "https://raw.githubusercontent.com/SiMewL8/Mapping_Earthquakes_JS/Mapping_GeoJSON_Linestrings/torontoRoutes.json";


// //grabbing GeoJSON data
// d3.json(torrontoFlights).then(function(collect) {
//         console.log(collect);
//         L.geoJSON(collect, {
//             color: "yellow",
//             weight: 2,
//             onEachFeature: (function(feature, layer) {
//                 layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr> <h3> Destination: " +feature.properties.dst + "</h3>");
//             })})
//             .addTo(testmap);
//         });





