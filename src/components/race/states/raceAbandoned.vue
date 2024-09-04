<template>
  <div class="column" style="min-height: inherit">
    <div class="col q-pa-md q-py-none">
      <q-img fit="scale-down" src="racesignals/november.svg" />
    </div>

    <div class="col-1 q-px-md q-py-none">
      <div class="text-h4-responsive q-mt-sm q-mb-xs">Race Abandoned</div>
      <div class="text-h6-responsive text-grey">This race is Abandoned.</div>
    </div>

    <div class="col-1">
      <q-card flat>
        <q-card-actions align="right">
          <q-btn
            flat
            color="secondary"
            label="Go to shore"
            @click="raceabandonedashoreTransition()"
          />
          <q-btn
            flat
            color="secondary"
            label="Racing Completed"
            @click="raceabandonedtodayTransition()"
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
  name: "raceAbandoned",
  components: {},

  setup(props) {
    return {};
  },

  methods: {
    raceabandonedashoreTransition() {
      raceTimer.raceabandonedashoreTransition();
      raceTimer.publishRaceTransition("raceabandonedashore");
    },

    raceabandonedtodayTransition() {
      raceTimer.raceabandonedtodayTransition();
      raceTimer.publishRaceTransition("raceabandonedtoday");
    },

    raceinfoTransition() {
      raceTimer.raceinfoTransition();
      raceTimer.publishRaceTransition("raceinfo");
    },
  },
};
</script>
<style></style>
