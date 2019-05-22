<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <LiveFeed :path="liveFeedPath" title="Live Feed" :width="720" :height="480"/>
      </b-col>
      <b-col>
        <RecordingControls
            v-if="recorderStatus.state == 'Idle'"
            v-on:onStatusChange="onStatusChange"/>
        <RecorderProgress
            v-if="recorderStatus.state == 'Recording'"
            :recorderStatus="recorderStatus"/>
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
