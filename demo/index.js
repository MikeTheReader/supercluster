'use strict';

/*global L */

var map = L.map('map').setView([37, -120], 6);

map.on('zoomend', function() {
    console.log(map.getCenter(), map.getZoom())
})

L.tileLayer('//{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 20,
        minZoom: 0
    }).addTo(map)

var polygons = L.geoJson(null, {
    pointToLayer: createClusterPolygon
}).addTo(map);


var markers = L.geoJson(null, {
    pointToLayer: createClusterIcon
}).addTo(map);

var worker = new Worker('worker.js');
var ready = false;

worker.onmessage = function (e) {
    if (e.data.ready) {
        ready = true;
        update();
    } else {
        markers.clearLayers();
        markers.addData(e.data);
        polygons.clearLayers();
        polygons.addData(e.data);
    }
};

function update() {
    if (!ready) return;
    var bounds = map.getBounds();
    worker.postMessage({
        bbox: [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
        zoom: map.getZoom()
    });
}

map.on('moveend', update);

function createClusterIcon(feature, latlng) {
    if (!feature.properties.cluster) return L.marker(latlng);

    var count = feature.properties.point_count;
    var size = 'small';
    var icon = L.divIcon({
        html: '<div><span>' + feature.properties.point_count_abbreviated + '</span></div>',
        className: 'marker-cluster marker-cluster-' + size,
        iconSize: L.point(40, 40)
    });
    return L.marker(latlng, {icon: icon});
}

function createClusterPolygon(feature, latlng) {
    if (!feature.properties.cluster) return L.marker(latlng);

    var convertedExtent = [];
    // Polygons want the points in opposite order for some reason
    feature.extent.forEach(function(oldPoint) {
        convertedExtent.push([oldPoint[1], oldPoint[0]])
    });

    var newFeature = L.polygon(convertedExtent);
    newFeature.setStyle({fillOpacity: .7, borderOpacity: 1})
    return newFeature;
}
