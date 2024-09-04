<template>
  <q-page>
    <raceEdit />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import raceEdit from "src/components/race/raceEdit.vue";

export default defineComponent({
  name: "RegattaPage",
  components: {
    raceEdit,
  },
  setup() {
    return {};
  },
});
</script>
