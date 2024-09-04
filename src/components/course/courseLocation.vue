<template>
  <div class="fit row wrap justify-start items-center content-center q-pt-sm">
    <div class="col-10 self-center">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="raceinfo.location"
        label="location"
      />
    </div>
    <div class="col-2 text-right self-center">
      <q-btn
        round
        size="sm"
        icon="map"
        color="primary"
        @click="showCourseTransition"
      />
    </div>
  </div>
</template>

<script>
import { useRaceInfo } from "src/stores/raceInfo";
const raceinfo = useRaceInfo();

export default {
  name: "courseLocation",
  props: {
    readonly: Boolean,
  },
  setup() {
    return { raceinfo };
  },

  methods: {
    showCourseTransition() {
      this.$router.push("course");
    },
  },
};
</script>
<style></style>
