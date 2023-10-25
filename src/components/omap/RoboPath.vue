<template>
  <ol-vector-layer>
    <ol-source-vector>
      <ol-feature>
        <ol-geom-point :coordinates="position"></ol-geom-point>
        <ol-style>
          <ol-style-fill :color="fillColor"></ol-style-fill>
          <ol-style-stroke
            :color="strokeColor"
            :width="strokeWidth"
          ></ol-style-stroke>
          <ol-style-icon
            :src="'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg'"
            :scale="6"
          >
          </ol-style-icon>
        </ol-style>
      </ol-feature>
    </ol-source-vector>
  </ol-vector-layer>
</template>

<script>
import { defineComponent, nextTick } from "vue";
import { useRoboStore } from "stores/roboStore";
import { useMapStore } from "src/stores/omapStore";
import { fromLonLat } from "ol/proj.js";

export default defineComponent({
  name: "RoboPath",
  props: ["deviceid"],
  components: {},
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    const mapStore = useMapStore();
    return { roboStore, mapStore };
  },

  data() {
    return {
      radius: 40,
      strokeWidth: 10,
      strokeColor: "red",
      fillColor: "white",
    };
  },

  computed: {
    position() {
      return fromLonLat([
        this.roboStore.position[1],
        this.roboStore.position[0],
      ]);
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
