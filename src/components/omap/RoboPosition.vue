<template>
  <ol-overlay
    :position="position"
    :positioning="'center-center'"
    :stopEvent="false"
  >
    <RoboMarker :deviceid="deviceid"></RoboMarker>
  </ol-overlay>
</template>

<script>
import { defineComponent, nextTick } from "vue";
import { useRoboStore } from "stores/roboStore";
import { useMapStore } from "src/stores/omapStore";
import RoboMarker from "./RoboMarker.vue";

export default defineComponent({
  name: "RoboPosition",
  props: ["deviceid"],
  components: {
    RoboMarker,
  },
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    const mapStore = useMapStore();
    return { roboStore, mapStore };
  },
  data() {
    return {};
  },

  computed: {
    position() {
      return [this.roboStore.position[1], this.roboStore.position[0]];
    },
  },

  methods: {
    addwaypoint: async function (latlng) {
      this.roboStore.addwaypoint(latlng);
      await this.roboStore.setwaypoints();
    },
    removewaypoint: async function (index) {
      this.roboStore.removewaypoint(index);
      await this.roboStore.setwaypoints();
    },
    /**
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
      await this.roboStore.setwaypoints();
    },
     */
  },
});
</script>
