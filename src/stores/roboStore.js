import { defineStore } from "pinia";
import { $bluetooth } from "src/networking/bluetooth";
// openlayers uses a lonlat projection coordinate system ... very annoying!!!
import { fromLonLat, toLonLat } from "ol/proj";
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
      battery: 0, // % Capacity of battery remaining

      // Signal Strength
      localrssi: 0, // Specific Measured by this APP

      //Position
      positionvalid: false, // valid gps position
      position: [], // latlon gps position of the robot
      gpscourse: 0, // deg° of the current gps heading
      gpsspeed: 0.0, // gps knots
      magcourse: 0, // compass course
      magdeclination: 0, // compass magnetic declination
      currentcourse: 0, // deg° of the current heading

      //Autonomous Pathfinding
      destination: [], // degree decimal north, degree decimal east
      distance: 0, // (float) meters
      desiredcourse: 0, // deg° of the desired heading
      waypoints: [], // array of gps positions latlon
      waypointarrivedradius: 0, // waypoint arrived radius (meters)
      holdgain: 0, // the surge gain used to keep the robot close to the current waypoint while holding

      // Steering
      // PID tuning gains to control the steering based on desiredcourse vs currentcourse
      Kp: 0, //  proportional gain
      Ki: 0, //  integral gain
      Kd: 0, //  derivative gain

      // Complimentary Filter tunings
      magalpha: 0, //  filter weighted towards the gyro
      gpsalpha: 0, //    filter weighted towards the gps
      declinationalpha: 0, //

      // Motor Control
      surge: 0, //  desired robot speed cm/s
      steer: 0, //  desired robot angualr rotation deg/s
      steergain: 0,
      vmin: 0, //  minimum robot velocity cm/s
      vmax: 0, //  maximum robot velocity cm/diff
      minPwmLeft: 0, //  min pwm left  : value where the motor starts to turn
      minPwmRight: 0, // min  pwm right : value where the motor starts to turn
      maxpwm: 0, // maximum pwm signal sent to the motors
    }),

    getters: {
      // open layers uses a projeciton coordinate system in lonlat ... aaargh
      coordinate: (state) => {
        return fromLonLat([
          Number(state.position[1]),
          Number(state.position[0]),
        ]);
      },

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

      async setmagdeclination(val) {
        this.magdeclination = val;
        await $bluetooth.send(this.device, [
          "magdeclination",
          this.magdeclination,
        ]);
      },

      async setwaypoints() {
        // applies waypoints to the robobuoy
        await $bluetooth.send(this.device, ["wp", this.waypoints]);
      },

      async setwaypointarrivedradius(val) {
        this.waypointarrivedradius = val;
        await $bluetooth.send(this.device, ["wr", this.waypointarrivedradius]);
      },

      async setholdgain(val) {
        this.holdgain = val;
        await $bluetooth.send(this.device, ["holdgain", this.holdgain]);
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
        // constrain 0..1
        this.surge = Math.max(0, Math.min(1, val));
        await $bluetooth.send(this.device, ["surge", this.surge]);
      },

      /*
      async setsteergain(val) {
        this.steergain = val;
        await $bluetooth.send(this.device, ["steergain", this.steergain]);
      },
      */

      async setvmin(val) {
        this.vmin = val;
        await $bluetooth.send(this.device, ["vmin", this.vmin]);
      },

      async setvmax(val) {
        this.vmax = val;
        await $bluetooth.send(this.device, ["vmax", this.vmax]);
      },

      async setmaxpwm(val) {
        this.maxpwm = val;
        await $bluetooth.send(this.device, ["maxpwm", this.maxpwm]);
      },

      async setminpwmleft(val) {
        this.minPwmLeft = val;
        await $bluetooth.send(this.device, ["minPwmLeft", this.minPwmLeft]);
      },

      async setminpwmright(val) {
        this.minPwmRight = val;
        await $bluetooth.send(this.device, ["minPwmRight", this.minPwmRight]);
      },

      ////////////
      // Requests
      ///////////

      getHoldsettings() {
        $bluetooth.send(this.device, ["getHoldsettings"]);
      },

      getPIDsettings() {
        $bluetooth.send(this.device, ["getPIDsettings"]);
      },

      getMotorsettings() {
        $bluetooth.send(this.device, ["getMotorsettings"]);
      },

      getAlphasettings() {
        $bluetooth.send(this.device, ["getAlphasettings"]);
      },

      ////////////
      // Actions
      ///////////

      savesettings() {
        $bluetooth.send(this.device, ["savesettings"]);
      },

      loadsettings() {
        $bluetooth.send(this.device, ["loadsettings"]);
      },

      saveimuconfig() {
        $bluetooth.send(this.device, ["saveimuconfig"]);
      },

      loadimuconfig() {
        $bluetooth.send(this.device, ["loadimuconfig"]);
      },

      //////////////////////////////
      // Waypoint Colleciton Methods
      //////////////////////////////

      addwaypoint(coordinate) {
        // projection coordinate system to lonlat
        const lonlat = toLonLat(coordinate);
        const waypoint = [
          Number(lonlat[1]).toFixed(7),
          Number(lonlat[0]).toFixed(7),
        ];
        this.waypoints.push(waypoint);
      },

      removewaypoint(index) {
        this.waypoints.splice(index, 1);
      },

      removepath(index) {
        this.waypoints.splice(index);
      },
    },
  })();

  store.device = deviceStore.devicebyId(deviceid);
  return store;
};
