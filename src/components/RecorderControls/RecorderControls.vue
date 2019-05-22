<template>
  <b-card no-body>
    <b-tabs card fill>
      <b-tab title="Live Feed" active>
        <LiveFeed :path="liveFeedPath" title="" :width="1280" :height="720"/>
      </b-tab>
      <b-tab title="Recording Interface">
        <RecordingUI :recorderStatus="recorderStatus" v-on:onStatusChange="onStatusChange"/>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import LiveFeed from '../LiveFeed/LiveFeed.vue';
import RecordingUI from './RecordingUI.vue';
import data from '../../data/data';

export default {
  name: 'RecorderControls',
  components: {
    LiveFeed,
    RecordingUI,
  },
  props: {
    recorderStatus: Object,
  },
  computed: {
    liveFeedPath() {
      return `${data.recorderApi.url}${data.recorderApi.paths.liveFeed}`;
    },
  },
  methods: {
    onStatusChange: function onStatusChange(newStatus) {
      this.$emit('onStatusChange', newStatus);
    },
  },
};
</script>
