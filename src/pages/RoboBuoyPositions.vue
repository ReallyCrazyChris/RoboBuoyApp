<template>
  <q-page ref="locationmappage">
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

        <div v-for="(latlng, index) in waypoints" :key="index">
          <l-polyline
            v-if="index == waypoints.length - 1"
            :lat-lngs="waypoints"
            color="red"
            zIndexOffset="0"
          />

          <l-marker
            v-if="index == 0"
            :ref="'sourceMarker'"
            :name="'RoboBuoy'"
            :lat-lng="latlng"
            :zIndexOffset="100"
            v-on:click="activateRobot()"
          >
            <l-icon
              v-if="active"
              class-name="blinking"
              :icon-size="[35, 35]"
              :icon-url="'./icons/favicon-32x32.png'"
            >
            </l-icon>

            <l-icon
              v-if="!active"
              :icon-size="[35, 35]"
              :icon-url="'./icons/favicon-32x32.png'"
            >
            </l-icon>
          </l-marker>

          <l-circleMarker
            v-if="index > 0 && index < waypoints.length - 1"
            v-on:click="removeWaypoint(index)"
            :lat-lng="latlng"
            :radius="5"
            :zIndexOffset="200"
            color="#dd16cb"
          >
          </l-circleMarker>

          <l-marker
            :ref="'targetMarker'"
            v-if="index == waypoints.length - 1"
            :lat-lng="latlng"
            :draggable="true"
            :bubblingMouseEvents="true"
            :zIndexOffset="300"
            @moveend="dragEndHandler($event.target._latlng)"
          >
          </l-marker>

          />
        </div>
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
            v-for="device in devicesStore.devices"
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
import {
  LMap,
  LTileLayer,
  LMarker,
  LCircleMarker,
  LIcon,
  LPolyline,
} from "@vue-leaflet/vue-leaflet";

import { useDevicesStore } from "stores/devicesStore";
import RoboBuoyStatus from "components/RoboBuoyStatus.vue";

export default defineComponent({
  name: "LocationmapPage",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircleMarker,
    LIcon,
    LPolyline,
    RoboBuoyStatus,
  },
  setup() {
    const devicesStore = useDevicesStore();
    return {
      devicesStore,
    };
  },
  data() {
    return {
      active: false,
      waypoints: [[49.12934, 10.93431]],
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
  methods: {
    activateRobot: async function (e) {
      await nextTick();
      this.active = !this.active;
    },
    dragEndHandler: async function (latlng) {
      await nextTick();
      this.waypoints.push([
        parseFloat(latlng.lat.toFixed(6)),
        parseFloat(latlng.lng.toFixed(6)),
      ]);
    },
    removeWaypoint: async function (index) {
      await nextTick();
      this.waypoints.splice(index, 1);
      console.log(this.waypoints.length);
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
