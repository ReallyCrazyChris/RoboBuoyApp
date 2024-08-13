<template>
  <div ref="raceMap" :style="raceMapHeight"></div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

import { Map, View, Feature } from "ol";

import { Tile, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Circle, LineString } from "ol/geom";
import Collection from "ol/Collection";
import { getCenter } from "ol/extent";

import { fromUserExtent, getPointResolution } from "ol/proj";
import { fromExtent as polygonFromExtent } from "ol/geom/Polygon";

import { Translate, defaults as defaultInteractions } from "ol/interaction";

import { ZoomToExtent, defaults as defaultControls } from "ol/control";
import { Style, Fill, Stroke, Text } from "ol/style";
import { useRaceCourse } from "src/stores/raceCourse";

const course = useRaceCourse();

const props = defineProps({
  mapHeight: Number,
  mapWidth: Number,
  editCourse: Boolean,
  showBoundary: Boolean,
  showMap: Boolean,
});

function courseControlFactory() {
  var anchorHandel = new Feature({
    geometry: new Circle(course.centerOfRotation, 16),
  });

  anchorHandel.setStyle(
    new Style({
      fill: new Fill({
        color: course.anchorHandle.color,
      }),
      stroke: new Stroke({
        color: course.anchorHandle.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u2693",
        font: "12px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
      }),
    })
  );

  const anchorHandleTranslate = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([anchorHandel]),
  });

  anchorHandleTranslate.on("translating", (translateEvent) => {
    course.setAnchorHandleOffset(translateEvent.coordinate);
  });

  anchorHandleTranslate.on("translateend", (translateEvent) => {
    // fit the rotated cource to the view
    view.fit(polygonFromExtent(course.getExtent()));
  });

  var rotateHandle = new Feature({
    geometry: new Circle(course.getRotateHandleCenter(), 16),
  });

  rotateHandle.setStyle(
    new Style({
      fill: new Fill({
        color: course.rotateHandle.color,
      }),
      stroke: new Stroke({
        color: course.rotateHandle.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u27F3",
        font: "14px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,

        overflow: false,
        placement: "line",
        padding: [0, 100, 0, 100],
        declutterMode: "declutter",
      }),
    })
  );

  // Translate the Mark

  const rotateHandleTranslate = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([rotateHandle]),
  });

  rotateHandleTranslate.on("translating", (translateEvent) => {
    course.setCourseRotation(translateEvent.coordinate);
  });

  rotateHandleTranslate.on("translateend", (translateEvent) => {
    // fit the rotated cource to the view
    view.fit(polygonFromExtent(course.getExtent()));
  });

  var scaleXHandle = new Feature({
    geometry: new Circle(course.getScaleXHandleCenter(), 16),
  });

  scaleXHandle.setStyle(
    new Style({
      fill: new Fill({
        color: course.scaleXHandle.color,
      }),
      stroke: new Stroke({
        color: course.scaleXHandle.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u2194",
        font: "10px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
      }),
    })
  );

  const scaleXHandleTranslate = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([scaleXHandle]),
  });

  scaleXHandleTranslate.on("translating", (translateEvent) => {
    course.setCourseScaleX(translateEvent.coordinate);
  });

  scaleXHandleTranslate.on("translateend", (translateEvent) => {
    // fit the rotated cource to the view
    view.fit(polygonFromExtent(course.getExtent()));
  });

  var scaleYHandle = new Feature({
    geometry: new Circle(course.getScaleYHandleCenter(), 16),
  });

  scaleYHandle.setStyle(
    new Style({
      fill: new Fill({
        color: course.scaleYHandle.color,
      }),
      stroke: new Stroke({
        color: course.scaleYHandle.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u2195",
        font: "10px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
      }),
    })
  );

  const scaleYHandleTranslate = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([scaleYHandle]),
  });

  scaleYHandleTranslate.on("translating", (translateEvent) => {
    course.setCourseScaleY(translateEvent.coordinate);
  });

  scaleYHandleTranslate.on("translateend", (translateEvent) => {
    // fit the rotated cource to the view
    view.fit(polygonFromExtent(course.getExtent()));
  });

  watch(course, () => {
    rotateHandle.getGeometry().setCenter(course.getRotateHandleCenter());
    scaleXHandle.getGeometry().setCenter(course.getScaleXHandleCenter());
    scaleYHandle.getGeometry().setCenter(course.getScaleYHandleCenter());

    anchorHandel
      .getStyle()
      .getText()
      .setRotation(-1 * course.rotation);
    rotateHandle
      .getStyle()
      .getText()
      .setRotation(-1 * course.rotation);
    scaleXHandle
      .getStyle()
      .getText()
      .setRotation(-1 * course.rotation);
    scaleYHandle
      .getStyle()
      .getText()
      .setRotation(-1 * course.rotation);
  });

  return {
    features: [anchorHandel, rotateHandle, scaleXHandle, scaleYHandle],
    interactions: [
      anchorHandleTranslate,
      rotateHandleTranslate,
      scaleXHandleTranslate,
      scaleYHandleTranslate,
    ],
  };
}

function markFactory(mark) {
  const markFeature = new Feature({
    geometry: new Circle(course.getMarkCenter(mark), mark.radius),
    props: {},
  });

  markFeature.setStyle(
    new Style({
      fill: new Fill({
        color: mark.color,
      }),
      stroke: new Stroke({
        color: mark.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: mark.text,
        font: "10px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
        olverflow: false,
      }),
    })
  );

  const translateHandel = new Collection([markFeature]);

  const translate = new Translate({
    layers: [courseVectorLayer],
    features: translateHandel,
  });

  translate.on("translating", (translateEvent) => {
    course.setMarkOffset(mark, translateEvent.coordinate);
  });

  watch(course, () => {
    markFeature.getGeometry().setCenter(course.getMarkCenter(mark));
    markFeature
      .getStyle()
      .getText()
      .setRotation(-1 * course.rotation);
  });

  return { features: [markFeature], interactions: [translate] };
}

function gateFactory(gate) {
  const gatePFeature = new Feature({
    geometry: new Circle(course.getGatePCenter(gate), gate.p.radius),
  });

  const gateSFeature = new Feature({
    geometry: new Circle(course.getGateSCenter(gate), gate.s.radius),
  });

  gatePFeature.setStyle(
    new Style({
      fill: new Fill({
        color: gate.color,
      }),
      stroke: new Stroke({
        color: gate.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: gate.p.text,
        font: "10px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getGateTextRotation(gate),
      }),
    })
  );

  gateSFeature.setStyle(
    new Style({
      fill: new Fill({
        color: gate.color,
      }),
      stroke: new Stroke({
        color: gate.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: gate.s.text,
        font: "10px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getGateTextRotation(gate),
      }),
    })
  );

  var gateLine = new Feature({
    geometry: new LineString(
      [course.getGatePCenter(gate), course.getGateSCenter(gate)],
      "XY"
    ),
    props: {},
  });

  gateLine.setStyle(
    new Style({
      stroke: new Stroke({
        color: gate.color,
        width: 1,
        lineDash: [1, 3],
      }),
      text: new Text({
        text:
          "          " +
          gate.text +
          "          \n" +
          course.getGateLineLength(gate) +
          "m",
        font: "8px sans-serif",
        color: gate.color,
        textAlign: "center",
        justify: "center",
        offsetY: 0,
        rotation: course.getGateTextRotation(gate),
        rotateWithView: true,
        fill: new Fill({
          color: gate.color,
          width: 1,
        }),
        placement: "line",
      }),
    })
  );

  const translatePHandel = new Collection([gatePFeature]);

  const translateP = new Translate({
    layers: [courseVectorLayer],
    features: translatePHandel,
  });

  translateP.on("translating", (translateEvent) => {
    course.setGatePOffset(gate, translateEvent.coordinate);
  });

  const translateSHandel = new Collection([gateSFeature]);

  const translateS = new Translate({
    layers: [courseVectorLayer],
    features: translateSHandel,
  });

  translateS.on("translating", (translateEvent) => {
    course.setGateSOffset(gate, translateEvent.coordinate);
  });

  watch(course, () => {
    gatePFeature.getGeometry().setCenter(course.getGatePCenter(gate));
    gateSFeature.getGeometry().setCenter(course.getGateSCenter(gate));

    gateLine
      .getGeometry()
      .setCoordinates([
        course.getGatePCenter(gate),
        course.getGateSCenter(gate),
      ]);

    gateLine
      .getStyle()
      .getText()
      .setText(gate.text + "\n" + course.getGateLineLength(gate) + "m");

    gatePFeature
      .getStyle()
      .getText()
      .setRotation(course.getGateTextRotation(gate));

    gateSFeature
      .getStyle()
      .getText()
      .setRotation(course.getGateTextRotation(gate));

    gateLine.getStyle().getText().setRotation(course.getGateTextRotation(gate));
  });

  const interactions = [];
  if (!!!gate.p.locked) {
    interactions.push(translateP);
  }
  if (!!!gate.s.locked) {
    interactions.push(translateS);
  }

  return {
    features: [gatePFeature, gateSFeature, gateLine],
    interactions: interactions,
  };
}

function lineFactory(line) {
  const linePFeature = new Feature({
    geometry: new Circle(course.getLinePCenter(line), line.p.radius),
  });

  const lineSFeature = new Feature({
    geometry: new Circle(course.getLineSCenter(line), line.s.radius),
  });

  linePFeature.setStyle(
    new Style({
      fill: new Fill({
        color: line.color,
      }),
      stroke: new Stroke({
        color: line.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: line.p.text,
        font: "10px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getLineTextRotation(line),
      }),
    })
  );

  lineSFeature.setStyle(
    new Style({
      fill: new Fill({
        color: line.color,
      }),
      stroke: new Stroke({
        color: line.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: line.s.text,
        font: "10px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getLineTextRotation(line),
      }),
    })
  );

  var lineLine = new Feature({
    geometry: new LineString(
      [course.getLinePCenter(line), course.getLineSCenter(line)],
      "XY"
    ),
    props: {},
  });

  lineLine.setStyle(
    new Style({
      stroke: new Stroke({
        color: line.color,
        width: 1,
        lineDash: [1, 3],
      }),
      text: new Text({
        text:
          "          " +
          line.text +
          "          \n               " +
          course.getLineLineLength(line) +
          "m                ",
        font: "8px sans-serif",
        color: line.color,
        textAlign: "center",
        justify: "center",
        offsetY: 0,
        rotation: course.getLineTextRotation(line),
        rotateWithView: true,
        fill: new Fill({
          color: line.color,
          width: 1,
        }),
        overflow: false,
        placement: "line",
        padding: [0, 100, 0, 100],
        declutterMode: "declutter",
      }),
    })
  );

  const translatePHandel = new Collection([linePFeature]);

  const translateP = new Translate({
    layers: [courseVectorLayer],
    features: translatePHandel,
  });

  translateP.on("translating", (translateEvent) => {
    course.setLinePOffset(line, translateEvent.coordinate);
  });

  const translateSHandel = new Collection([lineSFeature]);

  const translateS = new Translate({
    layers: [courseVectorLayer],
    features: translateSHandel,
  });

  translateS.on("translating", (translateEvent) => {
    course.setLineSOffset(line, translateEvent.coordinate);
  });

  watch(course, () => {
    linePFeature.getGeometry().setCenter(course.getLinePCenter(line));
    lineSFeature.getGeometry().setCenter(course.getLineSCenter(line));

    lineLine
      .getGeometry()
      .setCoordinates([
        course.getLinePCenter(line),
        course.getLineSCenter(line),
      ]);

    lineLine
      .getStyle()
      .getText()
      .setText(line.text + "\n" + course.getLineLineLength(line) + "m");

    linePFeature
      .getStyle()
      .getText()
      .setRotation(course.getLineTextRotation(line));

    lineSFeature
      .getStyle()
      .getText()
      .setRotation(course.getLineTextRotation(line));

    lineLine.getStyle().getText().setRotation(course.getLineTextRotation(line));
  });

  return {
    features: [linePFeature, lineSFeature, lineLine],
    interactions: [], // [translateP, translateS],
  };
}

/**********************
 * Cource Vector Layer
 * ********************
 */

// create a vector layer representing the course
var courseVectorLayer = new VectorLayer({
  name: "courseVectorLayer",
  source: new VectorSource({ wrapX: false }),
});

var courseFeaturesProducts = [];
var raceCourseInteractions = [];

if (props.showBoundary) {
  for (var line of course.lines) {
    const lineProduct = lineFactory(line);
    courseFeaturesProducts.push(...lineProduct.features);
    if (props.editCourse) {
      raceCourseInteractions.push(...lineProduct.interactions);
    }
  }
}

for (var mark of course.marks) {
  const markProduct = markFactory(mark);
  courseFeaturesProducts.push(...markProduct.features);
  if (props.editCourse) {
    raceCourseInteractions.push(...markProduct.interactions);
  }
}

for (var gate of course.gates) {
  const gateProduct = gateFactory(gate);
  courseFeaturesProducts.push(...gateProduct.features);
  if (props.editCourse) {
    raceCourseInteractions.push(...gateProduct.interactions);
  }
}

if (props.editCourse) {
  const boundryProduct = courseControlFactory();
  courseFeaturesProducts.push(...boundryProduct.features);
  raceCourseInteractions.push(...boundryProduct.interactions);
}

courseVectorLayer.getSource().addFeatures(courseFeaturesProducts);

watch(course, (a, b, c) => {
  console.log(a, b, c);
});

// view, starting at the center
var view = new View({
  projection: "EPSG:3857",
  center: getCenter(course.getExtent()),
  zoom: 17,
});

// used to calibrate the course to use metric meters
course.pointResolution = getPointResolution(
  view.getProjection(),
  1,
  view.getCenter()
);

// Interactions
var zoomToExtent = new ZoomToExtent({
  extent: course.getExtent(),
  label: "\uD83D\uDC41",
});

// brings the the couse into view
zoomToExtent.handleZoomToExtent = function () {
  const map = zoomToExtent.getMap();
  const view = map.getView();
  const extent = !course.getExtent()
    ? view.getProjection().getExtent()
    : fromUserExtent(course.getExtent(), view.getProjection());

  view.fitInternal(polygonFromExtent(extent));
};

// finally, the map with our custom interactions, controls and overlays
var map = new Map({
  interactions: defaultInteractions().extend(raceCourseInteractions),
  controls: defaultControls().extend([zoomToExtent]),
});

// create a tile layer with the OSM source
var osmlayer = new Tile({
  source: new OSM(),
});

if (props.showMap) {
  map.addLayer(osmlayer);
}
map.addLayer(courseVectorLayer);
map.setView(view);

const raceMap = ref();
const raceMapHeight = ref("height:500px");

// show the map
onMounted(() => {
  raceMapHeight.value =
    "height:" + raceMap.value.parentNode.clientHeight + "px;";
  map?.setTarget(raceMap.value);
  view.fit(polygonFromExtent(course.getExtent()));
});

// garbage collect the map
onUnmounted(() => {
  map?.setTarget(undefined);
  map = undefined;
});
</script>
