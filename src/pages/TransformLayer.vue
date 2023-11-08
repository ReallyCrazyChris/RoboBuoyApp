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
import { Map, View, Overlay } from "ol";
import { Layer, Tile } from "ol/layer";
import { OSM } from "ol/source";
import { transform } from "ol/proj";

const mapRef = ref();
const overlayRef = ref();

const svgContainer = document.createElement("div");
const xhr = new XMLHttpRequest();
xhr.open("GET", "BasicCourse.svg");
xhr.addEventListener("load", function () {
  const svg = xhr.responseXML.documentElement;
  svgContainer.ownerDocument.importNode(svg);
  svgContainer.appendChild(svg);
});
xhr.send();

const width = 300;
const height = 500;
const svgResolution = 50 / width;
svgContainer.style.width = width + "px";
svgContainer.style.height = height + "px";
svgContainer.style.transformOrigin = "150px 250px";
svgContainer.className = "svg-layer";

const svgLayer = new Layer({
  render: function (frameState) {
    const scale = svgResolution / frameState.viewState.resolution;
    const center = frameState.viewState.center;
    const size = frameState.size;

    console.log(
      "frameState.viewState.resolution",
      frameState.viewState.resolution
    );
    console.log("frameState.viewState.center", frameState.viewState.center);
    console.log("frameState.size", frameState.size);

    const cssTransform = composeCssTransform(
      size[0] / 2,
      size[1] / 2,
      scale,
      scale,
      frameState.viewState.rotation,
      -center[0] / svgResolution - width / 2,
      center[1] / svgResolution - height / 2
    );
    svgContainer.style.transform = cssTransform;
    svgContainer.style.opacity = this.getOpacity();
    return svgContainer;
  },
});

// create a layer with the OSM source
var osmlayer = new Tile({
  source: new OSM(),
});

// center on london, transforming to map projection
var center = transform([-1.812, 52.443], "EPSG:4326", "EPSG:3857");

console.log("center", center);

// an overlay to position at the center
var overlay = new Overlay({
  position: center,
});

overlay.setElement();

// view, starting at the center
var view = new View({
  center: center,
  zoom: 6,
});

// finally, the map with our custom interactions, controls and overlays
var map = new Map({
  target: "map",
});

map.addLayer(osmlayer);
map.addOverlay(overlay);
map.setView(view);

// show the map
onMounted(() => {
  overlay.setElement(overlayRef.value);
  map?.setTarget(mapRef.value);
});

// garbage collect the map
onUnmounted(() => {
  map?.setTarget(undefined);
  map = undefined;
});
</script>
