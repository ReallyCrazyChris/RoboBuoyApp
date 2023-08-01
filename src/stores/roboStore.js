import { watch, computed } from "vue";
import { defineStore } from "pinia";
import { $bluetooth } from "src/networking/bluetooth";

import { useDevicesStore } from "stores/devicesStore";
const deviceStore = useDevicesStore();

export const useRoboStore = (deviceid) => {
  const store = defineStore("robobuoyStore/${deviceid}", {
    state: () => ({
      device: null,
      deviceid: deviceid,

      // Robot Information
      name: "Buoy 1",

      //Thruster Control
      active: false,
      surge: 0,
      steer: 0,
      vmin: 0,
      vmax: 50,
      steergain: 100,
      mpl: 53,
      mpr: 55,
      maxpwm: 110,

      // Position/Motion
      positionvalid: false,
      latitude: 0, // degree decimal north
      longitude: 0, // degree decimal east
      latitude_string: "", // degree decimal north 24 bit precision,
      longitude_string: "", // degree decimal east 24 bit precision
      speed: 0.0, //meters per second

      underway: false, // should the robot persue its path
      currentcourse: 0, // deg° of the current heading
      desiredcourse: 0, // deg° of the desired heading
      currentposition: [49.12934, 10.93431], // degree decimal north, degree decimal east
      desiredposition: [49.12934, 10.93431], // degree decimal north, degree decimal east
      distancetodesiredposiiton: 0, // float meters
      waypoints: [], // array of positions

      // Steering
      //PID tuning gains to control the steering based on desiredcourse vs currentcourse
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

      addwaypoint(latlng) {
        const waypoint = [
          parseFloat(latlng.lat.toFixed(6)),
          parseFloat(latlng.lng.toFixed(6)),
        ];
        this.waypoints.push(waypoint);
      },

      removewaypoint(index) {
        this.waypoints.splice(index - 1, 1);
      },

      removewaypoints(index) {
        this.waypoints.splice(index);
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
