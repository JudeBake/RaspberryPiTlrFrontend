<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <LiveFeed :path="liveFeedPath" title="Live Feed" :width="720" :height="480"/>
      </b-col>
      <b-col>
        <RecordingControls v-on:onStateChange="onStateChange"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LiveFeed from '../LiveFeed/LiveFeed.vue';
import RecordingControls from '../RecordingControls/RecordingControls.vue';
import data from '../../data/data';

export default {
  name: 'RecordingUI',
  components: {
    LiveFeed,
    RecordingControls,
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
