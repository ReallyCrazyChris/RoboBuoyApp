<template>
  <q-card flat class="row content-start" style="min-height: inherit">
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-6 text-h6 text-uppercase text-bold">Edit Regatta</div>
        <div class="col-6 text-right">
          <regattaShare class="q-mr-sm" />
          <q-btn label="save" color="primary" @click="backTransition()" />
        </div>
      </div>
      <q-separator class="q-mt-sm" />
    </q-card-section>

    <q-card-section class="col-xs-12 col-md-6">
      <div class="fit">
        <div class="text-h6 text-uppercase text-grey">Info</div>
        <regattaInfo />
        <q-separator class="xs q-mt-sm" />
      </div>
    </q-card-section>

    <q-card-section class="col-xs-12 col-md-6">
      <div class="fit">
        <div class="text-h6 text-uppercase text-grey">Start conditions</div>
        <regattaStartConditions />
        <q-separator class="xs q-mt-sm" />
      </div>
    </q-card-section>

    <q-card-section class="col-12">
      <q-separator class="gt-sm q-mb-sm" />
      <div>
        <div class="text-h6 text-uppercase text-grey">Course</div>
        <courseType />
        <courseLocation />
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
import regattaStartConditions from "src/components/regatta/regattaStartConditions.vue";
import courseLocation from "src/components/course/courseLocation.vue";
import courseType from "src/components/course/courseType.vue";

import courseMap from "src/components/course/courseMap.vue";
import regattaShare from "src/components/regatta/regattaShare.vue";
import regattaInfo from "src/components/regatta/regattaInfo.vue";

import { defineComponent } from "vue";
import { useRegattaInfo } from "src/stores/regattaInfo";
import { useRaceCourse } from "src/stores/raceCourse";

const regattainfo = useRegattaInfo();
const course = useRaceCourse();

export default defineComponent({
  name: "regattaEdit",
  components: {
    regattaStartConditions,
    courseLocation,
    courseType,

    courseMap,
    regattaShare,
    regattaInfo,
  },
  setup() {
    // makes sure the courseMap fills the parent element to the maximum
    return {
      regattainfo,
      course,
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
