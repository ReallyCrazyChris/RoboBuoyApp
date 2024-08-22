<template>
  <q-page>
    <div class="column" style="min-height: inherit">
      <div class="col q-py-none">
        <q-card flat>
          <q-card-section class="q-pb-xs">
            <div class="row">
              <div class="col-8 text-h6">Regatta Invitation</div>
              <div class="col-4"><regattaShare /></div>
              <div class="col-12 caption">
                Ahoi sailor, care to join or share this regatta
              </div>
            </div>

            <regattaSettings :readonly="true" />
            <raceSettings :readonly="true" />
            <courseSelection :readonly="true" />
            <courseMap
              :height="300"
              show-map
              show-boundary
              show-zoom
              show-controls
              :readonly="true"
              :key="course.signature"
            ></courseMap>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="col-1 q-p-none">
      <q-card flat>
        <q-card-actions align="right">
          <q-btn
            flat
            color="secondary"
            label="No Thanks!"
            @click="noThanksTransition()"
          />
          <q-btn color="positive" label="Join" @click="raceInfoTransition()" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import regattaSettings from "src/components/regatta/regattaSettings.vue";
import regattaShare from "src/components/regatta/regattaShare.vue";
import raceSettings from "src/components/race/raceSettings.vue";
import courseSelection from "src/components/course/courseSelection.vue";
import courseMap from "src/components/course/courseMap.vue";

import { useRegatta } from "src/stores/regatta";
import { useCourse } from "src/stores/course";
const regatta = useRegatta();
const course = useCourse();

export default defineComponent({
  name: "RegattaPage",
  components: {
    regattaSettings,
    regattaShare,
    raceSettings,
    courseSelection,
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
    noThanksTransition() {
      this.$router.push("");
    },
    raceInfoTransition() {
      this.$router.push("racetimer");
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
