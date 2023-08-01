import { defineStore } from "pinia";

export const useDevicesStore = defineStore("devices", {
  state: () => ({
    activedevices: {}, // devices that habe advertised themselves
    connecteddevices: {}, // connected devices
  }),

  getters: {
    devicebyId(deviceid) {
      // returns a connected device by its id
      return this.connecteddevices[deviceid];
    },

    activedevicebyId(deviceid) {
      // returns a devices rssi and last seen timestamp by device id
      return null || this.activedevices[deviceid];
    },

    getactivedevices() {
      const activedevices = [];
      const currentime = Date.now();
      for (const devicebyId in this.activedevices) {
        if (currentime - this.activedevices[devicebyId].lastactive < 6500) {
          activedevices.push(this.activedevices[devicebyId]);
        }
      }
      return activedevices;
    },

    getinactivedevices() {
      const inactivedevices = [];
      const currentime = Date.now();
      for (const devicebyId in this.activedevices) {
        if (currentime - this.activedevices[devicebyId].lastactive > 6500) {
          inactivedevices.push(this.activedevices[devicebyId]);
        }
      }
      return inactivedevices;
    },
  },

  actions: {
    adddevice(device) {
      // adds a connected device
      this.connecteddevices[device.id] = device;
    },
    removedevice(device) {
      // removes a connected device
      delete this.connecteddevices[device.id];
    },

    addactivedevice(device) {
      // adds an active devices local rssi and last active timestamp
      this.activedevices[device.id] = {
        localrssi: device.rssi,
        lastactive: Date.now(),
      };
    },

    removehearddevice(device) {
      // removes an active device by id
      delete this.activedevices[device.id];
    },
  },
});
