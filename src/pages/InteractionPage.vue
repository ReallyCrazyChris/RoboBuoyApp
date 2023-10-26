<template>
  <ol-vector-layer>
    <ol-source-vector :projection="mapStore.projection">
      <ol-feature
        v-for="(coordinates, index) in pathWaypoints"
        :key="'point' + String(index)"
        :properties="{ index: index, type: 'pathWaypoints' }"
      >
        <ol-geom-line-string
          v-if="pathWaypoints[index + 1]"
          :coordinates="[pathWaypoints[index], pathWaypoints[index + 1]]"
        ></ol-geom-line-string>
        <ol-style>
          <ol-style-stroke
            :color="strokeColor"
            :width="strokeWidth"
          ></ol-style-stroke>
        </ol-style>
      </ol-feature>

      <ol-feature
        v-for="(coordinates, index) in nodeWaypoints"
        :key="'point' + String(index)"
        :properties="{ index: index, type: 'waypoint' }"
      >
        <ol-geom-point :coordinates="coordinates"></ol-geom-point>
        <ol-style>
          <ol-style-circle :radius="radius">
            <ol-style-fill :color="fillColor"></ol-style-fill>
            <ol-style-stroke
              :color="strokeColor"
              :width="strokeWidth"
            ></ol-style-stroke>
          </ol-style-circle>
        </ol-style>
      </ol-feature>

      <ol-interaction-select @select="featureSelected"> </ol-interaction-select>
    </ol-source-vector>
  </ol-vector-layer>

  <ol-vector-layer>
    <ol-source-vector :projection="mapStore.projection">
      <ol-interaction-modify :features="selectedFeatures" />
      <ol-interaction-snap />
      <ol-feature :properties="{ type: 'marker' }">
        <ol-geom-point :coordinates="dragMarkerPosition"></ol-geom-point>
        <ol-style>
          <ol-style-fill :color="fillColor"></ol-style-fill>
          <ol-style-stroke
            :color="strokeColor"
            :width="strokeWidth"
          ></ol-style-stroke>
          <ol-style-icon
            :src="'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg'"
            :scale="2"
          >
          </ol-style-icon>
        </ol-style>
      </ol-feature>
    </ol-source-vector>
  </ol-vector-layer>
</template>

<script>
import { defineComponent, inject } from "vue";
import { useRoboStore } from "stores/roboStore";
import { useMapStore } from "src/stores/omapStore";
import { Collection } from "ol";
import { click } from "ol/events/condition";

export default defineComponent({
  name: "RoboPath",
  props: ["deviceid"],

  components: {},
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    const mapStore = useMapStore();
    var selectedFeatures = new Collection();

    const selectConditions = inject("ol-selectconditions");
    const selectCondition = selectConditions.click;

    return { roboStore, mapStore, selectedFeatures };
  },

  data() {
    return {
      radius: 5,
      strokeWidth: 5,
      strokeColor: "red",
      fillColor: "white",
    };
  },

  computed: {
    roboBuoyPosition() {
      // latlon -> lonlat ...aaargh
      return [this.roboStore.position[1], this.roboStore.position[0]];
    },
    nodeWaypoints() {
      // latlon -> lonlat ...aaargh
      const nodeWaypoints = this.roboStore.waypoints.map((waypoint) => [
        waypoint[1],
        waypoint[0],
      ]);
      return nodeWaypoints;
    },
    pathWaypoints() {
      // also draw the pathWaypoints to the robots positon
      const pathWaypoints = [this.roboBuoyPosition].concat(this.nodeWaypoints);
      return pathWaypoints;
    },
    dragMarkerPosition() {
      return this.pathWaypoints[this.pathWaypoints.length - 1];
    },
  },

  methods: {
    featureSelected(event) {
      console.log("featureSelected", event);
      const feature = event.selected[0];
      const featureProps = feature?.getProperties();

      if ("marker" == featureProps?.type) {
        this.addwaypoint(feature);
      }

      if ("waypoint" == featureProps?.type) {
        this.removewaypoint(featureProps.index);
      }

      if ("pathWaypoints" == featureProps?.type) {
        this.removepath(featureProps.index);
      }
    },

    addwaypoint: function (feature) {
      console.log("addwaypoint", feature);
      //const coordinates = feature.getGeometry().getCoordinates();
      //console.log(coordinates);
      //this.roboStore.addwaypoint(latlng);
      //await this.roboStore.setwaypoints();
    },

    removewaypoint: async function (index) {
      this.roboStore.removewaypoint(index);
      await this.roboStore.setwaypoints();
    },

    removepath: async function (index) {
      this.roboStore.removepath(index);
      await this.roboStore.setwaypoints();
    },
  },
});
</script>
