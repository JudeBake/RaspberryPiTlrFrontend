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
            :recorderWebSocket="recoderWebSocket"
            :recorderStatus="recorderStatus"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// eslint-disable-next-line
import io from 'socket.io-client';
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
    this.recoderWebSocket = io.connect(data.recorderApi.url);
    this.recoderWebSocket.on('statusUpdate', (newStatus) => { this.recorderStatus = newStatus; });
    this.recoderWebSocket.on('disconnect', () => {
      this.recorderStatus = { state: data.recorderStateStrs.notConnected };
      this.fireDisconnectedToast();
    });
  },
  data() {
    return {
      recorderStatus: { state: data.recorderStateStrs.notConnected },
      statusUpdateTimer: null,
      recoderWebSocket: null,
    };
  },
  methods: {
    fireDisconnectedToast: function fireDisconnectedToast() {
      this.$bvToast.toast(`Disconnected from the recorder at ${this.recorderIp}`, {
        title: 'Connection Error',
        variant: 'danger',
        autoHideDelay: 10000,
      });
    },
  },
};
</script>
