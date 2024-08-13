import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
import { boundingExtent } from "ol/extent";

const mqttHook = useMQTT();

export const useRaceCourse = defineStore("raceCourse", {
  state: () => ({
    centerOfRotation: [1217300, 6295726],
    rotation: 0,
    scale: [1, 1],
    zoom: 17,
    pointResolution: 1,

    label: "WLRF29ER",
    description: "29er : Windward / Leeward + Reaching Finish",
    startSequence:
      "START \u21A6 1 \u21A6 2s / 2p \u21A6 1 \u21A6 2p \u21A6 FINISH",

    extentOffsets: [
      [150, 450],
      [-250, 450],
      [150, -150],
      [-250, -150],
    ],

    anchorHandle: {
      offset: [0, 0],
      color: "orange",
    },

    rotateHandle: {
      offset: [-50, 450],
      color: "aqua",
    },

    scaleXHandle: {
      offset: [-200, 450],
      color: "fuchsia",
    },

    scaleYHandle: {
      offset: [100, 450],
      color: "lime",
    },

    marks: [
      {
        id: 0,
        text: "1",
        offset: [-50, 350],
        color: "yellow",
        radius: 10,
      },
    ],
    gates: [
      {
        id: 0,
        color: "orange",
        text: "START",
        s: {
          text: "",
          offset: [0, 0],
          radius: 8,
          locked: true,
        },
        p: {
          text: "p",
          offset: [-100, 0],
          radius: 16,
        },
      },

      {
        id: 1,
        color: "blue",
        text: "FINISH",
        s: {
          text: "s",
          offset: [0, 0],
          radius: 4,
          locked: true,
        },
        p: {
          text: "",
          offset: [71, 71],
          radius: 16,
        },
      },

      {
        id: 2,
        color: "yellow",
        text: "",
        s: {
          text: "2p",
          offset: [-10, 80],
          radius: 10,
        },
        p: {
          text: "2s",
          offset: [-90, 80],
          radius: 10,
        },
      },
    ],

    lines: [
      {
        id: 0,
        color: "black",
        text: "29er : Windward / Leeward + Reaching Finish",
        s: {
          text: "",
          offset: [100, 400],
          radius: 0,
        },
        p: {
          text: "",
          offset: [-200, 400],
          radius: 0,
        },
      },
      {
        id: 1,
        color: "black",
        text: "START \u21A6 1 \u21A6 2s / 2p \u21A6 1 \u21A6 2p \u21A6 FINISH",
        s: {
          text: "",
          offset: [100, -100],
          radius: 0,
        },
        p: {
          text: "",
          offset: [-200, -100],
          radius: 0,
        },
      },
      {
        id: 2,
        color: "red",
        text: "left",
        s: {
          text: "",
          offset: [-200, 400],
          radius: 0,
        },
        p: {
          text: "",
          offset: [-200, -100],
          radius: 0,
        },
      },
      {
        id: 3,
        color: "green",
        text: "right",
        s: {
          text: "",
          offset: [100, 400],
          radius: 0,
        },
        p: {
          text: "",
          offset: [100, -100],
          radius: 0,
        },
      },

      {
        id: 4,
        color: "grey",
        text: "",
        s: {
          text: "",
          offset: [-50, 0],
          radius: 0,
        },
        p: {
          text: "",
          offset: [-50, 350],
          radius: 0,
        },
      },
    ],
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
          extentOffsets: this.extentOffsets,
          anchorHandle: this.anchorHandle,
          rotateHandle: this.rotateHandle,
          scaleXHandle: this.scaleXHandle,
          scaleYHandle: this.scaleYHandle,
          marks: this.marks,
          gates: this.gates,
          lines: this.lines,
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

    setAnchorHandleOffset(markCenter) {
      this.centerOfRotation = markCenter;
    },

    setRotateHandleOffset(markCenter) {
      const handle = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.rotateHandle.offset = [
        ((handle[0] - this.centerOfRotation[0]) * this.po) /
          this.scale[0](handle[1] - this.centerOfRotation[1]) /
          this.scale[1],
      ];
    },

    getRotateHandleCenter() {
      return this.rotate(
        [
          this.centerOfRotation[0] +
            (this.rotateHandle.offset[0] * this.scale[0]) /
              this.pointResolution,
          this.centerOfRotation[1] +
            (this.rotateHandle.offset[1] * this.scale[1]) /
              this.pointResolution,
        ],
        this.rotation,
        this.centerOfRotation
      );
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
      return this.rotate(
        [
          this.centerOfRotation[0] +
            (this.scaleYHandle.offset[0] * this.scale[0]) /
              this.pointResolution,
          this.centerOfRotation[1] +
            (this.scaleYHandle.offset[1] * this.scale[1]) /
              this.pointResolution,
        ],
        this.rotation,
        this.centerOfRotation
      );
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
        (Math.sqrt(dy ** 2) / Math.sqrt(this.scaleYHandle.offset[1] ** 2)) *
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
      return this.rotate(
        [
          this.centerOfRotation[0] +
            (this.scaleXHandle.offset[0] * this.scale[0]) /
              this.pointResolution,
          this.centerOfRotation[1] +
            (this.scaleXHandle.offset[1] * this.scale[1]) /
              this.pointResolution,
        ],
        this.rotation,
        this.centerOfRotation
      );
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
        (Math.sqrt(dx ** 2) / Math.sqrt(this.scaleXHandle.offset[0] ** 2)) *
        this.pointResolution;

      this.scale = [scaleX, this.scale[1]];
    },

    setMarkOffset({ id }, markCenter) {
      const mark_ = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.marks[id].offset = [
        ((mark_[0] - this.centerOfRotation[0]) / this.scale[0]) *
          this.pointResolution,
        ((mark_[1] - this.centerOfRotation[1]) / this.scale[1]) *
          this.pointResolution,
      ];
    },

    getMarkCenter({ id }) {
      return this.rotate(
        [
          this.centerOfRotation[0] +
            (this.marks[id].offset[0] * this.scale[0]) / this.pointResolution,
          this.centerOfRotation[1] +
            (this.marks[id].offset[1] * this.scale[1]) / this.pointResolution,
        ],
        this.rotation,
        this.centerOfRotation
      );
    },

    setGatePOffset({ id }, markCenter) {
      const mark_ = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.gates[id].p.offset = [
        ((mark_[0] - this.centerOfRotation[0]) / this.scale[0]) *
          this.pointResolution,
        ((mark_[1] - this.centerOfRotation[1]) / this.scale[1]) *
          this.pointResolution,
      ];
    },

    getGatePCenter({ id }) {
      return this.rotate(
        [
          this.centerOfRotation[0] +
            (this.gates[id].p.offset[0] * this.scale[0]) / this.pointResolution,
          this.centerOfRotation[1] +
            (this.gates[id].p.offset[1] * this.scale[1]) / this.pointResolution,
        ],
        this.rotation,
        this.centerOfRotation
      );
    },

    setGateSOffset({ id }, markCenter) {
      const mark_ = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.gates[id].s.offset = [
        ((mark_[0] - this.centerOfRotation[0]) / this.scale[0]) *
          this.pointResolution,
        ((mark_[1] - this.centerOfRotation[1]) / this.scale[1]) *
          this.pointResolution,
      ];
    },

    getGateSCenter({ id }) {
      return this.rotate(
        [
          this.centerOfRotation[0] +
            (this.gates[id].s.offset[0] * this.scale[0]) / this.pointResolution,
          this.centerOfRotation[1] +
            (this.gates[id].s.offset[1] * this.scale[1]) / this.pointResolution,
        ],
        this.rotation,
        this.centerOfRotation
      );
    },

    getGateLineLength(gate) {
      const gateSCenter = this.getGateSCenter(gate);
      const gatePCenter = this.getGatePCenter(gate);

      var dx = (gateSCenter[0] - gatePCenter[0]) * this.pointResolution;
      var dy = (gateSCenter[1] - gatePCenter[1]) * this.pointResolution;

      return Math.round(Math.sqrt(dx ** 2 + dy ** 2));
    },

    getGateTextRotation(gate) {
      const gateSCenter = this.getGateSCenter(gate);
      const gatePCenter = this.getGatePCenter(gate);

      var dx = gateSCenter[0] - gatePCenter[0];
      var dy = gateSCenter[1] - gatePCenter[1];

      return -1 * Math.atan2(dy, dx);
    },

    setLinePOffset({ id }, markCenter) {
      const mark_ = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.lines[id].p.offset = [
        ((mark_[0] - this.centerOfRotation[0]) / this.scale[0]) *
          this.pointResolution,
        ((mark_[1] - this.centerOfRotation[1]) / this.scale[1]) *
          this.pointResolution,
      ];
    },

    getLinePCenter({ id }) {
      return this.rotate(
        [
          this.centerOfRotation[0] +
            (this.lines[id].p.offset[0] * this.scale[0]) / this.pointResolution,
          this.centerOfRotation[1] +
            (this.lines[id].p.offset[1] * this.scale[1]) / this.pointResolution,
        ],
        this.rotation,
        this.centerOfRotation
      );
    },

    setLineSOffset({ id }, markCenter) {
      const mark_ = this.rotate(
        markCenter,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.lines[id].s.offset = [
        ((mark_[0] - this.centerOfRotation[0]) / this.scale[0]) *
          this.pointResolution,
        ((mark_[1] - this.centerOfRotation[1]) / this.scale[1]) *
          this.pointResolution,
      ];
    },

    getLineSCenter({ id }) {
      return this.rotate(
        [
          this.centerOfRotation[0] +
            (this.lines[id].s.offset[0] * this.scale[0]) / this.pointResolution,
          this.centerOfRotation[1] +
            (this.lines[id].s.offset[1] * this.scale[1]) / this.pointResolution,
        ],
        this.rotation,
        this.centerOfRotation
      );
    },

    getLineLineLength(line) {
      const lineSCenter = this.getLineSCenter(line);
      const linePCenter = this.getLinePCenter(line);

      var dx = (lineSCenter[0] - linePCenter[0]) * this.pointResolution;
      var dy = (lineSCenter[1] - linePCenter[1]) * this.pointResolution;

      return Math.round(Math.sqrt(dx ** 2 + dy ** 2));
    },

    getLineTextRotation(line) {
      const lineSCenter = this.getLineSCenter(line);
      const linePCenter = this.getLinePCenter(line);

      var dx = lineSCenter[0] - linePCenter[0];
      var dy = lineSCenter[1] - linePCenter[1];

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
