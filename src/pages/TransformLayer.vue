<template>
  <q-page>
    <div ref="raceMap" :style="raceMapHeight"></div>
  </q-page>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watch, onMounted, onUnmounted } from "vue";

import { Map, View, Feature } from "ol";
import { Tile, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";

import Collection from "ol/Collection";
import { Polygon, Circle, LineString, Point } from "ol/geom";

import {
  Translate,
  Pointer,
  defaults as defaultInteractions,
} from "ol/interaction";

import { ZoomToExtent, defaults as defaultControls } from "ol/control";
import { boundingExtent, getCenter as getExtentCenter } from "ol/extent";

import { Style, Fill, Stroke, Text } from "ol/style";

import { useCourse } from "src/stores/course";

const course = useCourse();
const {
  centerOfRotation,
  rotation,
  courseBoundaryArray,
  rotate_scaleHandel_center,
  scaleXHandel_center,
  startCommitte_center,
  startPin_center,
  startLineLength,
  finishCommitte_center,
  finishPin_center,
  finishLineLength,
  mark1_center,
  mark2_center,
  mark3_center,
  mark4_center,
  mark5_center,
  mark6_center,
  gate1A_center,
  gate1B_center,
  gate1LineLength,
  gate2A_center,
  gate2B_center,
  gate2LineLength,
} = storeToRefs(course);

const raceMap = ref();
const raceMapHeight = ref("height:500px");
const raceMapWidth = ref("100%");

/**
 * course boundary
 */

const courseBoundary_ = new Feature({
  geometry: new Polygon(course.courseBoundaryArray),
});

courseBoundary_.setStyle(
  new Style({
    stroke: new Stroke({
      color: "grey",
      width: 1,
      lineDash: [5, 5],
    }),

    text: new Text({
      text: course.title + ":  " + course.courceSequence,
      placement: "line",
      overflow: "wrap",
      textAlign: "",
      textBaseline: "top",
      font: "10px sans-serif",
    }),
  })
);

watch(courseBoundaryArray, () => {
  courseBoundary_.getGeometry().setCoordinates(courseBoundaryArray.value);
});

/**
 * Rotate and Scale Handel
 */

const rotate_scaleHandel = new Feature({
  geometry: new Point(course.rotate_scaleHandel_center, 20),
  props: { handle: "scalehandle" },
});

rotate_scaleHandel.setStyle(
  new Style({
    text: new Text({
      text: "\u2316",
      font: "40px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
    }),
  })
);

const scaleXHandel = new Feature({
  geometry: new Point(course.scaleXHandel_center, 20),
  props: { handle: "scalehandle" },
});

scaleXHandel.setStyle(
  new Style({
    text: new Text({
      text: "\u21B9",
      font: "16px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
    }),
  })
);

watch(rotate_scaleHandel_center, () => {
  rotate_scaleHandel
    .getGeometry()
    .setCoordinates(rotate_scaleHandel_center.value);
});

watch(scaleXHandel_center, () => {
  scaleXHandel.getGeometry().setCoordinates(scaleXHandel_center.value);
});

watch(rotation, () => {
  rotate_scaleHandel
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);

  scaleXHandel
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

var clickedFeatures = new Collection();

const rotate_and_scale_Interaction = new Pointer({
  layers: [raceCourseVectorLayer],

  handleDownEvent: (mapBrowserEvent) => {
    // determin if the rotate_scaleHandel has been cliked down apon

    clickedFeatures = mapBrowserEvent.map.getFeaturesAtPixel(
      mapBrowserEvent.pixel,
      {
        hitTolerance: 10, // radius around rotate_scaleHandel poiner in px

        // is the click down within the courseBoundary Layer ?
        layerFilter: (layer) => {
          if (layer.getProperties()?.name == "courseBoundaryLayer") {
            return true;
          }

          return false;
        },
      }
    );

    // is one of th clicked features the scaleY and rotate handel
    if (clickedFeatures.indexOf(rotate_scaleHandel) > -1) {
      return true;
    }

    // is one of th clicked features the scaleX handel
    if (clickedFeatures.indexOf(scaleXHandel) > -1) {
      return true;
    }
  },

  stopDown: () => {
    if (clickedFeatures.indexOf(rotate_scaleHandel) > -1) {
      return true;
    }
    if (clickedFeatures.indexOf(scaleXHandel) > -1) {
      return true;
    }
    return false;
  },

  handleDragEvent: (mapBrowserEvent) => {
    if (clickedFeatures.indexOf(rotate_scaleHandel) > -1) {
      course.setCourseScaleY(mapBrowserEvent.coordinate);
      course.setCourseRotation(mapBrowserEvent.coordinate);
    }
    if (clickedFeatures.indexOf(scaleXHandel) > -1) {
      course.setCourseScaleX(mapBrowserEvent.coordinate);
    }
  },

  handleUpEvent: () => {
    return false;
  },
});

/**********************
 * startCommitte_
 * ********************
 */

var startCommitte_ = new Feature({
  geometry: new Circle(course.centerOfRotation, course.markRadius),
  props: {},
});

startCommitte_.setStyle(
  new Style({
    fill: new Fill({
      color: course.start_color,
    }),
    stroke: new Stroke({
      color: course.start_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "\u2693",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
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

watch(rotation, () => {
  startCommitte_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

/**
 * Start Pin
 */

var startPin_ = new Feature({
  geometry: new Circle(course.startPin_center, course.markRadius),
  props: {},
});

startPin_.setStyle(
  new Style({
    fill: new Fill({
      color: course.start_color,
    }),
    stroke: new Stroke({
      color: course.start_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
    }),
  })
);

// Translate the Mark
var startPin_translateHandel = new Collection([startPin_]);
// Consider Features in the raceCourseVectorLayer for translation
const startPin_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: startPin_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
startPin_translate.on("translatestart", (translateEvent) => {});

startPin_translate.on("translating", (translateEvent) => {
  //course.setCourseScaleX(startPin_.getGeometry().getCenter());
  course.setStartPin_offset(startPin_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
startPin_translate.on("translateend", (translateEvent) => {});

watch(startPin_center, () => {
  startPin_.getGeometry().setCenter(startPin_center.value);
});

watch(rotation, () => {
  startPin_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

var startLine_ = new Feature({
  geometry: new LineString(
    [course.startPin_center, course.startCommitte_center],
    "XY"
  ),
  props: {},
});

startLine_.setStyle(
  new Style({
    stroke: new Stroke({
      color: course.start_color,
      width: 2,
      lineDash: [1, 3],
    }),
    text: new Text({
      text: "START" + "\n" + course.startLineLength + "m",
      font: "8px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: course.startLineTextRotation,
      rotateWithView: true,
    }),
  })
);

watch(startCommitte_center, () => {
  startLine_
    .getGeometry()
    .setCoordinates([course.startPin_center, startCommitte_center.value]);

  startLine_.getStyle().getText().setRotation(course.startLineTextRotation);
});

watch(startPin_center, () => {
  startLine_
    .getGeometry()
    .setCoordinates([startPin_center.value, course.startCommitte_center]);
  startLine_.getStyle().getText().setRotation(course.startLineTextRotation);
});

watch(startLineLength, () => {
  startLine_
    .getStyle()
    .getText()
    .setText("START" + "\n" + startLineLength.value + "m");
});

/**
 * Finish Committe
 */

var finishCommitte_ = new Feature({
  geometry: new Circle(course.finishCommitte_center, course.markRadius),
  props: {},
});

finishCommitte_.setStyle(
  new Style({
    fill: new Fill({
      color: course.finish_color,
    }),
    stroke: new Stroke({
      color: course.finish_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
    }),
  })
);

// Translate the Mark
var finishCommitte_translateHandel = new Collection([finishCommitte_]);
// Consider Features in the raceCourseVectorLayer for translation
const finishCommitte_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: finishCommitte_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
finishCommitte_translate.on("translatestart", (translateEvent) => {});

finishCommitte_translate.on("translating", (translateEvent) => {
  course.setFinishCommitte_offset(finishCommitte_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
finishCommitte_translate.on("translateend", (translateEvent) => {});

watch(finishCommitte_center, () => {
  finishCommitte_.getGeometry().setCenter(finishCommitte_center.value);
});

/**
 * Finish Pin
 */

var finishPin_ = new Feature({
  geometry: new Circle(course.finishPin_center, course.markRadius),
  props: {},
});

finishPin_.setStyle(
  new Style({
    fill: new Fill({
      color: course.finish_color,
    }),
    stroke: new Stroke({
      color: course.finish_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
    }),
  })
);

// Translate the Mark
var finishPin_translateHandel = new Collection([finishPin_]);
// Consider Features in the raceCourseVectorLayer for translation
const finishPin_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: finishPin_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
finishPin_translate.on("translatestart", (translateEvent) => {});

finishPin_translate.on("translating", (translateEvent) => {
  course.setFinishPin_offset(finishPin_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
finishPin_translate.on("translateend", (translateEvent) => {});

watch(finishPin_center, () => {
  finishPin_.getGeometry().setCenter(finishPin_center.value);
});

var finishLine_ = new Feature({
  geometry: new LineString(
    [course.finishPin_center, course.finishCommitte_center],
    "XY"
  ),
  props: {},
});

finishLine_.setStyle(
  new Style({
    stroke: new Stroke({
      color: course.finish_color,
      width: 1,
      lineDash: [1, 3],
    }),
    text: new Text({
      text: "FINISH" + "\n" + course.finishLineLength + "m",
      font: "8px sans-serif",
      color: course.finish_color,
      textAlign: "center",
      justify: "center",
      rotation: course.finishLineTextRotation,
      rotateWithView: true,
    }),
  })
);

watch(finishCommitte_center, () => {
  finishLine_
    .getGeometry()
    .setCoordinates([course.finishPin_center, finishCommitte_center.value]);
  finishLine_.getStyle().getText().setRotation(course.finishLineTextRotation);
});

watch(finishPin_center, () => {
  finishLine_
    .getGeometry()
    .setCoordinates([finishPin_center.value, course.finishCommitte_center]);
  finishLine_.getStyle().getText().setRotation(course.finishLineTextRotation);
});

watch(finishLineLength, () => {
  finishLine_
    .getStyle()
    .getText()
    .setText("FINISH" + "\n" + finishLineLength.value + "m");
});

/**
 * Mark 1
 */

var mark1_ = new Feature({
  geometry: new Circle(course.mark1_center, course.markRadius),
  props: {},
});

mark1_.setStyle(
  new Style({
    fill: new Fill({
      color: course.mark1_color,
    }),
    stroke: new Stroke({
      color: course.mark1_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "1",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
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
  //console.log("translatestart ", mark1_.getGeometry().getCenter());
});

mark1_translate.on("translating", (translateEvent) => {
  course.setMark1_offset(mark1_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark1_translate.on("translateend", (translateEvent) => {});

watch(mark1_center, () => {
  mark1_.getGeometry().setCenter(mark1_center.value);
});

watch(rotation, () => {
  mark1_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

/**
 * Mark 2
 */
var mark2_ = new Feature({
  geometry: new Circle(course.mark2_center, course.markRadius),
  props: {},
});

mark2_.setStyle(
  new Style({
    fill: new Fill({
      color: course.mark2_color,
    }),
    stroke: new Stroke({
      color: course.mark2_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "2",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
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

mark2_translate.on("translating", (translateEvent) => {
  course.setMark2_offset(mark2_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark2_translate.on("translateend", (translateEvent) => {});

watch(mark2_center, () => {
  mark2_.getGeometry().setCenter(mark2_center.value);
});

watch(rotation, () => {
  mark2_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

/**
 * Mark3
 */

var mark3_ = new Feature({
  geometry: new Circle(course.mark3_center, course.markRadius),
  props: {},
});

mark3_.setStyle(
  new Style({
    fill: new Fill({
      color: course.mark3_color,
    }),
    stroke: new Stroke({
      color: course.mark3_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "3",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
    }),
  })
);

// Translate the Mark
var mark3_translateHandel = new Collection([mark3_]);
// Consider Features in the raceCourseVectorLayer for translation
const mark3_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: mark3_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
mark3_translate.on("translatestart", (translateEvent) => {
  //console.log("translatestart ", mark3_.getGeometry().getCenter());
});

mark3_translate.on("translating", (translateEvent) => {
  course.setMark3_offset(mark3_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark3_translate.on("translateend", (translateEvent) => {});

watch(mark3_center, () => {
  mark3_.getGeometry().setCenter(mark3_center.value);
});

watch(rotation, () => {
  mark3_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

/**
 * Mark4
 */

var mark4_ = new Feature({
  geometry: new Circle(course.mark4_center, course.markRadius),
  props: {},
});

mark4_.setStyle(
  new Style({
    fill: new Fill({
      color: course.mark4_color,
    }),
    stroke: new Stroke({
      color: course.mark4_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "4",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
    }),
  })
);

// Translate the Mark
var mark4_translateHandel = new Collection([mark4_]);
// Consider Features in the raceCourseVectorLayer for translation
const mark4_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: mark4_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
mark4_translate.on("translatestart", (translateEvent) => {
  //console.log("translatestart ", mark4_.getGeometry().getCenter());
});

mark4_translate.on("translating", (translateEvent) => {
  course.setMark4_offset(mark4_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark4_translate.on("translateend", (translateEvent) => {});

watch(mark4_center, () => {
  mark4_.getGeometry().setCenter(mark4_center.value);
});

watch(rotation, () => {
  mark4_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

/**
 * Mark5
 */

var mark5_ = new Feature({
  geometry: new Circle(course.mark5_center, course.markRadius),
  props: {},
});

mark5_.setStyle(
  new Style({
    fill: new Fill({
      color: course.mark5_color,
    }),
    stroke: new Stroke({
      color: course.mark5_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "5",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
    }),
  })
);

// Translate the Mark
var mark5_translateHandel = new Collection([mark5_]);
// Consider Features in the raceCourseVectorLayer for translation
const mark5_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: mark5_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
mark5_translate.on("translatestart", (translateEvent) => {
  //console.log("translatestart ", mark5_.getGeometry().getCenter());
});

mark5_translate.on("translating", (translateEvent) => {
  course.setMark5_offset(mark5_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark5_translate.on("translateend", (translateEvent) => {});

watch(mark5_center, () => {
  mark5_.getGeometry().setCenter(mark5_center.value);
});

watch(rotation, () => {
  mark5_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

/**
 * Mark6
 */

var mark6_ = new Feature({
  geometry: new Circle(course.mark6_center, course.markRadius),
  props: {},
});

mark6_.setStyle(
  new Style({
    fill: new Fill({
      color: course.mark6_color,
    }),
    stroke: new Stroke({
      color: course.mark6_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "6",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
    }),
  })
);

// Translate the Mark
var mark6_translateHandel = new Collection([mark6_]);
// Consider Features in the raceCourseVectorLayer for translation
const mark6_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: mark6_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
mark6_translate.on("translatestart", (translateEvent) => {
  //console.log("translatestart ", mark6_.getGeometry().getCenter());
});

mark6_translate.on("translating", (translateEvent) => {
  course.setMark6_offset(mark6_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
mark6_translate.on("translateend", (translateEvent) => {});

watch(mark6_center, () => {
  mark6_.getGeometry().setCenter(mark6_center.value);
});

watch(rotation, () => {
  mark6_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

/**
 * Gate 1
 */

var gate1A_ = new Feature({
  geometry: new Circle(course.gate1A_center, course.markRadius),
  props: {},
});

gate1A_.setStyle(
  new Style({
    fill: new Fill({
      color: course.gate1_color,
    }),
    stroke: new Stroke({
      color: course.gate1_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "1a",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
    }),
  })
);

// Translate the Mark
var gate1A_translateHandel = new Collection([gate1A_]);
// Consider Features in the raceCourseVectorLayer for translation
const gate1A_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: gate1A_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
gate1A_translate.on("translatestart", (translateEvent) => {});

gate1A_translate.on("translating", (translateEvent) => {
  course.setGate1A_offset(gate1A_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
gate1A_translate.on("translateend", (translateEvent) => {});

watch(gate1A_center, () => {
  gate1A_.getGeometry().setCenter(gate1A_center.value);
});

watch(rotation, () => {
  gate1A_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

var gate1B_ = new Feature({
  geometry: new Circle(course.gate1B_center, course.markRadius),
  props: {},
});

gate1B_.setStyle(
  new Style({
    fill: new Fill({
      color: course.gate1_color,
    }),
    stroke: new Stroke({
      color: course.gate1_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "1b",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
    }),
  })
);

// Translate the Mark
var gate1B_translateHandel = new Collection([gate1B_]);
// Consider Features in the raceCourseVectorLayer for translation
const gate1B_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: gate1B_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
gate1B_translate.on("translatestart", (translateEvent) => {});

gate1B_translate.on("translating", (translateEvent) => {
  course.setGate1B_offset(gate1B_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
gate1B_translate.on("translateend", (translateEvent) => {});

watch(gate1B_center, () => {
  gate1B_.getGeometry().setCenter(gate1B_center.value);
});

watch(rotation, () => {
  gate1B_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

var gate1Line = new Feature({
  geometry: new LineString([course.gate1B_center, course.gate1A_center], "XY"),
  props: {},
});

gate1Line.setStyle(
  new Style({
    stroke: new Stroke({
      color: course.gate1_color,
      width: 1,
      lineDash: [1, 3],
    }),
    text: new Text({
      text: course.gate1LineLength + "m",
      font: "8px sans-serif",
      color: course.gate1_color,
      textAlign: "center",
      justify: "center",
      offsetY: 5,
      rotation: course.gate1LineTextRotation,
      rotateWithView: true,
      fill: new Fill({
        color: course.gate1_color,
        width: 1,
      }),
    }),
  })
);

watch(gate1A_center, () => {
  gate1Line
    .getGeometry()
    .setCoordinates([course.gate1B_center, gate1A_center.value]);
  gate1Line.getStyle().getText().setRotation(course.gate1LineTextRotation);
});

watch(gate1B_center, () => {
  gate1Line
    .getGeometry()
    .setCoordinates([gate1B_center.value, course.gate1A_center]);
  gate1Line.getStyle().getText().setRotation(course.gate1LineTextRotation);
});

watch(gate1LineLength, () => {
  gate1Line
    .getStyle()
    .getText()
    .setText(gate1LineLength.value + "m");
});

/**
 * Gate 2
 */

var gate2A_ = new Feature({
  geometry: new Circle(course.gate2A_center, course.markRadius),
  props: {},
});

gate2A_.setStyle(
  new Style({
    fill: new Fill({
      color: course.gate2_color,
    }),
    stroke: new Stroke({
      color: course.gate2_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "2p",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
    }),
  })
);

// Translate the Mark
var gate2A_translateHandel = new Collection([gate2A_]);
// Consider Features in the raceCourseVectorLayer for translation
const gate2A_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: gate2A_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
gate2A_translate.on("translatestart", (translateEvent) => {});

gate2A_translate.on("translating", (translateEvent) => {
  course.setGate2A_offset(gate2A_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
gate2A_translate.on("translateend", (translateEvent) => {});

watch(gate2A_center, () => {
  gate2A_.getGeometry().setCenter(gate2A_center.value);
});

watch(rotation, () => {
  gate2A_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

var gate2B_ = new Feature({
  geometry: new Circle(course.gate2B_center, course.markRadius),
  props: {},
});

gate2B_.setStyle(
  new Style({
    fill: new Fill({
      color: course.gate2_color,
    }),
    stroke: new Stroke({
      color: course.gate2_color,
      width: 2,
      lineCap: "round",
    }),
    text: new Text({
      text: "2s",
      font: "10px sans-serif",
      textAlign: "center",
      justify: "center",
      rotation: -1 * course.rotation,
    }),
  })
);

// Translate the Mark
var gate2B_translateHandel = new Collection([gate2B_]);
// Consider Features in the raceCourseVectorLayer for translation
const gate2B_translate = new Translate({
  layers: [raceCourseVectorLayer],
  features: gate2B_translateHandel, // the dragHandle feature(s) is used it initiate the Translate
});

// When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
gate2B_translate.on("translatestart", (translateEvent) => {});

gate2B_translate.on("translating", (translateEvent) => {
  course.setGate2B_offset(gate2B_.getGeometry().getCenter());
});

// When the dragHandel stop translating ... retuen to Translate using the dragHandel only
gate2B_translate.on("translateend", (translateEvent) => {});

watch(gate2B_center, () => {
  gate2B_.getGeometry().setCenter(gate2B_center.value);
});

watch(rotation, () => {
  gate2B_
    .getStyle()
    .getText()
    .setRotation(-1 * rotation.value);
});

var gate2Line = new Feature({
  geometry: new LineString([course.gate2B_center, course.gate2A_center], "XY"),
  props: {},
});

gate2Line.setStyle(
  new Style({
    stroke: new Stroke({
      color: course.gate2_color,
      width: 1,
      lineDash: [1, 3],
    }),
    text: new Text({
      text: course.gate2LineLength + "m",
      font: "8px sans-serif",
      color: course.gate2_color,
      textAlign: "center",
      justify: "center",
      offsetY: 5,
      rotation: course.gate2LineTextRotation,
      rotateWithView: true,
      fill: new Fill({
        color: course.gate2_color,
        width: 1,
      }),
    }),
  })
);

watch(gate2A_center, () => {
  gate2Line
    .getGeometry()
    .setCoordinates([course.gate2B_center, gate2A_center.value]);

  gate2Line.getStyle().getText().setRotation(course.gate2LineTextRotation);
});

watch(gate2B_center, () => {
  gate2Line
    .getGeometry()
    .setCoordinates([gate2B_center.value, course.gate2A_center]);

  gate2Line.getStyle().getText().setRotation(course.gate2LineTextRotation);
});

watch(gate2LineLength, () => {
  gate2Line
    .getStyle()
    .getText()
    .setText(gate2LineLength.value + "m");
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
const raceCourseFeatures = [];

if (course.courseBoundary_visible) {
  raceCourseFeatures.push(courseBoundary_);
}

if (course.rotate_scaleHandel_visible) {
  raceCourseFeatures.push(rotate_scaleHandel);
}

if (course.scaleXHandel_visible) {
  raceCourseFeatures.push(scaleXHandel);
}

if (course.finish_visible) {
  raceCourseFeatures.push(finishCommitte_);
  raceCourseFeatures.push(finishPin_);
  raceCourseFeatures.push(finishLine_);
}

if (course.start_visible) {
  raceCourseFeatures.push(startCommitte_);
  raceCourseFeatures.push(startPin_);
  raceCourseFeatures.push(startLine_);
}

if (course.mark1_visible) {
  raceCourseFeatures.push(mark1_);
}

if (course.mark2_visible) {
  raceCourseFeatures.push(mark2_);
}

if (course.mark3_visible) {
  raceCourseFeatures.push(mark3_);
}

if (course.mark4_visible) {
  raceCourseFeatures.push(mark4_);
}

if (course.mark5_visible) {
  raceCourseFeatures.push(mark5_);
}

if (course.mark6_visible) {
  raceCourseFeatures.push(mark6_);
}

if (course.gate1_visible) {
  raceCourseFeatures.push(gate1A_);
  raceCourseFeatures.push(gate1B_);
  raceCourseFeatures.push(gate1Line);
}

if (course.gate2_visible) {
  raceCourseFeatures.push(gate2A_);
  raceCourseFeatures.push(gate2B_);
  raceCourseFeatures.push(gate2Line);
}

raceCourseVectorLayer.getSource().addFeatures(raceCourseFeatures);

// where we are placing the course
//var viewCenter = transform([course.lon, course.lat], "EPSG:4326", "EPSG:3857");

// view, starting at the center
var view = new View({
  projection: "EPSG:3857",
  center: getExtentCenter(boundingExtent(courseBoundaryArray.value[0])),
  zoom: course.zoom,
});

// finally, the map with our custom interactions, controls and overlays
var map = new Map({
  interactions: defaultInteractions().extend([
    rotate_and_scale_Interaction,
    startCommitte_translate,
    startPin_translate,
    finishCommitte_translate,
    finishPin_translate,
    mark1_translate,
    mark2_translate,
    mark3_translate,
    mark4_translate,
    mark5_translate,
    mark6_translate,
    gate1A_translate,
    gate1B_translate,
    gate2A_translate,
    gate2B_translate,
  ]),
  controls: defaultControls().extend([
    new ZoomToExtent({
      extent: boundingExtent(courseBoundaryArray.value[0]),
      label: "\uD83D\uDC41",
    }),
  ]),
});

// create a tile layer with the OSM source
var osmlayer = new Tile({
  source: new OSM(),
});

map.addLayer(osmlayer);
map.addLayer(raceCourseVectorLayer);
map.setView(view);

function mapHeight(offset, height) {
  console.log("offset, height", offset, height);
  return "height:500px,";
}

// show the map
onMounted(() => {
  raceMapHeight.value =
    "height:" + raceMap.value.parentNode.clientHeight + "px;";
  map?.setTarget(raceMap.value);
});

// garbage collect the map
onUnmounted(() => {
  map?.setTarget(undefined);
  map = undefined;
});
</script>
