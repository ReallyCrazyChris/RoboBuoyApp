import { defineStore } from "pinia";

const soundsDefinition = defineStore("sounds", {
  state: () => ({
    duration: 0,
    soundInstance: null,
  }),
  actions: {
    airhorn(playCount = 1) {
      console.log("airhorn sound");
      this.soundInstance.play();
      this.soundInstance.currentTime = 0;
      this.soundInstance.volume = 1;
      this.soundInstance.muted = false;

      setTimeout(() => {
        this.soundInstance.muted = true;
        //this.soundInstance.volume = 0;
      }, parseInt(this.duration) * playCount);
    },
  },
});

const sounds = soundsDefinition();

let soundInstance = new Audio("sounds/airhorn.mp3");

// find the duration of the airhorn file
soundInstance.addEventListener("loadedmetadata", () => {
  sounds.soundInstance = soundInstance;
  sounds.duration = soundInstance.duration * 1000;
  sounds.soundInstance.volume = 0;
  sounds.soundInstance.loop = true;
});

export const useSounds = () => {
  return sounds;
};
