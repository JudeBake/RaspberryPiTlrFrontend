<template>
    <b-card no-body>
      <b-tabs card fill>
        <b-tab title="Live Feed" active>
          <LiveFeed width="1280" height="720"/>
        </b-tab>
        <b-tab title="Time-Lapse Recorder">
          <TimeLapseRecorder/>
        </b-tab>
      </b-tabs>
    </b-card>
</template>

<script>
import LiveFeed from './LiveFeed/LiveFeed.vue';
import TimeLapseRecorder from './TimeLapseRecorder/TimeLapseRecorder.vue';

export default {
  name: 'Home',
  components: {
    LiveFeed,
    TimeLapseRecorder,
  },
};
</script>
