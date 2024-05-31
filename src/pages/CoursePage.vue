<template>
  <div id="map" ref="mapRef" style="height: 800px; width: 800px"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import { Map, View, Feature } from "ol";
import { Tile, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { transform } from "ol/proj";
import { Circle, LineString, Point } from "ol/geom";
import MapBrowserEventType from "ol/MapBrowserEventType";
import Collection from "ol/Collection";

import { Translate, Pointer } from "ol/interaction";

import { Style, Fill, Stroke, Text, Icon } from "ol/style";

class Bouy extends Feature {
  constructor(props) {
    super({ name: "Buoy" });
    this.type = "Buoy";
    this.name = props?.name || "Buoy";
    this.number = props?.number || "0";
    this.color = props?.color || "rgb(223,255,1)";
    this.radius = props?.radius || 5;
    this.coordinates = props?.coordinates || [0, 0];

    const buoyGeometry = new Circle(this.coordinates, this.radius);

    this.setGeometry(buoyGeometry);

    /*
    this.setStyle((feature) => {
      console.log(feature);
      return new Style({
        fill: new Fill({
          color: this.color || "rgb(223,255,1)",
        }),
        stroke: new Stroke({
          color: this.color || "rgb(223,255,1)",
          width: 0,
          lineCap: "round",
        }),
        text: new Text({
          text: String(this.number) || "",
          font: "16px sans-serif",
          textAlign: "center",
          justify: "center",
        }),
      });
    });
    */
  }

  getInteractions(layer) {
    const translate = new Translate({
      hitTolerance: 5,
      layers: [layer],
      features: new Collection([this]),
    });

    translate.on("translatestart", (translateEvent) => {
      //translate.features_ = ;
    });

    translate.on("translateend", (translateEvent) => {
      //translate.features_ = dragHandel;
    });

    return [translate];
  }

  toObject() {
    const object = {
      type: this.type,
      name: this.name,
      number: this.number,
      color: this.color,
      radius: this.radius,
      coordinates: this.coordinates,
    };
    return object;
  }
}

class Gate {
  constructor(props) {
    this.type = "Gate";
    this.name = props?.name || "Gate";
    this.number = props?.number || "0";
    this.color = props?.color || "rgb(223,255,1)";
    this.radius = props?.radius || 5;
    this.coordinates = props?.coordinates || [
      [0, 0],
      [0, 0],
    ];

    this.bouyA = new Feature({
      type: "Buoy",
      geometry: new Circle(this.coordinates[0], this.radius),
    });

    /*
    this.bouyA.setStyle(
      new Style({
        fill: new Fill({
          color: this.color || "rgb(223,255,1)",
        }),
        stroke: new Stroke({
          color: this.color || "rgb(223,255,1)",
          width: 0,
          lineCap: "round",
        }),
        text: new Text({
          text: String(this.number) + "a",
          font: "16px sans-serif",
          textAlign: "center",
          justify: "center",
        }),
      })
    );
    */

    this.bouyB = new Feature({
      props: { type: "Buoy" },
      geometry: new Circle(this.coordinates[1], this.radius),
    });

    this.bouyB.setStyle(
      new Style({
        fill: new Fill({
          color: this.color || "rgb(223,255,1)",
        }),
        stroke: new Stroke({
          color: this.color || "rgb(223,255,1)",
          width: 0,
          lineCap: "round",
        }),
        text: new Text({
          text: String(this.number) + "b",
          font: "16px sans-serif",
          textAlign: "center",
          justify: "center",
        }),
      })
    );
  }

  getInteractions(layer) {
    const translateA = new Translate({
      hitTolerance: 5, //px
      layers: [layer],
      features: new Collection([this.bouyA]),
    });

    translateA.on("translatestart", (translateEvent) => {
      //translate.features_ = ;
    });

    translateA.on("translateend", (translateEvent) => {
      //translate.features_ = dragHandel;
    });

    const translateB = new Translate({
      hitTolerance: 5, //px
      layers: [layer],
      features: new Collection([this.bouyB]),
    });

    translateB.on("translatestart", (translateEvent) => {
      //translate.features_ = ;
      const a = this.bouyA.getGeometry().getCenter();
      const b = this.bouyB.getGeometry().getCenter();
      this.offset = [a[0] - b[0], a[1] - b[1]];
    });

    translateB.on("translating", (e) => {
      // BouyA is translated together with BouyB
      const coordinates = this.bouyB.getGeometry().getCenter();
      this.bouyA
        .getGeometry()
        .setCenter([
          coordinates[0] + this.offset[0],
          coordinates[1] + this.offset[1],
        ]);
    });

    translateB.on("translateend", (e) => {
      //translate.features_ = dragHandel;
    });

    return [translateA, translateB];
  }

  toObject() {
    const object = {
      type: this.type,
      name: this.name,
      number: this.number,
      color: this.color,
      radius: this.radius,
      coordinates: this.coordinates,
    };
    return object;
  }
}

class Startgate {
  constructor(props) {
    this.type = "Startgate";
    this.name = props?.name || "Startgate";
    this.number = props?.number || "0";
    this.color = props?.color || "rgb(223,255,1)";
    this.radius = props?.radius || 5;
    this.coordinates = props?.coordinates || [
      [0, 0],
      [0, 0],
    ];

    this.preventRotateEventPropagation = false;
    this.currentCoordinate = [0, 0];

    this.bouyA = new Feature({
      geometry: new Circle(this.coordinates[0], this.radius),
    });

    this.bouyA.setStyle(
      new Style({
        fill: new Fill({
          color: this.color || "rgb(223,255,1)",
        }),
        stroke: new Stroke({
          color: this.color || "rgb(223,255,1)",
          width: 0,
          lineCap: "round",
        }),
        text: new Text({
          text: String(this.number) + "a",
          font: "16px sans-serif",
          textAlign: "center",
          justify: "center",
        }),
      })
    );

    this.bouyB = new Feature({
      geometry: new Circle(this.coordinates[1], this.radius),
    });

    this.bouyB.setStyle(
      new Style({
        fill: new Fill({
          color: this.color || "rgb(223,255,1)",
        }),
        stroke: new Stroke({
          color: this.color || "rgb(223,255,1)",
          width: 0,
          lineCap: "round",
        }),
        text: new Text({
          text: String(this.number) + "b",
          font: "16px sans-serif",
          textAlign: "center",
          justify: "center",
        }),
      })
    );

    this.startLine = new Feature({
      geometry: new LineString([this.coordinates[1], this.coordinates[0]]),
    });

    this.startLine.setStyle(
      new Style({
        fill: new Fill({
          color: this.color || "rgb( 255,0,0)",
        }),
        stroke: new Stroke({
          color: this.color || "rgb( 255,0,0)",
          width: 5,
          lineCap: "round",
          lineDash: [5, 15],
        }),
        text: new Text({
          text: this.name || "start",
          font: "16px sans-serif",
          textAlign: "center",
          justify: "center",
          offsetY: 15,
        }),
      })
    );

    this.rotateHandel = new Feature({
      geometry: new Point(
        [this.coordinates[1][0] + 20, this.coordinates[1][1]],
        0.0001
      ),
    });

    this.rotateHandel.setStyle(
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
          src: "icons/cycle_fill1_48px.svg",
          scale: 0.45,
          rotateWithView: true,
        }),
      })
    );

    this.dragHandel = new Feature({
      geometry: new Point(
        [this.coordinates[1][0], this.coordinates[1][1] - 20],
        0.0001
      ),
    });

    this.dragHandel.setStyle(
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

  getInteractions(layer, featureCollection) {
    const translateA = new Translate({
      hitTolerance: 5, //px
      layers: [layer],
      features: new Collection([this.bouyA]),
    });

    translateA.on("translatestart", (translateEvent) => {
      //translate.features_ = new Collection([this.bouyA]);
    });

    translateA.on("translating", (e) => {
      // start Line is Translated when bouyA is moved
      this.startLine
        .getGeometry()
        .setCoordinates([
          this.bouyA.getGeometry().getCenter(),
          this.bouyB.getGeometry().getCenter(),
        ]);
    });

    translateA.on("translateend", (translateEvent) => {
      //translate.features_ = dragHandel;
    });

    const translateB = new Translate({
      hitTolerance: 5, //px
      layers: [layer],
      features: new Collection([this.bouyB]),
    });

    translateB.on("translatestart", (translateEvent) => {
      translateB.features_ = new Collection([
        this.bouyA,
        this.bouyB,
        this.startLine,
        this.dragHandel,
        this.rotateHandel,
      ]);
    });

    translateB.on("translateend", (e) => {
      translateB.features_ = new Collection([this.bouyB]);
    });

    const translateAll = new Translate({
      hitTolerance: 5,
      layers: [layer],
      features: new Collection([this.dragHandel]),
    });

    translateAll.on("translatestart", (translateEvent) => {
      translateAll.features_ = featureCollection;
    });

    translateAll.on("translateend", (translateEvent) => {
      translateAll.features_ = new Collection([this.dragHandel]);
    });

    const rotateAll = new Pointer({
      hitTolerance: 10,
      layers: [layer],
      features: new Collection([this.rotateHandel]),

      handleDownEvent: (mapBrowserEvent) => {
        const clikedOnFeatures = mapBrowserEvent.map.getFeaturesAtPixel(
          mapBrowserEvent.pixel,
          {
            hitTolerance: 10,
            //TODO add a layer filter
          }
        );

        if (clikedOnFeatures.indexOf(this.rotateHandel) > -1) {
          this.currentCoordinate = mapBrowserEvent.coordinate;
          this.preventRotateEventPropagation = true;
          return true; // start a drag sequence
        }
      },

      stopDown: () => {
        return this.preventRotateEventPropagation;
      },

      handleDragEvent: (mapBrowserEvent) => {
        const centerofrotation = this.bouyB.getGeometry().getCenter();

        const ax_delta = this.currentCoordinate[0] - centerofrotation[0];
        const ay_delta = this.currentCoordinate[1] - centerofrotation[1];
        const aTheta = Math.atan2(ay_delta, ax_delta);

        const bx_delta = mapBrowserEvent.coordinate[0] - centerofrotation[0];
        const by_delta = mapBrowserEvent.coordinate[1] - centerofrotation[1];
        const bTheta = Math.atan2(by_delta, bx_delta);

        featureCollection.getArray().forEach((feature) => {
          feature.getGeometry().rotate(bTheta - aTheta, centerofrotation);
        });

        this.currentCoordinate = mapBrowserEvent.coordinate;
      },

      handleUpEvent: () => {
        this.preventRotateEventPropagation = false;
      },
    });

    return [translateA, translateB, translateAll, rotateAll];
  }

  toObject() {
    const object = {
      type: this.type,
      name: this.name,
      number: this.number,
      color: this.color,
      radius: this.radius,
      coordinates: this.coordinates,
    };
    return object;
  }
}

// where we are placing the course
var center = transform(
  [10.932036344861501, 49.124145352082735],
  "EPSG:4326",
  "EPSG:3857"
);

// Crete Map and View
const mapRef = ref();
var map = new Map();

var view = new View({
  projection: "EPSG:3857",
  center: center,
  zoom: 18,
});

map.setView(view);

// Add the openstreetmap Layer
map.addLayer(
  new Tile({
    source: new OSM(),
  })
);

// Create the Race Course Source andLayer
const racecource = new VectorSource();

var raceCourseLayer = new VectorLayer({
  source: racecource,
});

raceCourseLayer.setStyle((feature) => {
  if ("Buoy" == feature.type) {
    const fill = new Fill({
      color: feature.color || "rgb(223,255,1)",
    });

    const stroke = new Stroke({
      color: feature.color || "rgb(223,255,1)",
      width: 0,
      lineCap: "round",
    });

    console.log(view.getResolution());

    if (view.getResolution() < 0.7) {
      var text = new Text({
        text: String(feature.number) || "",
        font: "16px sans-serif",
        textAlign: "center",
        justify: "center",
      });
    }

    return new Style({
      fill,
      stroke,
      text,
    });
  } else {
    console.log(feature);
  }
});

map.addLayer(raceCourseLayer);

const courceObjects = {
  name: "",
  description: "",
  centerofrotation: center,
  angleofrotation: 45,
  marks: [
    {
      type: "Buoy",
      name: "",
      number: 1,
      color: "",
      coordinates: null,
      offset: [0, 100],
    },
    {
      type: "Gate",
      name: "Finish",
      number: 3,
      color: "pink",
      offset: [
        [-20, -50],
        [20, -50],
      ],
    },
    {
      type: "Startgate",
      name: "",
      number: 1,
      color: "green",
      offset: [
        [-20, 0],
        [20, 0],
      ],
    },

    {
      type: "Buoy",
      name: "",
      number: 4,
      color: "",
      coordinates: null,
      offset: [0, -100],
    },
  ],
};

class Course {
  constructor(racecource, map, centerofrotation) {
    (this.name = "racecource"),
      (this.description = "generic"),
      (this.centerofrotation = centerofrotation),
      (this.angleofrotation = 45),
      (this.marks = new Collection());

    this.map = map;
    this.racecource = racecource;
    this.courseFeatures = new Collection();
  }

  addMark(courceObjects, courceObject) {
    if (courceObject.type == "Buoy") {
      // construct coordinates from cource center of rotation and offset
      if (courceObjects.centerofrotation && courceObject.offset) {
        courceObject.coordinates = [];

        courceObject.coordinates[0] =
          courceObjects.centerofrotation[0] + courceObject.offset[0];

        courceObject.coordinates[1] =
          courceObjects.centerofrotation[1] + courceObject.offset[1];
      }

      const bouy = new Bouy(courceObject);

      this.marks.push(bouy);
      this.courseFeatures.push(bouy);

      bouy.getInteractions()?.forEach((interaction) => {
        map.addInteraction(interaction);
      });

      this.racecource.addFeature(bouy);
    }

    if (courceObject.type == "Gate") {
      // construct coordinates from cource center of rotation and offset
      if (courceObjects.centerofrotation && courceObject.offset) {
        courceObject.coordinates = [
          [0, 0],
          [0, 0],
        ];

        courceObject.coordinates[0] = [
          courceObjects.centerofrotation[0] + courceObject.offset[0][0],
          courceObjects.centerofrotation[1] + courceObject.offset[0][1],
        ];

        courceObject.coordinates[1] = [
          courceObjects.centerofrotation[0] + courceObject.offset[1][0],
          courceObjects.centerofrotation[1] + courceObject.offset[1][1],
        ];
      }

      const gate = new Gate(courceObject);
      this.marks.push(gate);

      this.courseFeatures.push(gate.bouyA);
      this.courseFeatures.push(gate.bouyB);

      this.racecource.addFeature(gate.bouyA);
      this.racecource.addFeature(gate.bouyB);

      gate.getInteractions(this.racecource)?.forEach((interaction) => {
        map.addInteraction(interaction);
      });
    }

    if (courceObject.type == "Startgate") {
      // construct coordinates from cource center of rotation and offset
      if (courceObjects.centerofrotation && courceObject.offset) {
        courceObject.coordinates = [
          [0, 0],
          [0, 0],
        ];

        courceObject.coordinates[0] = [
          courceObjects.centerofrotation[0] + courceObject.offset[0][0],
          courceObjects.centerofrotation[1] + courceObject.offset[0][1],
        ];

        courceObject.coordinates[1] = [
          courceObjects.centerofrotation[0] + courceObject.offset[1][0],
          courceObjects.centerofrotation[1] + courceObject.offset[1][1],
        ];
      }

      const startgate = new Startgate(courceObject);
      this.marks.push(startgate);

      this.courseFeatures.push(startgate.bouyA);
      this.courseFeatures.push(startgate.bouyB);
      this.courseFeatures.push(startgate.startLine);
      this.courseFeatures.push(startgate.dragHandel);
      this.courseFeatures.push(startgate.rotateHandel);

      this.racecource.addFeature(startgate.bouyA);
      this.racecource.addFeature(startgate.bouyB);
      this.racecource.addFeature(startgate.startLine);
      this.racecource.addFeature(startgate.dragHandel);
      this.racecource.addFeature(startgate.rotateHandel);

      startgate
        .getInteractions(this.racecource, this.courseFeatures)
        ?.forEach((interaction) => {
          map.addInteraction(interaction);
        });
    }
  }

  load(courceObjects) {
    courceObjects.marks.forEach((courceObject) => {
      this.addMark(courceObjects, courceObject);
    });
  }

  toObject() {
    const object = {
      name: this.name,
      description: this.description,
      centerofrotation: this.centerofrotation,
      angleofrotation: this.angleofrotation,
      marks: [],
    };
    this.marks.forEach((mark) => {
      object.marks.push(mark.toObject());
    });
    return object;
  }
}

const course = new Course(racecource, map);
course.load(courceObjects);

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
