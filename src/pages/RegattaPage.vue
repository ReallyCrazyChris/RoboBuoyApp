<template>
  <q-page>
    <q-card flat class="column" style="min-height: inherit">
      <q-card-section class="col q-pb-none">
        <div class="row">
          <div class="col-8">
            <div class="row">
              <div class="col-12 text-h6 text-uppercase">Race Info</div>
            </div>
          </div>

          <div class="col-4 q-pb-md" align="right">
            <q-btn label="ok" color="positive" @click="backTransition()" />
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
          show-controls
          :key="course.signature"
        />
        <q-separator class="q-mt-sm" />
        <div class="text-subtitle1 q-mt-sm">Race Conditions</div>
        <raceSettings />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import regattaShare from "src/components/regatta/regattaShare.vue";
import regattaSettings from "src/components/regatta/regattaSettings.vue";
import raceSettings from "src/components/race/raceSettings.vue";
import courseSettings from "src/components/course/courseSettings.vue";
import locationSettings from "src/components/course/locationSettings.vue";
import courseMap from "src/components/course/courseMap.vue";
import { useCourse } from "src/stores/course";
import { useRegatta } from "src/stores/regatta";

const course = useCourse();
const regatta = useRegatta();

export default defineComponent({
  name: "RegattaPage",
  components: {
    regattaSettings,
    courseMap,
    raceSettings,
    locationSettings,
    courseSettings,
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
