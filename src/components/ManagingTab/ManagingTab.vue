<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <LiveFeed :path="liveFeedPath" title="Live Feed"/>
      </b-col>
      <b-col>
        <ManagingControls :recorderWebSocket="recorderWebSocket"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LiveFeed from '../LiveFeed/LiveFeed.vue';
import ManagingControls from '../ManagingControls/ManagingControls.vue';
import data from '../../data/data';

export default {
  name: 'ManagingTab',
  components: {
    LiveFeed,
    ManagingControls,
  },
  props: {
    recorderWebSocket: Object,
  },
  computed: {
    liveFeedPath() {
      return `${data.recorderApi.url}${data.recorderApi.paths.liveFeed}`;
    },
  },
};
</script>
