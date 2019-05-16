<template>
  <div>
    <LiveFeed width="720" height="480"/>
  </div>
</template>

<script>
import LiveFeed from '../LiveFeed/LiveFeed.vue';

export default {
  name: 'TimeLapseRecorder',
  components: {
    LiveFeed,
  },
};
</script>
