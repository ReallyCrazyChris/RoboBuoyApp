<template ref="raceMapContainer">
  <div ref="raceMap" :style="mapHeightWidthStyle()"></div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

import { Map, View, Feature } from "ol";

import { Tile, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Circle, LineString, Point } from "ol/geom";
import Collection from "ol/Collection";
import { getCenter } from "ol/extent";

import { fromUserExtent, getPointResolution } from "ol/proj";
import { fromExtent as polygonFromExtent } from "ol/geom/Polygon";

import { Translate, defaults as defaultInteractions } from "ol/interaction";

import {
  Zoom,
  ZoomToExtent,
  Attribution,
  defaults as defaultControls,
} from "ol/control";
import { Style, Fill, Stroke, Text } from "ol/style";
import { useRaceCourse } from "src/stores/raceCourse";

const course = useRaceCourse();

const props = defineProps({
  height: Number,
  width: Number,
  showMap: Boolean,
  showZoom: Boolean,
  showTitle: Boolean,
  showSequence: Boolean,
  showBoundary: Boolean,
  showAttribution: Boolean,
  showControls: Boolean,
  canEdit: Boolean,
});

function titleFactory() {
  var labelFeature = new Feature({
    geometry: new Point(course.forwardTransform(course.title.offset)),
  });

  labelFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: course.title.color,
      }),
      stroke: new Stroke({
        color: course.title.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: course.title.description,
        font: Math.round(18 / resolution) + "px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,

        overflow: false,
        placement: "point",
        padding: [0, 100, 0, 100],
        declutterMode: "declutter",
        scale: 1,
      }),
    });
  });

  const titleTranslate = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([labelFeature]),
  });

  titleTranslate.on("translating", (translateEvent) => {
    course.title.offset = course.reverseTransform(translateEvent.coordinate);
  });

  titleTranslate.on("translateend", (translateEvent) => {
    // fit the rotated cource to the view
  });

  watch(course, () => {
    labelFeature
      .getGeometry()
      .setCoordinates(course.forwardTransform(course.title.offset));
  });

  return {
    features: [labelFeature],
    interactions: [titleTranslate],
  };
}

function sequenceFactory() {
  var sequenceFeature = new Feature({
    geometry: new Point(course.forwardTransform(course.sequence.offset)),
  });

  sequenceFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: course.sequence.color,
      }),
      stroke: new Stroke({
        color: course.sequence.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: course.sequence.options[course.sequence.id].description,
        font: Math.round(16 / resolution) + "px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,

        overflow: false,
        placement: "line",
        padding: [0, 100, 0, 100],
        declutterMode: "declutter",
        scale: 1,
      }),
    });
  });

  const sequenceTranslate = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([sequenceFeature]),
  });

  sequenceTranslate.on("translating", (translateEvent) => {
    course.sequence.offset = course.reverseTransform(translateEvent.coordinate);
  });

  sequenceTranslate.on("translateend", (translateEvent) => {
    // fit the rotated cource to the view
  });

  watch(course, () => {
    sequenceFeature
      .getGeometry()
      .setCoordinates(course.forwardTransform(course.sequence.offset));
  });

  return {
    features: [sequenceFeature],
    interactions: [sequenceTranslate],
  };
}

function courseControlFactory() {
  var anchorHandel = new Feature({
    geometry: new Circle(course.centerOfRotation, 0),
  });

  anchorHandel.setStyle((feature, resolution) => {
    feature.getGeometry().setRadius(Math.round(resolution * 12));

    return new Style({
      fill: new Fill({
        color: course.controls.anchorHandle.color,
      }),
      stroke: new Stroke({
        color: course.controls.anchorHandle.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u2693",
        font: "16px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
      }),
    });
  });

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
    geometry: new Circle(course.getRotateHandleCenter(), 0),
  });

  rotateHandle.setStyle((feature, resolution) => {
    feature.getGeometry().setRadius(Math.round(resolution * 10));

    return new Style({
      fill: new Fill({
        color: course.controls.rotateHandle.color,
      }),
      stroke: new Stroke({
        color: course.controls.rotateHandle.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u27F3",
        font: "16px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,

        overflow: false,
        placement: "line",
        padding: [0, 100, 0, 100],
        declutterMode: "declutter",
      }),
    });
  });

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

  scaleXHandle.setStyle((feature, resolution) => {
    feature.getGeometry().setRadius(Math.round(resolution * 10));

    return new Style({
      fill: new Fill({
        color: course.controls.scaleXHandle.color,
      }),
      stroke: new Stroke({
        color: course.controls.scaleXHandle.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u2194",
        font: "16px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
      }),
    });
  });

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

  scaleYHandle.setStyle((feature, resolution) => {
    feature.getGeometry().setRadius(Math.round(resolution * 10));

    return new Style({
      fill: new Fill({
        color: course.controls.scaleYHandle.color,
      }),
      stroke: new Stroke({
        color: course.controls.scaleYHandle.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u2195",
        font: "16px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
      }),
    });
  });

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

function markFactory(markId, mark) {
  const markFeature = new Feature({
    geometry: new Circle(course.getMarkCenter(markId), mark.radius),
  });

  markFeature.setStyle((feature, resolution) => {
    return new Style({
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
        font: Math.round(18 / resolution) + "px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
        olverflow: false,
      }),
    });
  });

  const translateHandel = new Collection([markFeature]);

  const translate = new Translate({
    layers: [courseVectorLayer],
    features: translateHandel,
  });

  translate.on("translating", (translateEvent) => {
    course.setMarkOffset(markId, translateEvent.coordinate);
  });

  watch(course, () => {
    markFeature.getGeometry().setCenter(course.getMarkCenter(markId));
  });

  const interactions = [];
  const features = [];

  if (!!!mark.hidden) {
    features.push(markFeature);
  }

  if (!!!mark.locked) {
    interactions.push(translate);
  }

  return { features: features, interactions: interactions };
}

function gateFactory(gateId, gate) {
  const leftMark = course.getMark(gate.leftId);
  const rightMark = course.getMark(gate.rightId);

  const leftMarkFeature = new Feature({
    geometry: new Circle(course.getMarkCenter(gate.leftId), leftMark.radius),
  });

  const rightMarkFeature = new Feature({
    geometry: new Circle(course.getMarkCenter(gate.rightId), rightMark.radius),
  });

  leftMarkFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: leftMark.color,
      }),
      stroke: new Stroke({
        color: leftMark.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: leftMark.text,
        font: Math.round(16 / resolution) + "px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getTextRotation(gate.leftId, gate.rightId),
      }),
    });
  });

  rightMarkFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: rightMark.color,
      }),
      stroke: new Stroke({
        color: rightMark.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: rightMark.text,
        font: Math.round(16 / resolution) + "px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getTextRotation(gate.leftId, gate.rightId),
      }),
    });
  });

  var gateLineFeature = new Feature({
    geometry: new LineString(
      [course.getMarkCenter(gate.leftId), course.getMarkCenter(gate.leftId)],
      "XY"
    ),
  });

  gateLineFeature.setStyle((feature, resolution) => {
    return new Style({
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
          course.getLineLength(gate.leftId, gate.rightId) +
          "m",
        font: Math.round(16 / resolution) + "px sans-serif",
        color: gate.color,
        textAlign: "center",
        justify: "center",
        offsetY: 0,
        rotation: course.getTextRotation(gate.leftId, gate.rightId),
        rotateWithView: true,
        fill: new Fill({
          color: gate.color,
          width: 1,
        }),
        placement: "line",
      }),
    });
  });

  const translateLeftMark = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([leftMarkFeature]),
  });

  translateLeftMark.on("translating", (translateEvent) => {
    course.setMarkOffset(gate.leftId, translateEvent.coordinate);
  });

  const translateRightMark = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([rightMarkFeature]),
  });

  translateRightMark.on("translating", (translateEvent) => {
    course.setMarkOffset(gate.rightId, translateEvent.coordinate);
  });

  watch(course, () => {
    leftMarkFeature.getGeometry().setCenter(course.getMarkCenter(gate.leftId));
    rightMarkFeature
      .getGeometry()
      .setCenter(course.getMarkCenter(gate.rightId));

    gateLineFeature
      .getGeometry()
      .setCoordinates([
        course.getMarkCenter(gate.leftId),
        course.getMarkCenter(gate.rightId),
      ]);
  });

  const interactions = [];
  if (!!!leftMark.locked) {
    interactions.push(translateLeftMark);
  }
  if (!!!rightMark.locked) {
    interactions.push(translateRightMark);
  }

  return {
    features: [leftMarkFeature, rightMarkFeature, gateLineFeature],
    interactions: interactions,
  };
}

function lineFactory(lineId, line) {
  const leftPoint = course.getMark(line.leftId);
  const rightPoint = course.getMark(line.rightId);

  const leftPointFeature = new Feature({
    geometry: new Circle(course.getMarkCenter(line.leftId), leftPoint.radius),
  });

  const rightPointFeature = new Feature({
    geometry: new Circle(course.getMarkCenter(line.rightId), rightPoint.radius),
  });

  leftPointFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: leftPoint.color,
      }),
      stroke: new Stroke({
        color: leftPoint.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: leftPoint.text,
        font: Math.round(16 / resolution) + "px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getTextRotation(line.leftId, line.rightId),
      }),
    });
  });

  rightPointFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: rightPoint.color,
      }),
      stroke: new Stroke({
        color: rightPoint.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: rightPoint.text,
        font: Math.round(16 / resolution) + "px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getTextRotation(line.leftId, line.rightId),
      }),
    });
  });

  var lineFeature = new Feature({
    geometry: new LineString(
      [course.getMarkCenter(line.leftId), course.getMarkCenter(line.leftId)],
      "XY"
    ),
    props: {},
  });

  lineFeature.setStyle((feature, resolution) => {
    return new Style({
      stroke: new Stroke({
        color: line.color,
        width: 1,
        lineDash: [1, 3],
      }),
      text: new Text({
        text:
          "          " +
          line.text +
          "          \n" +
          course.getLineLength(line.leftId, line.rightId) +
          "m",
        font: Math.round(16 / resolution) + "px sans-serif",
        color: line.color,
        textAlign: "center",
        justify: "center",
        offsetY: 0,
        rotation: course.getTextRotation(line.leftId, line.rightId),
        rotateWithView: true,
        fill: new Fill({
          color: line.color,
          width: 1,
        }),
        placement: "line",
      }),
    });
  });

  const translateLeftMark = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([leftPointFeature]),
  });

  translateLeftMark.on("translating", (translateEvent) => {
    course.setMarkOffset(line.leftId, translateEvent.coordinate);
  });

  const translateRightMark = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([rightPointFeature]),
  });

  translateRightMark.on("translating", (translateEvent) => {
    course.setMarkOffset(line.rightId, translateEvent.coordinate);
  });

  watch(course, () => {
    leftPointFeature.getGeometry().setCenter(course.getMarkCenter(line.leftId));
    rightPointFeature
      .getGeometry()
      .setCenter(course.getMarkCenter(line.rightId));

    lineFeature
      .getGeometry()
      .setCoordinates([
        course.getMarkCenter(line.leftId),
        course.getMarkCenter(line.rightId),
      ]);
  });

  const interactions = [];
  if (!!!leftPoint.locked) {
    interactions.push(translateLeftMark);
  }
  if (!!!rightPoint.locked) {
    interactions.push(translateRightMark);
  }

  return {
    features: [leftPointFeature, rightPointFeature, lineFeature],
    interactions: interactions,
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

var courseFeatures = [];
var courseInteractions = [];

if (props.showTitle) {
  const titleProduct = titleFactory();
  courseFeatures.push(...titleProduct.features);
  courseInteractions.push(...titleProduct.interactions);
}

if (props.showSequence) {
  const sequenceProduct = sequenceFactory();
  courseFeatures.push(...sequenceProduct.features);
  courseInteractions.push(...sequenceProduct.interactions);
}

if (props.showBoundary) {
  for (var lineId in course.marks) {
    if (course.marks[lineId].type == "line") {
      const product = lineFactory(lineId, course.marks[lineId]);
      courseFeatures.push(...product.features);
      if (props.canEdit) {
        courseInteractions.push(...product.interactions);
      }
    }
  }
}

for (var markId in course.marks) {
  if (course.marks[markId].type == "buoy") {
    const product = markFactory(markId, course.marks[markId]);
    courseFeatures.push(...product.features);
    if (props.canEdit) {
      courseInteractions.push(...product.interactions);
    }
  }
}

for (var gateId in course.marks) {
  if (course.marks[gateId].type == "gate") {
    const product = gateFactory(gateId, course.marks[gateId]);
    courseFeatures.push(...product.features);
    if (props.canEdit) {
      courseInteractions.push(...product.interactions);
    }
  }
}

if (props.showControls) {
  const controlsProduct = courseControlFactory();
  courseFeatures.push(...controlsProduct.features);
  courseInteractions.push(...controlsProduct.interactions);
}

courseVectorLayer.getSource().addFeatures(courseFeatures);

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

function getControls() {
  const controls = [];

  if (props.showAttribution) {
    controls.push(new Attribution());
  }

  if (props.showZoom) {
    controls.push(new Zoom());
    controls.push(zoomToExtent);
  }

  return controls;
}

// finally, the map with our custom interactions, controls and overlays
var map = new Map({
  interactions: defaultInteractions().extend(courseInteractions),
  controls: getControls(),
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

function mapHeightWidthStyle() {
  console.log("height:" + props.height + "px; ");
  return "height:" + props.height + "px; ";
}

// show the map
onMounted(() => {
  map?.setTarget(raceMap.value);
  view.fit(polygonFromExtent(course.getExtent()));
});

// garbage collect the map
onUnmounted(() => {
  map?.setTarget(undefined);
  map = undefined;
});
</script>
