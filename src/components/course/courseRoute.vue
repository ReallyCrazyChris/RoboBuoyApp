<template>
  <div class="">
    {{ course.lap.description }}
  </div>
</template>

<script>
import { useRaceCourse } from "src/stores/raceCourse";
const course = useRaceCourse();

export default {
  name: "courseRoute",
  setup() {
    return { course };
  },
};
</script>
