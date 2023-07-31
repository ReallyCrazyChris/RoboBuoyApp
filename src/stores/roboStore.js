import { watch, computed } from "vue";
import { defineStore } from "pinia";
import { $bluetooth } from "src/networking/bluetooth";

import { useDevicesStore } from "stores/devicesStore";
const deviceStore = useDevicesStore();

export const useRoboStore = (deviceid) => {
  const store = defineStore("robobuoyStore/${deviceid}", {
    state: () => ({
      name: "RoboBuoy X",
      device: null,
      deviceid: deviceid,

      active: false,
      steer: 0,
      surge: 0,
      vmin: 0,
      vmax: 50,
      steergain: 100,
      mpl: 53,
      mpr: 55,
      maxpwm: 110,

      desiredcourse: 0,
      currentcourse: 0,
      Kp: 0,
      Ki: 0,
      Kd: 0,
      compassalpha: 0,
      gpsalpha: 0,
    }),

    actions: {
      messageHandler(data) {
        console.log("messageHandler", data);
        this.$patch(data[1]);
      },

      setactive(val) {
        // enables / disbles the thrusters
        this.active = val;
        $bluetooth.send(this.device, ["active", this.active]);
      },

      setsurge(val) {
        this.surge = val;
        $bluetooth.send(this.device, ["surge", this.surge]);
      },

      setsteer(val) {
        this.steer = val;
        $bluetooth.send(this.device, ["steer", this.steer]);
      },

      setvmin(val) {
        this.vmin = val;
        $bluetooth.send(this.device, ["vmin", this.vmin]);
      },

      setvmax(val) {
        this.vmax = val;
        $bluetooth.send(this.device, ["vmax", this.vmax]);
      },

      setsteergain(val) {
        this.steergain = val;
        $bluetooth.send(this.device, ["sgain", this.steergain]);
      },

      setmpl(val) {
        this.mpl = val;
        $bluetooth.send(this.device, ["mpl", this.mpl]);
      },

      setmpr(val) {
        this.mpr = val;
        $bluetooth.send(this.device, ["mpr", this.mpr]);
      },

      setmaxpwm(val) {
        this.mpr = val;
        $bluetooth.send(this.device, ["maxpwm", this.maxpwm]);
      },

      setcurrentcourse(val) {
        this.currentcourse = val;
        $bluetooth.send(this.device, ["cc", this.currentcourse]);
      },

      setdesiredcourse(val) {
        this.desiredcourse = val;
        $bluetooth.send(this.device, ["dc", this.desiredcourse]);
      },

      setKp(val) {
        this.Kp = val;
        $bluetooth.send(this.device, ["Kp", this.Kp]);
      },

      setKi(val) {
        this.Ki = val;
        $bluetooth.send(this.device, ["Ki", this.Ki]);
      },

      setKd(val) {
        this.Kd = val;
        $bluetooth.send(this.device, ["Kd", this.Kd]);
      },

      setcompassalpha(val) {
        this.compassalpha = val;
        $bluetooth.send(this.device, ["ca", this.compassalpha]);
      },

      setgpsalpha(val) {
        this.gpsalpha = val;
        $bluetooth.send(this.device, ["ga", this.gpsalpha]);
      },

      resetcourse() {
        this.desiredcourse = 0;
        this.currentcourse = 0;
        this.surge = 0;
        $bluetooth.send(this.device, ["reset", ""]);
      },

      requeststate() {
        $bluetooth.send(this.device, ["state", ""]);
      },

      loadstate() {
        $bluetooth.send(this.device, ["load", ""]);
      },
      savestate() {
        $bluetooth.send(this.device, ["save", ""]);
      },
    },
  })();

  store.device = deviceStore.devicebyId(deviceid);

  return store;
};
