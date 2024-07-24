import { defineStore } from "pinia";

export const useSounds = defineStore("sounds", {
  state: () => ({
    audioContext: undefined,
    playCountArray: [],
  }),
  actions: {
    enableSounds() {
      if (typeof this.audioContext == "undefined") {
        this.audioContext = new AudioContext();
      }
    },
    airhorn(playCount = 1) {
      for (let i = 0; i < playCount; i++) {
        let soundInstance = new Audio("sounds/airhorn.mp3");
        this.playCountArray.push(soundInstance);

        if (this.playCountArray.length < playCount) {
          this.playCountArray[i].addEventListener("ended", () => {
            this.playCountArray.shift();
            this.playCountArray[0].play();
          });
        }
      }

      this.playCountArray[0].play();
    },
  },
});
