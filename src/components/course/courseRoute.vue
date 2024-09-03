<template>
  <div class="">
    {{ course.lap.description }}
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
