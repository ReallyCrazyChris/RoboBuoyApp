<template>
  <q-page>
    <div class="column">
      <div class="col">
        <q-card flat>
          <q-card-section>
            <div class="text-h6">Regatta Notice</div>

            <q-separator />
            <regattaInfo readonly />

            <q-separator />
            <raceInfoOptions readonly />
            <q-separator />
            <raceCourseOptions readonly />
          </q-card-section>
          <q-card-section>
            <raceCourseMap
              :height="300"
              show-map
              show-boundary
              show-zoom
              show-controls
              :readonly="true"
              :key="course.signature"
            ></raceCourseMap>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col-1">
                <q-btn
                  icon="restart_alt"
                  color="positive"
                  @click="resetTransition()"
                />
              </div>
              <div class="col-9">hi</div>
              <div class="col-1">
                <q-btn
                  icon="arrow_forward"
                  color="positive"
                  @click="courseSetupTransition()"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import regattaInfo from "src/components/regatta/regattaInfo.vue";
import raceCourseOptions from "src/components/course/raceCourseOptions.vue";
import raceInfoOptions from "src/components/timer/raceInfoOptions.vue";
import raceCourseMap from "src/components/course/raceCourseMap.vue";

import { useRaceCourse } from "src/stores/raceCourse";
const course = useRaceCourse();

import { useRegatta } from "src/stores/regatta";
const regatta = useRegatta();

export default defineComponent({
  name: "RegattaPage",
  components: {
    regattaInfo,
    raceInfoOptions,
    raceCourseOptions,
    raceCourseMap,
  },
  setup() {
    // makes sure the raceCourseMap fills the parent element to the maximum
    return {
      regatta,
      course,
    };
  },

  methods: {
    resetTransition() {
      regatta.reset();
      regatta.publishRegattaState();
    },
    courseSetupTransition() {
      regatta.publishRegattaState();
      this.$router.push("racecourse");
    },
  },
});
</script>

<style>
.q-field {
  &.q-field--readonly {
    &.q-field--standard {
      .q-field__control {
        &:before {
          border-bottom-style: none;
        }
      }
    }
  }
}
</style>
