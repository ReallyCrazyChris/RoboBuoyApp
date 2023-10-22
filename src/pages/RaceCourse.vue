<template>
  <q-page>
    <div
      :style="{
        height: height + 'px',
        width: width + 'px',
      }"
    >
      <l-map
        ref="map"
        :use-global-leaflet="false"
        :zoom="mapStore.zoom"
        :center="mapStore.center"
        :bounds="mapStore.bounds"
        @ready="mapReady"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
          :attribution="attribution"
          :maxZoom="19"
        ></l-tile-layer>

        <svg
          ref="course_svg"
          view-box="0 0 800 800"
          width="800"
          height="800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <title>Layer 1</title>
            <g transform="rotate(  45 10 10 )" id="marks">
              <ellipse
                stroke="#000"
                ry="10"
                rx="10"
                id="comittee"
                cy="10"
                cx="10"
                fill="#000000"
              />
              <ellipse
                stroke="#000"
                ry="10"
                rx="10"
                id="start"
                cy="30"
                cx="30"
                fill="#ff0000"
              />
              <ellipse
                stroke="#000"
                ry="10"
                rx="10"
                id="buoy_1"
                cy="40"
                cx="40"
                fill="#ffff00"
              />
              <ellipse
                ry="10"
                rx="10"
                id="buoy_2"
                cy="60"
                cx="60"
                stroke="#000"
                fill="#ffff00"
              />
              <ellipse
                ry="10"
                rx="10"
                id="bouy_3"
                cy="350"
                cx="350"
                stroke="#000"
                fill="#ffff00"
              />
            </g>
          </g>
        </svg>
      </l-map>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, version } from "vue";
import "leaflet/dist/leaflet.css";
import { svgOverlay } from "leaflet/dist/leaflet-src.esm";
import { LMap, LTileLayer, LImageOverlay } from "@vue-leaflet/vue-leaflet";
import { useMapStore } from "src/stores/mapStore";

export default defineComponent({
  name: "RaceCourse",

  components: {
    LMap,
    LTileLayer,
  },
  setup() {
    const mapStore = useMapStore();
    return {
      mapStore,
    };
  },
  data() {
    return {
      height: 800,
      width: 800,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      roboBouyVisible: false,
    };
  },
  mounted() {
    this.height = this.$parent.$el.offsetHeight;
    this.width = this.$parent.$el.offsetWidth;
  },
  methods: {
    mapReady() {
      const svgElement = this.$refs.course_svg;
      const map = this.$refs.map.leafletObject;

      console.log("Vue.version", version);

      console.log("maprReady", svgElement, map);

      var svgElementBounds = [
        [0, 0],
        [1, 1],
      ];
      svgOverlay(svgElement, svgElementBounds).addTo(map);
      map.fitBounds(svgElementBounds);
    },
  },
});
</script>
