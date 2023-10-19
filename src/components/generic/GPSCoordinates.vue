<template>
  <div class="fit row wrap justify-start items-start content-start">
    <q-field class="col-6 self-center" label="Latitude" stack-label dense>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">
          {{ latitude }}
        </div>
      </template>
    </q-field>
    <q-field class="col-6 self-center" label="Longitude" stack-label dense>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">
          {{ longitude }}
        </div>
      </template>
    </q-field>
  </div>
</template>

<script>
export default {
  name: "GPSCoordinates",
  props: ["latitude", "longitude"],
  setup() {
    return {};
  },
};
</script>
