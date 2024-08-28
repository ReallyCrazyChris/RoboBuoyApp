<template>
  <div class="column" style="min-height: inherit">
    <q-card class="col-1 q-py-none" flat>
      <q-card-section class="q-py-none">
        <div class="row">
          <div class="col-12 text-h6-responsive">Follow Me</div>
          <div class="col-10 self-center">proceed to the start line</div>

          <div class="col-2 text-right self-center">
            <q-btn
              round
              size="sm"
              icon="map"
              color="primary"
              @click="showCourseTransition"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="col q-px-md q-py-none">
      <div class="imagesSize">
        <q-img src="racesignals/lima.svg" />
      </div>
    </div>

    <div class="col-1 q-px-md q-py-none"><raceSettings /></div>

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
import raceSettings from "src/components/race/raceSettings.vue";
import { useRaceTimer } from "src/stores/raceTimer";
import { useCourse } from "src/stores/course";

const raceTimer = useRaceTimer();
const course = useCourse();

export default {
  name: "raceFollome",
  components: { raceSettings },

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
<style>
.imagesSize {
  width: 35vmin;
  height: 35vmin;
}
</style>
