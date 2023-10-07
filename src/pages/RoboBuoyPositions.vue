<template>
  <q-page ref="RoboBuoyPositions">
    <div
      :style="{
        height: height + 'px',
        width: width + 'px',
      }"
    >
      <l-map
        ref="map"
        v-model:zoom="zoom"
        :center="[49.69455, 10.82745]"
        :use-global-leaflet="false"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
          :attribution="attribution"
        ></l-tile-layer>

        <RoboBuoyPosition
          v-for="device in devicesStore.connecteddevices"
          :key="device.id"
          :deviceid="device.id"
        />
      </l-map>
    </div>
    <q-drawer
      side="right"
      show-if-above
      bordered
      :width="300"
      :breakpoint="500"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <div class="text-h6">Robobuoy's</div>
          <div class="text-subtitle2">
            {{ devicesStore.devicecount() }} buoy's in range
          </div>
        </div>

        <RoboBuoyStatus
          v-for="device in devicesStore.connecteddevices"
          :key="device.id"
          :deviceid="device.id"
          class="q-pa-md"
        />
      </q-scroll-area>
      <q-page-sticky position="bottom-right" :offset="[-180, 22]">
        <q-btn
          v-if="devicesStore.devicecount() == 0"
          class="blinking"
          fab
          icon="add"
          color="primary"
          @click="$bluetooth.pair()"
        >
          <q-tooltip class="bg-brimary">Pair Robobuoy</q-tooltip>
        </q-btn>
        <q-btn v-else fab icon="add" color="primary" @click="$bluetooth.pair()">
          <q-tooltip class="bg-brimary">Pair Robobuoy</q-tooltip>
        </q-btn>
      </q-page-sticky>
    </q-drawer>
  </q-page>
</template>

<script>
import { defineComponent, nextTick } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

import { useDevicesStore } from "stores/devicesStore";
import RoboBuoyStatus from "components/RoboBuoyStatus.vue";
import RoboBuoyPosition from "components/RoboBuoyPosition.vue";

export default defineComponent({
  name: "RoboBuoyPositions",
  components: {
    LMap,
    LTileLayer,
    RoboBuoyStatus,
    RoboBuoyPosition,
  },
  setup() {
    const devicesStore = useDevicesStore();
    return {
      devicesStore,
    };
  },
  data() {
    return {
      zoom: 18, //TODO auto zoom
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
