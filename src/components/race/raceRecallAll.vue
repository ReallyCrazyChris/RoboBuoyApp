<template>
  <q-card flat class="row" style="min-height: inherit">
    <q-card-section class="col-12">
      <q-img
        fit="scale-down"
        width="50vmin"
        height="50vmin"
        src="racesignals/generalrecall.svg"
      />
    </q-card-section>
    <q-card-section class="col-12 q-py-none">
      <div class="text-h4-responsive">General Recall</div>
      <div class="text-h6-responsive text-grey">
        This race has been recalled. Return to the start line. Prepare for a
        restart.
      </div>
    </q-card-section>
    <q-card-actions class="col-12 self-end">
      <div class="fit text-right">
        <q-btn
          color="primary"
          label="Race Info"
          @click="raceinfoTransition()"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { useRaceTimer } from "src/stores/raceTimer";
const raceTimer = useRaceTimer();

export default {
  name: "raceRecallAll",
  components: {},

  setup(props) {
    return {};
  },

  methods: {
    raceinfoTransition() {
      raceTimer.raceinfoTransition();
      raceTimer.publishRaceTransition("raceinfo");
    },
  },
};
</script>
<style></style>
