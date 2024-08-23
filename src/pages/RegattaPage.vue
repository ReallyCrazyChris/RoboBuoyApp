<template>
  <q-page>
    <div class="column">
      <div class="col">
        <q-card flat>
          <q-card-section>
            <div class="row fit q-pb-sm">
              <div class="col-6 text-h6">Regatta Notice</div>
              <div class="col-6" align="right"><regattaShare /></div>
            </div>

            <regattaSettingsEdit :readonly="false" />
            <q-separator />
            <courseSelection :readonly="false" />
          </q-card-section>
          <q-card-section>
            <courseMap
              :height="300"
              show-map
              show-boundary
              show-zoom
              show-controls
              :key="course.signature"
            ></courseMap>
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
              <div class="col-9"></div>
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
import regattaShare from "src/components/regatta/regattaShare.vue";
import regattaSettingsEdit from "src/components/regatta/regattaSettingsEdit.vue";
import courseSelection from "src/components/course/courseSelection.vue";

import courseMap from "src/components/course/courseMap.vue";

import { useCourse } from "src/stores/course";
const course = useCourse();

import { useRegatta } from "src/stores/regatta";
const regatta = useRegatta();

export default defineComponent({
  name: "RegattaPage",
  components: {
    regattaSettingsEdit,
    courseSelection,
    regattaShare,
    courseMap,
  },
  setup() {
    // makes sure the courseMap fills the parent element to the maximum
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
      this.$router.push("course");
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
