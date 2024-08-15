<template ref="raceMapContainer">
  <div ref="raceMap" :style="mapHeightWidthStyle()"></div>
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
  showBoundary: Boolean,
  showZoom: Boolean,
  showAttribution: Boolean,
  showControls: Boolean,
  canEdit: Boolean,
});

function courseControlFactory() {
  var anchorHandel = new Feature({
    geometry: new Circle(course.centerOfRotation, 16),
  });

  anchorHandel.setStyle(
    new Style({
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
        color: course.controls.rotateHandle.color,
      }),
      stroke: new Stroke({
        color: course.controls.rotateHandle.color,
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
        color: course.controls.scaleXHandle.color,
      }),
      stroke: new Stroke({
        color: course.controls.scaleXHandle.color,
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
        color: course.controls.scaleYHandle.color,
      }),
      stroke: new Stroke({
        color: course.controls.scaleYHandle.color,
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

function markFactory(markId, mark) {
  const markFeature = new Feature({
    geometry: new Circle(course.getMarkCenter(markId), mark.radius),
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
    course.setMarkOffset(markId, translateEvent.coordinate);
  });

  watch(course, () => {
    markFeature.getGeometry().setCenter(course.getMarkCenter(markId));
    markFeature
      .getStyle()
      .getText()
      .setRotation(-1 * course.rotation);
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
  const leftMark = course.getMark(gate.leftMarkId);
  const rightMark = course.getMark(gate.rightMarkId);

  const leftMarkFeature = new Feature({
    geometry: new Circle(
      course.getMarkCenter(gate.leftMarkId),
      leftMark.radius
    ),
  });

  const rightMarkFeature = new Feature({
    geometry: new Circle(
      course.getMarkCenter(gate.rightMarkId),
      rightMark.radius
    ),
  });

  leftMarkFeature.setStyle(
    new Style({
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
        font: "10px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getTextRotation(gate.leftMarkId, gate.rightMarkId),
      }),
    })
  );

  rightMarkFeature.setStyle(
    new Style({
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
        font: "10px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getTextRotation(gate.leftMarkId, gate.rightMarkId),
      }),
    })
  );

  var gateLineFeature = new Feature({
    geometry: new LineString(
      [
        course.getMarkCenter(gate.leftMarkId),
        course.getMarkCenter(gate.leftMarkId),
      ],
      "XY"
    ),
    props: {},
  });

  gateLineFeature.setStyle(
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
        rotation: course.getTextRotation(gate.leftMarkId, gate.rightMarkId),
        rotateWithView: true,
        fill: new Fill({
          color: gate.color,
          width: 1,
        }),
        placement: "line",
      }),
    })
  );

  const translateLeftMark = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([leftMarkFeature]),
  });

  translateLeftMark.on("translating", (translateEvent) => {
    course.setMarkOffset(gate.leftMarkId, translateEvent.coordinate);
  });

  const translateRightMark = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([rightMarkFeature]),
  });

  translateRightMark.on("translating", (translateEvent) => {
    course.setMarkOffset(gate.rightMarkId, translateEvent.coordinate);
  });

  watch(course, () => {
    leftMarkFeature
      .getGeometry()
      .setCenter(course.getMarkCenter(gate.leftMarkId));
    rightMarkFeature
      .getGeometry()
      .setCenter(course.getMarkCenter(gate.rightMarkId));

    gateLineFeature
      .getGeometry()
      .setCoordinates([
        course.getMarkCenter(gate.leftMarkId),
        course.getMarkCenter(gate.rightMarkId),
      ]);

    gateLineFeature
      .getStyle()
      .getText()
      .setText(gate.text + "\n" + course.getGateLineLength(gate) + "m");

    gateLineFeature
      .getStyle()
      .getText()
      .setRotation(course.getTextRotation(gate.leftMarkId, gate.rightMarkId));

    leftMarkFeature
      .getStyle()
      .getText()
      .setRotation(course.getTextRotation(gate.leftMarkId, gate.rightMarkId));

    rightMarkFeature
      .getStyle()
      .getText()
      .setRotation(course.getTextRotation(gate.leftMarkId, gate.rightMarkId));
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
  console.log(lineId, line);

  const leftPoint = course.getMark(line.leftPointId);
  const rightPoint = course.getMark(line.rightPointId);

  const leftPointFeature = new Feature({
    geometry: new Circle(
      course.getMarkCenter(line.leftPointId),
      leftPoint.radius
    ),
  });

  const rightPointFeature = new Feature({
    geometry: new Circle(
      course.getMarkCenter(line.rightPointId),
      rightPoint.radius
    ),
  });

  leftPointFeature.setStyle(
    new Style({
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
        font: "10px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getTextRotation(line.leftPointId, line.rightPointId),
      }),
    })
  );

  rightPointFeature.setStyle(
    new Style({
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
        font: "10px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getTextRotation(line.leftPointId, line.rightPointId),
      }),
    })
  );

  var lineLineFeature = new Feature({
    geometry: new LineString(
      [
        course.getMarkCenter(line.leftPointId),
        course.getMarkCenter(line.leftPointId),
      ],
      "XY"
    ),
    props: {},
  });

  lineLineFeature.setStyle(
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
          "          \n" +
          course.getLineLength(line.leftPointId, line.rightPointId) +
          "m",
        font: "8px sans-serif",
        color: line.color,
        textAlign: "center",
        justify: "center",
        offsetY: 0,
        rotation: course.getTextRotation(line.leftPointId, line.rightPointId),
        rotateWithView: true,
        fill: new Fill({
          color: line.color,
          width: 1,
        }),
        placement: "line",
      }),
    })
  );

  const translateLeftMark = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([leftPointFeature]),
  });

  translateLeftMark.on("translating", (translateEvent) => {
    course.setMarkOffset(line.leftPointId, translateEvent.coordinate);
  });

  const translateRightMark = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([rightPointFeature]),
  });

  translateRightMark.on("translating", (translateEvent) => {
    course.setMarkOffset(line.rightPointId, translateEvent.coordinate);
  });

  watch(course, () => {
    leftPointFeature
      .getGeometry()
      .setCenter(course.getMarkCenter(line.leftPointId));
    rightPointFeature
      .getGeometry()
      .setCenter(course.getMarkCenter(line.rightPointId));

    lineLineFeature
      .getGeometry()
      .setCoordinates([
        course.getMarkCenter(line.leftPointId),
        course.getMarkCenter(line.rightPointId),
      ]);

    lineLineFeature
      .getStyle()
      .getText()
      .setText(
        line.text +
          "\n" +
          course.getLineLength(line.leftPointId, line.rightPointId) +
          "m"
      );

    lineLineFeature
      .getStyle()
      .getText()
      .setRotation(course.getTextRotation(line.leftPointId, line.rightPointId));

    leftPointFeature
      .getStyle()
      .getText()
      .setRotation(course.getTextRotation(line.leftPointId, line.rightPointId));

    rightPointFeature
      .getStyle()
      .getText()
      .setRotation(course.getTextRotation(line.leftPointId, line.rightPointId));
  });

  const interactions = [];
  if (!!!leftPoint.locked) {
    interactions.push(translateLeftMark);
  }
  if (!!!rightPoint.locked) {
    interactions.push(translateRightMark);
  }

  return {
    features: [leftPointFeature, rightPointFeature, lineLineFeature],
    interactions: interactions,
  };
}

function _______________lineFactory(line) {
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

var courseFeatures = [];
var courseInteractions = [];

/*
if (props.showBoundary) {
  for (var line of course.lines) {
    const lineProduct = lineFactory(line);
    courseFeatures.push(...lineProduct.features);
    if (props.canEdit) {
      courseInteractions.push(...lineProduct.interactions);
    }
  }
}*/

/*
for (var mark of course.marks) {
  const markProduct = markFactory(mark);
  courseFeatures.push(...markProduct.features);
  if (props.canEdit) {
    courseInteractions.push(...markProduct.interactions);
  }
}*/

/*
for (var gate of course.gates) {
  const gateProduct = gateFactory(gate);
  courseFeatures.push(...gateProduct.features);
  if (props.canEdit) {
    courseInteractions.push(...gateProduct.interactions);
  }
}*/

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

for (var lineId in course.marks) {
  if (course.marks[lineId].type == "line") {
    const product = lineFactory(lineId, course.marks[lineId]);
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
