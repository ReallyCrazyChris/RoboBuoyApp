<template>
  <q-page>
    <regattaParticipant />
    <regattaParticipants />

    <q-btn
      color="positive"
      label="create race"
      @click="regattaevent.addRace()"
    ></q-btn>

    <currentRace />
    <currentRaceResult />

    <q-btn
      color="positive"
      label="commit race result"
      @click="regattaevent.commitRaceResult()"
    ></q-btn>
    <regattaRaceResults />
    <regattaOverallResults />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import regattaParticipant from "/src/components/regatta/regattaParticipant.vue";
import regattaParticipants from "/src/components/regatta/regattaParticipants.vue";
import currentRace from "/src/components/regatta/currentRace.vue";
import currentRaceResult from "/src/components/regatta/currentRaceResult.vue";
import regattaRaceResults from "/src/components/regatta/regattaRaceResults.vue";
import regattaOverallResults from "/src/components/regatta/regattaOverallResults.vue";

import { useRegattaEvent } from "/src/stores/regattaEvent";
const regattaevent = useRegattaEvent();

export default defineComponent({
  name: "RegattaParticipantsPage",
  components: {
    regattaParticipant,
    regattaParticipants,
    currentRace,
    currentRaceResult,
    regattaRaceResults,
    regattaOverallResults,
  },
  setup() {
    return { regattaevent };
  },
  computed: {},
});
</script>
