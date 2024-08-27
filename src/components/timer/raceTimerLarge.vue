<template>
  <div class="lineheight" :style="'font-size:' + fontSize">
    {{ raceTimeFormatter() }}
  </div>
</template>

<script>
import { useRaceTimer } from "src/stores/raceTimer";
const raceTimer = useRaceTimer();
export default {
  name: "raceTimerLarge",

  data() {
    return {
      fontSize: "50vmin",
    };
  },

  setup() {
    return { raceTimer };
  },

  computed: {},

  methods: {
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

      // in the last seconds e.g. 02
      if (hours == 0 && minutes == 0 && this.raceTimer.raceTime <= 0) {
        this.fontSize = "44vmin";
        return "" + seconds;
      }

      // in the last minutes e.g. 05:02
      if (hours == 0 && this.raceTimer.raceTime <= 0) {
        this.fontSize = "44vmin";
        return "" + minutes + secondsStr;
      }
      // show the full time 00:05:02
      this.fontSize = "18vmin";
      return hoursStr + minutesStr + secondsStr;
    },
  },
};
</script>
<style>
.lineheight {
  line-height: 1;
}
</style>
