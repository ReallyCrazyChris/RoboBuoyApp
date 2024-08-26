<template>
  <q-page>
    <q-card flat class="column" style="min-height: inherit">
      <q-card-section class="col-1 q-pb-none">
        <div class="row q-pb-sm">
          <div class="col-6 text-h6">Regatta Notice</div>
          <div class="col-6" align="right">
            <regattaShare @click="raceJoinTransition()" />
          </div>
        </div>

        <regattaSettingsEdit />
      </q-card-section>

      <q-card-section class="col-1 q-pt-none">
        <courseMap
          :height="180"
          show-map
          show-boundary
          show-zoom
          show-controls
          :key="course.signature"
        ></courseMap>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import regattaShare from "src/components/regatta/regattaShare.vue";
import regattaSettingsEdit from "src/components/regatta/regattaSettingsEdit.vue";

import courseMap from "src/components/course/courseMap.vue";

import { useCourse } from "src/stores/course";
const course = useCourse();

import { useRegatta } from "src/stores/regatta";
const regatta = useRegatta();

export default defineComponent({
  name: "RegattaPage",
  components: {
    regattaSettingsEdit,

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
    raceJoinTransition() {
      this.$router.push("joinregatta");
    },
  },
});
</script>
