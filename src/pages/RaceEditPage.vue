<template>
  <q-page>
    <regattaEdit />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import regattaEdit from "src/components/race/regattaEdit.vue";

export default defineComponent({
  name: "RegattaPage",
  components: {
    regattaEdit,
  },
  setup() {
    return {};
  },
});
</script>
