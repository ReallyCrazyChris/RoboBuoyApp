<template>
  <div class="row fit justify-start items-center">
    <div class="col-6" style="font-size: 10vmin">SOG:</div>
    <div class="col-6 text-center" style="font-size: 30vmin; line-height: 5rem">
      {{ vmc.vmc }}
    </div>
  </div>
</template>

<script>
export default {
  name: "sogView",
  props: ["vmc"],
  setup() {
    return {};
  },
};
</script>
