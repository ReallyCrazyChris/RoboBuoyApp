<template>
  <l-marker
    v-if="roboStore.currentposition.length"
    :ref="'sourceMarker'"
    :name="'RoboBuoy'"
    :lat-lng="roboStore.currentposition"
    :zIndexOffset="100"
    @click="roboStore.toggleactive()"
  >
    <l-icon :icon-size="[5, 5]">
      <div v-if="roboStore.isStopped" class="absolute-center">
        <q-btn dense round class="shadow-24" color="primary" label="1"> </q-btn>
        <q-badge floating transparent color="red">
          <q-icon name="stop" color="white" />
        </q-badge>
      </div>
      <div v-if="roboStore.isUnderway" class="absolute-center">
        <q-btn dense round color="primary" label="1"> </q-btn>
        <q-badge floating transparent color="light-green">
          <q-icon class="spin" name="autorenew" color="white" />
        </q-badge>
      </div>
      <div v-if="roboStore.isHoldPosition" class="absolute-center">
        <q-btn dense round color="primary" label="1"> </q-btn>
        <q-badge floating transparent>
          <q-icon name="anchor" color="white" />
        </q-badge>
      </div>
    </l-icon>
  </l-marker>

  <div v-if="roboStore.currentposition.length">
    <div v-for="(latlng, index) in waypoints" :key="index">
      <l-circleMarker
        v-if="index > 0 && index < waypoints.length - 1 && roboStore.isUnderway"
        @click="removewaypoint(index)"
        :lat-lng="latlng"
        :radius="2"
        :zIndexOffset="200"
        color="lightgreen"
        fill
        fillColor="lightgreen"
        :fillOpacity="1"
      />

      <l-circleMarker
        v-if="index > 0 && index < waypoints.length - 1 && roboStore.isStopped"
        @click="removewaypoint(index)"
        :lat-lng="latlng"
        :radius="6"
        :zIndexOffset="200"
        color="red"
        fill
        fillColor="red"
        :fillOpacity="1"
      />

      <l-polyline
        v-if="index == waypoints.length - 1 && roboStore.isStopped"
        @click="removewaypoints"
        :lat-lngs="waypoints"
        color="red"
        :zIndexOffset="100"
      />

      <l-polyline
        v-if="index == waypoints.length - 1 && roboStore.isUnderway"
        @click="removewaypoints"
        :lat-lngs="waypoints"
        color="lightgreen"
        :zIndexOffset="100"
      />

      <l-marker
        :ref="'targetMarker'"
        v-if="index == waypoints.length - 1"
        :lat-lng="latlng"
        :draggable="true"
        :zIndexOffset="300"
        @moveend="addwaypoint($event.target._latlng)"
      />
    </div>
  </div>
</template>

<script>
import { useRoboStore } from "stores/roboStore";

import {
  LMarker,
  LCircleMarker,
  LIcon,
  LPolyline,
} from "@vue-leaflet/vue-leaflet";

export default {
  name: "RoboBuoyPosition",
  props: ["deviceid"],
  components: {
    LMarker,
    LIcon,
    LPolyline,
    LCircleMarker,
  },
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    return { roboStore };
  },
  computed: {
    waypoints() {
      return [this.roboStore.currentposition].concat(this.roboStore.waypoints);
    },
  },

  methods: {
    addwaypoint: async function (latlng) {
      this.roboStore.addwaypoint(latlng);
      await this.roboStore.applywaypoints();
    },
    removewaypoint: async function (index) {
      this.roboStore.removewaypoint(index);
      await this.roboStore.applywaypoints();
    },
    removewaypoints: async function (e) {
      const TOLERANCE = 3;
      const { x, y } = e.layerPoint;
      const parts = e.target._parts[0]; // some undocumented shit
      let prev = parts[0];
      const index = parts.slice(1, parts.length).findIndex((p) => {
        try {
          // check if in bounds
          if (
            !(
              Math.min(prev.x, p.x) <= x <= Math.max(prev.x, p.x) &&
              Math.min(prev.y, p.y) <= y <= Math.max(prev.y, p.y)
            )
          )
            return false;
          const yCalc =
            ((x - prev.x) * (p.y - prev.y)) / (p.x - prev.x) + prev.y;
          return Math.abs(y - yCalc) < TOLERANCE;
        } finally {
          prev = p;
        }
      });

      this.roboStore.removewaypoints(index);
      await this.roboStore.applywaypoints();
    },
  },
};
</script>

<style>
.spin {
  animation-name: spin;
  animation-duration: 10000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
