<template>
  <q-card
    flat
    bordered
    square
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-6">
        <MarkNumber :number="roboStore.number"></MarkNumber>
        <q-toolbar-title>{{ roboStore.name }} GPS</q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="col-6">
        <q-space />
        <GPSStatus :positionvalid="roboStore.positionvalid" />
      </q-toolbar>
    </div>

    <q-card-section
      class="fit row wrap justify-start items-start content-start"
    >
      <CourseGuage
        class="col-4 q-pa-sm"
        :deviceid="roboStore.deviceid"
        :name="' current course'"
        :value="roboStore.currentcourse"
        :color="roboStore.color"
      ></CourseGuage>
      <CourseGuage
        class="col-4 q-pa-sm"
        :deviceid="roboStore.deviceid"
        :name="'bearing to target'"
        :value="roboStore.desiredcourse"
        :color="roboStore.color"
      ></CourseGuage>
      <DistanceGuage
        class="col-4 q-pa-sm"
        :deviceid="roboStore.deviceid"
        :name="'distance to target'"
        :value="roboStore.distance"
        :color="roboStore.color"
      ></DistanceGuage>
    </q-card-section>
    <q-card-section>
      <GPSCoordinates
        :latitude="roboStore.position[0]"
        :longitude="roboStore.position[1]"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";
import MarkNumber from "components/robobuoy/status/MarkNumber.vue";
import GPSStatus from "components/robobuoy/status/GPSStatus.vue";
import CourseGuage from "components/generic/CourseGuage.vue";
import GPSCoordinates from "components/generic/GPSCoordinates.vue";
import DistanceGuage from "components/generic/DistanceGuage.vue";
export default {
  name: "GPSDashboard",
  props: {
    deviceid: {
      type: String,
      required: true,
    },
  },
  components: {
    MarkNumber,
    GPSStatus,
    CourseGuage,
    GPSCoordinates,
    DistanceGuage,
  },
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    return { roboStore };
  },
};
</script>

<style>
.rotated {
  transform: rotate(90deg);
}

.spin {
  animation-name: spin;
  animation-duration: 10000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
