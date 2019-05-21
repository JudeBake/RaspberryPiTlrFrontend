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
import request from 'request';
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
  created: function created() {
    const recorderStateRequest = {
      url: `${data.recorderApi.url}${data.recorderApi.paths.recorderState}`,
      method: 'GET',
      json: true,
    };

    request(recorderStateRequest, (err, response, body) => {
      // eslint-disable-next-line
      console.log(body);
      if (err) {
        // eslint-disable-next-line
        console.log(err);
        this.$bvToast.toast(`Unable to connect to recorder at ${this.recorderIp}`, {
          title: 'Connection Error',
          variant: 'danger',
          autoHideDelay: 10000,
        });
      } else {
        // eslint-disable-next-line
        console.log(`POST /state response: ${body.state}`);
        this.$emit('onStateChange', body.state);
      }
    });
  },
};
</script>
