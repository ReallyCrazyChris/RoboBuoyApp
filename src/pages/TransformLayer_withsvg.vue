<template>
  <div id="map" ref="mapRef" style="height: 800px; width: 800px">
    <div
      id="overlay"
      ref="overlayRef"
      style="
        background-color: yellow;
        width: 20px;
        height: 20px;
        border-radius: 10px;
      "
    ></div>
  </div>
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

// where we are placing the course
var centerCoordinate = transform(
  [-1.8, 52.43389955737061],
  "EPSG:4326",
  "EPSG:3857"
);

let svgContainer = document.createElement("div");

svgContainer.id = "svgContainer";
svgContainer.classList.add("ol-layer");
svgContainer.style.cssText += "position: absolute; width: 100%; height: 100%;";

// a temporary element ... overwritten by the xhr call
let svgElement = document.createElement("div");
/*************************
 *  Prepare the SVG Layer
 * **********************/

// fetch the course svg
const xhr = new XMLHttpRequest();
xhr.open("GET", "BasicCourse.svg");
xhr.addEventListener("load", function () {
  svgElement = xhr.responseXML.documentElement;
  svgElement.style.width = 300; // TODO get this property form the svg
  svgElement.style.height = 500;
  svgContainer.appendChild(svgElement);
});
xhr.send();

const svgLayer = new Layer({
  render: function (frameState) {
    const pixel = map.getPixelFromCoordinate(centerCoordinate);

    const transformOrigin_X = 20; // TODO get this property form the svg
    const transformOrigin_Y = 150;

    svgElement.style.transformOrigin =
      String(transformOrigin_X) + "px " + String(transformOrigin_Y) + "px";

    const cssTransform1 = composeCssTransform(
      pixel[0] - 20, //- svg_width / 2, //- pixel_width, //- dx, // dx2	number Final translation x.
      pixel[1] - 150, //- svg_height / 2, //- pixel_height, //- dy, // dy2	number Final translation y.
      1 / frameState.viewState.resolution,
      1 / frameState.viewState.resolution,
      3.14 / 4, // angle	number Rotation (in counter-clockwise radians).
      0,
      0
    );

    svgElement.style.transform = cssTransform1;

    return svgContainer;
  },
});

/***********************************
 *  Prepare the Vector Feature Layer
 * *********************************/
var courseBoundaryVectorLayer = new VectorLayer({
  name: "courseBoundary",
  source: new VectorSource({ wrapX: false }),
});

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

courseBoundaryFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
var featureCollection = [courseBoundaryFeature];

/****************************
 *  Prepare the Overlay Layer
 * **************************/

// an overlay to position at the center
var overlay = new Overlay({
  positioning: "center-center",
  position: centerCoordinate,
});

/*************************
 *  USE the OSM Layer
 * **********************/
// create a layer with the OSM source
var osmlayer = new Tile({
  source: new OSM(),
});

/**
 *  Crete the Transform Interaction
 *
 */

var transformInteraction = new TransformInteraction({
  /**
 * Limit interaction inside bbox
    condition: function(e, features) {
      return ol.extent.containsXY([-465960, 5536486, 1001630, 6514880], e.coordinate[0], e.coordinate[1]);
    },
*/
  // filter: function(f,l) { return f.getGeometry().getType()==='Polygon'; },
  // layers: [courseBoundaryVectorLayer],

  enableRotatedTransform: false,
  // addCondition: shiftKeyOnly,
  hitTolerance: 2,
  translateFeature: true,
  scale: true,
  rotate: true,
  keepAspectRatio: false,
  keepRectangle: true,
  translate: true,
  stretch: true,
  selection: true,
  // Get scale on points
  pointRadius: function (f) {
    var radius = f.get("radius") || 10;
    return [radius, radius];
  },
});

// view, starting at the center
var view = new View({
  projection: "EPSG:3857",
  center: centerCoordinate,
  zoom: 15,
});

// finally, the map with our custom interactions, controls and overlays
var map = new Map({
  target: "map",
});

map.addLayer(osmlayer);
map.addOverlay(overlay);

courseBoundaryVectorLayer.getSource().addFeatures(featureCollection);
map.addLayer(courseBoundaryVectorLayer);
map.addInteraction(transformInteraction);
map.addLayer(svgLayer);

map.setView(view);

// show the map
onMounted(() => {
  overlay.setElement(overlayRef.value);
  map?.setTarget(mapRef.value);
  transformInteraction.select(courseBoundaryFeature, true);
  transformInteraction.setCenter(
    transform(
      [-1.8048000692198798, 52.43389955737061],
      "EPSG:4326",
      "EPSG:3857"
    )
  );
});

// garbage collect the map
onUnmounted(() => {
  map?.setTarget(undefined);
  map = undefined;
});
</script>
