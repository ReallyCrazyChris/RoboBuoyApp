<template>
  <q-page>
    <q-card flat class="row content-start" style="min-height: inherit">
      <q-card-section class="col-xs-12 col-md-6">
        <div class="text-h6 text-uppercase text-grey">Race Score</div>
        <div class="text-right">
          <raceScore />
        </div>

        <q-separator class="xs q-mt-sm" />
      </q-card-section>

      <q-card-section class="col-xs-12 col-md-6">
        <div class="fit">
          <div class="text-h6 text-uppercase text-grey">Race Result</div>
          <raceResult />
          <div class="q-mt-sm">
            <q-btn
              class=""
              color="positive"
              label="commit race result"
              @click="scoringCompleted"
            ></q-btn>
          </div>
          <q-separator class="xs q-mt-sm" />
        </div>
      </q-card-section>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          round
          icon="arrow_back"
          color="primary"
          @click="backTransition()"
        />
      </q-page-sticky>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import raceScore from "/src/components/race/raceScore.vue";
import raceResult from "/src/components/race/raceResult.vue";

import { useRaceTimer } from "src/stores/raceTimer";
import { useRegattaEvent } from "src/stores/regattaEvent";

const racetimer = useRaceTimer();
const regattaevent = useRegattaEvent();

export default defineComponent({
  name: "RegattaParticipantsPage",
  components: {
    raceScore,
    raceResult,
  },
  setup() {
    return { regattaevent };
  },

  methods: {
    scoringCompleted() {
      racetimer.racecompletedTransition();
      racetimer.publishRaceTransition("racecompleted");
      regattaevent.commitRaceResult();
      this.$router.go(-1);
      //this.$router.push("regattaresults");
    },

    backTransition() {
      this.$router.go(-1);
    },
  },
});
</script>
