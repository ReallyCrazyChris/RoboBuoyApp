<template>
  <card flat class="row" style="min-height: inherit">
    <q-card-section class="col-12">
      <q-img
        fit="scale-down"
        width="50vmin"
        height="50vmin"
        src="racesignals/apflag.svg"
      />
    </q-card-section>
    <q-card-section class="col-12 q-py-none">
      <div class="text-h4-responsive">Raceing Temporarily Postponed</div>
      <div class="text-h6-responsive text-grey">
        Racing may continue when practical.
      </div>
    </q-card-section>
    <q-card-actions class="col-12 self-end">
      <div class="fit text-right">
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
      </div>
    </q-card-actions>
  </card>
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
