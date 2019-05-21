<template>
  <b-card no-body>
    <b-tabs card fill>
      <b-tab title="Live Feed" active>
        <LiveFeed :path="liveFeedPath" title="" :width="1280" :height="720"/>
      </b-tab>
      <b-tab title="Recording Interface">
        <RecordingUI v-on:onStateChange="onStateChange"/>
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
  computed: {
    liveFeedPath() {
      return `${data.recorderApi.url}${data.recorderApi.paths.liveFeed}`;
    },
  },
  methods: {
    onStateChange: function onStateChange(newState) {
      this.$emit('onStateChange', newState);
    },
  },
};
</script>
