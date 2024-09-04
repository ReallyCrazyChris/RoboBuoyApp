<template>
  <q-btn color="positive" icon="share" @click="shareRegatta()">
    <q-tooltip class="primary">invite others to participate</q-tooltip>
  </q-btn>
</template>

<script>
import { useRaceInfo } from "src/stores/raceInfo";
const raceinfo = useRaceInfo();

export default {
  name: "raceSgare",
  setup() {
    return {
      raceinfo,
    };
  },
  methods: {
    shareRegatta() {
      const data = {
        title: raceinfo.name,
        text:
          raceinfo.description +
          " - " +
          raceinfo.localDate +
          " @ " +
          raceinfo.localTime,
        url: "https://reallycrazychris.github.io/#/race",
      };

      navigator.share(data);
    },
  },
};
</script>
