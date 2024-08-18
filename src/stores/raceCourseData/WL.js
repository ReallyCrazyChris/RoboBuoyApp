export const WL = {
  title: {
    label: "WL",
    description: "Windward / Leeward",
    offset: [-50, 420],
    color: "black",
  },

  sequence: {
    offset: [-50, -120],
    selected: {
      lapCount: 1,
      sequence: [0, 4, 1, 100],
      label: "L1",
      description: "START \u21A6 1 \u21A6 FINISH",
    },
    options: [
      {
        lapCount: 1,
        sequence: [0, 4, 1, 100],
        label: "L1",
        description: "START \u21A6 1 \u21A6 2p \u21A6 FINISH",
      },
      {
        lapCount: 2,
        sequence: [0, 4, 1, 4, 1, 100],
        label: "L2",
        description:
          "START \u21A6 1 \u21A6 2p \u21A6 1  \u21A6 2p  \u21A6 FINISH",
      },
      {
        lapCount: 3,
        sequence: [0, 4, 1, 4, 1, 4, 1, 100],
        label: "L3",
        description:
          "START \u21A6 1 \u21A6  2p  \u21A6 1 \u21A6  2p  \u21A6 1 \u21A6 2p  \u21A6 FINISH",
      },
    ],
    color: "grey",
  },

  marks: {
    0: {
      type: "gate",
      color: "orange",
      text: "START / FINISH",
      leftId: 1,
      rightId: 2,
    },

    1: {
      type: "mark",
      text: "2P",
      offset: [-100, 0],
      color: "yellow",
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

    // boundry lines
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
};
