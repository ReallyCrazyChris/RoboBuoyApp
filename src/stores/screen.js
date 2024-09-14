import { defineStore } from "pinia";

// This goal of the of this store is to keep the screen visible the whole time

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
          this.wakeLockActivated = true;
        } catch (err) {
          console.log("ERROR:", err);
          this.wakeLockActivated = false;
        }
      } else {
        this.wakeLockActivated = false;
      }
    },

    async releaseWakeLock() {
      if (this.wakeLock && this.wakeLock.release) {
        this.wakeLock.release();
        this.wakeLock = null;
        this.wakeLockActivated = false;
      }
    },
  },
});
