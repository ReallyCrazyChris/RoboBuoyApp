<template>
  <div class="column" style="min-height: inherit">
    <div class="col q-pa-md q-py-none">
      <q-img fit="scale-down" src="racesignals/apalpha.svg" />
    </div>

    <div class="col-1 q-px-md q-py-none">
      <div class="text-h4 q-mt-sm q-mb-xs">Raceing Postponed</div>
      <div class="text-h6 text-grey">No further racing today.</div>
    </div>

    <div class="col-1">
      <q-card flat>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Race info"
            @click="raceinfoTransition()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useRaceTimer } from "src/stores/raceTimer";
const raceTimer = useRaceTimer();

export default {
  name: "racePostponedToday",
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
