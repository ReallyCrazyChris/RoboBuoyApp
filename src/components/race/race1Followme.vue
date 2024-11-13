<template>
  <q-card flat class="row" style="min-height: inherit">
    <q-card-section class="col-6">
      <div class="text-h6 text-uppercase text-weight-bold">
        CALL TO RACE {{ regattaevent.currentrace.racenumber }}
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
        {{ regattainfo.localDate }} @
        {{ regattainfo.earliestStartTime }}
      </div>
    </q-card-section>
    <q-card-section class="col-12 q-py-none">
      <regattaStartConditions :readonly="true" />
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
  </q-card>
</template>

<script>
import regattaStartConditions from "src/components/regatta/regattaStartConditions.vue";

import { useRegattaEvent } from "src/stores/regattaEvent";
import { useRaceTimer } from "src/stores/raceTimer";
import { useRegattaInfo } from "src/stores/regattaInfo";

const regattaevent = useRegattaEvent();
const raceTimer = useRaceTimer();
const regattainfo = useRegattaInfo();

export default {
  name: "raceFollome",
  components: { regattaStartConditions },

  setup(props) {
    return { regattainfo, regattaevent };
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
