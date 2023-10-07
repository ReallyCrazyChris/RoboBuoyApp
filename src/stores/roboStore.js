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
      battery: 90, // % battery capacity remaining

      // Signal Strength
      localrssi: 0,
      remoterssi: 0,

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
      gpsspeed: 0.0, //meters per second

      underway: false, // should the robot persue its path
      currentcourse: 0, // deg° of the current heading
      desiredcourse: 0, // deg° of the desired heading
      currentposition: [], // degree decimal north, degree decimal east
      desiredposition: [], // degree decimal north, degree decimal east
      distance: 0, // float meters
      waypoints: [], // array of positions

      // Steering
      //PID tuning gains to control the steering based on desiredcourse vs currentcourse
      Kp: 0,
      Ki: 0,
      Kd: 0,
      compassalpha: 0,
      gpsalpha: 0,

      //calibration
      calibratingcompass: false,
      calibrationsamples: 600,
      calibrationsampletime: 100,
    }),

    getters: {
      isStopped: (state) => !state.active,
      isUnderway: (state) => state.waypoints.length > 0 && state.active,
      isHoldPosition: (state) => state.waypoints.length == 0 && state.active,
    },

    actions: {
      messageHandler(data) {
        console.log("messageHandler", data);
        this.$patch(data[1]);
      },

      setlocalrssi(val) {
        if (undefined == val) {
          return;
        }
        this.localrssi = val;
      },

      setactive(val) {
        // enables / disbles the thrusters
        this.active = val;
        $bluetooth.send(this.device, ["active", this.active]);
      },

      toggleactive() {
        this.active = !!!this.active;
        $bluetooth.send(this.device, ["active", this.active]);
      },

      setsurge(val) {
        this.surge = val;
        $bluetooth.send(this.device, ["surge", this.surge]);
      },

      async setwaypoints() {
        // applies waypoints to the robobuoy
        await $bluetooth.send(this.device, ["wp", this.waypoints]);
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

      calibrateMag() {
        // Starts the Compass / Magentometer calibraiton routine
        this.calibratingcompass = true;

        $bluetooth.send(this.device, [
          "calibrateMag",
          this.calibrationsamples,
          this.calibrationsampletime,
        ]);
        // simulate the calibration time
        setTimeout(() => {
          this.calibratingcompass = false;
        }, this.calibrationsamples * this.calibrationsampletime);
      },

      // Start and Stop the Robots Asyncronous Tasks

      startFuseGpsTask() {
        $bluetooth.send(this.device, ["GT"]);
      },

      stopFuseGpsTask() {
        $bluetooth.send(this.device, ["sGT"]);
      },

      startFuseCompassTask() {
        $bluetooth.send(this.device, ["FCT"]);
      },

      stopFuseCompassTask() {
        $bluetooth.send(this.device, ["sFCT"]);
      },

      startFuseGyroTask() {
        $bluetooth.send(this.device, ["FGT"]);
      },

      stopFuseGyroTask() {
        $bluetooth.send(this.device, ["sFGT"]);
      },

      startSendMotionStateTask() {
        $bluetooth.send(this.device, ["SMT"]);
      },

      stopSendMotionStateTask() {
        $bluetooth.send(this.device, ["sSMT"]);
      },

      getstate() {
        $bluetooth.send(this.device, ["getstate"]);
      },
    },
  })();

  store.device = deviceStore.devicebyId(deviceid);

  return store;
};
