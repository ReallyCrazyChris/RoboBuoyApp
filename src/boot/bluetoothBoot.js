import { boot } from "quasar/wrappers";
import { $bluetooth } from "src/networking/bluetooth";
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  app.config.globalProperties.$bluetooth = $bluetooth;
});
