<template>
  <q-card flat class="row content-start" style="min-height: inherit">
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-6 text-h6 text-uppercase">Regatta Info</div>
        <div class="col-6 text-right">
          <regattaShare class="q-mr-sm" />
          <q-btn label="edit" color="primary" @click="editTransition()" />
        </div>
      </div>
      <q-separator class="q-mt-sm" />
    </q-card-section>

    <q-card-section class="col-xs-12 col-md-6">
      <div class="fit">
        <div class="text-subtitle1">Info</div>
        <regattaInfo :readonly="true" />
        <q-separator class="xs q-mt-sm" />
      </div>
    </q-card-section>

    <q-card-section class="col-xs-12 col-md-6">
      <div class="fit">
        <div class="text-subtitle1">Start conditions</div>
        <raceStartConditions :readonly="true" />
        <q-separator class="xs q-mt-sm" />
      </div>
    </q-card-section>

    <q-card-section class="col-12">
      <q-separator class="gt-sm q-mb-sm" />
      <div>
        <div class="text-subtitle1">Course</div>
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
      </div>
    </q-card-section>

    <q-card-actions class="col-12 q-pt-sm">
      <div class="fit text-right">
        <q-btn
          class="q-mr-sm"
          flat
          color="secondary"
          label="postpone"
          @click="racepostponedTransition()"
        />

        <q-btn
          class="q-mr-sm"
          color="positive"
          label="Call to Race"
          @click="followmeTransition()"
        />
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
import regattaShare from "src/components/race/regattaShare.vue";
import regattaInfo from "src/components/race/regattaInfo.vue";

import { useRaceCourse } from "src/stores/raceCourse";
import { useRaceTimer } from "src/stores/raceTimer";
import { useRegattaInfo } from "src/stores/regattaInfo";

const racetimer = useRaceTimer();
const regattainfo = useRegattaInfo();
const course = useRaceCourse();

export default {
  name: "regattaView",
  components: {
    regattaShare,
    regattaInfo,
    courseLocation,
    courseType,
    courseRoute,
    courseMap,
    raceStartConditions,
  },

  setup(props) {
    return { regattainfo, course, racetimer };
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
