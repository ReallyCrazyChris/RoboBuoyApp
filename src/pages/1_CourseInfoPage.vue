<template>
  <q-card
    flat
    class="regatta-view row content-start"
    style="min-height: inherit"
  >
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-6 text-h6 text-uppercase text-weight-bold">
          Course Info
        </div>
        <div class="col-6 text-right">
          <q-btn label="edit" color="primary" @click="editTransition()" />
        </div>
      </div>
      <q-separator class="q-mt-sm" />
    </q-card-section>

    <q-card-section class="col-12">
      <div>
        <courseType :readonly="true" />
        <courseMap
          class="q-mt-sm"
          :height="250"
          show-map
          show-boundary
          show-zoom
          :key="course.signature"
        />
      </div>
    </q-card-section>

    <q-card-actions class="col-12 q-pt-sm">
      <div class="fit text-right">
        <q-btn
          class="q-mr-sm"
          color="positive"
          label="Regatta"
          @click="prevTransition()"
        />
        <q-btn
          class="q-mr-sm"
          color="positive"
          label="participants"
          @click="nextTransition()"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import courseType from "src/components/course/courseType.vue";
import courseMap from "src/components/course/courseMap.vue";

import { useRaceCourse } from "src/stores/raceCourse";
const course = useRaceCourse();

export default {
  name: "regattaPage",
  components: {
    courseType,
    courseMap,
  },

  setup(props) {
    return { course };
  },

  methods: {
    editTransition() {
      this.$router.push("courseedit");
    },
    prevTransition() {
      this.$router.push("regattainfo");
    },
    nextTransition() {
      this.$router.push("participantinfo");
    },
  },
};
</script>
<style>
.q-field {
  &.q-field--readonly {
    &.q-field--standard {
      .q-field__control {
        &:before {
          border-bottom-style: none;
        }
      }
    }
  }
}

.regatta-view .q-select__dropdown-icon {
  visibility: hidden;
}
</style>
