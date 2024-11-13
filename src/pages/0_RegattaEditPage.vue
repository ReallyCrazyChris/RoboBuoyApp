<template>
  <q-page>
    <regattaEdit />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import regattaEdit from "src/components/regatta/regattaEdit.vue";

export default defineComponent({
  name: "RegattaEditPage",
  components: {
    regattaEdit,
  },
  setup() {
    return {};
  },
});
</script>
