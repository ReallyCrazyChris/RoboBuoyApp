<template>
  <q-page>
    <regattaParticipant />
    <regattaParticipants />
    <raceParticipants />
    <raceResults />
    <regattaResults />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import regattaParticipant from "/src/components/regatta/regattaParticipant.vue";
import regattaParticipants from "/src/components/regatta/regattaParticipants.vue";
import raceParticipants from "/src/components/regatta/raceParticipants.vue";
import raceResults from "/src/components/regatta/raceResults.vue";
import regattaResults from "/src/components/regatta/regattaResults.vue";

export default defineComponent({
  name: "RegattaParticipantsPage",
  components: {
    regattaParticipant,
    regattaParticipants,
    raceParticipants,
    raceResults,
    regattaResults,
  },
  setup() {
    return {};
  },
  computed: {},
});
</script>
