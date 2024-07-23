<template>
  <q-btn
    round
    push
    color="primary"
    icon="lock"
    @click="screen.requestWakeLock()"
  >
    <q-tooltip class="primary">Wake Lock</q-tooltip>
  </q-btn>
</template>

<script>
import { useScreen } from "src/stores/screen";
const screen = useScreen();

export default {
  name: "WakeLock",
  setup() {
    return {
      screen,
    };
  },
};
</script>
