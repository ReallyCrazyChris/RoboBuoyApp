import { defineStore } from "pinia";

const soundsDefinition = defineStore("sounds", {
  state: () => ({
    audioContext: undefined,
    playCountArray: [],
  }),
  actions: {
    enableAudio() {
      if (undefined == this.audioContext) {
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

const sounds = soundsDefinition();

export const useSounds = () => {
  return sounds;
};
