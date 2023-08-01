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
        :center="[49.129338, 10.934313]"
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
        <div class="q-pa-sm">
          <RoboBuoyStatus
            v-for="device in devicesStore.connecteddevices"
            :key="device.id"
            :deviceid="device.id"
          ></RoboBuoyStatus>
        </div>
      </q-scroll-area>
      <q-page-sticky position="bottom-right" :offset="[22, 22]">
        <q-btn fab icon="add" color="accent" @click="$bluetooth.pair()" />
      </q-page-sticky>
    </q-drawer>
  </q-page>
</template>

<script>
import { defineComponent, nextTick } from "vue";
import "leaflet/dist/leaflet.css";
//import L from "leaflet";
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
      zoom: 15,
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
