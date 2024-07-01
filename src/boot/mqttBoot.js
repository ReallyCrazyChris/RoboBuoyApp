import { boot } from "quasar/wrappers";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  const clientId = `${Math.random().toString(16).substring(2, 10)}`;

  console.log("Booting mqtt client:", clientId);

  const protocol = "wss";
  const host = "cbb90cade46d4ff38fdf18a5dc12c4be.s2.eu.hivemq.cloud";
  const port = 8884;

  mqttHook.connect(`${protocol}://${host}:${port}/mqtt`, {
    clean: false,
    keepalive: 60,
    clientId: clientId,
    connectTimeout: 4000,
    username: "test1",
    password: "TestPass",
  });
});
