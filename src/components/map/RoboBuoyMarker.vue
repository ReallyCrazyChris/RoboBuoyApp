<template>
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
    :model-value="nodusedmodel"
    :value="indicatorthickness"
    :angle="indicatortangle"
  >
    <div class="column items-center justify-end">
      <div class="">{{ roboStore.number }}</div>
    </div>
    <q-tooltip class="bg-dark text-white">roboStore.name</q-tooltip>
  </q-circular-progress>
</template>

<script>
import { useRoboStore } from "stores/roboStore";
import { ref } from "vue";

export default {
  name: "RoboBuoyMarker",
  props: ["deviceid"],
  components: {},

  data() {
    return {
      // how thick the indicato ris on the knob
      indicatorthickness: 10,
    };
  },

  setup(props) {
    const roboStore = useRoboStore(props.deviceid);

    return {
      roboStore,
      nodusedmodel: ref(10),
    };
  },

  computed: {
    indicatortangle() {
      return (
        this.roboStore.currentcourse - Math.round(this.indicatorthickness / 2)
      );
    },
  },
};
</script>
<style></style>
