<template>
  <q-page>
    <q-card flat>
      <q-card-section style="max-width: 400px">
        <div class="text-h6">Regatta</div>

        <q-input
          v-model="regatta.title"
          label="title"
          :borderless="regatta.viewmode"
          :readonly="regatta.viewmode"
        />
        <q-input
          v-model="regatta.description"
          label="description"
          :borderless="regatta.viewmode"
          :readonly="regatta.viewmode"
        />

        <q-input
          v-model="regatta.date"
          label="date"
          type="datetime-local"
          :borderless="regatta.viewmode"
          :readonly="regatta.viewmode"
        />

        <div class="row fit">
          <div class="col-6">
            <q-input
              type="time"
              v-model="regatta.startTime"
              label="earliest start "
              :borderless="regatta.viewmode"
              :readonly="regatta.viewmode"
            />
          </div>

          <div class="col-6">
            <q-input
              type="time"
              v-model="regatta.endTime"
              label="latest start"
              :borderless="regatta.viewmode"
              :readonly="regatta.viewmode"
            />
          </div>
        </div>

        <div class="row fit q-py-md items-center">
          <div
            v-if="(regatta.lon == 0 || regatta.lat == 0) && !regatta.viewmode"
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

          <div v-if="!regatta.viewmode" class="col-3">
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
      <q-card-actions
        v-if="!regatta.viewmode"
        class="fixed-bottom"
        align="right"
      >
        <q-btn label="Save" color="primary" @click="regatta.saveTransition" />
      </q-card-actions>
      <q-card-actions
        v-if="regatta.viewmode"
        class="fixed-bottom"
        align="right"
      >
        <q-btn label="Edit" color="primary" @click="regatta.editTransition" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useGps } from "src/stores/gps";
import { useRegatta } from "src/stores/regatta";

const gps = useGps();
const regatta = useRegatta();

export default defineComponent({
  name: "RegattaPage",
  components: {},
  setup() {
    return {
      regatta,
      gps,
    };
  },
});
</script>
