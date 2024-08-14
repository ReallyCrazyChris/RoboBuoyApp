<template>
  <q-page>
    <div style="max-width: 400px">
      <q-card flat>
        <q-card-section>
          <div class="row items-center">
            <div class="col-8">
              <div class="text-h6">Regatta Notice</div>
              <div class="text-caption">share with other participants.</div>
            </div>

            <div class="col-4" @click="nextTransition()">
              <shareregatta />
            </div>
          </div>
        </q-card-section>

        <q-separator inset />
        <q-card-section class="q-pa-md">
          <q-input
            v-model="regatta.title"
            filled
            class="q-pb-sm"
            label="regatta name"
          ></q-input>

          <q-input
            v-model="regatta.description"
            filled
            class="q-pb-sm"
            label="description"
          />

          <q-input
            v-model="regatta.date"
            filled
            class="q-pb-sm"
            label="race date and time"
            type="datetime-local"
          />

          <div
            class="row full-width no-wrap justify-start items-start content-start"
          >
            <div class="col-6">
              <q-input
                v-model="regatta.startTime"
                filled
                class="q-pr-sm"
                type="time"
                label="earliest race start "
              />
            </div>

            <div class="col-6">
              <q-input
                v-model="regatta.endTime"
                filled
                class="q-pl-sm"
                type="time"
                label="latest race start"
              />
            </div>
          </div>

          <div class="row full-width justify-start items-center">
            <div class="col-12 q-pb-sm">
              <raceCourseOptions />
            </div>
            <div class="col-8" ref="mapcontainer">
              <!-- key forces reaceCourceMap to re-render when cource.label changes :-) -->
              <raceCourseMap :height="150" showMap :key="cource.label" />
            </div>
            <div class="col-3 q-pb-sm q-px-sm">
              <div>
                <div class="text-caption">set location</div>
                <div class="text-caption">
                  N {{ parseFloat(regatta.lat).toFixed(3) }}
                </div>
                <div class="text-caption">
                  E {{ parseFloat(regatta.lon).toFixed(3) }}
                </div>
              </div>
            </div>
            <div class="col-1 q-pb-sm">
              <q-btn
                class="float-right"
                round
                color="primary"
                icon="room"
                @click="regatta.setCoordinates(gps.lon, gps.lat)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import shareregatta from "src/components/regatta/RegattaShare.vue";

import raceCourseMap from "src/components/course/raceCourseMap.vue";
import raceCourseOptions from "src/components/course/raceCourseOptions.vue";

import { useScreen } from "src/stores/screen";

import { date } from "quasar";
import { useGps } from "src/stores/gps";
import { useRegatta } from "src/stores/regatta";
import { useRaceCourse } from "src/stores/raceCourse";

const screen = useScreen();
const gps = useGps();
const regatta = useRegatta();
const cource = useRaceCourse();

export default defineComponent({
  name: "RegattaPage",
  components: { shareregatta, raceCourseOptions, raceCourseMap },
  setup() {
    return {
      regatta,
      gps,
      cource,
    };
  },
  methods: {
    clearTransition() {
      regatta.clearTransition();
    },
    nextTransition() {
      regatta.saveTransition();

      const data = {
        title: "Join the " + regatta.title,
        text: regatta.description + " - " + regatta.date,
        url: "https://reallycrazychris.github.io/#/timer",
      };

      navigator.share(data);
      this.$router.push("timer");
    },
  },
});
</script>
