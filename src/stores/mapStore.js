import { defineStore } from "pinia";

export const useMapStore = defineStore("map", {
  state: () => ({}),

  actions: {
    devicecount() {
      // returns a connected device by its id
      return Object.keys(this.connecteddevices).length;
    },

    adddevice(device) {
      // adds a connected device
      this.connecteddevices[device.id] = device;
    },
    removedevice(device) {
      // removes a connected device
      delete this.connecteddevices[device.id];
    },
  },
});
