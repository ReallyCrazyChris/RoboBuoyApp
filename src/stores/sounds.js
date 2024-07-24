import { defineStore } from "pinia";

const soundsDefinition = defineStore("sounds", {
  state: () => ({
    duration: 0,
    soundInstance: null,
  }),
  actions: {
    airhorn(playCount = 1) {
      if (!!!this.soundInstance) {
        console.log("init");
        this.soundInstance = soundInstance;
        this.soundInstance.volume = 0;
        this.soundInstance.loop = true;
        this.soundInstance.play();
      }

      console.log("play");
      this.soundInstance.currentTime = 0;
      this.soundInstance.volume = 1;

      setTimeout(() => {
        soundInstance.volume = 0;
      }, parseInt(this.duration) * playCount);
    },
  },
});

const sounds = soundsDefinition();

let soundInstance = new Audio("sounds/airhorn.mp3");

soundInstance.addEventListener("loadedmetadata", () => {
  sounds.duration = soundInstance.duration * 1000;
});

export const useSounds = () => {
  return sounds;
};
