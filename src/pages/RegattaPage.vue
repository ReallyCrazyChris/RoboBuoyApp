<template>
  <q-page>
    <div class="column" style="min-height: inherit">
      <div class="col-1">
        <q-card flat>
          <q-card-section class="q-py-xs">
            <div class="row items-center">
              <div class="col-8">
                <div class="text-h6">Regatta Notice</div>
                <div class="text-caption">share with other participants.</div>
              </div>

              <div class="col-4" align="right" @click="saveAndNext()">
                <shareregatta />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="">
            <div class="fit row wrap justify-start items-center content-center">
              <div class="col-11">
                <q-input
                  v-model="regatta.title"
                  filled
                  class="q-pb-sm"
                  label="regatta name"
                ></q-input>
              </div>
              <div class="col-1" align="center">
                <q-btn
                  round
                  flat
                  unelevated
                  dense
                  color="primary"
                  icon="undo"
                  @click="restForm"
                />
              </div>

              <div class="col-12">
                <q-input
                  v-model="regatta.description"
                  filled
                  class="q-pb-sm"
                  label="description"
                />
              </div>

              <div class="col-12">
                <q-input
                  v-model="regatta.date"
                  filled
                  class="q-pb-sm"
                  label="race date and time"
                  type="datetime-local"
                />
              </div>

              <div class="col-6">
                <q-input
                  v-model="regatta.startTime"
                  filled
                  class="q-pb-sm q-pr-xs"
                  type="time"
                  label="earliest race start "
                />
              </div>

              <div class="col-6">
                <q-input
                  v-model="regatta.endTime"
                  filled
                  class="q-pb-sm q-pl-xs"
                  type="time"
                  label="latest race start"
                />
              </div>
            </div>
            <div class="col-12 q-pb-sm">
              <raceCourseOptions />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col q-px-md q-py-none" ref="regattaMapContainer">
        <!-- key forces reaceCourceMap to re-render when cource.label changes :-) -->
        <raceCourseMap
          v-if="regattaMapContainer?.clientHeight"
          :height="regattaMapContainer?.clientHeight"
          showMap
          :key="cource.label"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

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
  components: {
    shareregatta,
    raceCourseOptions,
    raceCourseMap,
  },
  setup() {
    // makes sure the raceCourseMap fills the parent element to the maximum
    const regattaMapContainer = ref(null);

    return {
      regatta,
      gps,
      cource,
      regattaMapContainer,
    };
  },

  methods: {
    restForm() {
      regatta.reset();
      regatta.publishRegattaState();
    },
    saveAndNext() {
      regatta.publishRegattaState();
      this.$router.push("timer");
    },
  },
});
</script>
