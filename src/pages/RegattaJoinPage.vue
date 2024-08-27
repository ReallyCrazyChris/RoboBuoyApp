<template>
  <q-page>
    <q-card flat class="column" style="min-height: inherit">
      <q-card-section class="col q-pb-none">
        <div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col-12 text-h6">{{ regatta.name }}</div>
            </div>
          </div>

          <div class="col-6 q-pb-md" align="right">
            <regattaShare />
          </div>
        </div>
        <regattaSettings />
        <q-separator class="q-mt-sm" />
        <div class="text-subtitle1 q-mt-sm">Course and Location</div>
        <courseSettings />
        <locationSettings />
        <courseMap
          class="q-mt-sm"
          :height="250"
          show-map
          show-boundary
          show-zoom
          :key="course.signature"
        />
        <q-separator class="q-mt-sm" />
        <div class="text-subtitle1 q-mt-sm">Race Conditions</div>
        <raceSettings />
        <q-separator class="q-mt-sm" />
        <div class="text-subtitle1 q-mt-sm">Skipper, Crew and Sailnumber</div>
        <participantSettings />
      </q-card-section>
      <q-card-actions class="col-1">
        <div class="row fit">
          <div class="col-10">
            <q-btn
              flat
              color="secondary"
              label="No Thanks!"
              @click="noThanksTransition()"
            />
          </div>
          <div class="col-2 q-pr-sm" align="right">
            <q-btn
              color="positive"
              label="Join"
              @click="raceInfoTransition()"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import regattaSettings from "src/components/regatta/regattaSettingsView.vue";
import courseSettings from "src/components/course/courseSettingsView.vue";
import locationSettings from "src/components/course/locationSettingsView.vue";
import regattaShare from "src/components/regatta/regattaShare.vue";
import raceSettings from "src/components/race/raceSettingsView.vue";
import participantSettings from "src/components/participant/participantSettings.vue";
import courseMap from "src/components/course/courseMap.vue";

import { useParticipant } from "src/stores/participant";
import { useRegatta } from "src/stores/regatta";
import { useCourse } from "src/stores/course";

const participant = useParticipant();
const regatta = useRegatta();
const course = useCourse();

export default defineComponent({
  name: "RegattaPage",
  components: {
    regattaShare,
    regattaSettings,
    locationSettings,
    courseSettings,
    courseMap,
    raceSettings,
    participantSettings,
  },
  setup() {
    // makes sure the courseMap fills the parent element to the maximum
    return {
      participant,
      regatta,
      course,
    };
  },

  methods: {
    showCourseTransition() {
      this.$router.push("course");
    },

    noThanksTransition() {
      this.$router.push("home");
    },
    raceInfoTransition() {
      this.$router.push("racetimer");
    },
  },
});
</script>
<style></style>
