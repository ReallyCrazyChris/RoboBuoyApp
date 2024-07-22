<template>
  <q-btn round push color="primary" icon="share" @click="shareRegistration()">
    <q-tooltip class="primary">invite others</q-tooltip>
  </q-btn>
</template>

<script>
import { useRegatta } from "src/stores/regatta";
const regatta = useRegatta();

export default {
  name: "RegattaShare",
  setup() {
    return {
      regatta,
    };
  },
  methods: {
    shareRegistration() {
      const data = {
        title: "Join the " + regatta.title,
        text: regatta.description + " - " + regatta.date,
        url: "https://reallycrazychris.github.io/#/join",
      };

      navigator.share(data);
    },
  },
};
</script>
