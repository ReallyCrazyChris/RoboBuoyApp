import { defineStore } from "pinia";

const soundsDefinition = defineStore("sounds", {
  state: () => ({
    duration: 0,
    soundInstance: null,
  }),
  actions: {
    userActionInit() {
      this.airhorn(0);
    },

    getPromiseFromEvent(item, event) {
      return new Promise((resolve) => {
        const listener = () => {
          item.removeEventListener(event, listener);
          //console.log(item.duration);
          resolve();
        };
        item.addEventListener(event, listener);
      });
    },

    async airhorn(playCount = 1) {
      if (!!!this.soundInstance) {
        this.soundInstance = await new Audio("sounds/airhorn.mp3");
        await this.getPromiseFromEvent(this.soundInstance, "loadedmetadata");
        this.duration = this.soundInstance.duration * 1000;
      }

      if (playCount > 0) {
        this.soundInstance.loop = true;
        this.soundInstance.play();

        setTimeout(() => {
          this.soundInstance.loop = false;
        }, parseInt(this.duration) * playCount);
      }
    },
  },
});

const sounds = soundsDefinition();

export const useSounds = () => {
  return sounds;
};
