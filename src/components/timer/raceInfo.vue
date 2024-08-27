<template>
  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col q-pb-none">
      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col-12 text-h6">{{ regatta.name }}</div>
          </div>
        </div>

        <div class="col-6 q-pb-md" align="right">
          <regattaShare />
        </div>
      </div>

      <regattaSettings />
      <q-separator class="q-mt-sm" />
      <div class="text-subtitle1 q-mt-sm">Course and Location</div>
      <courseSettings />
      <locationSettings />
      <courseMap
        class="q-mt-sm"
        :height="250"
        show-map
        show-boundary
        show-zoom
        :key="course.signature"
      />
      <q-separator class="q-mt-sm" />
      <div class="text-subtitle1 q-mt-sm">Race Conditions</div>
      <raceSettings />
    </q-card-section>

    <q-card-actions class="col-1 q-pt-none" align="right">
      <q-btn
        flat
        color="secondary"
        label="postpone"
        @click="racepostponedTransition()"
      />
      <q-btn color="positive" label="Follow me" @click="followmeTransition()" />
    </q-card-actions>
  </q-card>
</template>

<script>
import regattaSettings from "src/components/regatta/regattaSettingsView.vue";
import courseSettings from "src/components/course/courseSettingsView.vue";
import locationSettings from "src/components/course/locationSettingsView.vue";
import regattaShare from "src/components/regatta/regattaShare.vue";
import raceSettings from "src/components/race/raceSettingsView.vue";
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
    courseMap,
    raceSettings,
  },

  setup(props) {
    return { regatta, course, raceTimer };
  },

  methods: {
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
