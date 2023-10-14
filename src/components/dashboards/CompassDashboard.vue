<template>
  <q-card
    flat
    bordered
    class="q-my-md"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">Compass</div>
          <div class="text-caption"></div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <CourseGuage
        name="mag"
        color="orange"
        :value="roboStore.magcourse"
      ></CourseGuage>
      <CourseGuage
        name="dec"
        color="grey"
        :value="roboStore.magdeclination"
      ></CourseGuage>
      <CourseGuage
        name="true"
        color="pink"
        :value="roboStore.magcourse + roboStore.magdeclination"
      ></CourseGuage>
      <CourseGuage
        name="gps"
        color="green"
        :value="roboStore.gpscourse"
      ></CourseGuage>
      <CourseGuage
        name="course"
        color="blue"
        :value="roboStore.currentcourse"
      ></CourseGuage>
    </q-card-section>
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";
import CourseGuage from "src/components/generic/CourseGuage.vue";

export default {
  name: "CompassDashboard",
  props: ["deviceid"],
  components: {
    CourseGuage,
  },

  setup(props) {
    const roboStore = useRoboStore(props.deviceid);

    return {
      roboStore,
    };
  },
};
</script>
