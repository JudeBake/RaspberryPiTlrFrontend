<template>
  <div>
    <img src="http://192.168.1.22:8000/stream.mjpg" v-bind:width="width" v-bind:height="heigh" />
  </div>
</template>

<script>
export default {
  name: 'LiveFeedTab',
  props: {
    width: Number,
    height: Number,
  },
};
</script>
