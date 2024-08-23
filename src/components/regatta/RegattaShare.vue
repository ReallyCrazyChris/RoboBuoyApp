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
        title: "Join the " + regatta.title,
        text: regatta.description + " - " + regatta.date,
        url: "https://reallycrazychris.github.io/#/timer",
      };

      navigator.share(data);
    },
  },
};
</script>
