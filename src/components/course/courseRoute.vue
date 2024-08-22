<template>
  <div class="fit row no-wrap">
    <div class="col-3 text-caption">course route:</div>
    <div class="col-10 text-caption text-weight-bold">
      {{ course.lap?.description }}
    </div>
  </div>
</template>

<script>
import { useCourse } from "src/stores/course";
const course = useCourse();

export default {
  name: "courseRoute",
  setup() {
    return { course };
  },
};
</script>
<style></style>
