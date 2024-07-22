<template>
  <q-page>
    <q-card flat>
      <q-card-section style="max-width: 400px">
        <div class="text-h6">Regatta Invitaiton</div>
        <div class="fit row wrap justify-start items-start content-start">
          <div class="col-10 self-center">
            <div>setup a regatta</div>
            <div>share with others</div>
          </div>
          <div class="col-2 self-center q-pa-sm">
            <shareregatta />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none"> </q-card-section>
      <q-separator inset />
      <q-card-section class="q-pa-md" style="max-width: 400px">
        <q-input
          v-model="regatta.title"
          filled
          class="q-pb-sm"
          label="regatta name"
        />
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
          label="skippers meeting  date and time"
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
      <q-separator inset />
      <q-card-section>
        <div class="row fit q-pa-md">
          <div
            v-if="regatta.lon == 0 || regatta.lat == 0"
            class="col-8 text-caption"
          >
            Pin the regatta location
          </div>
          <div v-else class="col-8">
            <div class="text-caption">
              N {{ parseFloat(regatta.lat).toFixed(3) }}
            </div>
            <div class="text-caption">
              E {{ parseFloat(regatta.lon).toFixed(3) }}
            </div>
          </div>

          <div class="col-3">
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
      <q-card-actions class="fixed-bottom" align="right">
        <q-btn label="OK" color="primary" @click="regatta.saveTransition" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import shareregatta from "src/components/regatta/RegattaShare.vue";
import { date } from "quasar";
import { useGps } from "src/stores/gps";
import { useRegatta } from "src/stores/regatta";

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
  computed: {},
});
</script>
