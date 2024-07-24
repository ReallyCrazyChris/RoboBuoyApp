import { defineStore } from "pinia";

export const useScreen = defineStore("screen", {
  state: () => ({
    wakeLock: undefined,
    wakeLockActivated: false,
  }),
  actions: {
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

    async releaseWakeLock() {
      if (this.wakeLock && this.wakeLock.release) {
        this.wakeLock.release();
        this.wakeLock = null;
        this.wakeLockActivated = false;
        console.log("RELEASED");
      }
    },
  },
});
