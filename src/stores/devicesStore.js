import { defineStore } from "pinia";

export const useDevicesStore = defineStore("devices", {
  state: () => ({
    connecteddevices: {}, // connected devices
  }),

  actions: {
    devicecount() {
      // returns a connected device by its id
      return Object.keys(this.connecteddevices).length;
    },

    // Devices
    devicebyId(deviceid) {
      // returns a connected device by its id
      return this.connecteddevices[deviceid];
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
