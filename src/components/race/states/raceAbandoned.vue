<template>
  <card flat class="row" style="min-height: inherit">
    <q-card-section class="col-12">
      <q-img width="50vmin" height="50vmin" src="racesignals/november.svg" />
    </q-card-section>
    <q-card-section class="col-12 q-py-none">
      <div class="text-h4-responsive q-mt-sm q-mb-xs">Race Abandoned</div>
      <div class="text-h6-responsive text-grey">This race is Abandoned.</div>
    </q-card-section>
    <q-card-actions class="col-12 self-end">
      <div class="fit text-right">
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
          label="Regatta Info"
          @click="regattainfoTransition()"
        />
      </div>
    </q-card-actions>
  </card>
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

    regattainfoTransition() {
      raceTimer.regattainfoTransition();
      raceTimer.publishRaceTransition("regattainfo");
    },
  },
};
</script>
<style></style>
