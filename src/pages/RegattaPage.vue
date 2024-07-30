<template>
  <q-page>
    <div style="max-width: 400px">
      <q-card flat class="window-height">
        <q-card-section>
          <div class="text-h6">Regatta Invitaiton</div>
          <div class="text-caption">
            create a regatta, share with other participants.
          </div>
        </q-card-section>

        <q-separator inset />
        <q-card-section class="q-pa-md">
          <div class="row full-width no-wrap justify-start items-center">
            <div class="col-8">
              <q-input
                v-model="regatta.title"
                filled
                class="q-pb-sm q-pr-sm"
                label="regatta name"
              ></q-input>
            </div>
            <div class="col-3 q-pb-sm q-pr-sm">
              <div>
                <div class="text-caption">pin location</div>
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
        </q-card-section>

        <q-card-actions class="fixed-bottom" align="right">
          <div @click="nextTransition()">
            <shareregatta />
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import shareregatta from "src/components/regatta/RegattaShare.vue";

import { useScreen } from "src/stores/screen";

import { date } from "quasar";
import { useGps } from "src/stores/gps";
import { useRegatta } from "src/stores/regatta";

const screen = useScreen();
const gps = useGps();
const regatta = useRegatta();

export default defineComponent({
  name: "RegattaPage",
  components: { shareregatta },
  setup() {
    return {
      regatta,
      gps,
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
