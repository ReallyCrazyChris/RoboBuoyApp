<template>
  <q-card flat class="row content-start" style="min-height: inherit">
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-6 text-h6 text-uppercase text-bold">Course Edit</div>
        <div class="col-6 text-right">
          <q-btn label="save" color="primary" @click="backTransition()" />
        </div>
      </div>
      <q-separator class="q-mt-sm" />
    </q-card-section>

    <q-card-section class="col-12">
      <div>
        <courseType />

        <courseMap
          class="q-mt-sm"
          :height="250"
          show-map
          show-boundary
          show-zoom
          show-controls
          :key="course.signature"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import courseType from "src/components/course/courseType.vue";

import courseMap from "src/components/course/courseMap.vue";
import regattaShare from "src/components/regatta/regattaShare.vue";

import { defineComponent } from "vue";

import { useRegattaInfo } from "src/stores/regattaInfo";
import { useRaceCourse } from "src/stores/raceCourse";

const regattainfo = useRegattaInfo();
const course = useRaceCourse();

export default defineComponent({
  name: "CourseEditPage",
  components: {
    courseType,
    courseMap,
    regattaShare,
  },
  setup() {
    // makes sure the courseMap fills the parent element to the maximum
    return {
      course,
      regattainfo,
    };
  },
  methods: {
    backTransition() {
      this.regattainfo.publishRegattaInfoState();
      this.$router.go(-1);
    },
  },
});
</script>
