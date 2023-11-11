<template>
  <div id="map" ref="mapRef" style="height: 800px; width: 800px"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import { Map, View, Feature } from "ol";
import { Layer, Tile, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { transform } from "ol/proj";
import { Polygon, Circle } from "ol/geom";
import Collection from "ol/Collection";
import {
  Select,
  Translate,
  Pointer,
  defaults as defaultInteractions,
} from "ol/interaction";
import {
  getCenter,
  getTopLeft,
  getTopRight,
  getBottomLeft,
  getBottomRight,
} from "ol/extent";

const mapRef = ref();

// create a tile layer with the OSM source
var osmlayer = new Tile({
  source: new OSM(),
});

/****************************
 * Define the Course Boundary
 * **************************
 */

//
var courseBoundary = [
  [10.932036344861501, 49.124145352082735],
  [10.932036344861501, 49.122665487481385],
  [10.933389630255192, 49.122665487481385],
  [10.933389630255192, 49.124145352082735],
  [10.932036344861501, 49.124145352082735],
];

var courseBoundaryFeature = new Feature({
  geometry: new Polygon([courseBoundary]),
});

const boundaryExtent = courseBoundaryFeature.getGeometry().getExtent();
const boundaryCenter = getCenter(boundaryExtent);
const boundaryTopLeft = getTopLeft(boundaryExtent);
const boundaryTopRight = getTopRight(boundaryExtent);
const boundaryBottmLeft = getBottomLeft(boundaryExtent);
const boundaryBottomRight = getBottomRight(boundaryExtent);

var courceScaleHandel = new Feature({
  geometry: new Circle(boundaryTopLeft, 0.0001),
  props: { handle: "scalehandle" },
});

var courceRotateHandel = new Feature({
  geometry: new Circle(boundaryTopRight, 0.0001),
  props: { handle: "rotatehandle" },
});

var courceCenterofRotaiton = new Feature({
  geometry: new Circle(boundaryBottomRight, 0.0001),
  props: { handle: "centerofrotation" },
});

var courceDragHandel = new Feature({
  geometry: new Circle(boundaryCenter, 0.0001),
  props: { handle: "draghandle" },
});

// create a vector layer representing the course boundary
var courseBoundaryVectorLayer = new VectorLayer({
  name: "courseBoundaryLayer",
  source: new VectorSource({ wrapX: false }),
});

// transform polyline gps like positions to openalyer vector coordinates
courseBoundaryFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
courceScaleHandel.getGeometry().transform("EPSG:4326", "EPSG:3857");
courceDragHandel.getGeometry().transform("EPSG:4326", "EPSG:3857");
courceRotateHandel.getGeometry().transform("EPSG:4326", "EPSG:3857");
courceCenterofRotaiton.getGeometry().transform("EPSG:4326", "EPSG:3857");

const courseBoundaryFeatures = [
  courseBoundaryFeature,
  courceDragHandel,
  courceScaleHandel,
  courceRotateHandel,
  courceCenterofRotaiton,
];

courseBoundaryVectorLayer.getSource().addFeatures(courseBoundaryFeatures);

// where we are placing the course
var viewCenter = transform(boundaryBottomRight, "EPSG:4326", "EPSG:3857");

// view, starting at the center
var view = new View({
  projection: "EPSG:3857",
  center: viewCenter,
  zoom: 17,
});

var courceBoundaryFeaturesCollection = new Collection(courseBoundaryFeatures);

/**********************
 * dragHandel Translate
 * ********************
 */
// Translate using the dragHandel only
var dragHandel = new Collection([courceDragHandel]);
// Consider Features in the courseBoundaryVectorLayer for translation
const translate = new Translate({
  layers: [courseBoundaryVectorLayer],
  features: dragHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
translate.on("translatestart", (translateEvent) => {
  translate.features_ = courceBoundaryFeaturesCollection;
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
translate.on("translateend", (translateEvent) => {
  translate.features_ = dragHandel;
});

/**********************
 * rotateHandel Rotation
 * ********************
 */

let rotationAnchor;
let lastCoordinate;
let preventRotateEventPropagation = false;

const rotationInteraction = new Pointer({
  layers: [courseBoundaryVectorLayer], // Consider Features in the courseBoundaryVectorLayer for translation
  features: new Collection([courceRotateHandel]), // the dragHandle feature(s) is used it initiate the Translate

  handleDownEvent: (mapBrowserEvent) => {
    // check for feature under pixel

    // which features where clicked
    const clickedFeatures = mapBrowserEvent.map.getFeaturesAtPixel(
      mapBrowserEvent.pixel,
      {
        // is courseBoundary Layer ?
        layerFilter: (layer) => {
          if (
            layer.getProperties() &&
            layer.getProperties().name &&
            layer.getProperties().name == "courseBoundaryLayer"
          ) {
            return true;
          }

          return false;
        },
      }
    );

    // is one of th clicked features the rotate handel
    if (clickedFeatures.indexOf(courceRotateHandel) > -1) {
      // get the rotation anchor center coordinate
      rotationAnchor = getCenter(
        courceCenterofRotaiton.getGeometry().getExtent()
      );

      // drag from the center of the courceRotateHandel
      lastCoordinate = getCenter(courceRotateHandel.getGeometry().getExtent());
      preventRotateEventPropagation = true;
      return true; // start a drag sequence
    }
  },

  stopDown: () => {
    return preventRotateEventPropagation;
  },

  handleDragEvent: (mapBrowserEvent) => {
    const ax_delta = lastCoordinate[0] - rotationAnchor[0];
    const ay_delta = lastCoordinate[1] - rotationAnchor[1];
    const aTheta = Math.atan2(ay_delta, ax_delta);

    const bx_delta = mapBrowserEvent.coordinate[0] - rotationAnchor[0];
    const by_delta = mapBrowserEvent.coordinate[1] - rotationAnchor[1];
    const bTheta = Math.atan2(by_delta, bx_delta);

    courceBoundaryFeaturesCollection.forEach((feature) => {
      feature.getGeometry().rotate(bTheta - aTheta, rotationAnchor);
    });

    lastCoordinate = mapBrowserEvent.coordinate;
  },

  handleUpEvent: () => {
    console.log("rotation");
    preventRotateEventPropagation = false;
  },
});

/**********************
 * scaleHandel Scale
 * ********************
 */

let scaleAnchor;
let lastScaleCoordinate;
let preventScaleEventPropagation = false;

const scaleInteraction = new Pointer({
  layers: [courseBoundaryVectorLayer], // Consider Features in the courseBoundaryVectorLayer for translation
  features: new Collection([courceScaleHandel]), // the dragHandle feature(s) is used it initiate the Translate

  handleDownEvent: (mapBrowserEvent) => {
    // check for feature under pixel

    // which features where clicked
    const clickedFeatures = mapBrowserEvent.map.getFeaturesAtPixel(
      mapBrowserEvent.pixel,
      {
        // is courseBoundary Layer ?
        layerFilter: (layer) => {
          if (
            layer.getProperties() &&
            layer.getProperties().name &&
            layer.getProperties().name == "courseBoundaryLayer"
          ) {
            return true;
          }

          return false;
        },
      }
    );

    // is one of th clicked features the rotate handel
    if (clickedFeatures.indexOf(courceScaleHandel) > -1) {
      // get the rotation anchor center coordinate
      scaleAnchor = getCenter(courceCenterofRotaiton.getGeometry().getExtent());

      // drag from the center of the courceScaleHandel
      lastScaleCoordinate = getCenter(
        courceScaleHandel.getGeometry().getExtent()
      );
      preventScaleEventPropagation = true;
      return true; // start a drag sequence
    }
  },

  stopDown: () => {
    return preventScaleEventPropagation;
  },

  handleDragEvent: (mapBrowserEvent) => {
    const ax_delta = lastScaleCoordinate[0] - scaleAnchor[0];
    const ay_delta = lastScaleCoordinate[1] - scaleAnchor[1];

    const bx_delta = mapBrowserEvent.coordinate[0] - scaleAnchor[0];
    const by_delta = mapBrowserEvent.coordinate[1] - scaleAnchor[1];

    const scaleX = bx_delta / ax_delta;
    const scaleY = by_delta / ay_delta;

    courceBoundaryFeaturesCollection.forEach((feature) => {
      feature.getGeometry().scale(scaleX, scaleY, scaleAnchor);
    });

    lastScaleCoordinate = mapBrowserEvent.coordinate;
  },

  handleUpEvent: () => {
    console.log("rotation");
    preventScaleEventPropagation = false;
  },
});

// finally, the map with our custom interactions, controls and overlays
var map = new Map({
  interactions: defaultInteractions().extend([
    translate,
    rotationInteraction,
    scaleInteraction,
  ]),
});

map.addLayer(osmlayer);
map.addLayer(courseBoundaryVectorLayer);
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
