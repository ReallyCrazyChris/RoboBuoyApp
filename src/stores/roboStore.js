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
      position: [], // string north, string east
      //latitude: 0, // degree decimal north TODO:??????
      //longitude: 0, // degree decimal east
      //latitude_string: "", // degree decimal north 24 bit precision,
      //longitude_string: "", // degree decimal east 24 bit precision

      //Course
      gpscourse: 0, // deg° of the current heading
      gpsspeed: 0.0, //knots
      magcourse: 0, // compass course
      magdeclination: 0, // compass magnetic declination
      currentcourse: 0, // deg° of the current heading

      //Autonomous Pathfinding
      destination: [], // degree decimal north, degree decimal east
      distance: 0, // (float) meters
      desiredcourse: 0, // deg° of the desired heading
      waypoints: [], // array of positions
      waypointarrivedradius: 0, // waypoint arrived radius (meters)

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
      magalpha: 0, //  filter weighted towards the gyro
      gpsalpha: 0, //    filter weighted towards the gps
      declinationalpha: 0, //

      // Motor Control
      surge: 0, //  desired robot speed cm/s
      steer: 0, //  desired robot angualr rotation deg/s
      vmin: 0, //  minimum robot velocity cm/s
      vmax: 0, //  maximum robot velocity cm/s
      steergain: 0, // steering gain
      mpl: 0, //  min pwm left  : value where the motor starts to turn
      mpr: 0, // min  pwm right : value where the motor starts to turn
      //maxpwm: 110, // maximum pwm signal sent to the motors

      // Compass Calibration
      calibratingcompass: false,
      calibrationsamples: 600,
      calibrationsampletime: 100,
    }),

    getters: {
      isStopped: (state) => state.mode == "stop",
      isManual: (state) => state.mode == "manual",
      isHold: (state) => state.mode == "hold",
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
        //console.log("messageHandler", data);
        this.$patch(data[1]);
      },

      setlocalrssi(val) {
        if (undefined == val) {
          return;
        }
        this.localrssi = val;
      },

      ///////////////////////////////////////
      // App State and RoboBouy State Updates
      ///////////////////////////////////////

      // get the RoboBouy state
      async getState() {
        await $bluetooth.send(this.device, ["getState"]);
      },

      // Information Updates
      async setnumber(val) {
        this.number = val;
        await $bluetooth.send(this.device, ["number", this.number]);
      },
      async setcolor(val) {
        this.color = val;
        await $bluetooth.send(this.device, ["color", this.color]);
      },
      async setname(val) {
        this.name = val;
        await $bluetooth.send(this.device, ["name", this.name]);
      },
      async setmode(val) {
        this.mode = val;
        await $bluetooth.send(this.device, ["mode", this.mode]);
      },

      // # AutonomousPathfinding Updates
      async setdesiredcourse(val) {
        this.desiredcourse = val;
        await $bluetooth.send(this.device, ["dc", this.desiredcourse]);
      },

      async setwaypoints() {
        // applies waypoints to the robobuoy
        await $bluetooth.send(this.device, ["wp", this.waypoints]);
      },

      async setwaypointarrivedradius(val) {
        this.waypointarrivedradius = val;
        await $bluetooth.send(this.device, [
          "waypointarrivedradius",
          this.waypointarrivedradius,
        ]);
      },

      // Steering PID Updates
      async setKp(val) {
        this.Kp = val;
        await $bluetooth.send(this.device, ["Kp", this.Kp]);
      },

      async setKi(val) {
        this.Ki = val;
        await $bluetooth.send(this.device, ["Ki", this.Ki]);
      },

      async setKd(val) {
        this.Kd = val;
        await $bluetooth.send(this.device, ["Kd", this.Kd]);
      },

      // Complimentary Filter Updates
      async setmagalpha(val) {
        this.magalpha = val;
        await $bluetooth.send(this.device, ["magalpha", this.magalpha]);
      },

      async setgpsalpha(val) {
        this.gpsalpha = val;
        await $bluetooth.send(this.device, ["gpsalpha", this.gpsalpha]);
      },

      async setdeclinationalpha(val) {
        this.declinationalpha = val;
        await $bluetooth.send(this.device, [
          "declinationalpha",
          this.declinationalpha,
        ]);
      },

      // Motor State Updates
      async setsurge(val) {
        this.surge = val;
        await $bluetooth.send(this.device, ["surge", this.surge]);
      },

      async setvmin(val) {
        this.vmin = val;
        await $bluetooth.send(this.device, ["vmin", this.vmin]);
      },

      async setvmax(val) {
        this.vmax = val;
        await $bluetooth.send(this.device, ["vmax", this.vmax]);
      },

      async setsteergain(val) {
        this.steergain = val;
        await $bluetooth.send(this.device, ["steergain", this.steergain]);
      },

      async setmpl(val) {
        this.mpl = val;
        await $bluetooth.send(this.device, ["mpl", this.mpl]);
      },

      async setmpr(val) {
        this.mpr = val;
        await $bluetooth.send(this.device, ["mpr", this.mpr]);
      },

      ////////////
      // Requests
      ///////////
      getPIDsettings() {
        $bluetooth.send(this.device, ["getPIDsettings"]);
      },

      getMotorsettings() {
        $bluetooth.send(this.device, ["getMotorsettings"]);
      },

      getAlphasettings() {
        $bluetooth.send(this.device, ["getAlphasettings"]);
      },

      //////////////////////////////
      // Waypoint Colleciton Methods
      //////////////////////////////

      addwaypoint(latlng) {
        const waypoint = [latlng.lat.toFixed(7), latlng.lng.toFixed(7)];
        this.waypoints.push(waypoint);
      },

      removewaypoint(index) {
        this.waypoints.splice(index - 1, 1);
      },

      removewaypoints(index) {
        this.waypoints.splice(index);
      },

      //////////////////////////////
      // Compass Calibration Methods
      //////////////////////////////

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
