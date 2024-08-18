<template>
  <div class="row">
    <div class="col-7">
      <div class="text">{{ regatta.title }} {{ localDateTime }}</div>
      <div class="text-caption">
        {{ regatta.description }}
      </div>
    </div>

    <div class="col-5" align="right">
      <shareregatta />
    </div>
  </div>
</template>

<script>
import { useRegatta } from "src/stores/regatta";
import { useRaceTimer } from "src/stores/raceTimer";
import shareregatta from "src/components/regatta/RegattaShare.vue";

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
    localDateTime() {
      const date = new Date(regatta.date);
      return date.toLocaleDateString();
    },
  },
};
</script>
<style></style>
