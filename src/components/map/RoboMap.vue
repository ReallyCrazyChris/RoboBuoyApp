<template>
  <ol-map
    ref="courseMap"
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    :style="{ height: height + 'px', width: width + 'px' }"
  >
    <ol-view
      ref="courseView"
      :projection="mapStore.projection"
      :center="mapStore.center"
      :rotation="mapStore.rotation"
      :zoom="mapStore.zoom"
      :extent="mapStore.extentOfInterest"
      :showFullExtent="true"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <!--Geo Locate the RoboApp -->
    <ol-geolocation
      v-if="$refs.courseView"
      :projection="mapStore.projection"
      :tracking="true"
      @change:position="updateRoboAppCoordinate"
      @change:position.once="zoomtoRoboAppCoordinate"
    >
      <template>
        <ol-vector-layer :zIndex="50">
          <ol-source-vector>
            <ol-feature
              ref="positionFeature"
              :properties="{ type: 'committeeBoat' }"
            >
              <ol-geom-point :coordinates="roboAppCoordinate"></ol-geom-point>
              <ol-style>
                <ol-style-icon
                  src="RoboMapPin.png"
                  :scale="0.1"
                ></ol-style-icon>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </template>
    </ol-geolocation>

    <!-- Show the Robobuoy's onthe Map-->
    <RoboPosition
      v-for="device in devicesStore.connecteddevices"
      :key="device.id"
      :deviceid="device.id"
    />

    <!-- View / Edit the RoboBuoy Paths-->
    <RoboPath
      v-for="device in devicesStore.connecteddevices"
      :key="device.id"
      :deviceid="device.id"
    />
  </ol-map>
</template>

<script>
import { defineComponent } from "vue";
import { useDevicesStore } from "src/stores/devicesStore";
import { useMapStore } from "src/stores/mapStore";
import RoboPosition from "src/components/map/RoboPosition.vue";
import RoboPath from "src/components/map/RoboPath.vue";

export default defineComponent({
  name: "RoboMap",
  components: {
    RoboPosition,
    RoboPath,
  },
  setup() {
    const devicesStore = useDevicesStore();
    const mapStore = useMapStore();
    return {
      devicesStore,
      mapStore,
    };
  },
  data() {
    return {
      height: 800,
      width: 800,
      roboAppCoordinate: [],
    };
  },

  mounted() {
    this.height = this.$parent.$el.offsetHeight;
    this.width = this.$parent.$el.offsetWidth;
  },

  methods: {
    // When the App is Geolocated zoom to the Apps coordiante
    zoomtoRoboAppCoordinate(event) {
      this.roboAppCoordinate = event.target.getPosition();
      this.mapStore.zoomToCoordinate(this.roboAppCoordinate);
    },
    // Keep the RoboApp's position updated
    updateRoboAppCoordinate(event) {
      this.roboAppCoordinate = event.target.getPosition();
    },
  },
});
</script>
