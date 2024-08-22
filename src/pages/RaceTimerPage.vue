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
import raceInfo from "src/components/timer/raceInfo.vue";
import raceFollowme from "src/components/timer/raceFollowme.vue";
import raceClass from "src/components/timer/raceClass.vue";
import racePrepare from "src/components/timer/racePrepare.vue";
import raceReady from "src/components/timer/raceReady.vue";
import raceStart from "src/components/timer/raceStart.vue";
import raceTime from "src/components/timer/raceTime.vue";
import racePostponed from "src/components/timer/racePostponed.vue";
import racePostponedAshore from "src/components/timer/racePostponedAshore.vue";
import racePostponedToday from "src/components/timer/racePostponedToday.vue";
import raceRecallAll from "src/components/timer/raceRecallAll.vue";
import raceRecallOne from "src/components/timer/raceRecallOne.vue";
import raceAbandoned from "src/components/timer/raceAbandoned.vue";
import raceAbandonedAshore from "src/components/timer/raceAbandonedAshore.vue";
import raceAbandonedToday from "src/components/timer/raceAbandonedToday.vue";

import { useGps } from "src/stores/gps";
import { useRegatta } from "src/stores/regatta";
import { useCourse } from "src/stores/course";
import { useRaceTimer } from "src/stores/raceTimer";

const raceTimer = useRaceTimer();
const gps = useGps();
import { useVmc } from "src/stores/vmc";
const vmc = useVmc();
const regatta = useRegatta();
const course = useCourse();

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
      vmc,
      gps,
      regatta,
      course,
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
      const date = new Date(regatta.date);
      return date.toLocaleDateString();
    },
  },
  methods: {
    raceinfoTransition() {
      raceTimer.raceinfoTransition();
      raceTimer.publishRaceTransition("raceinfo");
    },

    followmeTransition() {
      raceTimer.followmeTransition();
      raceTimer.publishRaceTransition("followme");
    },

    raceclassTransition() {
      raceTimer.raceclassTransition();
      raceTimer.publishRaceTransition("raceclass");
    },

    racepostponedTransition() {
      raceTimer.racepostponedTransition();
      raceTimer.publishRaceTransition("racepostponed");
    },

    racepostponedashoreTransition() {
      raceTimer.racepostponedashoreTransition();
      raceTimer.publishRaceTransition("racepostponedashore");
    },

    racepostponedtodayTransition() {
      raceTimer.racepostponedtodayTransition();
      raceTimer.publishRaceTransition("racepostponedtoday");
    },

    recalloneTransition() {
      raceTimer.recalloneTransition();
      raceTimer.publishRaceTransition("recallone");
    },

    racecontinueTransition() {
      raceTimer.racecontinueTransition();
      raceTimer.publishRaceTransition("racecontinue");
    },

    recallallTransition() {
      raceTimer.recallallTransition();
      raceTimer.publishRaceTransition("recallall");
    },

    racecompletedTransition() {
      raceTimer.racecompletedTransition();
      raceTimer.publishRaceTransition("racecompleted");
    },

    raceabandonedTransition() {
      raceTimer.raceabandonedTransition();
      raceTimer.publishRaceTransition("raceabandoned");
    },

    raceabandonedashoreTransition() {
      raceTimer.raceabandonedashoreTransition();
      raceTimer.publishRaceTransition("raceabandonedashore");
    },

    raceabandonedtodayTransition() {
      raceTimer.raceabandonedtodayTransition();
      raceTimer.publishRaceTransition("raceabandonedtoday");
    },
  },
});
</script>
