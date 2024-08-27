<template>
  <div class="fit row wrap justify-start items-center content-center q-pt-sm">
    <div class="col-10 self-center">
      <q-input
        readonly
        filled
        dense
        v-model="regatta.location"
        label="location"
      />
    </div>
    <div class="col-2 text-right self-center">
      <q-btn
        readonly
        round
        icon="map"
        color="primary"
        @click="showCourseTransition"
      />
    </div>
  </div>
</template>

<script>
import { useRegatta } from "src/stores/regatta";
const regatta = useRegatta();

export default {
  name: "locationSettings",
  setup() {
    return { regatta };
  },

  methods: {
    showCourseTransition() {
      this.$router.push("course");
    },
  },
};
</script>
<style>
.q-field {
  &.q-field--readonly {
    &.q-field--filled {
      .q-field__control {
        &:before {
          border: none;
        }
      }
    }
  }
}
</style>
