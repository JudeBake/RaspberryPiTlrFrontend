<template>
  <b-card no-body>
    <b-tabs card fill>
      <b-tab title="Live Feed" active>
        <LiveFeed :path="liveFeedPath" title=""/>
      </b-tab>
      <b-tab title="Recording">
        <RecordingTab
            :recorderWebSocket="recorderWebSocket"
            :recorderStatus="recorderStatus"/>
      </b-tab>
      <b-tab title="Managing">
        <ManagingTab :recorderWebSocket="recorderWebSocket"/>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import LiveFeed from '../LiveFeed/LiveFeed.vue';
import RecordingTab from '../RecordingTab/RecordingTab.vue';
import ManagingTab from '../ManagingTab/ManagingTab.vue';
import data from '../../data/data';

export default {
  name: 'RecorderControls',
  components: {
    LiveFeed,
    RecordingTab,
    ManagingTab,
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
