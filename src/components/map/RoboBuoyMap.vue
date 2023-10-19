<template>
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
      @ready="showRoboBouys"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        :attribution="attribution"
        :maxZoom="19"
      ></l-tile-layer>
      <div v-if="roboBouyVisible">
        <RoboBuoyPosition
          v-for="device in devicesStore.connecteddevices"
          :key="device.id"
          :deviceid="device.id"
        />
      </div>
    </l-map>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useDevicesStore } from "stores/devicesStore";
import { useMapStore } from "src/stores/mapStore";
import RoboBuoyPosition from "components/map/RoboBuoyPosition.vue";

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

export default defineComponent({
  name: "RoboBuoyMap",
  components: {
    LMap,
    LTileLayer,
    RoboBuoyPosition,
  },

  setup() {
    const devicesStore = useDevicesStore();
    const mapStore = useMapStore();
    return {
      devicesStore,
      mapStore,
    };
  },
  data() {
    return {
      height: 900,
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
    showRoboBouys() {
      this.roboBouyVisible = true;
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
