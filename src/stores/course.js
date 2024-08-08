import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
import { rotate } from "ol/transform";
const mqttHook = useMQTT();

export const useCourse = defineStore("course", {
  state: () => ({
    title: "Windward / Leeward + Reaching Finish",
    courceSequence:
      "START \u21A6 1 \u21A6 2s / 2p \u21A6 1 \u21A6 2p \u21A6 FNISH",
    zoom: 18,

    shortened: false,
    markreplacement: false,

    lon: 10.933389630255192,
    lat: 49.122665487481385,

    centerOfRotation: [1217300, 6295726],
    rotation: 0,
    scaleX: 1,
    scaleY: 1,

    markRadius: 4, // meters

    courseBoundary_width: 200,
    courseBoundary_height: 350,
    courseBoundary_offsetX: 70,
    courseBoundary_offsetY: 150,
    courseBoundary_visible: true,

    rotate_scaleHandel_offsetX: 0,
    rotate_scaleHandel_offsetY: 300,
    rotate_scaleHandel_visible: true,
    rotate_scaleHandel_color: "black",

    scaleXHandel_offsetX: -125,
    scaleXHandel_offsetY: 0,
    scaleXHandel_visible: true,
    scaleXHandel_color: "black",

    startCommitte_offsetX: 0,
    startCommitte_offsetY: 0,
    startPin_offsetX: -60,
    startPin_offsetY: 0,
    start_visible: true,
    start_color: "orange",

    finishCommitte_offsetX: 15,
    finishCommitte_offsetY: 0,
    finishPin_offsetX: 56,
    finishPin_offsetY: 44,
    finish_visible: true,
    finish_color: "blue",

    mark1_offsetX: -30,
    mark1_offsetY: 300,
    mark1_visible: true,
    mark1_color: "lightgreen",

    mark2_offsetX: -25,
    mark2_offsetY: -100,
    mark2_visible: false,
    mark2_color: "lightgreen",

    mark3_offsetX: -50,
    mark3_offsetY: 0,
    mark3_visible: false,
    mark3_color: "lightgreen",

    mark4_offsetX: 0,
    mark4_offsetY: 0,
    mark4_visible: false,
    mark4_color: "lightgreen",

    mark5_offsetX: 0,
    mark5_offsetY: 0,
    mark5_visible: false,
    mark5_color: "lightgreen",

    mark6_offsetX: 0,
    mark6_offsetY: 0,
    mark6_visible: false,
    mark6_color: "lightgreen",

    gate1A_offsetX: 100,
    gate1A_offsetY: 30,
    gate1B_offsetX: 50,
    gate1B_offsetY: 30,
    gate1_visible: false,
    gate1_color: "red",

    gate2A_offsetX: 0,
    gate2A_offsetY: 50,
    gate2B_offsetX: -50,
    gate2B_offsetY: 50,
    gate2_visible: true,
    gate2_color: "yellow",
  }),

  getters: {
    rotate_scaleHandel_center({
      centerOfRotation,
      rotation,
      rotate_scaleHandel_offsetX,
      rotate_scaleHandel_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + rotate_scaleHandel_offsetX * scaleX,
          centerOfRotation[1] + rotate_scaleHandel_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    scaleXHandel_center({
      centerOfRotation,
      rotation,
      scaleXHandel_offsetX,
      scaleXHandel_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + scaleXHandel_offsetX * scaleX,
          centerOfRotation[1] + scaleXHandel_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    courseBoundaryArray({
      centerOfRotation,
      rotation,
      courseBoundary_offsetX,
      courseBoundary_offsetY,
      scaleX,
      scaleY,
    }) {
      return [
        [
          // courseBoundry origin close to cente of rotation
          this.rotate(
            [
              centerOfRotation[0] + courseBoundary_offsetX * scaleX,
              centerOfRotation[1] + courseBoundary_offsetY * scaleY,
            ],
            rotation,
            centerOfRotation
          ),

          // courseBoundry bottom-right
          this.rotate(
            [
              centerOfRotation[0] + courseBoundary_offsetX * scaleX,
              centerOfRotation[1] +
                (courseBoundary_offsetY - this.courseBoundary_height / 2) *
                  scaleY,
            ],
            rotation,
            centerOfRotation
          ),

          // courseBoundry bottom-left
          this.rotate(
            [
              centerOfRotation[0] +
                (courseBoundary_offsetX - this.courseBoundary_width) * scaleX,
              centerOfRotation[1] +
                (courseBoundary_offsetY - this.courseBoundary_height / 2) *
                  scaleY,
            ],
            rotation,
            centerOfRotation
          ),

          // courseBoundry top-left
          this.rotate(
            [
              centerOfRotation[0] +
                (courseBoundary_offsetX - this.courseBoundary_width) * scaleX,
              centerOfRotation[1] +
                (courseBoundary_offsetY + this.courseBoundary_height / 2) *
                  scaleY,
            ],
            rotation,
            centerOfRotation
          ),

          // courseBoundry top-right
          this.rotate(
            [
              centerOfRotation[0] + courseBoundary_offsetX * scaleX,
              centerOfRotation[1] +
                (courseBoundary_offsetY + this.courseBoundary_height / 2) *
                  scaleY,
            ],
            rotation,
            centerOfRotation
          ),

          // courseBoundry origin close to cente of rotation
          this.rotate(
            [
              centerOfRotation[0] + courseBoundary_offsetX * scaleX,
              centerOfRotation[1] + courseBoundary_offsetY * scaleY,
            ],
            rotation,
            centerOfRotation
          ),
        ],
      ];
    },

    startCommitte_center({ centerOfRotation }) {
      return centerOfRotation;
    },

    startPin_center({
      centerOfRotation,
      rotation,
      startPin_offsetX,
      startPin_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + startPin_offsetX * scaleX,
          centerOfRotation[1] + startPin_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    startLineLength({ startCommitte_center, startPin_center }) {
      var dx = startCommitte_center[0] - startPin_center[0];
      var dy = startCommitte_center[1] - startPin_center[1];

      return Math.round(Math.sqrt(dx ** 2 + dy ** 2));
    },

    startLineTextRotation({ startCommitte_center, startPin_center }) {
      var dx = startCommitte_center[0] - startPin_center[0];
      var dy = startCommitte_center[1] - startPin_center[1];

      return -1 * Math.atan2(dy, dx);
    },

    finishCommitte_center({
      centerOfRotation,
      rotation,
      finishCommitte_offsetX,
      finishCommitte_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + finishCommitte_offsetX * scaleX,
          centerOfRotation[1] + finishCommitte_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    finishPin_center({
      centerOfRotation,
      rotation,
      finishPin_offsetX,
      finishPin_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + finishPin_offsetX * scaleX,
          centerOfRotation[1] + finishPin_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    finishLineLength({ finishCommitte_center, finishPin_center }) {
      var dx = finishCommitte_center[0] - finishPin_center[0];
      var dy = finishCommitte_center[1] - finishPin_center[1];

      return Math.round(Math.sqrt(dx ** 2 + dy ** 2));
    },

    finishLineTextRotation({ finishCommitte_center, finishPin_center }) {
      var dx = finishCommitte_center[0] - finishPin_center[0];
      var dy = finishCommitte_center[1] - finishPin_center[1];

      return -1 * Math.atan2(dy, dx);
    },

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

    mark3_center({
      centerOfRotation,
      rotation,
      mark3_offsetX,
      mark3_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + mark3_offsetX * scaleX,
          centerOfRotation[1] + mark3_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    mark4_center({
      centerOfRotation,
      rotation,
      mark4_offsetX,
      mark4_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + mark4_offsetX * scaleX,
          centerOfRotation[1] + mark4_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    mark5_center({
      centerOfRotation,
      rotation,
      mark5_offsetX,
      mark5_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + mark5_offsetX * scaleX,
          centerOfRotation[1] + mark5_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    mark6_center({
      centerOfRotation,
      rotation,
      mark6_offsetX,
      mark6_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + mark6_offsetX * scaleX,
          centerOfRotation[1] + mark6_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    gate1A_center({
      centerOfRotation,
      rotation,
      gate1A_offsetX,
      gate1A_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + gate1A_offsetX * scaleX,
          centerOfRotation[1] + gate1A_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    gate1B_center({
      centerOfRotation,
      rotation,
      gate1B_offsetX,
      gate1B_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + gate1B_offsetX * scaleX,
          centerOfRotation[1] + gate1B_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    gate1LineLength({ gate1A_center, gate1B_center }) {
      var dx = gate1A_center[0] - gate1B_center[0];
      var dy = gate1A_center[1] - gate1B_center[1];

      return Math.round(Math.sqrt(dx ** 2 + dy ** 2));
    },

    gate1LineTextRotation({ gate1A_center, gate1B_center }) {
      var dx = gate1A_center[0] - gate1B_center[0];
      var dy = gate1A_center[1] - gate1B_center[1];

      return -1 * Math.atan2(dy, dx);
    },

    gate2A_center({
      centerOfRotation,
      rotation,
      gate2A_offsetX,
      gate2A_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + gate2A_offsetX * scaleX,
          centerOfRotation[1] + gate2A_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    gate2B_center({
      centerOfRotation,
      rotation,
      gate2B_offsetX,
      gate2B_offsetY,
      scaleX,
      scaleY,
    }) {
      return this.rotate(
        [
          centerOfRotation[0] + gate2B_offsetX * scaleX,
          centerOfRotation[1] + gate2B_offsetY * scaleY,
        ],
        rotation,
        centerOfRotation
      );
    },

    gate2LineLength({ gate2A_center, gate2B_center }) {
      var dx = gate2A_center[0] - gate2B_center[0];
      var dy = gate2A_center[1] - gate2B_center[1];

      return Math.round(Math.sqrt(dx ** 2 + dy ** 2));
    },

    gate2LineTextRotation({ gate2A_center, gate2B_center }) {
      var dx = gate2A_center[0] - gate2B_center[0];
      var dy = gate2A_center[1] - gate2B_center[1];

      return -1 * Math.atan2(dy, dx);
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

    setCourseRotation(rotate_scaleHandel_center) {
      var dx = rotate_scaleHandel_center[0] - this.centerOfRotation[0];
      var dy = rotate_scaleHandel_center[1] - this.centerOfRotation[1];
      this.rotation = -1 * Math.atan2(dx, dy);
    },
    setCourseScaleY(rotate_scaleHandel_center) {
      var dx = rotate_scaleHandel_center[0] - this.centerOfRotation[0];
      var dy = rotate_scaleHandel_center[1] - this.centerOfRotation[1];

      this.scaleY =
        Math.sqrt(dx ** 2 + dy ** 2) /
        Math.sqrt(
          this.rotate_scaleHandel_offsetX ** 2 +
            this.rotate_scaleHandel_offsetY ** 2
        );
    },
    setCourseScaleX(startPin_center) {
      var dx = startPin_center[0] - this.centerOfRotation[0];
      var dy = startPin_center[1] - this.centerOfRotation[1];

      this.scaleX =
        Math.sqrt(dx ** 2 + dy ** 2) /
        Math.sqrt(
          this.scaleXHandel_offsetX ** 2 + this.startCommitte_offsetY ** 2
        );
    },

    setStartPin_offset(startPin_center) {
      const startPin = this.rotate(
        startPin_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.startPin_offsetX =
        (startPin[0] - this.centerOfRotation[0]) / this.scaleX;
      this.startPin_offsetY =
        (startPin[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setFinishCommitte_offset(finishCommitte_center) {
      const finishCommitte = this.rotate(
        finishCommitte_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.finishCommitte_offsetX =
        (finishCommitte[0] - this.centerOfRotation[0]) / this.scaleX;
      this.finishCommitte_offsetY =
        (finishCommitte[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setFinishPin_offset(finishPin_center) {
      const finishPin = this.rotate(
        finishPin_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.finishPin_offsetX =
        (finishPin[0] - this.centerOfRotation[0]) / this.scaleX;
      this.finishPin_offsetY =
        (finishPin[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setMark1_offset(mark1_center) {
      const mark1 = this.rotate(
        mark1_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.mark1_offsetX = (mark1[0] - this.centerOfRotation[0]) / this.scaleX;
      this.mark1_offsetY = (mark1[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setMark2_offset(mark2_center) {
      const mark2 = this.rotate(
        mark2_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.mark2_offsetX = (mark2[0] - this.centerOfRotation[0]) / this.scaleX;
      this.mark2_offsetY = (mark2[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setMark3_offset(mark3_center) {
      const mark3 = this.rotate(
        mark3_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.mark3_offsetX = (mark3[0] - this.centerOfRotation[0]) / this.scaleX;
      this.mark3_offsetY = (mark3[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setMark4_offset(mark4_center) {
      const mark4 = this.rotate(
        mark4_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.mark4_offsetX = (mark4[0] - this.centerOfRotation[0]) / this.scaleX;
      this.mark4_offsetY = (mark4[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setMark5_offset(mark5_center) {
      const mark5 = this.rotate(
        mark5_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.mark5_offsetX = (mark5[0] - this.centerOfRotation[0]) / this.scaleX;
      this.mark5_offsetY = (mark5[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setMark6_offset(mark6_center) {
      const mark6 = this.rotate(
        mark6_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.mark6_offsetX = (mark6[0] - this.centerOfRotation[0]) / this.scaleX;
      this.mark6_offsetY = (mark6[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setGate1A_offset(gate1A_center) {
      const gate = this.rotate(
        gate1A_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.gate1A_offsetX = (gate[0] - this.centerOfRotation[0]) / this.scaleX;
      this.gate1A_offsetY = (gate[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setGate1B_offset(gate1B_center) {
      const gate = this.rotate(
        gate1B_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.gate1B_offsetX = (gate[0] - this.centerOfRotation[0]) / this.scaleX;
      this.gate1B_offsetY = (gate[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setGate2A_offset(gate2A_center) {
      const gate = this.rotate(
        gate2A_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.gate2A_offsetX = (gate[0] - this.centerOfRotation[0]) / this.scaleX;
      this.gate2A_offsetY = (gate[1] - this.centerOfRotation[1]) / this.scaleY;
    },

    setGate2B_offset(gate2B_center) {
      const gate = this.rotate(
        gate2B_center,
        -1 * this.rotation,
        this.centerOfRotation
      );

      this.gate2B_offsetX = (gate[0] - this.centerOfRotation[0]) / this.scaleX;
      this.gate2B_offsetY = (gate[1] - this.centerOfRotation[1]) / this.scaleY;
    },
  },

  persist: false,
});
