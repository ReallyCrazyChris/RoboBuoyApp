import { decodeTransformer } from "src/networking/decode";
import { encode } from "src/networking/encode";
import { useRoboStore } from "src/stores/roboStore";
import { useDevicesStore } from "src/stores/devicesStore";

const bleNusServiceUUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const bleNusCharRXUUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const bleNusCharTXUUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
const MTU = 20;

let utf8decoder = new TextDecoder();
let devicesStore = useDevicesStore();

function pair() {
  if (!navigator.bluetooth) {
    console.log(
      "WebBluetooth API is not available.\r\n" +
        "Please make sure the Web Bluetooth flag is enabled."
    );
    return;
  }

  navigator.bluetooth
    .requestDevice({
      filters: [{ services: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"] }],
      optionalServices: [bleNusServiceUUID],
    })
    .then((device) => {
      connect(device);
    });
}

function reconnect() {
  console.log("reconnecting devices");

  // get the devices previosly paired
  navigator.bluetooth.getDevices().then(async (paireddevices) => {
    for (const device of paireddevices) {
      // when you see the device's advertisement then connect to it
      device.addEventListener(
        "advertisementreceived",
        async (event) => {
          connect(event.device);
        },
        { once: true }
      );

      try {
        await device.watchAdvertisements();
      } catch (error) {
        console.log(error);
      }
    }
  });
}

function connect(device) {
  console.log("connect", device);

  // when the device disconnects or is out of range remove it
  device.addEventListener(
    "gattserverdisconnected",
    async (event) => {
      console.log("Device disconnected itself", event.target);
      devicesStore.removedevice(event.target);
    },
    { once: true }
  );

  device.gatt
    .connect()
    .then((server) => {
      //console.log("Locate NUS service");
      return server.getPrimaryService(bleNusServiceUUID);
    })
    .then((service) => {
      //console.log("Locate RX characteristic");
      service.getCharacteristic(bleNusCharRXUUID).then((rxCharacteristic) => {
        device.rxCharacteristic = rxCharacteristic;
      });

      service.getCharacteristic(bleNusCharTXUUID).then((txCharacteristic) => {
        //console.log("Enable notifications");
        txCharacteristic.startNotifications();

        // decode the bencoded packet to a message and handle it
        const bencode_decoder = decodeTransformer((message) => {
          const robobuoyStore = useRoboStore(device.id);
          robobuoyStore.messageHandler(message);
        });

        // listen for received packets
        txCharacteristic.addEventListener(
          "characteristicvaluechanged",
          (event) => {
            const packet = utf8decoder.decode(event.target.value);
            console.log("eventdata", packet);
            bencode_decoder(packet, "utf-8");
          }
        );

        devicesStore.adddevice(device);
        console.log("\r\n" + device.name + " Connected.");
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function disconnect(device) {
  if (device && device.gatt && device.gatt.connected) {
    console.log("disconnecting", device.name, device.id);
    device.gatt.disconnect();
    devicesStore.removedevice(device);
  }
}

function send(device, data) {
  if (device && device.gatt.connected) {
    var buffer = encode(data);
    for (var i = 0; i <= buffer.byteLength; i = i + MTU) {
      device.rxCharacteristic
        .writeValue(buffer.slice(i, i + MTU))
        .then((resolve) => {
          setTimeout(resolve, 100);
        });
    }
  } else {
    console.log("Not connected to a device yet.");
  }
}

export const $bluetooth = {
  pair,
  reconnect,
  connect,
  disconnect,
  send,
};
