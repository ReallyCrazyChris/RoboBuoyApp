<template>
  <l-marker
    :ref="'sourceMarker'"
    :name="'RoboBuoy'"
    :lat-lng="roboStore.currentposition"
    :zIndexOffset="100"
  >
    <l-icon :icon-size="[35, 35]" :icon-url="'./icons/favicon-32x32.png'">
    </l-icon>
  </l-marker>

  <div v-for="(latlng, index) in waypoints" :key="index">
    <l-polyline
      v-if="index == waypoints.length - 1"
      @click="removewaypoints"
      :lat-lngs="waypoints"
      color="red"
      zIndexOffset="0"
    />

    <l-circleMarker
      v-if="index > 0 && index < waypoints.length - 1"
      @click="removewaypoint(index)"
      :lat-lng="latlng"
      :radius="5"
      :zIndexOffset="200"
      color="#dd16cb"
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
</template>

<script>
import { useRoboStore } from "stores/roboStore";
import { nextTick } from "vue";
import {
  LMap,
  LTileLayer,
  LMarker,
  LCircleMarker,
  LIcon,
  LPolyline,
} from "@vue-leaflet/vue-leaflet";

export default {
  name: "RoboBuoyPosition",
  props: ["deviceid"],
  components: {
    LIcon,
    LMarker,
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
    addwaypoint: function (latlng) {
      this.roboStore.addwaypoint(latlng);
    },
    removewaypoint: function (index) {
      this.roboStore.removewaypoint(index);
    },
    removewaypoints: function (e) {
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
    },
  },
};
</script>
