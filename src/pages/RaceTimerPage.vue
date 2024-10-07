<template>
  <q-page>
    <div v-if="raceTimer.matches('raceinfo')" style="min-height: inherit">
      <raceInfo />
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

    <div v-if="raceTimer.matches('racecompleted')" style="min-height: inherit">
      <raceCompleted />
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

import raceInfo from "src/components/race/race0Info.vue";
import raceFollowme from "src/components/race/race1Followme.vue";
import raceClass from "src/components/race/race2Class.vue";
import racePrepare from "src/components/race/race3Prepare.vue";
import raceReady from "src/components/race/race4Ready.vue";
import raceStart from "src/components/race/race5Start.vue";
import raceTime from "src/components/race/race6Time.vue";
import raceCompleted from "src/components/race/race7Completed.vue";
import racePostponed from "src/components/race/racePostponed.vue";
import racePostponedAshore from "src/components/race/racePostponedAshore.vue";
import racePostponedToday from "src/components/race/racePostponedToday.vue";
import raceRecallAll from "src/components/race/raceRecallAll.vue";
import raceRecallOne from "src/components/race/raceRecallOne.vue";
import raceAbandoned from "src/components/race/raceAbandoned.vue";
import raceAbandonedAshore from "src/components/race/raceAbandonedAshore.vue";
import raceAbandonedToday from "src/components/race/raceAbandonedToday.vue";

import { useRegattaInfo } from "src/stores/regattaInfo";

import { useRaceTimer } from "src/stores/raceTimer";

const raceTimer = useRaceTimer();

const regattainfo = useRegattaInfo();

export default defineComponent({
  name: "RaceTimerPage",
  components: {
    raceInfo,
    raceFollowme,
    raceClass,
    racePrepare,
    raceReady,
    raceStart,
    raceTime,
    raceCompleted,
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

      regattainfo,
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
      const date = new Date(regattainfo.date);
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

.text-h7-responsive {
  font-size: 4.5vmin;
}

.text-h8-responsive {
  font-size: 3.5vmin;
}
</style>
