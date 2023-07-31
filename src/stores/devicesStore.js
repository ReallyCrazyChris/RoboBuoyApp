import { defineStore } from "pinia";

export const useDevicesStore = defineStore("devices", {
  state: () => ({
    devices: {},
  }),

  actions: {
    devicebyId(deviceid) {
      return this.devices[deviceid];
    },
    adddevice(device) {
      this.devices[device.id] = device;
    },
    removedevice(device) {
      delete this.devices[device.id];
    },
  },
});
