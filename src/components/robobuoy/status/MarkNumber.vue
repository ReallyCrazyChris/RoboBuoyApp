<template>
  <q-circular-progress
    show-value
    class="text-white generic-hover-transition"
    size="2.5em"
    :color="roboStore.color"
    :center-color="roboStore.color"
    track-color="transparent"
    font-size="0.5em"
    :thickness="0"
    :min="0"
    :max="360"
    :model-value="nodusedmodel"
    :value="indicatorthickness"
    :angle="heading"
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
  name: "MarkNumber",
  props: ["number"],
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
    heading() {
      return (
        this.roboStore.currentcourse - Math.round(this.indicatorthickness / 2)
      );
    },
  },
};
</script>
<style></style>
