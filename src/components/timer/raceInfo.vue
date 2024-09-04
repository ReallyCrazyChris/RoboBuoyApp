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
          <regattaShare />
        </div>
        <div class="col-3 text-right">
          <q-btn label="Edit" color="primary" @click="editTransition()" />
        </div>
      </div>
      <q-separator class="q-mt-sm" />
      <regattaSettings :readonly="true" />
      <q-separator class="q-mt-sm" />
      <div class="text-subtitle1 q-mt-sm">Race Start Conditions</div>
      <raceStartConditions :readonly="true" />
      <q-separator class="q-mt-sm" />
      <div class="text-subtitle1 q-mt-sm">Course and Location</div>
      <courseSettings :readonly="true" />
      <locationSettings :readonly="true" />
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
import regattaSettings from "src/components/regatta/regattaSettings.vue";
import courseSettings from "src/components/course/courseSettings.vue";
import locationSettings from "src/components/course/locationSettings.vue";
import regattaShare from "src/components/regatta/regattaShare.vue";
import raceStartConditions from "src/components/race/raceStartConditions.vue";
import courseRoute from "src/components/course/courseRoute.vue";
import courseMap from "src/components/course/courseMap.vue";

import { useRaceTimer } from "src/stores/raceTimer";
import { useRegatta } from "src/stores/regatta";
import { useCourse } from "src/stores/course";

const raceTimer = useRaceTimer();
const regatta = useRegatta();
const course = useCourse();

export default {
  name: "raceInfo",
  components: {
    regattaShare,
    regattaSettings,
    locationSettings,
    courseSettings,
    courseRoute,
    courseMap,
    raceStartConditions,
  },

  setup(props) {
    return { regatta, course, raceTimer };
  },

  methods: {
    editTransition() {
      this.$router.push("raceedit");
    },

    racepostponedTransition() {
      raceTimer.racepostponedTransition();
      raceTimer.publishRaceTransition("racepostponed");
    },

    followmeTransition() {
      raceTimer.followmeTransition();
      raceTimer.publishRaceTransition("followme");
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
