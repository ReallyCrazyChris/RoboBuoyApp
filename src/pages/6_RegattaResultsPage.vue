<template>
  <q-page>
    <q-card
      flat
      class="regatta-view row content-start"
      style="min-height: inherit"
    >
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
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import regattaRaceResults from "/src/components/regatta/regattaRaceResults.vue";
import regattaFinalResults from "/src/components/regatta/regattaFinalResults.vue";

export default defineComponent({
  name: "RegattaResultspage",
  components: {
    regattaRaceResults,
    regattaFinalResults,
  },
  setup() {
    return {};
  },
});
</script>
