<template>
  <card flat class="row" style="min-height: inherit">
    <q-card-section class="col-6">
      <div class="text-h6-responsive">Call to Race</div>
      <q-separator class="q-my-sm" />
      <div class="text-h7-responsive text-grey">{{ raceinfo.name }}</div>
      <div class="text-h8-responsive text-grey">
        {{ raceinfo.description }}
      </div>
    </q-card-section>

    <q-card-section class="col-6 text-right">
      <q-img
        fit="scale-down"
        width="40vmin"
        height="40vmin"
        src="racesignals/lima.svg"
      />
    </q-card-section>

    <q-card-section class="col-12 q-py-none">
      <div class="text-h8-responsive text-grey">
        First start
        {{ raceinfo.localDate }} @
        {{ raceinfo.earliestStartTime }}
      </div>
    </q-card-section>
    <q-card-section class="col-12 q-py-none">
      <raceStartConditions :readonly="true" />
    </q-card-section>
    <q-card-actions class="col-12 self-end">
      <div class="fit text-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone Race"
          @click="racepostponedTransition()"
        />
        <q-btn
          color="positive"
          label="Start Race"
          @click="raceclassTransition()"
        />
      </div>
    </q-card-actions>
  </card>
</template>

<script>
import raceStartConditions from "src/components/race/raceStartConditions.vue";
import { useRaceTimer } from "src/stores/raceTimer";
import { useRaceCourse } from "src/stores/raceCourse";
import { useRaceInfo } from "src/stores/raceInfo";

const raceTimer = useRaceTimer();
const course = useRaceCourse();
const raceinfo = useRaceInfo();

export default {
  name: "raceFollome",
  components: { raceStartConditions },

  setup(props) {
    return { course, raceinfo };
  },

  methods: {
    showCourseTransition() {
      this.$router.push("course");
    },

    raceclassTransition() {
      raceTimer.raceclassTransition();
      raceTimer.publishRaceTransition("raceclass");
    },

    racepostponedTransition() {
      raceTimer.racepostponedTransition();
      raceTimer.publishRaceTransition("racepostponed");
    },
  },
};
</script>
<style></style>
src/stores/raceCourse
