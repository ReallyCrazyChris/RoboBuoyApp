import { defineStore } from "pinia";

export const useRobotCollection = defineStore("robotCollection", {
  state: () => ({
    robotcollection: {}, // connected devices
  }),

  actions: {
    count() {
      // returns a connected robot by its id
      return Object.keys(this.robotcollection).length;
    },
    // Devices
    byId(deviceid) {
      // returns a connected robot by its id
      return this.robotcollection[deviceid];
    },
    add(robot) {
      // adds a connected robot
      this.robotcollection[robot.id] = robot;
    },
    removed(robot) {
      // removes a connected robot
      delete this.robotcollection[robot.id];
    },
  },
});
