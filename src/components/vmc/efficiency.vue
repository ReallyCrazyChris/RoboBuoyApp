<template>
  <div class="row fit justify-start items-center">
    <div class="col-6">
      <div style="font-size: 10vmin">Efficiency:</div>
    </div>

    <div
      v-if="vmc.lon == 0 || vmc.lat == 0"
      class="col-6 text-center"
      style="font-size: 30vmin; line-height: 5rem"
    >
      -
    </div>
    <div
      v-else
      class="col-6 text-center"
      style="font-size: 30vmin; line-height: 5rem"
    >
      {{ vmc.efficiency }}
    </div>
  </div>
</template>

<script>
export default {
  name: "efficiencyView",
  props: ["vmc"],
  setup() {
    return {};
  },
};
</script>
