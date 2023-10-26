<template>
  <ol-map
    ref="courseMap"
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    :style="{ height: height + 'px', width: width + 'px' }"
  >
    <ol-view
      :projection="mapStore.projection"
      :center="mapStore.center"
      :rotation="mapStore.rotation"
      :zoom="mapStore.zoom"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-layer-group>
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

import { useGeographic } from "ol/proj.js";
import { extend, createEmpty, getCenter } from "ol/extent.js";

export default defineComponent({
  name: "RoboMap",
  components: {
    RoboPosition,
    RoboPath,
  },
  setup() {
    const devicesStore = useDevicesStore();
    const mapStore = useMapStore();
    useGeographic();
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
  },

  methods: {
    fitToCenterOfPaths() {
      return null;

      const layerGroup = this.$refs.courseGroup.layerGroup;

      // create an extent that expands to include all paths
      var extentOfLayerItems = createEmpty();
      layerGroup.getLayers().forEach(function (layerItem) {
        extend(extentOfLayerItems, layerItem.getSource().getExtent());
      });

      // get the centroid of the Layer Items
      const centroid = getCenter(extentOfLayerItems);
      if (centroid[0] && centroid[1]) {
        this.mapStore.center = centroid;
        //this.mapStore.zoom = 19;
      }
    },
  },
});
</script>
