<template>
  <b-card v-bind:title="title">
    <img :src="path" v-bind:width="width" v-bind:height="height" />
  </b-card>
</template>

<script>
export default {
  name: 'LiveFeedTab',
  props: {
    path: String,
    title: String,
    width: Number,
    height: Number,
  },
};
</script>
