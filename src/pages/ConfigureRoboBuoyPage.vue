<template>
  <q-page padding>
    <q-card
      flat
      bordered
      class="q-my-md"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
    >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ roboStore.name }}</div>
            <div class="text-caption">steering control and configure</div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="q-pa-md row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Course Control</div>
            <div class="text-caption">Set a Course and Thrust</div>
          </div>
        </div>

        <div class="q-pa-md">
          <q-btn-toggle
            :model-value="roboStore.active"
            @update:model-value="roboStore.setactive"
            push
            glossy
            toggle-color="primary"
            :options="[
              { label: 'Active', value: true },
              { label: 'Stop', value: false },
            ]"
          />

          <q-btn
            class="q-mx-md"
            @click="roboStore.resetcourse()"
            push
            glossy
            label="Reset Course"
            color="primary"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <div class="fit row q-pa-md">
          <div class="col-5 q-mr-md">Course °</div>
          <div class="col-6 q-mr-md">Thrust</div>

          <q-slider
            class="col-5 q-mr-md"
            :model-value="roboStore.desiredcourse"
            @update:model-value="roboStore.setdesiredcourse"
            :min="-180"
            :max="180"
            label
            :marker-labels="courseSliderMarkerLabel"
            color="green"
            thumb-size="35px"
          />

          <q-slider
            class="col-grow"
            :model-value="roboStore.surge"
            @update:model-value="roboStore.setsurge"
            :min="0"
            :max="50"
            label
            color="red"
            thumb-size="35px"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="q-pa-md row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Steering PID Settings</div>
            <div class="text-caption">
              Tune the PID controller for maximum capability
            </div>
          </div>
        </div>
        <div class="fit row q-pa-md">
          <q-badge class="col-2 q-mr-md" color="orange">
            Kp - proportional gain
          </q-badge>
          <q-slider
            class="col-grow"
            :model-value="roboStore.Kp"
            @update:model-value="roboStore.setKp"
            :min="0"
            :max="100"
            :step="1"
            label
            label-always
            color="indigo"
          ></q-slider>
        </div>
        <div class="fit row q-pa-md">
          <q-badge class="col-2 q-mr-md" color="deep-orange">
            Ki - integral gain
          </q-badge>
          <q-slider
            class="col-grow"
            :model-value="roboStore.Ki"
            @update:model-value="roboStore.setKi"
            :min="0"
            :max="10"
            :step="0.1"
            label
            label-always
            color="indigo"
          ></q-slider>
        </div>
        <div class="fit row q-pa-md">
          <q-badge class="col-2 q-mr-md" color="brown">
            Kd - differential gain
          </q-badge>
          <q-slider
            class="col-grow"
            :model-value="roboStore.Kd"
            @update:model-value="roboStore.setKd"
            :min="0"
            :max="10"
            :step="0.1"
            label
            label-always
            color="indigo"
          ></q-slider>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-pa-md row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Thruster Settings</div>
            <div class="text-caption">
              set the maximum thrust, steering sensitivity and the pwm where the
              motors being to rotate
            </div>
          </div>
        </div>
        <div class="fit row q-pa-md">
          <q-badge class="col-2 q-mr-md" color="indigo">
            Maximum thrust (cm/s)
          </q-badge>
          <q-slider
            class="col-grow"
            :model-value="roboStore.vmax"
            @update:model-value="roboStore.setvmax"
            :min="0"
            :max="500"
            :step="1"
            label
            label-always
            color="indigo"
          ></q-slider>
        </div>
        <div class="fit row q-pa-md">
          <q-badge class="col-2 q-mr-md" color="deep-purple">
            Steering sensetivity (gain)</q-badge
          >
          <q-slider
            class="col-grow"
            :model-value="roboStore.steergain"
            @update:model-value="roboStore.setsteergain"
            :min="1"
            :max="200"
            :step="1"
            label
            label-always
            color="deep-purple"
          />
        </div>
        <div class="fit row q-pa-md">
          <q-badge class="col-2 q-mr-md" color="purple">
            Left Minimum PWM to rotate</q-badge
          >
          <q-slider
            class="col-grow"
            :model-value="roboStore.mpl"
            @update:model-value="roboStore.setmpl"
            :min="1"
            :max="80"
            :step="1"
            label
            label-always
            color="purple"
          />
        </div>
        <div class="fit row q-pa-md">
          <q-badge class="col-2 q-mr-md" color="purple">
            Right Minimum PWM to rotate</q-badge
          >
          <q-slider
            class="col-grow"
            :model-value="roboStore.mpr"
            @update:model-value="roboStore.setmpr"
            :min="1"
            :max="80"
            :step="1"
            label
            label-always
            color="purple"
          />
        </div>

        <q-card-actions>
          <q-btn flat @click="roboStore.requeststate()">state</q-btn>
          <q-btn flat @click="roboStore.loadstate()">Load</q-btn>
          <q-btn flat @click="roboStore.savestate()">Save</q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useRoboStore } from "stores/roboStore";

export default {
  props: ["deviceid"],
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);

    return {
      roboStore,
      courseSliderMarkerLabel: { "-170": "-180°", 0: "0°", 170: "180°" },
      steerSliderMarkerLabel: { "-25": "left", 0: "strait", 25: "right" },
    };
  },

  name: "ConfigPage",
};
</script>
