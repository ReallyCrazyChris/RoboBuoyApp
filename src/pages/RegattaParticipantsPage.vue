<template>
  <q-page>
    <addParticipant />
    <regattaParticipants />

    <q-btn
      color="positive"
      label="create race"
      @click="racescore.create()"
    ></q-btn>

    <currentRace />
    <currentRaceResult />

    <q-btn
      color="positive"
      label="commit race result"
      @click="racescore.commitRaceResult()"
    ></q-btn>
    <regattaRaceResults />
    <regattaOverallResults />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import addParticipant from "/src/components/regatta/addParticipant.vue";
import regattaParticipants from "/src/components/regatta/regattaParticipants.vue";

import currentRace from "/src/components/regatta/currentRace.vue";
import currentRaceResult from "/src/components/regatta/currentRaceResult.vue";

import regattaRaceResults from "/src/components/regatta/regattaRaceResults.vue";
import regattaOverallResults from "/src/components/regatta/regattaOverallResults.vue";

import { useRaceScore } from "src/stores/raceScore";
const racescore = useRaceScore();

import { useRegattaResults } from "src/stores/regattaResults";
const regattaresults = useRegattaResults();

export default defineComponent({
  name: "RegattaParticipantsPage",
  components: {
    addParticipant,
    regattaParticipants,
    currentRace,
    currentRaceResult,
    regattaRaceResults,
    regattaOverallResults,
  },
  setup() {
    return { racescore, regattaresults };
  },
  computed: {},
});
</script>
