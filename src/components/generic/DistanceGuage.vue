<template>
  <q-circular-progress
    show-value
    class="text-white generic-hover-transition"
    size="10em"
    color="white"
    :center-color="color"
    track-color="transparent"
    font-size="0.15em"
    :thickness="0.2"
    :min="0"
    :max="50"
    :model-value="value"
    :value="value"
    :angle="0"
  >
    <div class="column items-center justify-end">
      <div class="">{{ value }}</div>
      <div class="text-subtitle2">{{ name }}</div>
    </div>
  </q-circular-progress>
</template>

<script>
import { useRoboStore } from "stores/roboStore";
import { ref } from "vue";

export default {
  name: "DistanceGuage",
  props: ["name", "value", "color"],
  components: {},

  data() {
    return {
      // how thick the indicato ris on the knob
      thickness: 10,
    };
  },

  setup(props) {
    return {};
  },
};
</script>
<style></style>
