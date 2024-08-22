<template>
  <div class="fontFit">
    {{ raceTimeFormatter }}
  </div>
</template>

<script>
import { useRaceTimer } from "src/stores/raceTimer";
const raceTimer = useRaceTimer();
export default {
  name: "raceTimerLarge",

  data() {
    return {};
  },

  setup() {
    return { raceTimer };
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
  },
};
</script>
<style>
.fontFit {
  border: 0px solid black;
  font-size: 16px;
  font-size: 19vmin;
  line-height: 1;
}
</style>
