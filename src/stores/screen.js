import { defineStore } from "pinia";

export const useScreen = defineStore("screen", {
  state: () => ({
    wakelock: undefined,
  }),
  actions: {
    requestWakeLock() {
      if (typeof this.wakelock !== "undefined" && "wakeLock" in navigator) {
        navigator.wakeLock.request("screen").then((lock) => {
          this.wakelock = lock;
        });
      }
    },
    isWakeLock() {
      if (typeof this.wakelock !== "undefined") {
        return true;
      }
      return false;
    },
  },
});
