<template>
  <div class="column" style="min-height: inherit">
    <div class="col q-pa-md q-py-none">
      <q-img fit="scale-down" src="racesignals/apflag.svg" />
    </div>

    <div class="col-1 q-px-md q-py-none">
      <div class="text-h4">Raceing Postponed</div>
      <div class="text-h6 text-grey">Racing may continue when practical.</div>
    </div>

    <div class="col-1">
      <q-card flat>
        <q-card-actions align="right">
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
          <q-btn
            color="primary"
            label="Race info"
            @click="raceinfoTransition()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
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
<style></style>
