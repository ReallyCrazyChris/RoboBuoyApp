<template>
  <q-page>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="fit row wrap justify-start items-start content-start">
          <div class="col-10 self-center text-h6">Regatta</div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">
          <q-input
            filled
            dense
            v-model="regatta.title"
            label="Title"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Give your regatta a catchy titel',
            ]"
          />

          <q-input
            filled
            dense
            v-model="regatta.description"
            label="Description *"
            lazy-rules
          />

          <q-input
            filled
            dense
            type="date"
            v-model="regatta.date"
            label="Date *"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'enter the date of the regatta',
            ]"
          />

          <div class="row fit items-center">
            <div class="col-5">
              <q-input
                filled
                dense
                type="time"
                v-model="regatta.startTime"
                label="Earliest start time *"
                hint=""
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'set the earlies start time',
                ]"
              />
            </div>
            <div class="col-1 text-center self-center"></div>
            <div class="col-5">
              <q-input
                filled
                dense
                type="time"
                v-model="regatta.endTime"
                label="Latest start time *"
                hint=""
                lazy-rules
              />
            </div>
          </div>

          <div class="row fit q-px-xs items-center">
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
        </q-form>
      </q-card-section>
      <q-card-actions class="fixed-bottom" align="right">
        <q-btn label="Reset" type="reset" color="secondary" flat />
        <q-btn label="OK" type="submit" color="primary" />
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

  methods: {
    onReset() {
      regatta.title = "";
      regatta.description = "";
    },
    onSubmit() {
      //regatta.submit();
      console.log(regatta.endTime);
    },
  },
});
</script>
