export const WLR49ER_META = {
  name: "WLR49ER",
  description: "49er Windward / Leeward",
};

export const WLR49ER_FEATURES = [
  {
    type: "label",
    text: "49er Windward / Leeward",
    offset: [-50, 450],
    color: "black",
    size: 30,
    locked: true,
  },

  {
    type: "buoy",
    text: "1",
    offset: [-50, 350],
    color: "yellow",
    radius: 10,
    locked: false,
  },

  {
    type: "gate",
    color: "yellow",
    text: "gate",
    left: {
      text: "2s",
      offset: [-100, -100],
      color: "yellow",
      radius: 10,
      locked: false,
    },
    right: {
      text: "2p",
      offset: [0, -100],
      color: "yellow",
      radius: 10,
      locked: false,
    },
  },

  {
    type: "gate",
    color: "orange",
    text: "START",
    left: {
      text: "",
      offset: [-100, 0],
      color: "orange",
      radius: 10,
      locked: false,
    },
    right: {
      text: "",
      offset: [0, 0],
      color: "orange",
      radius: 10,
      locked: true,
    },
  },

  {
    type: "gate",
    color: "blue",
    text: "FINISH",
    left: {
      text: "",
      offset: [-100, -20],
      color: "blue",
      radius: 10,
      locked: false,
    },
    right: {
      text: "",
      offset: [0, -20],
      color: "blue",
      radius: 10,
      locked: true,
    },
  },

  {
    type: "line",
    color: "black",
    text: "",
    left: {
      text: "",
      offset: [-200, 400],
      color: "grey",
      radius: 0,
      locked: true,
    },
    right: {
      text: "",
      offset: [100, 400],
      color: "grey",
      radius: 0,
      locked: true,
    },
  },

  {
    type: "line",
    color: "grey",
    text: "leeward",
    left: {
      text: "",
      offset: [-200, -150],
      color: "grey",
      radius: 0,
      locked: true,
    },
    right: {
      text: "",
      offset: [100, -150],
      color: "grey",
      radius: 0,
      locked: true,
    },
  },

  {
    type: "line",
    color: "grey",
    text: "left",
    left: {
      text: "",
      offset: [-200, 400],
      color: "grey",
      radius: 0,
      locked: true,
    },
    right: {
      text: "",
      offset: [-200, -150],
      color: "grey",
      radius: 0,
      locked: true,
    },
  },

  {
    type: "line",
    color: "black",
    text: "right",
    left: {
      text: "",
      offset: [100, 400],
      color: "grey",
      radius: 0,
      locked: true,
    },
    right: {
      text: "",
      offset: [100, -150],
      color: "grey",
      radius: 0,
      locked: true,
    },
  },

  {
    type: "lapinfo",
    color: "black",
    size: 24,
    left: {
      offset: [-220, 400],
    },
    right: {
      offset: [-220, -150],
    },
  },
];

export const WLR49ER_LAPS = [
  {
    lapCount: 1,
    label: "L1",
    description: "START \u21A6 1 \u21A6 2s/2p \u21A6 FINISH",
  },
  {
    lapCount: 2,
    label: "L2",
    description:
      "START \u21A6 1 \u21A6 2s/2p \u21A6 1 \u21A6 2s/2p \u21A6 FINISH",
  },
  {
    lapCount: 3,
    label: "L3",
    description:
      "START \u21A6 1 \u21A6 2s/2p\u21A6 1 \u21A6 2s/2p\u21A6 1 \u21A6 2s/2p \u21A6 FINISH",
  },
];
