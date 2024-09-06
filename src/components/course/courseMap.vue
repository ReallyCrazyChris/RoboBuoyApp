<template>
  <div ref="courseMap" :style="'height:' + props.height + 'px; '"></div>
</template>

<style lang="scss">
.ol-zoom-extent {
  width: 0px;
}

.ol-zoom-extent button {
  margin-left: 10px;
  margin-top: 10px;
}
</style>

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
import CircleStyle from "ol/style/Circle";

import { useRaceCourse } from "src/stores/raceCourse";
const course = useRaceCourse();

const props = defineProps({
  height: Number,
  width: Number,
  showMap: Boolean,
  showZoom: Boolean,
  showSequence: Boolean,
  showBoundary: Boolean,
  showAttribution: Boolean,
  showControls: Boolean,
  readonly: Boolean,
});

function anchorFactory(anchorHandle) {
  var anchorFeature = new Feature({
    geometry: new Circle(course.centerOfRotation, 20),
  });

  anchorFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: anchorHandle.color,
      }),
      stroke: new Stroke({
        color: anchorHandle.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u2693",
        font: "24px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
      }),
    });
  });

  const anchorFeatureTranslate = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([anchorFeature]),
  });

  anchorFeatureTranslate.on("translating", (translateEvent) => {
    course.centerOfRotation = translateEvent.coordinate;
  });

  anchorFeatureTranslate.on("translateend", (translateEvent) => {
    view.fit(polygonFromExtent(course.getExtent()));
    course.publishRaceCourseState();
  });

  watch(course, () => {
    anchorFeature.getGeometry().setCenter(course.centerOfRotation);
  });

  return {
    features: [anchorFeature],
    interactions: [anchorFeatureTranslate],
  };
}

function rotateFactory(rotateHandle) {
  var rotateFeature = new Feature({
    geometry: new Circle(course.forwardTransform(rotateHandle.offset), 40),
  });

  rotateFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: rotateHandle.color,
      }),
      stroke: new Stroke({
        color: rotateHandle.color,
        width: 15,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u21BA",
        font: "24px sans-serif",
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

  const rotateFeatureTranslate = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([rotateFeature]),
  });

  rotateFeatureTranslate.on("translating", (translateEvent) => {
    course.setCourseRotation(translateEvent.coordinate);
  });

  rotateFeatureTranslate.on("translateend", (translateEvent) => {
    view.fit(polygonFromExtent(course.getExtent()));
    course.publishRaceCourseState();
  });

  watch(course, () => {
    rotateFeature
      .getGeometry()
      .setCenter(course.forwardTransform(rotateHandle.offset));
  });

  return {
    features: [rotateFeature],
    interactions: [rotateFeatureTranslate],
  };
}

function scaleXFactory(scaleXHandle) {
  var scaleXFeature = new Feature({
    geometry: new Circle(course.forwardTransform(scaleXHandle.offset), 40),
  });

  scaleXFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: scaleXHandle.color,
      }),
      stroke: new Stroke({
        color: scaleXHandle.color,
        width: 10,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u2194",
        font: "24px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
      }),
    });
  });

  const scaleXFeatureTranslate = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([scaleXFeature]),
  });

  scaleXFeatureTranslate.on("translating", (translateEvent) => {
    course.setScaleX(translateEvent.coordinate);
  });

  scaleXFeatureTranslate.on("translateend", (translateEvent) => {
    view.fit(polygonFromExtent(course.getExtent()));
    course.publishRaceCourseState();
  });

  watch(course, () => {
    scaleXFeature
      .getGeometry()
      .setCenter(course.forwardTransform(scaleXHandle.offset));
  });

  return {
    features: [scaleXFeature],
    interactions: [scaleXFeatureTranslate],
  };
}

function scaleYFactory(scaleYHandle) {
  var scaleYFeature = new Feature({
    geometry: new Circle(course.forwardTransform(scaleYHandle.offset), 40),
  });

  scaleYFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: scaleYHandle.color,
      }),
      stroke: new Stroke({
        color: scaleYHandle.color,
        width: 10,
        lineCap: "round",
      }),
      text: new Text({
        text: "\u2195",
        font: "24px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
      }),
    });
  });

  const scaleYFeatureTranslate = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([scaleYFeature]),
  });

  scaleYFeatureTranslate.on("translating", (translateEvent) => {
    course.setScaleY(translateEvent.coordinate);
  });

  scaleYFeatureTranslate.on("translateend", (translateEvent) => {
    view.fit(polygonFromExtent(course.getExtent()));
    course.publishRaceCourseState();
  });

  watch(course, () => {
    scaleYFeature
      .getGeometry()
      .setCenter(course.forwardTransform(scaleYHandle.offset));
  });

  return {
    features: [scaleYFeature],
    interactions: [scaleYFeatureTranslate],
  };
}

function labelFactory(label) {
  var labelFeature = new Feature({
    geometry: new Point(course.forwardTransform(label.offset)),
  });

  watch(course, () => {
    labelFeature
      .getGeometry()
      .setCoordinates(course.forwardTransform(label.offset));
  });

  labelFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: label.color,
      }),
      stroke: new Stroke({
        color: label.color,
        width: 2,
        lineCap: "round",
      }),
      text: new Text({
        text: label.text,
        font: Math.round(label.size / resolution) + "px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,

        overflow: false,
        placement: "point",
        padding: [0, 100, 0, 100],
        declutterMode: "declutter",
        scale: 1,
        fill: new Fill({
          color: label.color,
        }),
      }),
    });
  });

  const labelTranslate = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([labelFeature]),
  });

  labelTranslate.on("translating", (translateEvent) => {
    label.offset = course.reverseTransform(translateEvent.coordinate);
  });

  labelTranslate.on("translateend", (translateEvent) => {
    view.fit(polygonFromExtent(course.getExtent()));
    course.publishRaceCourseState();
  });

  const interactions = [];

  if (!!!label.locked) {
    interactions.push(labelTranslate);
  }

  return {
    features: [labelFeature],
    interactions: interactions,
  };
}

function buoyFactory(buoy) {
  const buoyFeature = new Feature({
    geometry: new Circle(course.forwardTransform(buoy.offset), buoy.radius),
  });

  buoyFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: buoy.color,
      }),
      stroke: new Stroke({
        color: buoy.color,
        width: buoy.radius,
        lineCap: "round",
      }),

      text: new Text({
        text: buoy.text,
        font: Math.round(18 / resolution) + "px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: -1 * course.rotation,
        olverflow: false,
      }),
    });
  });

  const translateHandel = new Collection([buoyFeature]);

  const translate = new Translate({
    layers: [courseVectorLayer],
    features: translateHandel,
  });

  translate.on("translating", (translateEvent) => {
    buoy.offset = course.reverseTransform(translateEvent.coordinate);
  });

  translate.on("translateend", (translateEvent) => {
    view.fit(polygonFromExtent(course.getExtent()));
    course.publishRaceCourseState();
  });

  watch(course, () => {
    buoyFeature.getGeometry().setCenter(course.forwardTransform(buoy.offset));
  });

  const interactions = [];
  const features = [];

  if (!!!buoy.hidden) {
    features.push(buoyFeature);
  }

  if (!!!buoy.locked) {
    interactions.push(translate);
  }

  return { features: features, interactions: interactions };
}

function gateFactory(gate) {
  const leftFeature = new Feature({
    geometry: new Circle(
      course.forwardTransform(gate.left.offset),
      gate.left.radius
    ),
  });

  const rightFeature = new Feature({
    geometry: new Circle(
      course.forwardTransform(gate.right.offset),
      gate.right.radius
    ),
  });

  leftFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: gate.left.color,
      }),
      stroke: new Stroke({
        color: gate.left.color,
        width: gate.left.radius,
        lineCap: "round",
      }),
      text: new Text({
        text: gate.left.text,
        font: Math.round(16 / resolution) + "px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getTextRotation(gate.left, gate.right),
      }),
    });
  });

  rightFeature.setStyle((feature, resolution) => {
    return new Style({
      fill: new Fill({
        color: gate.right.color,
      }),
      stroke: new Stroke({
        color: gate.right.color,
        width: gate.right.radius,
        lineCap: "round",
      }),
      text: new Text({
        text: gate.right.text,
        font: Math.round(16 / resolution) + "px sans-serif",
        textAlign: "center",
        justify: "center",
        rotation: course.getTextRotation(gate.left, gate.right),
      }),
    });
  });

  var gateLineFeature = new Feature({
    geometry: new LineString(
      [
        course.forwardTransform(gate.left.offset),
        course.forwardTransform(gate.right.offset),
      ],
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
          course.getLineLength(gate.left, gate.right) +
          "m",
        font: Math.round(16 / resolution) + "px sans-serif",
        color: gate.color,
        textAlign: "center",
        justify: "center",
        offsetY: 0,
        rotation: course.getTextRotation(gate.left, gate.right),
        rotateWithView: false,
        fill: new Fill({
          color: gate.color,
          width: 1,
        }),

        placement: "point",
      }),
    });
  });

  const translateleft = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([leftFeature]),
  });

  translateleft.on("translating", (translateEvent) => {
    gate.left.offset = course.reverseTransform(translateEvent.coordinate);
  });

  translateleft.on("translateend", (translateEvent) => {
    view.fit(polygonFromExtent(course.getExtent()));
    course.publishRaceCourseState();
  });

  const translateright = new Translate({
    layers: [courseVectorLayer],
    features: new Collection([rightFeature]),
  });

  translateright.on("translating", (translateEvent) => {
    gate.right.offset = course.reverseTransform(translateEvent.coordinate);
  });

  translateright.on("translateend", (translateEvent) => {
    view.fit(polygonFromExtent(course.getExtent()));
    course.publishRaceCourseState();
  });

  watch(course, () => {
    leftFeature
      .getGeometry()
      .setCenter(course.forwardTransform(gate.left.offset));
    rightFeature
      .getGeometry()
      .setCenter(course.forwardTransform(gate.right.offset));

    gateLineFeature
      .getGeometry()
      .setCoordinates([
        course.forwardTransform(gate.left.offset),
        course.forwardTransform(gate.right.offset),
      ]);
  });

  const interactions = [];
  if (!!!gate.left?.locked) {
    interactions.push(translateleft);
  }
  if (!!!gate.right?.locked) {
    interactions.push(translateright);
  }

  return {
    features: [leftFeature, rightFeature, gateLineFeature],
    interactions: interactions,
  };
}

function lapInfoFactory(lapInfo) {
  var lapInfoFeature = new Feature({
    geometry: new LineString(
      [
        course.forwardTransform(lapInfo.left.offset),
        course.forwardTransform(lapInfo.right.offset),
      ],
      "XY"
    ),
  });

  lapInfoFeature.setStyle((feature, resolution) => {
    return new Style({
      text: new Text({
        text: course.lap?.description,
        font: Math.round(lapInfo.size / resolution) + "px sans-serif",
        color: lapInfo.color,
        textAlign: "center",
        justify: "center",
        offsetY: 0,
        rotation: course.getTextRotation(lapInfo.left, lapInfo.right),
        rotateWithView: false,
        fill: new Fill({
          color: lapInfo.color,
          width: 1,
        }),

        placement: "line",
        padding: [0, 100, 0, 100],
        declutterMode: "declutter",
      }),
    });
  });

  watch(course, () => {
    lapInfoFeature
      .getGeometry()
      .setCoordinates([
        course.forwardTransform(lapInfo.left.offset),
        course.forwardTransform(lapInfo.right.offset),
      ]);
  });

  return {
    features: [lapInfoFeature],
    interactions: [],
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

for (var item of course.features) {
  if (item.type == "buoy") {
    const product = buoyFactory(item);
    courseFeatures.push(...product.features);
    if (!!!props.readonly) {
      courseInteractions.push(...product.interactions);
    }
  }
}

for (var item of course.features) {
  if (item.type == "gate") {
    const product = gateFactory(item);
    courseFeatures.push(...product.features);
    if (!!!props.readonly) {
      courseInteractions.push(...product.interactions);
    }
  }
}
if (props.showBoundary) {
  for (var item of course.features) {
    if (item.type == "line") {
      const product = gateFactory(item);
      courseFeatures.push(...product.features);
      if (!!!props.readonly) {
        courseInteractions.push(...product.interactions);
      }
    }
  }

  for (var item of course.features) {
    if (item.type == "label") {
      const product = labelFactory(item);
      courseFeatures.push(...product.features);
      if (!!!props.readonly) {
        courseInteractions.push(...product.interactions);
      }
    }
  }

  for (var item of course.features) {
    if (item.type == "lapinfo") {
      const product = lapInfoFactory(item);
      courseFeatures.push(...product.features);
      if (!!!props.readonly) {
        courseInteractions.push(...product.interactions);
      }
    }
  }
}

if (props.showControls) {
  const anchorProduct = anchorFactory(course.anchorHandle);
  courseFeatures.push(...anchorProduct.features);
  courseInteractions.push(...anchorProduct.interactions);

  const rotateProduct = rotateFactory(course.rotateHandle);
  courseFeatures.push(...rotateProduct.features);
  courseInteractions.push(...rotateProduct.interactions);

  const scaleXProduct = scaleXFactory(course.scaleXHandle);
  courseFeatures.push(...scaleXProduct.features);
  courseInteractions.push(...scaleXProduct.interactions);

  const scaleYProduct = scaleYFactory(course.scaleYHandle);
  courseFeatures.push(...scaleYProduct.features);
  courseInteractions.push(...scaleYProduct.interactions);
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
  tipLabel: "course refocus",
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
    //controls.push(new Zoom());
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

const courseMap = ref();

// show the map
onMounted(() => {
  map?.setTarget(courseMap.value);
  view.fit(polygonFromExtent(course.getExtent()));
});

// garbage collect the map
onUnmounted(() => {
  map?.setTarget(undefined);
  map = undefined;
});
</script>
