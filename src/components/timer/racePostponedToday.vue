<template>
  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col">
      <q-img src="racesignals/apalpha.svg" style="width: 80vmin" />

      <div class="text-h4 q-mt-sm q-mb-xs">Raceing Postponed</div>
      <div class="text-h6 text-grey">No further racing today.</div>
    </q-card-section>
    <q-card-actions class="col-1" align="right">
      <q-btn color="primary" label="Race info" @click="raceinfoTransition()" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { useRaceTimer } from "src/stores/raceTimer";
const raceTimer = useRaceTimer();

export default {
  name: "racePostponedToday",
  methods: {
    raceinfoTransition() {
      raceTimer.raceinfoTransition();
      raceTimer.publishRaceTransition("raceinfo");
    },
  },
};
</script>
<style></style>
