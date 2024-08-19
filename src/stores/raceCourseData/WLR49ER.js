export const WLR49ER = {
  title: {
    label: "WLRF49ER",
    description: "49er Windward / Leeward",
    offset: [-50, 450],
  },

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

  features: [
    {
      type: "buoy",
      text: "1b",
      offset: [-50, 350],
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
  ],

  sequence: {
    offset: [-50, -170],
    color: "grey",
    selected: 0,
    options: [
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
  },
};
