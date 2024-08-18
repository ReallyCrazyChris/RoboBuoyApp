import { boot } from "quasar/wrappers";
import { useRaceTimer } from "src/stores/raceTimer";

// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  const raceTimer = useRaceTimer();
  // sequcene timer is a service that permanently runs in the background
  raceTimer.startSequenceTimer();
});
