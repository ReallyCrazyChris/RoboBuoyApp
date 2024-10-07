import { boot } from "quasar/wrappers";
import { useRegattaInfo } from "src/stores/regattaInfo";
import { useRegattaEvent } from "src/stores/regattaEvent";

import { useRaceTimer } from "src/stores/raceTimer";
import { useRaceCourse } from "src/stores/raceCourse";
import { useVmc } from "src/stores/vmc";

import { useMQTT } from "mqtt-vue-hook";

function getClientId() {
  "creates and return a unique client id for the device";
  let clientId = localStorage.getItem("clientId");

  if (!clientId) {
    clientId = `${Math.random().toString(16).substring(2, 10)}`;
    localStorage.setItem("clientId", clientId);
  }

  return clientId;
}

// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  const clientId = getClientId();

  console.log("Booting mqtt client:", clientId);

  const regattainfo = useRegattaInfo();
  const regattaevent = useRegattaEvent();
  const racecourse = useRaceCourse();
  const raceTimer = useRaceTimer();
  const vmc = useVmc();

  const mqttHook = useMQTT();

  const protocol = "wss";
  const host = "25ab1276ffc346f69df024afb2fb0f05.s1.eu.hivemq.cloud";
  const port = 8884;

  // listen for the latest racetimer state
  mqttHook.registerEvent("regattainfo", (topic, message) => {
    const patch = JSON.parse(message.toString());
    regattainfo.$patch(patch);
  });

  mqttHook.registerEvent("joinregatta", (topic, message) => {
    const particiant = JSON.parse(message.toString());

    console.log("joinRegatta", particiant);

    regattaevent.joinRegatta(particiant);
  });

  // listen for the latest course state
  mqttHook.registerEvent("racecourse", (topic, message) => {
    const patch = JSON.parse(message.toString());
    racecourse.$patch(patch);
  });

  // listen for the latest racetimer state
  mqttHook.registerEvent("racetimer", (topic, message) => {
    const patch = JSON.parse(message.toString());
    raceTimer.$patch(patch);
  });

  // listen for the latest racetransition action
  mqttHook.registerEvent("racetransition", (topic, message) => {
    const action = message.toString();
    raceTimer.racetransitionHandler(action);
  });

  // listen for the latest vmc state
  mqttHook.registerEvent("vmc", (topic, message) => {
    const patch = JSON.parse(message.toString());
    vmc.$patch(patch);
  });

  // after a sucessfull mqtt connection subscribe
  mqttHook.registerEvent(
    "on-connect", // mqtt status: on-connect, on-reconnect, on-disconnect, on-connect-fail
    (topic, message) => {
      console.log("mqtt connected", topic, message);
      mqttHook.subscribe(
        [
          "regattainfo",
          "joinregatta",
          "racecourse",
          "racetimer",
          "racetransition",
          "vmc",
        ],
        1,
        { nl: true },
        (err, granted) => {}
      );
    },
    "string_key"
  );

  mqttHook.connect(`${protocol}://${host}:${port}/mqtt`, {
    clean: false,
    keepalive: 60,
    clientId: clientId,
    connectTimeout: 400,
    username: "SummerTime",
    password: "RoboRegatta1!",
  });
});
