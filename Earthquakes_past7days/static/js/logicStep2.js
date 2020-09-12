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
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streetLayer]
});

// leaflet control layers to control layers on the map
L.control.layers(baseMaps).addTo(testmap);



// earthquake from the past 7 days

//access raw json
let eqmap = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//eq mapped with d3 json
d3.json(eqmap).then(function(data) {

    //add styling array for marker (circled) earthquakes with varying radii
    function styleEQ(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: "#ffae42", // light orange
            color: "#000000", // black
            radius: getRadius(feature.properties.mag), 
            stroke: true,
            weight: 0.5
        };
    }
    // function for varying radii of different magnitudes of eq
    function getRadius(mags) {
        if (mags === 0) {
            return 1;
        }
        return mags * 4;
    } 


    // add json data onto map with cicrleMarker
    L.geoJSON(data, {

        //each feature (earthquake) into a same size circlemarker on the map 
        pointToLayer: function (feature, latlng) {

            console.log(data);

            return L.circleMarker(latlng);
            
        },

        style: styleEQ

    }).addTo(testmap);

});