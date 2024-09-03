<template>
  <div class="column" style="min-height: inherit">
    <div class="col q-pa-md">
      <div class="flagImageWidth">
        <q-img src="racesignals/lima.svg" />
      </div>
    </div>

    <div class="col-1 q-px-md q-py-none">
      <raceStartConditions :readonly="true" />
    </div>

    <div class="col-1 q-px-md q-py-none">
      <q-card>
        <q-card-actions align="right">
          <q-btn
            flat
            color="secondary"
            label="Postpone Race"
            @click="racepostponedTransition()"
          />
          <q-btn
            color="positive"
            label="Start Race"
            @click="raceclassTransition()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import raceStartConditions from "src/components/race/raceStartConditions.vue";
import { useRaceTimer } from "src/stores/raceTimer";
import { useCourse } from "src/stores/course";

const raceTimer = useRaceTimer();
const course = useCourse();

export default {
  name: "raceFollome",
  components: { raceStartConditions },

  setup(props) {
    return { course };
  },

  methods: {
    showCourseTransition() {
      this.$router.push("course");
    },

    raceclassTransition() {
      raceTimer.raceclassTransition();
      raceTimer.publishRaceTransition("raceclass");
    },

    racepostponedTransition() {
      raceTimer.racepostponedTransition();
      raceTimer.publishRaceTransition("racepostponed");
    },
  },
};
</script>
<style></style>
