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

// overlay for earthqauke data shown in map
let earthquakes = new L.layerGroup();

let overlay = {
    Earthquakes: earthquakes
};

// // alternate way to create map box
let testmap = L.map("leafmap", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streetLayer]
});

// leaflet control layers to control layers on the map
L.control.layers(baseMaps, overlay).addTo(testmap);



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
            fillColor: getColor(feature.properties.mag), //fill-color range function
            color: "#000000", // black
            radius: getRadius(feature.properties.mag), 
            stroke: true,
            weight: 0.5
        };
    }

    //fill-color range function
    function getColor(magnitude) {
        if (magnitude > 5) {
          return "#ea2c2c";
        }
        if (magnitude > 4) {
          return "#ea822c";
        }
        if (magnitude > 3) {
          return "#ee9c00";
        }
        if (magnitude > 2) {
          return "#eecc00";
        }
        if (magnitude > 1) {
          return "#d4ee00";
        }
        return "#98ee00";
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
        
        // styling includes opacity, varying radii, and varying marker colors
        style: styleEQ,

        // popups for magnitude and location
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }

    }).addTo(earthquakes); //adds to overlay variable for earthquake toggling

    //adding a legend with color gradient
    var legend = L.control({
        position: 'bottomright'
    });

    legend.onAdd = function () {

        let div = L.DomUtil.create('div', 'info legend');
            const magnitudes = [0, 1, 2, 3, 4, 5];
            const colors = [
                "#98ee00",
                "#d4ee00",
                "#eecc00",
                "#ee9c00",
                "#ea822c",
                "#ea2c2c"
              ];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(testmap);

    earthquakes.addTo(testmap); //adds eq layer to map
        
});