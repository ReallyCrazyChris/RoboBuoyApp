<template>
  <div id="map" ref="mapRef" style="height: 800px; width: 800px"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import { Map, View, Feature } from "ol";
import { Layer, Tile, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { transform } from "ol/proj";
import { Polygon, Circle, LineString, Point } from "ol/geom";
import MapBrowserEventType from "ol/MapBrowserEventType";

import Collection from "ol/Collection";
import {
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
import CircleStyle from "ol/style/Circle";
import { Style, Fill, Stroke, Text, Icon } from "ol/style";
import { getArea, getLength } from "ol/sphere";
import { makeObjectPropertyPusher } from "ol/xml";

const mapRef = ref();

// create a tile layer with the OSM source
var osmlayer = new Tile({
  source: new OSM(),
});

/****************************
 * Define the Course Boundary
 * **************************/

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

courseBoundaryFeature.setStyle(
  new Style({
    stroke: new Stroke({
      color: "grey",
      width: 0.5,
      lineDash: [5, 5],
    }),
  })
);

const boundaryExtent = courseBoundaryFeature.getGeometry().getExtent();
const boundaryCenter = getCenter(boundaryExtent);
const boundaryTopLeft = getTopLeft(boundaryExtent);
const boundaryTopRight = getTopRight(boundaryExtent);
const boundaryBottomLeft = getBottomLeft(boundaryExtent);
const boundaryBottomRight = getBottomRight(boundaryExtent);

var courceScaleHandel = new Feature({
  geometry: new Point(boundaryTopLeft, 0.0001),
  props: { handle: "scalehandle" },
});

courceScaleHandel.setStyle(
  new Style({
    fill: new Fill({
      color: "lightgrey",
    }),
    stroke: new Stroke({
      color: "red",
      width: 2,
      lineCap: "round",
    }),
    image: new Icon({
      color: "#BADA55",
      src: "icons/arrow_insert_fill1_48px.svg",
      scale: 0.45,
      rotateWithView: true,
    }),
  })
);

var courceRotateHandel = new Feature({
  geometry: new Point(boundaryTopRight, 0.0001),
  props: { handle: "rotatehandle" },
});

courceRotateHandel.setStyle(
  new Style({
    fill: new Fill({
      color: "lightgrey",
    }),
    stroke: new Stroke({
      color: "lightgreen",
      width: 2,
      lineCap: "round",
    }),
    image: new Icon({
      color: "#BADA55",
      src: "icons/cycle_fill1_48px.svg",
      scale: 0.45,
      rotateWithView: true,
    }),
  })
);

var courceCenterofRotaiton = new Feature({
  geometry: new Circle(boundaryBottomRight, 0.0001),
  props: { handle: "centerofrotation" },
});

courceCenterofRotaiton.setStyle(
  new Style({
    fill: new Fill({
      color: "lightgrey",
    }),
    stroke: new Stroke({
      color: "rgb(223,255,1)",
      width: 2,
      lineCap: "round",
    }),
  })
);

var courceDragHandel = new Feature({
  geometry: new Point(boundaryCenter, 0.0001),
  props: { handle: "draghandle" },
});

courceDragHandel.setStyle(
  new Style({
    fill: new Fill({
      color: "lightgrey",
    }),
    stroke: new Stroke({
      color: "white",
      width: 2,
      lineCap: "round",
    }),
    image: new Icon({
      color: "#BADA55",
      src: "icons/drag_pan_fill1_48px.svg",
      scale: 0.45,
      rotateWithView: true,
    }),
  })
);

/**************************
 * Marks and Gates
 **************************/

function markCoordinatePercentile(offsetX = 0, offsetY = 0) {
  // posiitons hte mark as a persentage of the courseboundary
  const percentileUnitY = (boundaryTopRight[1] - boundaryBottomRight[1]) / 100;
  const percentileUnitX =
    (boundaryBottomLeft[0] - boundaryBottomRight[0]) / 100;

  const x = boundaryBottomRight[0] + percentileUnitX * offsetX;
  const y = boundaryBottomRight[1] + percentileUnitY * offsetY;

  return [x, y];
}

/**********************
 * Mark 1
 * ********************
 */

var mark1 = new Feature({
  geometry: new Circle(markCoordinatePercentile(20, 100), 0.0001),
  props: { number: 1, type: "mark", color: "green", name: "einstein" },
});

mark1.setStyle(
  new Style({
    fill: new Fill({
      color: "rgb(223,255,1)",
    }),
    stroke: new Stroke({
      color: "rgb(223,255,1)",
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "1",
      font: "16px sans-serif",
      textAlign: "center",
      justify: "center",
    }),
  })
);

// Translate the Mark
var mark1_translateHandel = new Collection([mark1]);
// Consider Features in the courseBoundaryVectorLayer for translation
const mark1_translate = new Translate({
  layers: [courseBoundaryVectorLayer],
  features: mark1_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
mark1_translate.on("translatestart", (translateEvent) => {});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark1_translate.on("translateend", (translateEvent) => {
  console.log("mark1 moved");
});

/**********************
 * Mark 2
 * ********************
 */

var mark2 = new Feature({
  geometry: new Circle(markCoordinatePercentile(50, 90), 0.0001),
  props: { number: 2, type: "mark", color: "green", name: "tesla" },
});

mark2.setStyle(
  new Style({
    fill: new Fill({
      color: "rgb(223,255,1)",
    }),
    stroke: new Stroke({
      color: "rgb(223,255,1)",
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "2",
      font: "16px sans-serif",
      textAlign: "center",
      justify: "center",
    }),
  })
);

// Translate the Mark
var mark2_translateHandel = new Collection([mark2]);
// Consider Features in the courseBoundaryVectorLayer for translation
const mark2_translate = new Translate({
  layers: [courseBoundaryVectorLayer],
  features: mark2_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
mark2_translate.on("translatestart", (translateEvent) => {});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark2_translate.on("translateend", (translateEvent) => {
  console.log("mark2 moved");
});

/**********************
 * Mark 3
 * ********************
 */
var mark3 = new Feature({
  geometry: new Circle(markCoordinatePercentile(50, 0), 0.0001),
  props: { number: 3, type: "mark", color: "green", name: "euler" },
});

mark3.setStyle(
  new Style({
    fill: new Fill({
      color: "rgb(223,255,1)",
    }),
    stroke: new Stroke({
      color: "rgb(223,255,1)",
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "3",
      font: "16px sans-serif",
      textAlign: "center",
      justify: "center",
    }),
  })
);

// Translate the Mark
var mark3_translateHandel = new Collection([mark3]);
// Consider Features in the courseBoundaryVectorLayer for translation
const mark3_translate = new Translate({
  layers: [courseBoundaryVectorLayer],
  features: mark3_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
mark3_translate.on("translatestart", (translateEvent) => {});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark3_translate.on("translateend", (translateEvent) => {
  console.log("mark1 moved");
});

/**********************
 * Mark 4
 * ********************
 */
var mark4 = new Feature({
  geometry: new Circle(markCoordinatePercentile(40, 5), 0.0001),
  props: { number: 4, type: "mark", name: "sinclair" },
});

mark4.setStyle(
  new Style({
    fill: new Fill({
      color: "rgb(223,255,1)",
    }),
    stroke: new Stroke({
      color: "rgb(223,255,1)",
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "4",
      font: "16px sans-serif",
      textAlign: "center",
      justify: "center",
    }),
  })
);

// Translate the Mark
var mark4_translateHandel = new Collection([mark4]);
// Consider Features in the courseBoundaryVectorLayer for translation
const mark4_translate = new Translate({
  layers: [courseBoundaryVectorLayer],
  features: mark4_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
mark4_translate.on("translatestart", (translateEvent) => {});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark4_translate.on("translateend", (translateEvent) => {
  console.log("mark4 moved");
});

/**********************
 * Mark Start
 * ********************
 */
var markStart = new Feature({
  geometry: new Circle(markCoordinatePercentile(20, 30), 0.0001),
  props: { number: 5, type: "startpin", color: "green", name: "coco" },
});

markStart.setStyle(
  new Style({
    fill: new Fill({
      color: "blue",
    }),
    stroke: new Stroke({
      color: "blue",
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "C",
      font: "16px sans-serif",
      textAlign: "center",
      justify: "center",
    }),
  })
);

// Translate the Mark
var markStart_translateHandel = new Collection([markStart]);
// Consider Features in the courseBoundaryVectorLayer for translation
const markStart_translate = new Translate({
  layers: [courseBoundaryVectorLayer],
  features: markStart_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
markStart_translate.on("translatestart", (translateEvent) => {});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
markStart_translate.on("translateend", (translateEvent) => {
  console.log("markStart moved");
});

/**********************
 * Mark Pin
 * ********************
 */
var markPin = new Feature({
  geometry: new Circle(markCoordinatePercentile(50, 30), 0.0001),
  props: { number: 6, type: "startend", color: "green", name: "sisi" },
});

markPin.setStyle(
  new Style({
    fill: new Fill({
      color: "orange",
    }),
    stroke: new Stroke({
      color: "orange",
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "P",
      font: "16px sans-serif",
      textAlign: "center",
      justify: "center",
    }),
  })
);

// Translate the Mark
var markPin_translateHandel = new Collection([markPin]);
// Consider Features in the courseBoundaryVectorLayer for translation
const markPin_translate = new Translate({
  layers: [courseBoundaryVectorLayer],
  features: markPin_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
markPin_translate.on("translatestart", (translateEvent) => {});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
markPin_translate.on("translateend", (translateEvent) => {
  console.log("markPin moved");
});

/**********************
 * Start Line
 * TODO: The distance calcualtio nis not working well !!
 * ********************
 */

function toRadians(angleInDegrees) {
  return (angleInDegrees * Math.PI) / 180;
}

// TODO surely there is an existing funciton .... find it
function get_distance(c1, c2) {
  var d = 0;
  c1 = transform(c1, "EPSG:3857", "EPSG:4326");
  c2 = transform(c2, "EPSG:3857", "EPSG:4326");

  const radius = 6371008.8;
  const lat1 = toRadians(c1[1]);
  const lat2 = toRadians(c2[1]);
  const deltaLatBy2 = (lat2 - lat1) / 2;
  const deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
  const a =
    Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) +
    Math.sin(deltaLonBy2) *
      Math.sin(deltaLonBy2) *
      Math.cos(lat1) *
      Math.cos(lat2);
  d = 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return d;
}

var startLine = new Feature({
  geometry: new LineString(
    [markStart.getGeometry().getCenter(), markPin.getGeometry().getCenter()],
    "XY"
  ),
  props: { number: 5, type: "startpin", color: "green", name: "coco" },
});

startLine.setStyle(
  new Style({
    stroke: new Stroke({
      color: "green",
      width: 2,
      lineDash: [1, 1],
    }),
    text: new Text({
      text:
        "" +
        Math.round(
          get_distance(
            markStart.getGeometry().getCenter(),
            markPin.getGeometry().getCenter()
          ) * 100000
        ) +
        "m",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
    }),
  })
);

/*********************
 * Course Lenght
 * *******************
 */

var courseLength = new Feature({
  geometry: new LineString([boundaryTopRight, boundaryBottomRight], "XY"),
});

courseLength.setStyle(
  new Style({
    stroke: new Stroke({
      color: "green",
      width: 2,
      lineDash: [1, 10],
    }),
    text: new Text({
      text:
        " " +
        Math.round(
          get_distance(boundaryTopRight, boundaryBottomRight) * 100000
        ) +
        "m",
      font: "10px sans-serif",
      textAlign: "left",
      justify: "right",
    }),
  })
);

/**********************
 * Vector Layers(s)
 * ********************
 */

// create a vector layer representing the course boundary
var courseBoundaryVectorLayer = new VectorLayer({
  name: "courseBoundaryLayer",
  source: new VectorSource({ wrapX: false }),
});

// these are features that are translated, rottated and scaled together
const courseBoundaryFeatures = [
  courseBoundaryFeature,
  courceDragHandel,
  courceScaleHandel,
  courceRotateHandel,
  courceCenterofRotaiton,
  mark1,
  mark2,
  mark3,
  mark4,
  markStart,
  markPin,
  startLine,
  courseLength,
];

// transform polyline gps like positions to openalyer vector coordinates
courseBoundaryFeatures.forEach((feature) => {
  feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
});

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
  // radius around the given pixecl position will be checked for features
  hitTolerance: 5, //px
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
        // radius around the given pixecl position will be checked for features
        hitTolerance: 10, //px

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
    console.log("rotation complete");
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
        // radius around the given pixecl position will be checked for features
        hitTolerance: 10, //px

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
    // TODO prevent skew

    // how much to scale by
    const ax_delta = lastScaleCoordinate[0] - scaleAnchor[0];
    const ay_delta = lastScaleCoordinate[1] - scaleAnchor[1];
    const bx_delta = mapBrowserEvent.coordinate[0] - scaleAnchor[0];
    const by_delta = mapBrowserEvent.coordinate[1] - scaleAnchor[1];

    var scaleX = bx_delta / ax_delta;
    var scaleY = by_delta / ay_delta;

    courceBoundaryFeaturesCollection.forEach((feature) => {
      feature.getGeometry().scale(scaleX, scaleY, scaleAnchor);
    });

    lastScaleCoordinate = mapBrowserEvent.coordinate;
  },

  handleUpEvent: () => {
    console.log("scale compete");
    preventScaleEventPropagation = false;
  },
});

// finally, the map with our custom interactions, controls and overlays
var map = new Map({
  interactions: defaultInteractions().extend([
    translate,
    rotationInteraction,
    scaleInteraction,
    mark1_translate,
    mark2_translate,
    mark3_translate,
    mark4_translate,
    markStart_translate,
    markPin_translate,
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
