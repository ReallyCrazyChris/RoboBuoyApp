<template>
  <div id="map" ref="raceMap" style="height: 800px; width: 800px"></div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

import { Map, View, Feature } from "ol";
import { Layer, Tile, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { transform } from "ol/proj";
import { Polygon, Circle, LineString, Point } from "ol/geom";

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

import { Style, Fill, Stroke, Text, Icon } from "ol/style";

import { useCourse } from "src/stores/course";

const course = useCourse();
const { centerOfRotation, mark1_center, mark2_center } = storeToRefs(course);

const raceMap = ref();

/**********************
 * startCommitte_
 * ********************
 */

var startCommitte_ = new Feature({
  geometry: new Circle(course.centerOfRotation, 10),
  props: {},
});

startCommitte_.setStyle(
  new Style({
    fill: new Fill({
      color: "rgb(255,140,0)",
    }),
    stroke: new Stroke({
      color: "rgb(255,140,0)",
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "S",
      font: "16px sans-serif",
      textAlign: "center",
      justify: "center",
    }),
  })
);

// Translate the Mark
var startCommitte_translateHandel = new Collection([startCommitte_]);
// Consider Features in the raceCourseVectorLayer for translation
const startCommitte_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: startCommitte_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
startCommitte_translate.on("translatestart", (translateEvent) => {
  //course.centerOfRotation = startCommitte_.getGeometry().getCenter();
});

startCommitte_translate.on("translating", (translateEvent) => {
  course.centerOfRotation = startCommitte_.getGeometry().getCenter();
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
startCommitte_translate.on("translateend", (translateEvent) => {
  //course.centerOfRotation = startCommitte_.getGeometry().getCenter();
});

watch(centerOfRotation, () => {
  startCommitte_.getGeometry().setCenter(centerOfRotation.value);
});

/**
 * Mark 1
 */

var mark1_ = new Feature({
  geometry: new Circle(course.mark1_center, 10),
  props: {},
});

mark1_.setStyle(
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
var mark1_translateHandel = new Collection([mark1_]);
// Consider Features in the raceCourseVectorLayer for translation
const mark1_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: mark1_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
mark1_translate.on("translatestart", (translateEvent) => {
  console.log("translatestart ", mark1_.getGeometry().getCenter());
});

mark1_translate.on("translating", (translateEvent) => {
  course.setCourseRotation(mark1_.getGeometry().getCenter());
  course.setCourseScale(mark1_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark1_translate.on("translateend", (translateEvent) => {
  //console.log("translateend ", mark1_.getGeometry().getCenter());
  //course.setCourseRotation(mark1_.getGeometry().getCenter());
});

watch(mark1_center, () => {
  mark1_.getGeometry().setCenter(mark1_center.value);
});

/**
 * Mark 1
 */
var mark2_ = new Feature({
  geometry: new Circle(course.mark2_center, 10),
  props: {},
});

mark2_.setStyle(
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
var mark2_translateHandel = new Collection([mark2_]);
// Consider Features in the raceCourseVectorLayer for translation
const mark2_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: mark2_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
mark2_translate.on("translatestart", (translateEvent) => {});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark2_translate.on("translateend", (translateEvent) => {});

watch(mark2_center, () => {
  mark2_.getGeometry().setCenter(mark2_center.value);
});

/**
 * Scale handle and Scale Pointer
 */

const courseScaleHandel = new Feature({
  geometry: new Point(course.mark1_center, 20),
  props: { handle: "scalehandle" },
});

courseScaleHandel.setStyle(
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

const scaleInteraction = new Pointer({
  layers: [raceCourseVectorLayer],
  features: new Collection([courseScaleHandel]), // the dragHandle feature(s) is used it initiate the Translate

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
    if (clickedFeatures.indexOf(courseScaleHandel) > -1) {
      // get the rotation anchor center coordinate
      scaleAnchor = getCenter(courceCenterofRotaiton.getGeometry().getExtent());

      // drag from the center of the courseScaleHandel
      lastScaleCoordinate = getCenter(
        courseScaleHandel.getGeometry().getExtent()
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

/**********************
 * Vector Layers(s)
 * ********************
 */

// create a vector layer representing the course boundary
var raceCourseVectorLayer = new VectorLayer({
  name: "courseBoundaryLayer",
  source: new VectorSource({ wrapX: false }),
});

// these are features that are translated, rottated and scaled together
const raceCourseFeatures = [mark2_, mark1_, startCommitte_, courseScaleHandel];

// transform polyline gps like positions to openalyer vector coordinates
//raceCourseFeatures.forEach((feature) => {
// Transform the coordinates from GPS WGS84 to Web Mercator used by OpenstreetMap
//console.log(feature.getGeometry().transform("EPSG:4326", "EPSG:3857"));
//});

raceCourseVectorLayer.getSource().addFeatures(raceCourseFeatures);

// where we are placing the course
var viewCenter = transform([course.lon, course.lat], "EPSG:4326", "EPSG:3857");

// view, starting at the center
var view = new View({
  projection: "EPSG:3857",
  center: viewCenter,
  zoom: course.zoom,
});

// finally, the map with our custom interactions, controls and overlays
var map = new Map({
  interactions: defaultInteractions().extend([
    startCommitte_translate,
    mark1_translate,
    //mark2_translate,
  ]),
});

// create a tile layer with the OSM source
var osmlayer = new Tile({
  source: new OSM(),
});

map.addLayer(osmlayer);
map.addLayer(raceCourseVectorLayer);
map.setView(view);

// show the map
onMounted(() => {
  map?.setTarget(raceMap.value);
});

// garbage collect the map
onUnmounted(() => {
  map?.setTarget(undefined);
  map = undefined;
});
</script>
