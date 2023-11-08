<template>
  <q-card
    flat
    bordered
    square
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-10">
        <MarkNumber :number="roboStore.number"></MarkNumber>
        <q-toolbar-title>{{ roboStore.name }} GPS </q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="col-2">
        <q-space />
        <GPSStatus :positionvalid="roboStore.positionvalid" />
      </q-toolbar>
    </div>

    <q-card-section
      class="fit row wrap justify-start items-start content-start"
    >
      <div class="col-12 text-subtitle2">
        course, bearing and distance to the next waypoint
      </div>

      <CourseGuage
        class="col-4 q-pa-sm"
        :deviceid="roboStore.deviceid"
        :name="' course'"
        :value="roboStore.currentcourse"
        :color="roboStore.color"
      ></CourseGuage>
      <CourseGuage
        class="col-4 q-pa-sm"
        :deviceid="roboStore.deviceid"
        :name="' bearing'"
        :value="roboStore.desiredcourse"
        :color="roboStore.color"
      ></CourseGuage>
      <DistanceGuage
        class="col-4 q-pa-sm"
        :deviceid="roboStore.deviceid"
        :name="'meters'"
        :value="roboStore.distance"
        :color="roboStore.color"
      ></DistanceGuage>

      <GPSCoordinates
        class="col-12"
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
