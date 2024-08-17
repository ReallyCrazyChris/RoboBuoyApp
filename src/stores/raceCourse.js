import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
import { boundingExtent, returnOrUpdate } from "ol/extent";

const mqttHook = useMQTT();

export const useRaceCourse = defineStore("raceCourse", {
  state: () => ({
    zoom: 17,
    pointResolution: 1,
    centerOfRotation: [1217300, 6295726],
    rotation: 0,
    scale: [1, 1],

    extentOffsets: [
      [150, 450],
      [-250, 450],
      [150, -150],
      [-250, -150],
    ],

    title: {
      label: "WLRF29ER",
      description: "29er : Windward / Leeward + Reaching Finish",
      author: "Chris Bentley",
      copywright: "cc",
      offset: [-50, 420],
      color: "black",
    },

    sequence: {
      offset: [-50, -120],
      id: 2,
      options: {
        0: {
          lapCount: 1,
          sequence: [0, 1, 7, 100],
          lable: "L1",
          description: "START \u21A6 1 \u21A6 2p \u21A6 FINISH",
        },
        1: {
          lapCount: 2,
          sequence: [0, 1, 5, 1, 7, 100],
          lable: "L2",
          description:
            "START \u21A6 1 \u21A6 2s / 2p \u21A6 1 \u21A6 1  \u21A6 2p  \u21A6 FINISH",
        },
        2: {
          lapCount: 3,
          sequence: [0, 1, 5, 1, 5, 1, 7, 100],
          lable: "L3",
          description:
            "START \u21A6 1 \u21A6 2s / 2p  \u21A6 1 \u21A6 2s / 2p  \u21A6 1 \u21A6 2p  \u21A6 FINISH",
        },
      },
      color: "grey",
    },

    controls: {
      anchorHandle: {
        color: "orange",
      },

      rotateHandle: {
        offset: [-50, 450],
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
    },

    marks: {
      0: {
        type: "gate",
        color: "orange",
        text: "START",
        leftId: 1,
        rightId: 2,
      },

      1: {
        type: "mark",
        text: "L",
        offset: [-100, 0],
        color: "orange",
        radius: 10,
        locked: false,
      },

      2: {
        type: "mark",
        text: "R",
        offset: [0, 0],
        color: "orange",
        radius: 10,
        locked: true,
      },

      4: {
        type: "buoy",
        text: "1",
        offset: [-50, 350],
        color: "yellow",
        radius: 10,
        locked: false,
      },

      5: {
        type: "gate",
        color: "yellow",
        text: "",
        leftId: 6,
        rightId: 7,
      },

      6: {
        type: "mark",
        text: "2S",
        offset: [-100, 71],
        color: "yellow",
        radius: 10,
        locked: false,
      },

      7: {
        type: "mark",
        text: "2P",
        offset: [0, 71],
        color: "yellow",
        radius: 10,
        locked: false,
      },

      100: {
        type: "gate",
        color: "grey",
        text: "FINSH",
        leftId: 101,
        rightId: 102,
      },

      101: {
        type: "gatemark",
        text: "",
        offset: [71, 71],
        color: "blue",
        radius: 10,
        locked: false,
      },

      102: {
        type: "gatemark",
        text: "R",
        offset: [0, 0],
        color: "blue",
        radius: 10,
        locked: true,
      },

      104: {
        type: "line",
        color: "grey",
        text: "windward boundary",
        leftId: 105,
        rightId: 106,
      },

      105: {
        type: "linepoint",
        text: "",
        offset: [-200, 400],
        color: "grey",
        radius: 0,
        locked: true,
      },

      106: {
        type: "linepoint",
        text: "",
        offset: [100, 400],
        color: "grey",
        radius: 0,
        locked: true,
      },

      107: {
        type: "line",
        color: "grey",
        text: "leeward boundary",
        leftId: 108,
        rightId: 109,
      },

      108: {
        type: "linepoint",
        text: "",
        offset: [-200, -100],
        color: "grey",
        radius: 0,
        locked: true,
      },

      109: {
        type: "linepoint",
        text: "",
        offset: [100, -100],
        color: "grey",
        radius: 0,
        locked: true,
      },

      110: {
        type: "line",
        color: "red",
        text: "course right",
        leftId: 111,
        rightId: 112,
      },

      111: {
        type: "linepoint",
        text: "",
        offset: [100, 400],
        color: "red",
        radius: 0,
        locked: true,
      },

      112: {
        type: "linepoint",
        text: "",
        offset: [100, -100],
        color: "red",
        radius: 0,
        locked: true,
      },

      113: {
        type: "line",
        color: "green",
        text: "course left",
        leftId: 114,
        rightId: 115,
      },

      114: {
        type: "linepoint",
        text: "",
        offset: [-200, 400],
        color: "red",
        radius: 10,
        locked: true,
      },

      115: {
        type: "linepoint",
        text: "",
        offset: [-200, -100],
        color: "red",
        radius: 0,
        locked: true,
      },
    },
  }),

  actions: {
    publishRaceCourseState() {
      return;
      if (mqttHook.isConnected) {
        const raceCourseStateJSON = JSON.stringify({
          centerOfRotation: this.centerOfRotation,
          rotaiton: this.rotation,
          scale: this.scale,
          zoom: this.zoom,

          label: this.label,
          description: this.description,

          extentOffsets: this.extentOffsets,
          anchorHandle: this.anchorHandle,
          rotateHandle: this.rotateHandle,
          scaleXHandle: this.scaleXHandle,
          scaleYHandle: this.scaleYHandle,
          marks: this.marks,
        });
        console.log("publishRaceCourseState", raceCourseStateJSON);
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

    getMark(markId) {
      return this.marks[markId];
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

    setAnchorHandleOffset(markCenter) {
      this.centerOfRotation = markCenter;
    },

    setRotateHandleOffset(markCenter) {
      this.rotateHandle.offset = this.reverseTransform(markCenter);
    },

    getRotateHandleCenter() {
      return this.forwardTransform(this.controls.rotateHandle.offset);
    },

    setCourseRotation(markCenter) {
      const dx = markCenter[0] - this.centerOfRotation[0];
      const dy = markCenter[1] - this.centerOfRotation[1];

      const correction = Math.atan2(
        this.controls.rotateHandle.offset[0] / this.pointResolution,
        this.controls.rotateHandle.offset[1] / this.pointResolution
      );

      this.rotation = -1 * Math.atan2(dx, dy) + correction;
    },

    setScaleYHandleOffset(markCenter) {
      const handle = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.scaleYHandle.offset = [
        this.scaleYHandle.offset[0],
        (handle[1] - this.centerOfRotation[1]) / this.scale[1],
      ];
    },

    getScaleYHandleCenter() {
      return this.forwardTransform(this.controls.scaleYHandle.offset);
    },

    setCourseScaleY(markCenter) {
      const mark = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      var dx = mark[0] - this.centerOfRotation[0];
      var dy = mark[1] - this.centerOfRotation[1];

      const scaleY =
        (Math.sqrt(dy ** 2) /
          Math.sqrt(this.controls.scaleYHandle.offset[1] ** 2)) *
        this.pointResolution;

      this.scale = [this.scale[0], scaleY];
    },

    setScaleXHandleOffset(markCenter) {
      const handle = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.scaleXHandle.offset = [
        (handle[0] - this.centerOfRotation[0]) / this.scale[0],
        this.scaleYHandle.offset[1],
      ];
    },

    getScaleXHandleCenter() {
      return this.forwardTransform(this.controls.scaleXHandle.offset);
    },

    setCourseScaleX(markCenter) {
      const mark = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      var dx = mark[0] - this.centerOfRotation[0];
      var dy = mark[1] - this.centerOfRotation[1];

      const scaleX =
        (Math.sqrt(dx ** 2) /
          Math.sqrt(this.controls.scaleXHandle.offset[0] ** 2)) *
        this.pointResolution;

      this.scale = [scaleX, this.scale[1]];
    },

    setMarkOffset(markId, markCenter) {
      this.marks[markId].offset = this.reverseTransform(markCenter);
    },

    getMarkCenter(markId) {
      return this.forwardTransform(this.marks[markId].offset);
    },

    getLineLength(leftId, rightId) {
      const leftMarkCenter = this.getMarkCenter(leftId);
      const rightMarkCenter = this.getMarkCenter(rightId);

      var dx = (leftMarkCenter[0] - rightMarkCenter[0]) * this.pointResolution;
      var dy = (leftMarkCenter[1] - rightMarkCenter[1]) * this.pointResolution;

      return Math.round(Math.sqrt(dx ** 2 + dy ** 2));
    },

    getTextRotation(leftId, rightId) {
      const leftMarkCenter = this.getMarkCenter(leftId);
      const rightMarkCenter = this.getMarkCenter(rightId);

      var dx = rightMarkCenter[0] - leftMarkCenter[0];
      var dy = rightMarkCenter[1] - leftMarkCenter[1];

      return -1 * Math.atan2(dy, dx);
    },

    getExtent() {
      // returns a boundingExtent
      // so that the course can be centered on the screen
      // so that the course can fill the screen space

      var extentCoordinates = [];
      this.extentOffsets.forEach((offset) => {
        extentCoordinates.push(
          this.rotate(
            [
              this.centerOfRotation[0] +
                (offset[0] * this.scale[0]) / this.pointResolution,
              this.centerOfRotation[1] +
                (offset[1] * this.scale[1]) / this.pointResolution,
            ],
            this.rotation,
            this.centerOfRotation
          )
        );
      });

      return boundingExtent(extentCoordinates);
    },
  },

  persist: false,
});
