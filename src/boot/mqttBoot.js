import { boot } from "quasar/wrappers";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

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

  const protocol = "wss";
  const host = "25ab1276ffc346f69df024afb2fb0f05.s1.eu.hivemq.cloud";
  const port = 8884;

  mqttHook.connect(`${protocol}://${host}:${port}/mqtt`, {
    clean: false,
    keepalive: 60,
    clientId: clientId,
    connectTimeout: 4000,
    username: "SummerTime",
    password: "RoboRegatta1!",
  });
});
