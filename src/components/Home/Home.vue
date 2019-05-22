<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <RecorderInfo :recorderState="recorderStatus.state"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <RecorderControls
            v-if="recorderStatus.state !== 'Not Connected'"
            :recorderStatus="recorderStatus"
            v-on:onStatusChange="onStatusChange"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// eslint-disable-next-line
import { clearInterval, setInterval } from 'timers';
import request from 'request';
import RecorderInfo from '../RecorderInfo/RecorderInfo.vue';
import RecorderControls from '../RecorderControls/RecorderControls.vue';
import data from '../../data/data';

export default {
  name: 'Home',
  components: {
    RecorderInfo,
    RecorderControls,
  },
  created() {
    this.getStatus();
    this.statusUpdateTimer = setInterval(this.getStatus, 1000);
  },
  beforeDestroy() {
    clearInterval(this.statusUpdateTimer);
  },
  data() {
    return {
      recorderStatus: { state: data.recorderStateStrs.notConnected },
      statusUpdateTimer: null,
    };
  },
  methods: {
    getStatus: function getStatus() {
      const recorderStateRequest = {
        url: `${data.recorderApi.url}${data.recorderApi.paths.recorderStatus}`,
        method: 'GET',
        json: true,
      };

      request(recorderStateRequest, (err, response, body) => {
        // eslint-disable-next-line
        console.log(body);
        if (err) {
          // eslint-disable-next-line
          console.log(err);
          this.fireNotConnectedToast();
          this.recorderStatus.state = data.recorderStateStrs.notConnected;
        } else {
          // eslint-disable-next-line
          console.log(`POST /state response: ${body.state}`);
          this.recorderStatus = body;
        }
      });
    },
    onStatusChange: function onStatusChange(newStatus) {
      // eslint-disable-next-line
      console.log('Connected to recorder receiving info');
      this.recorderStatus = newStatus;
      if (newStatus.state === data.recorderStateStrs.notConnected) {
        this.fireNotConnectedToast();
      }
    },
    fireNotConnectedToast: function fireNotConnectedToast() {
      this.$bvToast.toast(`Unable to connect to recorder at ${this.recorderIp}`, {
        title: 'Connection Error',
        variant: 'danger',
        autoHideDelay: 10000,
      });
    },
  },
};
</script>
