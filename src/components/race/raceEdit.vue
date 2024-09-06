<template>
  <q-card flat class="row content-start" style="min-height: inherit">
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-6 text-h6 text-uppercase">Edit Regatta</div>
        <div class="col-6 text-right">
          <raceShare class="q-mr-sm" />
          <q-btn label="save" color="primary" @click="backTransition()" />
        </div>
      </div>
      <q-separator class="q-mt-sm" />
    </q-card-section>

    <q-card-section class="col-xs-12 col-md-6">
      <div class="fit">
        <div class="text-subtitle1">Info</div>
        <raceInfo />
        <q-separator class="xs q-mt-sm" />
      </div>
    </q-card-section>

    <q-card-section class="col-xs-12 col-md-6">
      <div class="fit">
        <div class="text-subtitle1">Start conditions</div>
        <raceStartConditions />
        <q-separator class="xs q-mt-sm" />
      </div>
    </q-card-section>

    <q-card-section class="col-12">
      <q-separator class="gt-sm q-mb-sm" />
      <div>
        <div class="text-subtitle1">Course</div>
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
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import raceStartConditions from "src/components/race/raceStartConditions.vue";
import courseLocation from "src/components/course/courseLocation.vue";
import courseType from "src/components/course/courseType.vue";
import courseRoute from "src/components/course/courseRoute.vue";
import courseMap from "src/components/course/courseMap.vue";
import raceShare from "src/components/race/raceShare.vue";
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
    raceShare,
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
