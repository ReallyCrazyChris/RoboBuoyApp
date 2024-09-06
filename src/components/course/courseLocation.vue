<template>
  <div class="row">
    <div class="col-10 q-mt-sm self-center">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="regattainfo.location"
        label="location"
      />
    </div>
    <div class="col-2 q-mt-sm text-center self-center">
      <q-btn round icon="map" color="primary" @click="showCourseTransition" />
    </div>
  </div>
</template>

<script>
import { useRegattaInfo } from "src/stores/regattaInfo";
const regattainfo = useRegattaInfo();

export default {
  name: "courseLocation",
  props: {
    readonly: Boolean,
  },
  setup() {
    return { regattainfo };
  },

  methods: {
    showCourseTransition() {
      this.$router.push("course");
    },
  },
};
</script>
<style></style>
