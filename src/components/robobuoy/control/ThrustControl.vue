<template>
  <q-knob
    :readonly="!roboStore.isManual"
    show-value
    class="text-white"
    size="8em"
    color="green"
    center-color="primary"
    track-color="transparent"
    font-size="0.30em"
    :thickness="0.1"
    :min="0"
    :max="roboStore.vmax + 1"
    :model-value="nodusedmodel"
    :value="roboStore.surge"
    @update:model-value="setsurge"
    :step="2"
  >
    <div class="column items-center justify-end">
      <div class="">{{ roboStore.surge }}</div>
      <div class="text-subtitle2">Thrust</div>
      <div class="text-subtitle2">{{ roboStore.gpsspeed }}kt</div>
    </div>
    <q-tooltip
      class="bg-dark text-white"
      anchor="top middle"
      self="bottom middle"
      >Thrust</q-tooltip
    >
  </q-knob>
</template>

<script>
import { useRoboStore } from "stores/roboStore";
import { ref } from "vue";

export default {
  name: "ThrustControl",
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

  methods: {
    setsurge(surge) {
      // Rounding is steps of 5
      surge = Math.ceil(surge / 2) * 2;
      this.roboStore.setsurge(surge);
    },
  },
};
</script>
<style></style>
