<template>
  <ol-overlay
    :position="roboStore.coordinate"
    :positioning="'center-center'"
    :stopEvent="false"
    @click="mapStore.zoomToCoordinate(roboStore.coordinate)"
  >
    <q-circular-progress
      show-value
      class="text-white generic-hover-transition"
      size="6em"
      :color="roboStore.color"
      :center-color="roboStore.color"
      track-color="transparent"
      font-size="0.30em"
      :thickness="0.5"
      :min="0"
      :max="360"
      :model-value="10"
      :value="indicatorthickness"
      :angle="indicatortangle"
    >
      <div class="text-white prevent-select">{{ roboStore.number }}</div>
      <q-tooltip class="bg-dark text-white">{{ roboStore.name }}</q-tooltip>
    </q-circular-progress>
  </ol-overlay>
</template>

<script>
import { defineComponent } from "vue";
import { useRoboStore } from "stores/roboStore";
import { useMapStore } from "stores/mapStore";
import { fromLonLat } from "ol/proj";

export default defineComponent({
  name: "RoboPosition",
  props: ["deviceid"],
  components: {},
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    const mapStore = useMapStore();
    return { roboStore, mapStore };
  },
  data() {
    return {
      indicatorthickness: 10,
    };
  },

  mounted() {},

  computed: {
    indicatortangle() {
      return (
        this.roboStore.currentcourse - Math.round(this.indicatorthickness / 2)
      );
    },
  },
});
</script>
<style>
.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
