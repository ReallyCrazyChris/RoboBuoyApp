<template>
  <ol-vector-layer :zIndex="10">
    <ol-source-vector :projection="mapStore.projection">
      <ol-feature
        v-for="(coordinates, index) in pathWaypoints"
        :key="'point' + String(index)"
        :properties="{ index: index, type: 'pathSegment' }"
      >
        <div>
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
        </div>
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

  <ol-vector-layer :zIndex="20">
    <ol-source-vector>
      <ol-interaction-modify :hitDetection="true" @modifyend="addwaypoint">
        <ol-feature>
          <ol-geom-point :coordinates="dragMarkerPosition"></ol-geom-point>
          <ol-style>
            <ol-style-icon
              src="RoboMapPin.png"
              :scale="0.08"
              :anchor="[0.5, 1]"
              :zIndex="50"
              :color="strokeColor"
            ></ol-style-icon>
          </ol-style>
        </ol-feature>
      </ol-interaction-modify>
    </ol-source-vector>
  </ol-vector-layer>
</template>

<script>
import { defineComponent } from "vue";
import { colors } from "quasar";
import { useRoboStore } from "stores/roboStore";
import { useMapStore } from "src/stores/mapStore";
import { fromLonLat } from "ol/proj";

const { getPaletteColor } = colors;

export default defineComponent({
  name: "RoboPath",
  props: ["deviceid"],
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    const mapStore = useMapStore();
    return { roboStore, mapStore };
  },

  data() {
    return {
      radius: 6,
      strokeWidth: 4,
      fillColor: "white",
    };
  },

  computed: {
    strokeColor() {
      return getPaletteColor(this.roboStore.color);
    },

    nodeWaypoints() {
      // latlon -> lonlat ...aaargh
      const nodeWaypoints = this.roboStore.waypoints.map((waypoint) =>
        fromLonLat([Number(waypoint[1]), Number(waypoint[0])])
      );
      return nodeWaypoints;
    },
    pathWaypoints() {
      // also draw the pathWaypoints to the robots positon
      const pathWaypoints = [this.roboStore.coordinate].concat(
        this.nodeWaypoints
      );
      return pathWaypoints;
    },
    dragMarkerPosition() {
      // dragMarker is the last in the array
      return this.pathWaypoints[this.pathWaypoints.length - 1];
    },
  },

  methods: {
    featureSelected(event) {
      const feature = event.selected[0];
      const featureProps = feature?.getProperties();

      if ("waypoint" == featureProps?.type) {
        this.removewaypoint(featureProps.index);
      }

      if ("pathSegment" == featureProps?.type) {
        this.removepath(featureProps.index);
      }

      const selected = event.target;
      selected.getFeatures().clear();
      //console.log("featureSelected", selected);
    },

    addwaypoint: async function (event) {
      let coordinate;
      // the coordinate will always be the last selected feature
      event.features.forEach(async (selected_feature) => {
        coordinate = selected_feature.getGeometry().getCoordinates();
      });

      this.roboStore.addwaypoint(coordinate);
      await this.roboStore.setwaypoints();
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
