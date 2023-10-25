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
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    <ol-layer-group ref="courseGroup" :opacity="1">
      <RoboPosition
        v-for="device in devicesStore.connecteddevices"
        :key="device.id"
        :deviceid="device.id"
      />

      <RoboPath
        v-for="device in devicesStore.connecteddevices"
        :key="device.id"
        :deviceid="device.id"
      />
    </ol-layer-group>
  </ol-map>
</template>

<script>
import { defineComponent } from "vue";
import { useDevicesStore } from "src/stores/devicesStore";
import { useMapStore } from "src/stores/omapStore";
import RoboPosition from "src/components/omap/RoboPosition.vue";
import RoboPath from "src/components/omap/RoboPath.vue";

import { View } from "ol";
import { fromLonLat } from "ol/proj.js";
import { extend, createEmpty } from "ol/extent.js";

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
    };
  },

  mounted() {
    this.height = this.$parent.$el.offsetHeight;
    this.width = this.$parent.$el.offsetWidth;
    this.animateZoom();
  },

  methods: {
    fitToRoboPaths() {
      const map = this.$refs.courseMap.map;
      const layerGroup = this.$refs.courseGroup.layerGroup;

      var extent = createEmpty();
      // only RoboPaths are layers, Robo Positions are not :(
      layerGroup.getLayers().forEach(function (layer) {
        extend(extent, layer.getSource().getExtent());
      });
      map.getView().fit(extent, map.getSize());
    },

    animateZoom() {
      const view = this.$refs.courseView;
      const point = fromLonLat(this.mapStore.center);

      view.animate(
        { center: point, duration: 500 },
        { zoom: 19, duration: 3000 }
      );
    },
  },
});
</script>
