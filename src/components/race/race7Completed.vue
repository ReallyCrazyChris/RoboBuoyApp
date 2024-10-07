<template>
  <q-card flat class="row" style="min-height: inherit">
    <q-card-section class="col-12">
      <div class="fit">
        <div class="text-h6 text-uppercase text-grey">Regatta Results</div>
        <regattaFinalResults />
        <q-separator class="xs q-mt-sm" />
      </div>
    </q-card-section>

    <q-card-section class="col-12">
      <div class="fit">
        <div class="text-h6 text-uppercase text-grey">Race Results</div>
        <regattaRaceResults />
        <q-separator class="xs q-mt-sm" />
      </div>
    </q-card-section>

    <q-card-actions class="col-12 self-end">
      <div class="fit text-right">
        <q-btn
          color="positive"
          label="Regatt Info"
          @click="raceTimer.raceinfoTransition()"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import regattaRaceResults from "/src/components/regatta/regattaRaceResults.vue";
import regattaFinalResults from "/src/components/regatta/regattaFinalResults.vue";

import { useRaceTimer } from "src/stores/raceTimer";
const raceTimer = useRaceTimer();

export default {
  name: "raceCompleted",
  components: { regattaRaceResults, regattaFinalResults },
  setup() {
    return { raceTimer };
  },

  methods: {},
};
</script>
<style></style>
