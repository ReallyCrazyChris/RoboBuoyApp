<template>
  <q-btn
    v-if="!wakeLockActivated"
    round
    push
    color="primary"
    icon="lock_open"
    @click="requestWakeLock()"
  >
    <q-tooltip class="primary">Wake Lock</q-tooltip>
  </q-btn>
  <q-btn
    v-if="wakeLockActivated"
    round
    push
    color="primary"
    icon="lock"
    @click="requestWakeLock()"
  >
    <q-tooltip class="primary">Release Wake Lock</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: "WakeLock",
  data() {
    return {
      wakeLock: undefined,
      wakeLockActivated: false,
    };
  },
  setup() {
    return {};
  },
  methods: {
    async requestWakeLock() {
      if ("wakeLock" in navigator) {
        try {
          this.wakeLock = await navigator.wakeLock.request("screen");
          console.log("ACTIVATED");
          this.wakeLockActivated = true;
        } catch (err) {
          console.log("ERROR:", err);
          this.wakeLockActivated = false;
        }
      } else {
        console.log("wakeLock not available");
        this.wakeLockActivated = false;
      }
    },
  },
};
</script>
