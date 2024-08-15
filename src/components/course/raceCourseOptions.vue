<template>
  <q-select
    filled
    class="q-pt-sm"
    label="race course"
    color="primary"
    options-selected-class="text-deep-orange"
    v-model="raceCourse"
    :options="raceCourseOptions"
    @update:model-value="updateRaceCourseState"
  >
    <template v-slot:selected>
      {{ raceCourse.description }}
    </template>

    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
          <q-item-label caption>{{ scope.opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
//    @update:model-value="raceCourse.publishCourseState()"
import { useRaceCourse } from "src/stores/raceCourse";
import updown from "src/components/course/courseData/updown.json";
const raceCourse = useRaceCourse();

export default {
  name: "raceCourseOptions",
  setup(props) {
    return {
      raceCourse,
    };
  },
  methods: {
    updateRaceCourseState(raceCourseState) {
      raceCourse.$patch(raceCourseState);
      raceCourse.publishRaceCourseState();
    },
  },
  data() {
    return {
      raceCourseOptions: [
        updown,
        {
          label: "New",
          description: "Windward / Leeward + Reaching Finish",
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
              text: "X",
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
        },
        {
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
        },
      ],
    };
  },
};
</script>
<style></style>
