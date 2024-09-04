<template>
  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col q-pb-none">
      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col-12 text-h6 text-uppercase">Race Info</div>
          </div>
        </div>

        <div class="col-3 text-right"></div>
        <div class="col-3 text-right">
          <q-btn label="save" color="primary" @click="backTransition()" />
        </div>
      </div>
      <q-separator class="q-mt-sm" />
      <raceInfo />

      <q-separator class="q-mt-sm" />
      <div class="text-subtitle1 q-mt-sm">Race Conditions</div>
      <raceStartConditions />

      <q-separator class="q-mt-sm" />
      <div class="text-subtitle1 q-mt-sm">Course and Location</div>
      <courseType />
      <courseLocation />
      <courseMap
        class="q-mt-sm"
        :height="250"
        show-map
        show-boundary
        show-zoom
        show-controls
        :key="course.signature"
      />
      <courseRoute />
    </q-card-section>
  </q-card>
</template>

<script>
import raceStartConditions from "src/components/race/raceStartConditions.vue";
import courseLocation from "src/components/course/courseLocation.vue";
import courseType from "src/components/course/courseType.vue";
import courseRoute from "src/components/course/courseRoute.vue";
import courseMap from "src/components/course/courseMap.vue";
import raceInfo from "src/components/race/raceInfo.vue";

import { defineComponent } from "vue";
import { useRaceInfo } from "src/stores/raceInfo";
import { useRaceCourse } from "src/stores/raceCourse";

const raceinfo = useRaceInfo();
const course = useRaceCourse();

export default defineComponent({
  name: "raceEdit",
  components: {
    raceStartConditions,
    courseLocation,
    courseType,
    courseRoute,
    courseMap,
    raceInfo,
  },
  setup() {
    // makes sure the courseMap fills the parent element to the maximum
    return {
      raceinfo,
      course,
    };
  },
  methods: {
    backTransition() {
      this.raceinfo.publishRaceInfoState();
      this.$router.go(-1);
    },
  },
});
</script>
