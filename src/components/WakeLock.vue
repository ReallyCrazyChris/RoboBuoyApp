<template>
  <q-btn round push color="primary" icon="lock" @click="requestWakeLock()">
    <q-tooltip class="primary">Wake Lock</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: "WakeLock",
  data() {
    return {
      wakeLock: undefined,
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
        } catch (err) {
          console.log("ERROR:", err);
        }
      } else {
        console.log("wakeLock not available");
      }
    },
  },
};
</script>
