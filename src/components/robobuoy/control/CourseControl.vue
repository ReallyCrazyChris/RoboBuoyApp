<template>
  <q-knob
    v-if="roboStore.isManual"
    show-value
    class="text-white generic-hover-transition"
    size="8em"
    color="white"
    center-color="primary"
    track-color="transparent"
    font-size="0.30em"
    :thickness="0.1"
    :min="0"
    :max="360"
    :model-value="nodusedmodel"
    :value="indicatorthickness"
    :step="5"
    :angle="indicatortangle"
    @update:model-value="updatedesiredcourse"
  >
    <div class="column items-center justify-end">
      <div class="">{{ roboStore.desiredcourse }}</div>
      <div class="text-subtitle2">Course °</div>
      <div class="text-subtitle2">gps {{ roboStore.gpscourse }} °</div>
    </div>
    <!--q-tooltip class="bg-dark text-white">Direction</q-tooltip-->
  </q-knob>

  <q-knob
    v-else
    readonly
    show-value
    class="text-white generic-hover-transition"
    size="8em"
    color="white"
    center-color="primary"
    track-color="transparent"
    font-size="0.30em"
    :thickness="0.1"
    :min="0"
    :max="360"
    :model-value="nodusedmodel"
    :value="indicatorthickness"
    :step="5"
    :angle="roboStore.currentcourse"
    @update:model-value="updatedesiredcourse"
  >
    <div class="column items-center justify-end">
      <div class="">{{ roboStore.currentcourse }}</div>
      <div class="text-subtitle2">Course °</div>
      <div class="text-subtitle2">gps {{ roboStore.gpscourse }} °</div>
    </div>
    <!--q-tooltip class="bg-dark text-white">Direction</q-tooltip-->
  </q-knob>
</template>

<script>
import { useRoboStore } from "stores/roboStore";
import { ref } from "vue";

export default {
  name: "CourseControl",
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
        this.roboStore.desiredcourse - Math.round(this.indicatorthickness / 2)
      );
    },
  },

  methods: {
    updatedesiredcourse(addcourse) {
      var newcourse = this.roboStore.desiredcourse + addcourse;

      // Constrain the new cource
      if (newcourse > 180) {
        newcourse -= 360;
      }
      if (newcourse < -180) {
        newcourse += 360;
      }

      // Rounding is steps of 10
      newcourse = Math.ceil(newcourse / 5) * 5;

      this.roboStore.setdesiredcourse(newcourse);
    },
  },
};
</script>
<style></style>
