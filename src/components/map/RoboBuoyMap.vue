<template>
  <div
    :style="{
      height: height + 'px',
      width: width + 'px',
    }"
  >
    <l-map
      :use-global-leaflet="false"
      :zoom="mapStore.zoom"
      :center="mapStore.center"
      :bounds="mapStore.bounds"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        :attribution="attribution"
        :maxZoom="19"
      ></l-tile-layer>
      <l-feature-group ref="roboBuoyGroup" :name="'roboBouyPositions'">
        <RoboBuoyPosition
          v-for="device in devicesStore.connecteddevices"
          :key="device.id"
          :deviceid="device.id"
          @ready="useFeatureGroupBounds"
        />
      </l-feature-group>
    </l-map>
  </div>
</template>

<script>
import { defineComponent, nextTick } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LFeatureGroup } from "@vue-leaflet/vue-leaflet";

import { useDevicesStore } from "stores/devicesStore";
import { useMapStore } from "src/stores/mapStore";
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
    };
  },
  mounted() {
    this.height = this.$parent.$el.offsetHeight;
    this.width = this.$parent.$el.offsetWidth;
  },

  methods: {
    useFeatureGroupBounds() {
      // Access the fraturegroup
      this.roboBuoyGroup = this.$refs.roboBuoyGroup.leafletObject;
      // The map should zoominto and center on the group
      this.mapStore.bounds = this.roboBuoyGroup.getBounds();
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
