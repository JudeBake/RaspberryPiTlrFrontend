<template>
  <b-card>
    <b-row>
      <b-col>
        <h1><b-badge :variant="recorderStateVariant">{{ recorderState }}</b-badge></h1>
      </b-col>
      <b-col>
        <h1>{{ recorderName }}</h1>
      </b-col>
      <b-col>
        <h1>{{ recorderIp }}</h1>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import data from '../../data/data';

export default {
  name: 'RecorderInfo',
  props: {
    recorderState: String,
  },
  computed: {
    recorderName() {
      return data.recorderInfo.name;
    },
    recorderIp() {
      return data.recorderInfo.ip;
    },
    recorderStateVariant() {
      return data.recorderStateVariantMap[data.recorderStateMap.indexOf(this.recorderState)];
    },
  },
};
</script>
