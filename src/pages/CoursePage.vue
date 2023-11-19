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
import { extend } from "quasar";
import TransformLayer_withsvg from "./TransformLayer_withsvg.vue";

const mapRef = ref();

// where we are placing the course
var comitteeBoatGeolocaiton = transform(
  [10.932036344861501, 49.124145352082735],
  "EPSG:4326",
  "EPSG:3857"
);

class RaceCource extends Collection {
  constructor(
    name,
    centerofrotation,
    extent,
    padding = 30,
    color = "rgb(223,255,1)"
  ) {
    super();
    this.name = name || "";
    this.extent = extent;
    this.color = color;
    this.centerofrotation = centerofrotation;
    this.paddingX = padding;
    this.paddingY = padding;
  }
}

class DragHandle extends Feature {
  constructor(boundaryCenter) {
    this.setGeometry(new Point(boundaryCenter, 3));

    this.setStyle(
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
  }

  setDragableOn(map, layer) {
    const translate = new Translate({
      // radius around the given pixecl position will be checked for features  hitTolerance: 5, //px
      layers: [layer],
      features: this, // the dragHandle feature(s) is used it initiate the Translate
    });

    // When the dragHandel starts translating ... translate courceBoundaryFeaturesCollection
    translate.on("translatestart", (translateEvent) => {
      translate.features_ = courceBoundaryFeaturesCollection;
    });

    // When the dragHandel stop translating ... retuen to Translate using the dragHandel only
    translate.on("translateend", (translateEvent) => {
      translate.features_ = dragHandel;
    });
  }
}

class Boundary extends Feature {
  constructor(
    name,
    centerofrotation,
    extent,
    padding = 30,
    color = "rgb(223,255,1)"
  ) {
    super();
    this.name = name || "";
    this.extent = extent;
    this.color = color;
    this.centerofrotation = centerofrotation;
    this.paddingX = padding;
    this.paddingY = padding;

    var p0 = getTopLeft(extent);
    p0 = [p0[0] - this.paddingX, p0[1] + this.paddingY];
    var p1 = getTopRight(extent);
    p1 = [p1[0] + this.paddingX, p1[1] + this.paddingY];
    var p2 = getBottomRight(extent);
    p2 = [p2[0] + this.paddingX, p2[1] - this.paddingY];
    var p3 = getBottomLeft(extent);
    p3 = [p3[0] - this.paddingX, p3[1] - this.paddingY];

    var courseBoundary = [p0, p1, p2, p3];

    this.setGeometry(new Polygon([courseBoundary]));

    this.setStyle(
      new Style({
        stroke: new Stroke({
          color: "grey",
          width: 0.5,
          lineDash: [5, 5],
        }),
      })
    );
  }

  setDragableOn(map, layer) {
    const translate = new Translate({
      hitTolerance: 5, //px
      layers: [layer],
      features: new Collection([this]),
    });

    translate.on("translatestart", (translateEvent) => {
      //translate.features_ = courceBoundaryFeaturesCollection;
    });

    translate.on("translateend", (translateEvent) => {
      //translate.features_ = dragHandel;
    });

    map.addInteraction(translate);

    return this;
  }
}

class Buoy extends Feature {
  constructor(
    number,
    centerofrotation,
    offset,
    radius,
    color = "rgb(223,255,1)"
  ) {
    super();
    this.number = number || "";
    this.offset = offset;
    this.radius = radius;
    this.color = color;
    this.centerofrotation = centerofrotation;

    this.offsetCoordinate = [
      this.centerofrotation[0] + this.offset[0],
      this.centerofrotation[1] + this.offset[1],
    ];

    this.setGeometry(new Circle(this.offsetCoordinate, this.radius));

    this.setStyle(
      new Style({
        fill: new Fill({
          color: this.color,
        }),
        stroke: new Stroke({
          color: this.color,
          width: 0,
          lineCap: "round",
        }),
        text: new Text({
          text: String(this.number),
          font: "16px sans-serif",
          textAlign: "center",
          justify: "center",
        }),
      })
    );
  }

  setDragableOn(map, layer) {
    const translate = new Translate({
      hitTolerance: 5, //px
      layers: [layer],
      features: new Collection([this]),
    });

    translate.on("translatestart", (translateEvent) => {
      //translate.features_ = courceBoundaryFeaturesCollection;
    });

    translate.on("translateend", (translateEvent) => {
      //translate.features_ = dragHandel;
    });

    map.addInteraction(translate);

    return this;
  }
}

class Line extends Feature {
  constructor(name, centerofrotation, offset, width, color = "rgb(223,255,1)") {
    super();
    this.name = name;
    this.offset = offset;
    this.width = width;
    this.color = color;
    this.centerofrotation = centerofrotation;

    this.offsetCoordinate = [
      this.centerofrotation[0] + this.offset[0],
      this.centerofrotation[1] + this.offset[1],
    ];

    this.lineCoordinates = [
      [this.offsetCoordinate[0] - this.width / 2, this.offsetCoordinate[1]],
      [this.offsetCoordinate[0] + this.width / 2, this.offsetCoordinate[1]],
    ];

    this.setGeometry(new LineString(this.lineCoordinates, "XY"));

    this.setStyle(
      new Style({
        fill: new Fill({
          color: this.color,
        }),
        stroke: new Stroke({
          color: this.color,
          width: 5,
          lineCap: "round",
          lineDash: [5, 15],
        }),
        text: new Text({
          text: String(this.name),
          font: "10px roboto",
          textAlign: "center",
          justify: "center",
          textBaseline: "bottom",
        }),
      })
    );
  }

  setDragableOn(map, layer) {
    const translate = new Translate({
      hitTolerance: 5, //px
      layers: [layer],
      features: new Collection([this]),
    });

    translate.on("translatestart", (translateEvent) => {
      //translate.features_ = courceBoundaryFeaturesCollection;
    });

    translate.on("translateend", (translateEvent) => {
      //translate.features_ = dragHandel;
    });

    map.addInteraction(translate);

    return this;
  }
}

class Gate extends Collection {
  constructor(
    number,
    centerofrotation,
    offset,
    radius,
    width,
    color = "rgb(223,255,1)"
  ) {
    super();
    this.number = number || "";
    this.offset = offset;
    this.radius = radius;
    this.width = width;
    this.color = color;
    this.centerofrotation = centerofrotation;

    this.gateAOffset = [this.offset[0] - this.width / 2, this.offset[1]];
    this.gateBOffset = [this.offset[0] + this.width / 2, this.offset[1]];

    this.bouyA = new Buoy(
      number + "a",
      this.centerofrotation,
      this.gateAOffset,
      this.radius,
      this.color
    );
    this.bouyB = new Buoy(
      number + "b",
      this.centerofrotation,
      this.gateBOffset,
      this.radius,
      this.color
    );

    this.push(this.bouyA);
    this.push(this.bouyB);
  }

  setDragableOn(map, layer) {
    const translateBouyA = new Translate({
      hitTolerance: 5, //px
      layers: [layer],
      features: new Collection([this.bouyA]),
    });

    translateBouyA.on("translatestart", (translateEvent) => {
      //translate.features_ = courceBoundaryFeaturesCollection;
    });

    translateBouyA.on("translateend", (translateEvent) => {
      //translate.features_ = dragHandel;
    });

    const translateBouyB = new Translate({
      hitTolerance: 5, //px
      layers: [layer],
      features: new Collection([this.bouyB]),
    });

    translateBouyB.on("translatestart", (translateEvent) => {
      //translate.features_ = courceBoundaryFeaturesCollection;
      const a = this.bouyA.getGeometry().getCenter();
      const b = this.bouyB.getGeometry().getCenter();
      this.offset = [a[0] - b[0], a[1] - b[1]];
    });

    translateBouyB.on("translating", (e) => {
      // BouyA is translated together with BouyB

      const coordinates = this.bouyB.getGeometry().getCenter();

      this.bouyA
        .getGeometry()
        .setCenter([
          coordinates[0] + this.offset[0],
          coordinates[1] + this.offset[1],
        ]);

      console.log(this.bouyB.getGeometry().getCenter());
    });

    translateBouyB.on("translateend", (e) => {
      //translate.features_ = dragHandel;
    });

    map.addInteraction(translateBouyA);
    map.addInteraction(translateBouyB);

    return this;
  }
}

class StartGate extends Collection {
  constructor(
    number,
    name = "START",
    centerofrotation,
    offset,
    radius,
    width,
    color = "rgb(0,255,0)"
  ) {
    super();
    this.number = number || "";
    this.name = name;
    this.offset = offset;
    this.radius = radius;
    this.width = width;
    this.color = color;
    this.centerofrotation = centerofrotation;

    this.gateAOffset = [this.offset[0] - this.width / 2, this.offset[1]];
    this.gateBOffset = [this.offset[0] + this.width / 2, this.offset[1]];

    this.bouyA = new Buoy(
      this.number + "a",
      this.centerofrotation,
      this.gateAOffset,
      this.radius,
      this.color
    );
    this.bouyB = new Buoy(
      this.number + "b",
      this.centerofrotation,
      this.gateBOffset,
      this.radius,
      this.color
    );

    this.line = new Line(
      this.name,
      this.centerofrotation,
      this.offset,
      this.width,
      this.color
    );

    this.push(this.bouyA);
    this.push(this.bouyB);
    this.push(this.line);
  }

  setDragableOn(map, layer) {
    const translateBouyA = new Translate({
      hitTolerance: 5, //px
      layers: [layer],
      features: new Collection([this.bouyA]),
    });

    translateBouyA.on("translating", (translateEvent) => {
      //translate.features_ = courceBoundaryFeaturesCollection;

      this.line
        .getGeometry()
        .setCoordinates([
          this.bouyA.getGeometry().getCenter(),
          this.bouyB.getGeometry().getCenter(),
        ]);
    });

    translateBouyA.on("translateend", (translateEvent) => {
      //translate.features_ = dragHandel;
    });

    const translateBouyB = new Translate({
      hitTolerance: 5, //px
      layers: [layer],
      features: new Collection([this.bouyB]),
    });

    translateBouyB.on("translatestart", (translateEvent) => {
      //translate.features_ = courceBoundaryFeaturesCollection;
      const a = this.bouyA.getGeometry().getCenter();
      const b = this.bouyB.getGeometry().getCenter();
      this.offset = [a[0] - b[0], a[1] - b[1]];
    });

    translateBouyB.on("translating", (e) => {
      // BouyA is translated together with BouyB
      const coordinates = this.bouyB.getGeometry().getCenter();

      this.bouyA
        .getGeometry()
        .setCenter([
          coordinates[0] + this.offset[0],
          coordinates[1] + this.offset[1],
        ]);

      this.line
        .getGeometry()
        .setCoordinates([
          this.bouyA.getGeometry().getCenter(),
          this.bouyB.getGeometry().getCenter(),
        ]);
    });

    translateBouyB.on("translateend", (e) => {
      //translate.features_ = dragHandel;
    });

    map.addInteraction(translateBouyA);
    map.addInteraction(translateBouyB);

    return this;
  }
}

/**
 * Build the Map
 */

// Crete Map and View
var map = new Map();

var view = new View({
  projection: "EPSG:3857",
  center: comitteeBoatGeolocaiton,
  zoom: 17,
});

map.setView(view);

// Add the openstreetmap Layer
map.addLayer(
  new Tile({
    source: new OSM(),
  })
);

/**
 *  Build the Race Course
 */

// Create the Race Course Layer
var raceCourseLayer = new VectorLayer({
  name: "racingCourseLayer",
  source: new VectorSource({ wrapX: false }),
});
map.addLayer(raceCourseLayer);

// add features to the raceCourseLayer

raceCourseLayer
  .getSource()
  .addFeature(
    new Buoy(1, comitteeBoatGeolocaiton, [0, 0], 10).setDragableOn(
      map,
      raceCourseLayer
    )
  );

raceCourseLayer
  .getSource()
  .addFeature(
    new Line(
      "keep clear",
      comitteeBoatGeolocaiton,
      [-20, -80],
      20
    ).setDragableOn(map, raceCourseLayer)
  );

new Gate(5, comitteeBoatGeolocaiton, [0, 100], 13, 40)
  .setDragableOn(map, raceCourseLayer)
  .forEach((gate) => {
    raceCourseLayer.getSource().addFeature(gate);
  });

new StartGate(null, "START", comitteeBoatGeolocaiton, [0, 200], 13, 80)
  .setDragableOn(map, raceCourseLayer)
  .forEach((startGate) => {
    raceCourseLayer.getSource().addFeature(startGate);
  });

raceCourseLayer
  .getSource()
  .addFeature(
    new Boundary(
      "Race Course",
      comitteeBoatGeolocaiton,
      raceCourseLayer.getSource().getExtent()
    ).setDragableOn(map, raceCourseLayer)
  );

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
