<template>
  <div color="row">
    <div class="col-12">
      <q-select
        :filled="!readonly"
        :readonly="readonly"
        dense
        label="timing and start sequence"
        v-model="raceTimer.timerSequenceModel"
        :options="raceTimer.timerSequeceOptions"
        color="primary"
        options-selected-class="text-deep-orange"
        @update:model-value="raceTimer.publishRaceTimerState()"
      >
        <template v-slot:selected>
          {{ raceTimer.timerSequenceModel.label }} :
          {{ raceTimer.timerSequenceModel.description }}
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="col-12 q-mt-sm">
      <q-select
        :filled="!readonly"
        :readonly="readonly"
        label="class"
        v-model="raceTimer.classFlagModel"
        :options="raceTimer.classFlagOptions"
        color="primary"
        options-selected-class="text-deep-orange"
        @update:model-value="raceTimer.publishRaceTimerState()"
      >
        <template v-slot:selected>
          {{ raceTimer.classFlagModel.label }}
          {{ raceTimer.classFlagModel.description }}
        </template>

        <template v-slot:append>
          <q-avatar square size="50px">
            <q-img :src="raceTimer.classFlagModel.image" />
          </q-avatar>
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-img :src="scope.opt.image" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="col-12 q-mt-sm">
      <q-select
        :filled="!readonly"
        :readonly="readonly"
        label="preparation flag"
        v-model="raceTimer.prepareFlagModel"
        :options="raceTimer.prepareFlagOptions"
        color="secondary"
        options-selected-class="text-deep-orange"
        @update:model-value="raceTimer.publishRaceTimerState()"
      >
        <template v-slot:selected>
          {{ raceTimer.prepareFlagModel.label }} :
          {{ raceTimer.prepareFlagModel.description }}
        </template>

        <template v-slot:append>
          <q-avatar square size="50px">
            <q-img :src="raceTimer.prepareFlagModel.image" />
          </q-avatar>
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-img :src="scope.opt.image" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="col-12 q-mt-sm">
      <q-select
        :filled="!readonly"
        :readonly="readonly"
        label="personal flotation device"
        v-model="raceTimer.yankeeFlagModel"
        :options="raceTimer.yankeeFlagOptions"
        color="yellow"
        options-selected-class="text-yellow"
        @update:model-value="raceTimer.publishRaceTimerState()"
      >
        <template v-slot:selected>
          {{ raceTimer.yankeeFlagModel.description }}
        </template>

        <template v-slot:append>
          <q-avatar square size="50px">
            <q-img :src="raceTimer.yankeeFlagModel.image" />
          </q-avatar>
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-img :src="scope.opt.image" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
import { useRegattaInfo } from "src/stores/regattaInfo";
import { useRaceTimer } from "src/stores/raceTimer";

const regattaInfo = useRegattaInfo();
const raceTimer = useRaceTimer();

export default {
  name: "regattaStartConditions",
  props: {
    readonly: Boolean,
  },
  setup(props) {
    return { regattaInfo, raceTimer };
  },

  computed: {
    localDateTime() {
      const date = new Date(regattaInfo.date);
      return date.toLocaleDateString();
    },
  },
};
</script>
