<template>
  <div class="column" style="min-height: inherit">
    <div class="col q-pa-md q-py-none">
      <q-img fit="scale-down" src="racesignals/novhotel.svg" />
    </div>

    <div class="col-1 q-px-md q-py-none">
      <div class="text-h4">Go To Shore</div>
      <div class="text-h6 text-grey">
        All remaning races are abandned. More information will be availabe on
        shore.
      </div>
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

  <div class="column" style="min-height: inherit">
    <div class="col q-px-md q-py-none">
      <q-card flat>
        <q-card-section>
          <q-img src="racesignals/novhotel.svg" />
          <div class="text-h3 q-mt-sm q-mb-xs">Go To Shore</div>
          <div class="text-h6 text-grey">
            All remaning races are abandned. More information will be availabe
            on shore.
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-1 q-px-md q-py-none">
      <q-card>
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
  name: "raceAbandonedAshore",
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
