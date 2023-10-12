import { watch, computed } from "vue";
import { defineStore } from "pinia";
import { $bluetooth } from "src/networking/bluetooth";

import { useDevicesStore } from "stores/devicesStore";
const deviceStore = useDevicesStore();

export const useRoboStore = (deviceid) => {
  const store = defineStore("robobuoyStore/${deviceid}", {
    state: () => ({
      // Specific to RoboBuoy APP
      device: null,
      deviceid: deviceid,

      // RoboBuoy Information
      number: 1, //Mark Number
      color: "primary", //Primary Color of the Mark
      name: "Buoy 1", //Name of the RoboBouy in the APP
      mode: "stop", // Current operational mode of the RoboBouy  ['stop','manual','auto']

      // Battery
      battery: 90, // % Capacity of battery remaining

      // Signal Strength
      localrssi: 0, // Specific to the APP

      //Position
      positionvalid: false, // valid gps position
      position: [], // degree decimal north, degree decimal east
      latitude: 0, // degree decimal north
      longitude: 0, // degree decimal east
      latitude_string: "", // degree decimal north 24 bit precision,
      longitude_string: "", // degree decimal east 24 bit precision

      //Course
      gpscourse: 0, // deg° of the current heading
      currentcourse: 0, // deg° of the current heading

      //Speed
      gpsspeed: 0.0, //knots

      //Autonomous Pathfinding
      destination: [], // degree decimal north, degree decimal east
      distance: 0, // (float) meters
      desiredcourse: 0, // deg° of the desired heading
      waypoints: [], // array of positions
      waypointarrivedradius: 5, // waypoint arrived radius (meters)

      // Steering
      // PID tuning gains to control the steering based on desiredcourse vs currentcourse
      Kp: 0,
      Ki: 0,
      Kd: 0,

      // PID variables to matintain course by steering
      // error : 0,
      //errSum : 0,
      //dErr : 0,
      //lastErr : 0,

      // Complimentary Filter tunings
      compassalpha: 0.97, // compasComplemt filter weighted towards the gyro
      gpsalpha: 0.03, // gpsComplement  filter weighted towards the gps

      // Motor Control
      surge: 0, //  desired robot speed cm/s
      steer: 0, //  desired robot angualr rotation deg/s
      vmin: 0, //  minimum robot velocity cm/s
      vmax: 50, //  maximum robot velocity cm/s
      steergain: 100, // steering gain
      mpl: 53, //  left pwm value where the motor starts to turn
      mpr: 55, // right pwm value where the motor starts to turn
      //maxpwm: 110, // maximum pwm signal sent to the motors

      // Compass Calibration
      calibratingcompass: false,
      calibrationsamples: 600,
      calibrationsampletime: 100,
    }),

    getters: {
      isStopped: (state) => state.mode == "stop",
      isManual: (state) => state.mode == "manual",
      isAuto: (state) => state.mode == "auto",
      isUnderway: (state) => state.waypoints.length > 0 && state.mode == "auto",
      isHoldStation: (state) =>
        state.waypoints.length == 0 && state.mode == "auto",
      autoIcon: (state) => {
        if (state.waypoints.length > 0) {
          return "autorenew";
        } else if (state.waypoints.length == 0) {
          return "anchor";
        }
      },
      modeIcon: (state) => {
        if (state.waypoints.length > 0 && state.mode == "auto") {
          return "autorenew";
        } else if (state.waypoints.length == 0 && state.mode == "auto") {
          return "anchor";
        } else if (state.mode == "manual") {
          return "swipe";
        } else if (state.mode == "stop") {
          return "stop";
        } else {
          return "";
        }
      },
      modeColor: (state) => {
        if (state.waypoints.length > 0 && state.mode == "auto") {
          return "primary";
        } else if (state.waypoints.length == 0 && state.mode == "auto") {
          return "primary";
        } else if (state.mode == "manual") {
          return "green";
        } else if (state.mode == "stop") {
          return "red";
        } else {
          return "black";
        }
      },
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

      async setmode(val) {
        this.mode = val;
        await $bluetooth.send(this.device, ["setmode", this.mode]);
      },

      async togglemode(val) {
        if (this.mode == "stop") {
          this.mode = "auto";
          await $bluetooth.send(this.device, ["setmode", "auto"]);
        }

        if (this.mode == "auto") {
          this.mode = "stop";
          await $bluetooth.send(this.device, ["setmode", "stop"]);
        }
      },

      async setsurge(val) {
        this.surge = val;
        await $bluetooth.send(this.device, ["surge", this.surge]);
      },

      async setdesiredcourse(val) {
        this.desiredcourse = val;
        await $bluetooth.send(this.device, ["dc", this.desiredcourse]);
      },

      async setwaypoints() {
        // applies waypoints to the robobuoy
        await $bluetooth.send(this.device, ["wp", this.waypoints]);
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

      // Request
      getSteerPIDState() {
        $bluetooth.send(this.device, ["getSteerPIDState"]);
      },

      getMotorState() {
        $bluetooth.send(this.device, ["getMotorState"]);
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
    },
  })();

  store.device = deviceStore.devicebyId(deviceid);

  return store;
};
