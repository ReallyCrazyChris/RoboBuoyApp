<template>
  <q-card
    >hi <q-card-section> {{ regattaresults.items }} </q-card-section></q-card
  >
</template>

<script>
import { useRegattaResults } from "src/stores/regattaResults";

const regattaresults = useRegattaResults();

export default {
  name: "raceResults",
  components: {},

  setup() {
    return { regattaresults };
  },

  computed: {},
};
</script>
