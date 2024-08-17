export const WLR29ER = {
  extentOffsets: [
    [150, 450],
    [-250, 450],
    [150, -150],
    [-250, -150],
  ],

  label: "WLRF29ER",
  description: "29er : Windward / Leeward + Reaching Finish",

  sequenceid: 0,
  sequenceOptions: [
    {
      id: 0,
      lapCount: 1,
      sequence: [0, 1, 7, 100],
      lable: "L1",
      description: "START \u21A6 1 \u21A6 2p \u21A6 FINISH",
    },
    {
      id: 1,
      lapCount: 2,
      sequence: [0, 1, 5, 1, 7, 100],
      lable: "L2",
      description:
        "START \u21A6 1 \u21A6 2s / 2p \u21A6 1 \u21A6 1  \u21A6 2p  \u21A6 FINISH",
    },
    {
      id: 2,
      lapCount: 3,
      sequence: [0, 1, 5, 1, 5, 1, 7, 100],
      lable: "L3",
      description:
        "START \u21A6 1 \u21A6 2s / 2p \u21A6 1 \u21A6 1 \u21A6 2s / 2p\u21A6 1 \u21A6 2p  \u21A6 FINISH",
    },
  ],

  controls: {
    anchorHandle: {
      offset: [0, 0],
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
      leftMarkId: 1,
      rightMarkId: 2,
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
      leftMarkId: 6,
      rightMarkId: 7,
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
      leftMarkId: 101,
      rightMarkId: 102,
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
      text: "Top Boundary",
      leftPointId: 105,
      rightPointId: 106,
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
      text: "Lower Boundary",
      leftPointId: 108,
      rightPointId: 109,
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
      text: "Right Boundary",
      leftPointId: 111,
      rightPointId: 112,
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
      text: "Left Boundary",
      leftPointId: 114,
      rightPointId: 115,
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
};
