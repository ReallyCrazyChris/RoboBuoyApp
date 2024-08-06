import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
import { rotate } from "ol/transform";
const mqttHook = useMQTT();

export const useCourse = defineStore("course", {
  state: () => ({
    title: "Olympic Triangel",
    description: "The start is in the middle of the course boundary",
    zoom: 17,

    shortened: false,
    markreplacement: false,

    lon: 10.933389630255192,
    lat: 49.122665487481385,

    boundaryBottomRight_offsetX: 0,
    boundaryBottomRight_offsetY: 0,
    boundaryWidth: 300,
    boundaryHeight: 500,

    scaleX: 1,
    scaleY: 1,
    rotation: 0,

    //meters
    centerOfRotation: [1217300, 6295726],

    startCommitte_offsetX: 0,
    startCommitte_offsetY: 0,
    startPin_offsetX: 0,
    startPin_offsetY: 0,
    startLenght: 0,
    startColor: "orange",

    finishCommitte_offsetX: 0,
    finifhCommitte_offsetY: 0,
    finishPin_offsetX: 0,
    finishPin_offsetY: 0,
    finishLength: 0,
    finishColor: "blue",

    mark1_offsetX: 0,
    mark1_offsetY: 100,
    mark1_visible: true,
    mark1_color: "lightgreen",

    mark2_offsetX: 0,
    mark2_offsetY: -100,
    mark2_visible: true,
    mark2_color: "lightgreen",

    mark3_offsetX: -50,
    mark3_offsetY: 0,
    mark3_visible: true,
    mark3_color: "lightgreen",

    mark4_offsetX: 0,
    mark4_offsetY: 0,
    mark4_visible: true,
    mark4_color: "lightgreen",

    mark5_offsetX: 0,
    mark5_offsetY: 0,
    mark5_visible: true,
    mark5_color: "lightgreen",

    mark_6_offsetX: 0,
    mark_6_offsetY: 0,
    mark_6_visible: true,
    mark_6_color: "lightgreen",

    courceSequence: [
      "start",
      ["mark1", "mark2", "mark3"],
      ["mark1", "mark2", "mark3"],
      "finish",
    ],
  }),

  getters: {
    mark1_center({
      centerOfRotation,
      rotation,
      mark1_offsetX,
      mark1_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + mark1_offsetX * scaleX,
          centerOfRotation[1] + mark1_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },
    mark2_center({
      centerOfRotation,
      rotation,
      mark2_offsetX,
      mark2_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + mark2_offsetX * scaleX,
          centerOfRotation[1] + mark2_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },
  },

  actions: {
    rotate(coordinates, angle, anchor) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const anchorX = anchor[0];
      const anchorY = anchor[1];
      const deltaX = coordinates[0] - anchorX;
      const deltaY = coordinates[1] - anchorY;

      return [
        anchorX + deltaX * cos - deltaY * sin,
        anchorY + deltaX * sin + deltaY * cos,
      ];
    },

    setCourseRotation(mark_center) {
      var dx = mark_center[0] - this.centerOfRotation[0];
      var dy = mark_center[1] - this.centerOfRotation[1];
      this.rotation = -1 * Math.atan2(dx, dy);
    },
    setCourseScale(mark_center) {
      var dx = mark_center[0] - this.centerOfRotation[0];
      var dy = mark_center[1] - this.centerOfRotation[1];

      var lengtha = Math.sqrt(dx ** 2 + dy ** 2);
      console.log(
        Math.sqrt(dx ** 2 + dy ** 2) /
          Math.sqrt(this.mark1_offsetX ** 2 + this.mark1_offsetY ** 2)
      );

      //this.scaleY = scale;
    },
  },

  persist: false,
});
