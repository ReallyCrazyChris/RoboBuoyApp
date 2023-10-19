<template>
  <l-feature-group ref="featureGroup" :name="deviceid">
    <l-marker
      v-if="roboStore.position.length"
      :name="'RoboBuoy'"
      :lat-lng="roboStore.position"
      :zIndexOffset="100"
    >
      <l-icon :icon-size="[5, 5]">
        <div class="absolute-center">
          <RoboBuoyMarker :deviceid="deviceid" />

          <q-badge v-if="roboStore.isStopped" floating transparent color="red">
            <q-icon name="stop" color="white" />
          </q-badge>

          <q-badge v-if="roboStore.isUnderway" floating transparent>
            <q-icon class="spin" name="autorenew" color="white" />
          </q-badge>

          <q-badge v-if="roboStore.isHoldStation" floating transparent>
            <q-icon name="anchor" color="white" />
          </q-badge>

          <q-badge
            v-if="roboStore.isManual"
            floating
            transparent
            color="light-green"
          >
            <q-icon name="swipe" color="white" />
          </q-badge>
        </div>
      </l-icon>
    </l-marker>

    <div v-if="roboStore.position.length">
      <div v-for="(latlng, index) in waypoints" :key="index">
        <l-circleMarker
          v-if="index > 0 && index < waypoints.length - 1 && roboStore.isAuto"
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
          v-if="
            index > 0 && index < waypoints.length - 1 && roboStore.isStopped
          "
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
          v-if="index == waypoints.length - 1 && roboStore.isAuto"
          @click="removewaypoints"
          :lat-lngs="waypoints"
          color="lightgreen"
          :zIndexOffset="100"
        />

        <l-marker
          :ref="'targetMarker'"
          v-if="index == waypoints.length - 1 && !roboStore.isManual"
          :lat-lng="latlng"
          :draggable="true"
          :zIndexOffset="300"
          @moveend="addwaypoint($event.target._latlng)"
        />
      </div>
    </div>
  </l-feature-group>
</template>

<script>
import { defineComponent, nextTick } from "vue";
import { useRoboStore } from "stores/roboStore";
import { useMapStore } from "src/stores/mapStore";
import RoboBuoyMarker from "components/map/RoboBuoyMarker.vue";
import L from "leaflet";
import {
  LFeatureGroup,
  LMarker,
  LCircleMarker,
  LIcon,
  LPolyline,
} from "@vue-leaflet/vue-leaflet";

export default defineComponent({
  name: "RoboBuoyPosition",
  props: ["deviceid"],
  components: {
    LFeatureGroup,
    LMarker,
    LIcon,
    LPolyline,
    LCircleMarker,
    RoboBuoyMarker,
  },
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    const mapStore = useMapStore();
    return { roboStore, mapStore };
  },

  updated() {
    const southWest = L.latLng(
      Number(this.roboStore.position[0]),
      Number(this.roboStore.position[1])
    );

    const northEast = L.latLng(
      Number(this.roboStore.position[0]),
      Number(this.roboStore.position[1])
    );

    const bounds = L.latLngBounds(southWest, northEast);

    this.mapStore.bounds = bounds;
    this.mapStore.center = bounds.getCenter();
    this.mapStore.zoom = 10;
  },

  computed: {
    waypoints() {
      const bounds = this.$refs.featureGroup.leafletObject.getBounds();
      if (Object.keys(bounds).length == 2) {
        this.updateBounds();
      }

      return [this.roboStore.position].concat(this.roboStore.waypoints);
    },
  },

  methods: {
    updateBounds: function () {
      console.log("updateBounds");
      const bounds = this.$refs.featureGroup.leafletObject.getBounds();
      const center = bounds.getCenter();
      this.mapStore.bounds = bounds;
      this.mapStore.center = bounds.getCenter();
    },

    addwaypoint: async function (latlng) {
      this.roboStore.addwaypoint(latlng);
      this.updateBounds();
      await this.roboStore.setwaypoints();
    },
    removewaypoint: async function (index) {
      this.roboStore.removewaypoint(index);
      this.updateBounds();
      await this.roboStore.setwaypoints();
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
      this.updateBounds();
      await this.roboStore.setwaypoints();
    },
  },
});
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
