<template>
  <q-page>
    <raceInfoEdit />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import raceInfoEdit from "src/components/timer/raceInfoEdit.vue";

export default defineComponent({
  name: "RegattaPage",
  components: {
    raceInfoEdit,
  },
  setup() {
    return {};
  },
});
</script>
