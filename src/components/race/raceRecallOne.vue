<template>
  <q-card flat class="row" style="min-height: inherit">
    <q-card-section class="col-12">
      <q-img
        fit="scale-down"
        width="50vmin"
        height="50vmin"
        src="racesignals/xray.svg"
      />
    </q-card-section>
    <q-card-section class="col-12 q-py-none">
      <div class="text-h3">Individual Recall</div>
      <div class="text-h6-responsive text-grey">
        One or more race participans where On Course Side (OCS). Please
        exonerate by crossing the start line.
      </div>
    </q-card-section>
    <q-card-actions class="col-12 self-end">
      <div class="fit row">
        <div class="col-6 text-left">
          <q-btn
            color="warning"
            label="Apply Penulty"
            @click="racepenultyTransition()"
          />
        </div>

        <div class="col-6 text-right">
          <q-btn
            color="positive"
            label="Continue"
            @click="racecontinueTransition()"
          />
        </div>
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
    racepenultyTransition() {
      this.$router.push("racepenulty");
    },

    racecontinueTransition() {
      raceTimer.racecontinueTransition();
      raceTimer.publishRaceTransition("racecontinue");
    },
  },
};
</script>
<style></style>
