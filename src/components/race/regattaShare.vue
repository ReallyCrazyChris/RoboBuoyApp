<template>
  <q-btn color="positive" icon="share" @click="shareRegatta()">
    <q-tooltip class="primary">invite others to participate</q-tooltip>
  </q-btn>
</template>

<script>
import { useRegattaInfo } from "src/stores/regattaInfo";
const regattainfo = useRegattaInfo();

export default {
  name: "raceSgare",
  setup() {
    return {
      regattainfo,
    };
  },
  methods: {
    shareRegatta() {
      const data = {
        title: regattainfo.name,
        text:
          regattainfo.description +
          " - " +
          regattainfo.localDate +
          " @ " +
          regattainfo.localTime,
        url: "https://reallycrazychris.github.io/#/race",
      };

      navigator.share(data);
    },
  },
};
</script>
