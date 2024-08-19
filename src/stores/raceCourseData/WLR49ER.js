export const WLR49ER_META = {
  name: "WLRF49ER",
  description: "49ER Windward / Leeward + Reaching Finish",
};

export const WLR49ER_FEATURES = [
  {
    type: "label",
    text: "49ER Windward / Leeward",
    offset: [-50, 450],
    color: "black",
    size: 30,
    locked: true,
  },

  {
    type: "buoy",
    text: "1j",
    offset: [-50, 350],
    color: "yellow",
    radius: 10,
    locked: false,
  },

  {
    type: "buoy",
    text: "1v",
    offset: [-150, 350],
    color: "yellow",
    radius: 10,
    locked: false,
  },

  {
    type: "gate",
    color: "orange",
    text: "START / FIN",
    left: {
      text: "L",
      offset: [-100, 0],
      color: "orange",
      radius: 10,
      locked: false,
    },
    right: {
      text: "R",
      offset: [0, 0],
      color: "orange",
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
];

export const WLR49ER_LAPS = {
  selectedLap: 0,
  lapOptions: [
    {
      lapCount: 1,
      label: "L1",
      description: "START \u21A6 1 \u21A6 2p \u21A6 FINISH",
    },
    {
      lapCount: 2,
      label: "L2",
      description:
        "START \u21A6 1 \u21A6 2s / 2p \u21A6 1 \u21A6 1  \u21A6 2p  \u21A6 FINISH",
    },
    {
      lapCount: 3,
      label: "L3",
      description:
        "START \u21A6 1 \u21A6 2s / 2p  \u21A6 1 \u21A6 2s / 2p  \u21A6 1 \u21A6 2p  \u21A6 FINISH",
    },
  ],
};
