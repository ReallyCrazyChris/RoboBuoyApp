<template>
  <q-page>
    <div v-if="raceTimer.matches('raceinfo')" style="min-height: inherit">
      <raceView />
    </div>

    <div v-if="raceTimer.matches('followme')" style="min-height: inherit">
      <raceFollowme />
    </div>

    <div v-if="raceTimer.matches('raceclass')" style="min-height: inherit">
      <raceClass />
    </div>

    <div v-if="raceTimer.matches('raceprepare')" style="min-height: inherit">
      <racePrepare />
    </div>

    <div v-if="raceTimer.matches('raceready')" style="min-height: inherit">
      <raceReady />
    </div>

    <div v-if="raceTimer.matches('racestart')" style="min-height: inherit">
      <raceStart />
    </div>

    <div v-if="raceTimer.matches('racetimer')" style="min-height: inherit">
      <raceTime />
    </div>

    <div v-if="raceTimer.matches('racepostponed')" style="min-height: inherit">
      <racePostponed />
    </div>

    <div
      v-if="raceTimer.matches('racepostponedashore')"
      style="min-height: inherit"
    >
      <racePostponedAshore />
    </div>

    <div
      v-if="raceTimer.matches('racepostponedtoday')"
      style="min-height: inherit"
    >
      <racePostponedToday />
    </div>

    <div v-if="raceTimer.matches('recallall')" style="min-height: inherit">
      <raceRecallAll />
    </div>

    <div v-if="raceTimer.matches('recallone')" style="min-height: inherit">
      <raceRecallOne />
    </div>

    <div v-if="raceTimer.matches('raceabandoned')" style="min-height: inherit">
      <raceAbandoned />
    </div>

    <div
      v-if="raceTimer.matches('raceabandonedashore')"
      style="min-height: inherit"
    >
      <raceAbandonedAshore />
    </div>

    <div
      v-if="raceTimer.matches('raceabandonedtoday')"
      style="min-height: inherit"
    >
      <raceAbandonedToday />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import raceView from "src/components/race/raceView.vue";
import raceFollowme from "src/components/race/states/race1Followme.vue";
import raceClass from "src/components/race/states/race2Class.vue";
import racePrepare from "src/components/race/states/race3Prepare.vue";
import raceReady from "src/components/race/states/race4Ready.vue";
import raceStart from "src/components/race/states/race5Start.vue";
import raceTime from "src/components/race/states/race6Time.vue";
import racePostponed from "src/components/race/states/racePostponed.vue";
import racePostponedAshore from "src/components/race/states/racePostponedAshore.vue";
import racePostponedToday from "src/components/race/states/racePostponedToday.vue";
import raceRecallAll from "src/components/race/states/raceRecallAll.vue";
import raceRecallOne from "src/components/race/states/raceRecallOne.vue";
import raceAbandoned from "src/components/race/states/raceAbandoned.vue";
import raceAbandonedAshore from "src/components/race/states/raceAbandonedAshore.vue";
import raceAbandonedToday from "src/components/race/states/raceAbandonedToday.vue";

import { useRaceInfo } from "src/stores/raceInfo";

import { useRaceTimer } from "src/stores/raceTimer";

const raceTimer = useRaceTimer();

const raceinfo = useRaceInfo();

export default defineComponent({
  name: "RaceTimerPage",
  components: {
    raceView,
    raceFollowme,
    raceClass,
    racePrepare,
    raceReady,
    raceStart,
    raceTime,
    racePostponed,
    racePostponedAshore,
    racePostponedToday,
    raceRecallAll,
    raceRecallOne,
    raceAbandoned,
    raceAbandonedAshore,
    raceAbandonedToday,
  },

  setup() {
    return {
      raceTimer,

      raceinfo,
    };
  },
  computed: {
    raceTimeFormatter() {
      if (this.raceTimer.raceTime == undefined) {
        return "--:--";
      }

      var racetime = Math.abs(this.raceTimer.raceTime);

      // extract hours
      var hours = parseInt(racetime / 3600);
      // remaining seconds
      var remaining_seconds = parseInt(racetime % 3600);
      // extract minutes:
      var minutes = parseInt(remaining_seconds / 60); // 60 seconds in 1 minute
      var seconds = parseInt(remaining_seconds % 60);

      let hoursStr = ("00" + hours).slice(-2);
      let minutesStr = ":" + ("00" + minutes).slice(-2);
      let secondsStr = ":" + ("00" + seconds).slice(-2);

      // in the last seconds
      if (hours == 0 && minutes == 0 && this.raceTimer.raceTime <= 0) {
        return seconds;
      }

      // in the last minutes
      if (hours == 0 && this.raceTimer.raceTime <= 0) {
        return minutes + secondsStr;
      }
      // show the full time
      return hoursStr + minutesStr + secondsStr;
    },

    localDateTime() {
      const date = new Date(raceinfo.date);
      return date.toLocaleDateString();
    },
  },
});
</script>
<style>
.text-h4-responsive {
  font-size: 8vmin;
  line-height: 1;
}

.text-h6-responsive {
  font-size: 5.5vmin;
}
</style>
