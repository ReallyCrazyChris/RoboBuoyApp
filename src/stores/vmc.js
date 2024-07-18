import { defineStore } from "pinia";
import { useGps } from "src/stores/gps";
import LatLon from "geodesy/latlon-spherical.js";
import { useMQTT } from "mqtt-vue-hook";

const mqttHook = useMQTT();

const gps = useGps();

export const vmcStoreDefinition = defineStore("vmc", {
  state: () => ({
    sog: 0,
    vmc: 0,
    efficiency: 0,
    bearing: 0,
    distance: 0,
    lon: 0,
    lat: 0,
  }),

  actions: {
    // update the VMC data using the latest GPS data

    setCoordinates(lon, lat) {
      this.lon = lon;
      this.lat = lat;

      if (mqttHook.isConnected) {
        console.log("publishVMCCoordinates", this.lon, this.lat);
        mqttHook.publish(
          "vmc",
          JSON.stringify({
            lon: this.lon,
            lat: this.lat,
          }),
          0,
          { retain: true }
        );
      }
    },

    update(lon, lat, heading, sog) {
      const p1 = new LatLon(lat, lon);
      const p2 = new LatLon(this.lat, this.lon);

      this.bearing = p1.initialBearingTo(p2);
      this.distance = Math.round(p1.distanceTo(p2));

      var delta = this.bearing - heading;
      // normalize the angles
      delta = delta % 360;
      if (delta < 0) {
        delta += 360;
      }

      const delta_rad = (delta * Math.PI) / 180.0;

      this.sog = Math.round(19.4384 * sog) / 10;

      const vmc = Math.round(19.4384 * sog * Math.cos(delta_rad)) / 10;

      if (!isNaN(vmc)) {
        this.vmc = vmc;
      } else {
        this.vmc = 0;
      }

      const efficiency = Math.round(100 * (this.vmc / (1.94384 * sog))) || 0;

      if (!isNaN(efficiency)) {
        this.efficiency = efficiency;
      } else {
        this.efficiency = 0;
      }
    },

    publishVmcState() {
      if (mqttHook.isConnected) {
        mqttHook.publish(
          "vmc",
          JSON.stringify({
            lon: this.lon,
            lat: this.lat,
          }),
          0,
          { retain: true }
        );
      }
    },
  },
});

const vmc = vmcStoreDefinition();

mqttHook.registerEvent("vmc", (topic, message) => {
  const patch = JSON.parse(message.toString());
  console.log("patch vmc", patch);
  vmc.$patch(patch);
});

gps.$subscribe(() => {
  vmc.update(gps.lon, gps.lat, gps.heading, gps.sog);
});

gps.watchPosition();

export const useVmc = () => {
  return vmc;
};
