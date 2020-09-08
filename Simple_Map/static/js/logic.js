// all js and leaflet related code

// help confirmes whether logic file is being accessed
console.log("working");

// create a map object with a center and zoom level

// let testmap = L.map('leafmap').setview([40.7,-94.5],4);

// alternate way to create map box
let testmap = L.map("leafmap", {
    center: [
        40.7, -94.5
    ],
    zoom: 4
});

// tile layer method: street level edition
// create tile layer that will be the map background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', { //map box styles api: street level tiles

    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    
    maxZoom: 18, //from 0-18, zoomed 18x since street level view
    
    accessToken: API_KEY
});

// Then add 'graymap' tile layer to the map.
streets.addTo(testmap);
