import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
import { boundingExtent } from "ol/extent";

import {
  WLR29ER_META,
  WLR29ER_FEATURES,
  WLR29ER_LAPS,
} from "./raceCourseData/WLR29ER";
const mqttHook = useMQTT();

export const useRaceCourse = defineStore("raceCourse", {
  state: () => ({
    centerOfRotation: [1217300, 6295726],
    rotation: 0,
    scale: [1, 1],
    signature: Date.now(),
    pointResolution: 1,

    boundry: [
      [150, 500],
      [-250, 500],
      [150, -250],
      [-250, -250],
    ],

    anchorHandle: {
      color: "orange",
    },

    rotateHandle: {
      offset: [-50, 420],
      color: "aqua",
    },

    scaleXHandle: {
      offset: [-200, 400],
      color: "fuchsia",
    },

    scaleYHandle: {
      offset: [100, 400],
      color: "lime",
    },

    features: WLR29ER_FEATURES,
  }),

  getters: {},

  actions: {
    publishRaceCourseState() {
      if (mqttHook.isConnected) {
        const raceCourseStateJSON = JSON.stringify({
          centerOfRotation: this.centerOfRotation,
          rotation: this.rotation,
          scale: this.scale,
          boundry: this.boundry,
          anchorHandle: this.anchorHandle,
          rotateHandle: this.rotateHandle,
          scaleXHandle: this.scaleXHandle,
          scaleYHandle: this.scaleYHandle,
          features: this.features,
          signature: Date.now(),
        });
        mqttHook.publish("racecourse", raceCourseStateJSON, 0, {
          retain: true,
        });
      }
    },

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

    // transforms cource offset to map coordinates
    forwardTransform(offset) {
      return this.rotate(
        [
          this.centerOfRotation[0] +
            (offset[0] * this.scale[0]) / this.pointResolution,
          this.centerOfRotation[1] +
            (offset[1] * this.scale[1]) / this.pointResolution,
        ],
        this.rotation,
        this.centerOfRotation
      );
    },

    // transforms map coordinates to cource offset
    reverseTransform(coordinates) {
      const point = this.rotate(
        coordinates,
        -1 * this.rotation,
        this.centerOfRotation
      );

      const offset = [
        ((point[0] - this.centerOfRotation[0]) / this.scale[0]) *
          this.pointResolution,
        ((point[1] - this.centerOfRotation[1]) / this.scale[1]) *
          this.pointResolution,
      ];

      return offset;
    },

    setCourseRotation(markCenter) {
      const dx = markCenter[0] - this.centerOfRotation[0];
      const dy = markCenter[1] - this.centerOfRotation[1];

      const correction = Math.atan2(
        this.rotateHandle.offset[0] / this.pointResolution,
        this.rotateHandle.offset[1] / this.pointResolution
      );

      this.rotation = -1 * Math.atan2(dx, dy) + correction;
    },

    setScaleY(markCenter) {
      const mark = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      var dx = mark[0] - this.centerOfRotation[0];
      var dy = mark[1] - this.centerOfRotation[1];

      const scaleY =
        (Math.sqrt(dy ** 2) / Math.sqrt(this.scaleYHandle.offset[1] ** 2)) *
        this.pointResolution;

      this.scale = [this.scale[0], scaleY];
    },

    setScaleX(markCenter) {
      const mark = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      var dx = mark[0] - this.centerOfRotation[0];
      var dy = mark[1] - this.centerOfRotation[1];

      const scaleX =
        (Math.sqrt(dx ** 2) / Math.sqrt(this.scaleXHandle.offset[0] ** 2)) *
        this.pointResolution;

      this.scale = [scaleX, this.scale[1]];
    },

    getLineLength(left, right) {
      const leftCenter = this.forwardTransform(left.offset);
      const rightCenter = this.forwardTransform(right.offset);

      var dx = (leftCenter[0] - rightCenter[0]) * this.pointResolution;
      var dy = (leftCenter[1] - rightCenter[1]) * this.pointResolution;

      return Math.round(Math.sqrt(dx ** 2 + dy ** 2));
    },

    getTextRotation(left, right) {
      const leftCenter = this.forwardTransform(left.offset);
      const rightCenter = this.forwardTransform(right.offset);

      var dx = rightCenter[0] - leftCenter[0];
      var dy = rightCenter[1] - leftCenter[1];

      return -1 * Math.atan2(dy, dx);
    },

    getExtent() {
      // returns a boundingExtent
      // so that the course can be centered on the screen
      // so that the course can fill the screen space

      var extentCoordinates = [];
      this.boundry.forEach((offset) => {
        extentCoordinates.push(this.forwardTransform(offset));
      });

      return boundingExtent(extentCoordinates);
    },
  },

  persist: false,
});
