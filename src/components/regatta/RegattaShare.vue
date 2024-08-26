<template>
  <q-btn label="share" color="positive" icon="share" @click="shareRegatta()">
    <q-tooltip class="primary">invite others to participate</q-tooltip>
  </q-btn>
</template>

<script>
import { useRegatta } from "src/stores/regatta";
const regatta = useRegatta();

export default {
  name: "regattaShare",
  setup() {
    return {
      regatta,
    };
  },
  methods: {
    shareRegatta() {
      const data = {
        title: regatta.name,
        text:
          regatta.description +
          " - " +
          regatta.localDate +
          " @ " +
          regatta.localTime,
        url: "https://reallycrazychris.github.io/#/joinregatta",
      };

      navigator.share(data);
    },
  },
};
</script>
