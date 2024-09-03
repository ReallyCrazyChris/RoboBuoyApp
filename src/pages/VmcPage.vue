<template>
  <q-page>
    <q-card flat>
      <q-card-section>
        <sogview />
      </q-card-section>

      <q-card-section>
        <vmcview />
      </q-card-section>

      <q-card-section>
        <efficiencyview />
      </q-card-section>

      <q-card-section>
        <pinVmcBuoylocation />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import sogview from "src/components/boat/sog.vue";
import vmcview from "src/components/boat/vmc.vue";
import efficiencyview from "src/components/boat/efficiency.vue";
import pinVmcBuoylocation from "src/components/boat/pinVmcBuoyLocation.vue";

import { useGps } from "src/stores/gps";
import { useVmc } from "src/stores/vmc";
const gps = useGps();
const vmc = useVmc();

export default defineComponent({
  name: "VmcPage",
  components: { sogview, vmcview, efficiencyview, pinVmcBuoylocation },
  setup() {
    return { gps, vmc };
  },
});
</script>
