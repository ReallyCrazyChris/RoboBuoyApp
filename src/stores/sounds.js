import { defineStore } from "pinia";

const soundsDefinition = defineStore("sounds", {
  state: () => ({
    duration: 0,
    soundInstance: null,
  }),
  actions: {
    userActionInit() {
      // a user action is requred to play sound :(
      this.soundInstance = new Audio("sounds/airhorn.mp3");

      // find the duration of the airhorn file
      this.soundInstance.addEventListener("loadedmetadata", () => {
        this.duration = this.soundInstance.duration * 1000;
        this.soundInstance.volume = 1;
        this.soundInstance.loop = true;
        this.soundInstance.muted = true;
        this.soundInstance.play();
      });
    },

    airhorn(playCount = 1) {
      console.log("airhorn sound");
      this.soundInstance.muted = false;
      this.soundInstance.currentTime = 0;

      setTimeout(() => {
        this.soundInstance.muted = true;
        this.soundInstance.currentTime = 0;
      }, parseInt(this.duration) * playCount);
    },
  },
});

const sounds = soundsDefinition();

export const useSounds = () => {
  return sounds;
};
