import { defineStore } from "pinia";

export const useScreen = defineStore("screen", {
  state: () => ({
    wakelock: undefined,
  }),
  actions: {
    requestWakeLock() {
      console.log("requestWakeLock");
      if (typeof this.wakelock !== "undefined" && "wakeLock" in navigator) {
        navigator.wakeLock.request("screen").then((lock) => {
          console.log("requestWakeLock", lock);
          this.wakelock = lock;
        });
      }
    },
  },
});
