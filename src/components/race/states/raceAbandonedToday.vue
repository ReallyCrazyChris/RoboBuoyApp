<template>
  <card flat class="row" style="min-height: inherit">
    <q-card-section class="col-12">
      <q-img width="50vmin" height="50vmin" src="racesignals/novalpha.svg" />
    </q-card-section>
    <q-card-section class="col-12 q-py-none">
      <div class="text-h4-responsive">Racing Completed</div>
      <div class="text-h6-responsive text-grey">
        All remaining races are abandoned. There is no more racing today.
      </div>
    </q-card-section>
    <q-card-actions class="col-12 self-end">
      <div class="fit text-right">
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
  name: "raceAbandonedToday",
  components: {},

  setup(props) {
    return {};
  },

  methods: {
    regattainfoTransition() {
      raceTimer.regattainfoTransition();
      raceTimer.publishRaceTransition("regattainfo");
    },
  },
};
</script>
<style></style>
