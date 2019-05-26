<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <LiveFeed :path="liveFeedPath" title="Live Feed"/>
      </b-col>
      <b-col>
        <RecordingControls
            v-if="recorderStatus.state == 'Idle'"
            :recorderWebSocket="recorderWebSocket"/>
        <RecorderProgress
            v-if="recorderStatus.state == 'Recording'"
            :recorderStatus="recorderStatus"
            :recorderWebSocket="recorderWebSocket"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LiveFeed from '../LiveFeed/LiveFeed.vue';
import RecordingControls from '../RecordingControls/RecordingControls.vue';
import RecorderProgress from '../RecordingProgress/RecordingProgress.vue';
import data from '../../data/data';

export default {
  name: 'RecordingUI',
  components: {
    LiveFeed,
    RecordingControls,
    RecorderProgress,
  },
  props: {
    recorderWebSocket: Object,
    recorderStatus: Object,
  },
  computed: {
    liveFeedPath() {
      return `${data.recorderApi.url}${data.recorderApi.paths.liveFeed}`;
    },
  },
};
</script>
