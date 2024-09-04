<template>
  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col q-pb-none">
      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col-12 text-h6 text-uppercase self-center">
              Race Info
            </div>
          </div>
        </div>

        <div class="col-3 text-right">
          <raceShare />
        </div>
        <div class="col-3 text-right">
          <q-btn label="Edit" color="primary" @click="editTransition()" />
        </div>
      </div>
      <q-separator class="q-mt-sm" />
      <raceInfo :readonly="true" />
      <q-separator class="q-mt-sm" />
      <div class="text-subtitle1 q-mt-sm">Race Start Conditions</div>
      <raceStartConditions :readonly="true" />
      <q-separator class="q-mt-sm" />
      <div class="text-subtitle1 q-mt-sm">Course and Location</div>
      <courseType :readonly="true" />
      <courseLocation :readonly="true" />
      <courseMap
        class="q-mt-sm"
        :height="250"
        show-map
        show-boundary
        show-zoom
        :key="course.signature"
      />
      <courseRoute />
    </q-card-section>
    <q-separator class="q-mt-sm" />
    <q-card-actions class="col-1 q-pt-sm">
      <div class="row fit">
        <div class="col-8 text-right">
          <q-btn
            flat
            color="secondary"
            label="postpone"
            @click="racepostponedTransition()"
          />
        </div>
        <div class="col-4 text-right">
          <q-btn
            color="positive"
            label="Follow me"
            @click="followmeTransition()"
          />
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import raceStartConditions from "src/components/race/raceStartConditions.vue";
import courseLocation from "src/components/course/courseLocation.vue";
import courseRoute from "src/components/course/courseRoute.vue";
import courseType from "src/components/course/courseType.vue";
import courseMap from "src/components/course/courseMap.vue";
import raceShare from "src/components/race/raceShare.vue";
import raceInfo from "src/components/race/raceInfo.vue";

import { useRaceCourse } from "src/stores/raceCourse";
import { useRaceTimer } from "src/stores/raceTimer";
import { useRaceInfo } from "src/stores/raceInfo";

const racetimer = useRaceTimer();
const raceinfo = useRaceInfo();
const course = useRaceCourse();

export default {
  name: "raceView",
  components: {
    raceShare,
    raceInfo,
    courseLocation,
    courseType,
    courseRoute,
    courseMap,
    raceStartConditions,
  },

  setup(props) {
    return { raceinfo, course, racetimer };
  },

  methods: {
    editTransition() {
      this.$router.push("raceedit");
    },

    racepostponedTransition() {
      racetimer.racepostponedTransition();
      racetimer.publishRaceTransition("racepostponed");
    },

    followmeTransition() {
      racetimer.followmeTransition();
      racetimer.publishRaceTransition("followme");
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
</style>
src/stores/raceCourse
