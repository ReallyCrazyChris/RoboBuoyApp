<template>
  <div class="row">
    <div class="col-10 q-mt-sm self-center">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="raceinfo.location"
        label="location"
      />
    </div>
    <div class="col-2 q-mt-sm text-right self-center">
      <q-btn round icon="map" color="primary" @click="showCourseTransition" />
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
