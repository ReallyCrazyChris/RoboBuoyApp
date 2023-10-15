<template>
  <div
    :style="{
      height: height + 'px',
      width: width + 'px',
    }"
  >
    <l-map :use-global-leaflet="false" :zoom="1" :center="center">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        :attribution="attribution"
        :maxZoom="21"
        :center="center"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      ></l-tile-layer>
      <l-feature-group @vnode-updated="refer">
        <RoboBuoyPosition
          v-for="device in devicesStore.connecteddevices"
          :key="device.id"
          :deviceid="device.id"
        />
      </l-feature-group>
    </l-map>
  </div>
</template>

<script>
import { defineComponent, nextTick } from "vue";
import "leaflet/dist/leaflet.css";
import { latLngBounds, latLng } from "leaflet";
import { LMap, LTileLayer, LFeatureGroup } from "@vue-leaflet/vue-leaflet";

import { useDevicesStore } from "stores/devicesStore";
import RoboBuoyPosition from "components/map/RoboBuoyPosition.vue";

export default defineComponent({
  name: "RoboBuoyPositions",
  components: {
    LMap,
    LTileLayer,
    RoboBuoyPosition,
    LFeatureGroup,
  },
  setup() {
    const devicesStore = useDevicesStore();
    return {
      devicesStore,
    };
  },
  data() {
    return {
      height: 900,
      width: 800,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

      center: latLng(49.697298818103576, 10.828388524893745),
    };
  },
  mounted() {
    this.height = this.$parent.$el.offsetHeight;
    this.width = this.$parent.$el.offsetWidth;
  },
  updated() {},
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    refer(el) {
      console.log(el);
    },
  },
});
</script>

<style>
@keyframes fade {
  from {
    opacity: 0.5;
  }
}

.blinking {
  animation: fade 0.7s infinite alternate;
}
</style>
