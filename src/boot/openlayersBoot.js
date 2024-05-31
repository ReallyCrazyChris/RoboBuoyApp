import { boot } from "quasar/wrappers";
import OpenLayersMap from "vue3-openlayers";

// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  app.use(OpenLayersMap /* options */);
});
