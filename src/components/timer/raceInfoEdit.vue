<template>
  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col q-pb-none">
      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col-12 text-h6 text-uppercase">Race Info</div>
          </div>
        </div>

        <div class="col-3 text-right">
          <q-btn label="OK" color="primary" @click="backTransition()" />
        </div>
        <div class="col-3 text-right"></div>
      </div>

      <regattaSettings />

      <q-separator class="q-mt-sm" />
      <div class="text-subtitle1 q-mt-sm">Race Conditions</div>
      <raceStartConditions />

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
        show-controls
        :key="course.signature"
      />
      <courseRoute />
    </q-card-section>
  </q-card>
</template>

<script>
import raceStartConditions from "src/components/race/raceStartConditions.vue";
import regattaSettings from "src/components/regatta/regattaSettings.vue";
import locationSettings from "src/components/course/locationSettings.vue";
import courseSettings from "src/components/course/courseSettings.vue";
import courseRoute from "src/components/course/courseRoute.vue";
import courseMap from "src/components/course/courseMap.vue";

import { defineComponent } from "vue";
import { useRegatta } from "src/stores/regatta";
import { useCourse } from "src/stores/course";

const regatta = useRegatta();
const course = useCourse();

export default defineComponent({
  name: "raceInfoEdit",
  components: {
    raceStartConditions,
    locationSettings,
    regattaSettings,
    courseSettings,
    courseRoute,
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
    backTransition() {
      this.regatta.publishRegattaState();
      this.$router.go(-1);
    },
  },
});
</script>
