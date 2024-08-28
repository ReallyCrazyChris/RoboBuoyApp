<template>
  <div class="column" style="min-height: inherit">
    <div class="col q-pa-md q-py-none">
      <q-img fit="scale-down" src="racesignals/xray.svg" />
    </div>

    <div class="col-1 q-px-md q-py-none">
      <div class="text-h3">Individual Recall</div>
      <div class="text-h6-responsive text-grey">
        One or more race participans where On Course Side (OCS). Please
        exonerate by crossing the start line.
      </div>
    </div>

    <div class="col-1">
      <q-card flat>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Continue"
            @click="racecontinueTransition()"
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
  name: "raceRecallAll",
  components: {},

  setup(props) {
    return {};
  },

  methods: {
    racecontinueTransition() {
      raceTimer.racecontinueTransition();
      raceTimer.publishRaceTransition("racecontinue");
    },
  },
};
</script>
<style></style>
