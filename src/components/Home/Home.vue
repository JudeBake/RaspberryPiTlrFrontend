<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <RecorderInfo :recorderState="recorderState" v-on:onStateChange="onStateChange"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <RecorderControls
            v-if="recorderState !== 'Not Connected'"
            v-on:onStateChange="onStateChange"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecorderInfo from '../RecorderInfo/RecorderInfo.vue';
import RecorderControls from '../RecorderControls/RecorderControls.vue';
import data from '../../data/data';

export default {
  name: 'Home',
  components: {
    RecorderInfo,
    RecorderControls,
  },
  data() {
    return {
      recorderState: data.recorderStateStrs.notConnected,
    };
  },
  methods: {
    onStateChange: function onStateChange(newState) {
      // eslint-disable-next-line
      console.log('Connected to recorder receiving info');
      this.recorderState = newState;
    },
  },
};
</script>
