<template>
  <q-btn
    v-if="!screen.wakeLockActivated"
    round
    push
    color="primary"
    icon="lock_open"
    @click="screen.requestWakeLock()"
  >
    <q-tooltip class="primary">Wake Lock</q-tooltip>
  </q-btn>
  <q-btn
    v-if="screen.wakeLockActivated"
    round
    push
    color="primary"
    icon="lock"
    @click="screen.releaseWakeLock()"
  >
    <q-tooltip class="primary">Release Wake Lock</q-tooltip>
  </q-btn>
</template>

<script>
import { useScreen } from "src/stores/screen";
const screen = useScreen();

export default {
  name: "WakeLock",
  setup() {
    return { screen };
  },
};
</script>
