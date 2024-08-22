<template>
  <div class="row">
    <div class="col-8">
      <div class="">{{ regatta.title }} {{ localDate }} {{ localTime }}</div>
      <div class="">
        {{ regatta.description }} The course is blblb wit 3 laps, racing startts
        are initiated form 00.00 untill 21:00
      </div>
      <div></div>
    </div>

    <div class="col-4" align="right">
      <shareregatta />
    </div>
  </div>
</template>

<script>
import { useRegatta } from "src/stores/regatta";
import { useRaceTimer } from "src/stores/raceTimer";
import shareregatta from "src/components/regatta/regattaShare.vue";

const regatta = useRegatta();
const raceTimer = useRaceTimer();

export default {
  name: "raceInfoRegatta",
  components: {
    shareregatta,
  },

  setup(props) {
    return { regatta, raceTimer };
  },

  computed: {
    localDate() {
      const date = new Date(regatta.date);
      return date.toLocaleDateString();
    },
    localTime() {
      const date = new Date(regatta.date);
      return date.toLocaleTimeString().substring(0, 5);
    },
  },
};
</script>
<style></style>
