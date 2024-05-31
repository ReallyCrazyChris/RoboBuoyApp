<template>
  <div id="map" ref="mapRef" style="height: 800px; width: 800px"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import { composeCssTransform } from "ol/transform.js";
import { Map, View, Feature, Overlay } from "ol";
import { Layer, Tile, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { default as TransformInteraction } from "ol-ext/interaction/Transform";
import { transform } from "ol/proj";
import { Polygon } from "ol/geom";

const mapRef = ref();
const overlayRef = ref();

// create a tile layer with the OSM source
var osmlayer = new Tile({
  source: new OSM(),
});

// create a vector layer representing the course boundary
var courseBoundaryVectorLayer = new VectorLayer({
  name: "courseBoundary",
  source: new VectorSource({ wrapX: false }),
});

// create the feature
var courseBoundaryFeature = new Feature({
  geometry: new Polygon([
    [
      [-1.8048000692198798, 52.43389955737061],
      [-1.8048000692198798, 52.43172952008345],
      [-1.8027348315610539, 52.43172952008345],
      [-1.8027348315610539, 52.43389955737061],
      [-1.8048000692198798, 52.43389955737061],
    ],
  ]),
});

// transform polyline positions to openalyer coordinates
courseBoundaryFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
courseBoundaryVectorLayer.getSource().addFeatures([courseBoundaryFeature]);

var transformInteraction = new TransformInteraction({
  enableRotatedTransform: false, //Enable transform when map is rotated
  hitTolerance: 2, // Tolerance to select feature in pixel
  translateFeature: false,
  scale: true,
  rotate: true,
  keepAspectRatio: false,
  keepRectangle: true,
  translate: true,
  stretch: true,
  selection: true,
  noFlip: true,
  // Get scale on points
  pointRadius: function (f) {
    var radius = f.get("radius") || 10;
    return [radius, radius];
  },
});

const handleCollection = transformInteraction.handles_;

// When the feature is selected, set the center of transformation to top right
transformInteraction.selection_.on("add", (collectionEvent) => {
  //console.log("rotateHandleFeature", transformInteraction);
  //const rotateHandleFeature = handleArray[handleArray.length - 1];
  //rotateHandleFeature.getGeometry().scale(4);
  //rotateHandleFeature.getGeometry().setCoordinates([courseBoundaryFeature[0]]);

  const featureCoordinates = collectionEvent.element
    .getGeometry()
    .getCoordinates();
  transformInteraction.setCenter(featureCoordinates[0][2]);
});

// After the feature is transfomed set the, set the center of transformation to top right
// After the feature is transfomed set the, set the center of transformation to top right
transformInteraction.on("translateend", (collectionEvent) => {
  const featureCoordinates = collectionEvent.feature
    .getGeometry()
    .getCoordinates();
  transformInteraction.setCenter(featureCoordinates[0][2]);
});

// where we are placing the course
var centerCoordinate = transform(
  [-1.8048000692198798, 52.43389955737061],
  "EPSG:4326",
  "EPSG:3857"
);

// view, starting at the center
var view = new View({
  projection: "EPSG:3857",
  center: centerCoordinate,
  zoom: 17,
});

// finally, the map with our custom interactions, controls and overlays
var map = new Map({
  target: "map",
});

map.addLayer(osmlayer);
map.addLayer(courseBoundaryVectorLayer);
map.addInteraction(transformInteraction);
map.setView(view);

// show the map
onMounted(() => {
  map?.setTarget(mapRef.value);
});

// garbage collect the map
onUnmounted(() => {
  map?.setTarget(undefined);
  map = undefined;
});
</script>
