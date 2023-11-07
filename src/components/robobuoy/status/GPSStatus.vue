<template>
  <q-btn v-if="positionvalid" flat round dense color="green" icon="gps_fixed"
    ><q-tooltip class="bg-dark" anchor="top middle" self="bottom middle"
      >GPS Available</q-tooltip
    ></q-btn
  >
  <q-btn v-else dense round color="red" icon="gps_not_fixed">
    <q-tooltip
      class="bg-dark"
      color="green"
      anchor="top middle"
      self="bottom middle"
      >No GPS</q-tooltip
    >
  </q-btn>
</template>

<script>
export default {
  name: "GPSStatus",
  props: ["positionvalid"],
  setup() {
    return {};
  },
};
</script>
