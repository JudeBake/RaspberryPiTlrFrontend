<template>
    <b-card no-body>
      <b-tabs card fill>
        <b-tab title="Live Feed" active>
          <LiveFeed/>
        </b-tab>
        <b-tab title="Time-Lapse Recorder">
          Prout 2
        </b-tab>
      </b-tabs>
    </b-card>
</template>

<script>
import LiveFeed from './LiveFeed.vue';

export default {
  name: 'Home',
  components: {
    LiveFeed,
  },
};
</script>
