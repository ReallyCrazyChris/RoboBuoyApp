<template>
  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col">
      <q-img class="flagImageWidth" src="racesignals/apflag.svg" />

      <div class="text-h4-responsive">Raceing Temporarily Postponed</div>
      <div class="text-h6-responsive text-grey">
        Racing may continue when practical.
      </div>
    </q-card-section>
    <q-card-actions class="col-1" align="right">
      <q-btn
        flat
        color="primary"
        label="go to shore"
        @click="racepostponedashoreTransition()"
      />
      <q-btn
        flat
        color="primary"
        label="done for today"
        @click="racepostponedtodayTransition()"
      />
      <q-btn color="primary" label="Race info" @click="raceinfoTransition()" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { useRaceTimer } from "src/stores/raceTimer";
const raceTimer = useRaceTimer();

export default {
  name: "racePostponed",
  components: {},

  setup(props) {
    return {};
  },

  methods: {
    racepostponedashoreTransition() {
      raceTimer.racepostponedashoreTransition();
      raceTimer.publishRaceTransition("racepostponedashore");
    },

    racepostponedtodayTransition() {
      raceTimer.racepostponedtodayTransition();
      raceTimer.publishRaceTransition("racepostponedtoday");
    },

    raceinfoTransition() {
      raceTimer.raceinfoTransition();
      raceTimer.publishRaceTransition("raceinfo");
    },
  },
};
</script>
