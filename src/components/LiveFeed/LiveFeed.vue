<template>
  <b-card v-bind:title="title">
    <b-img :src="path" fluid-grow/>
  </b-card>
</template>

<script>
export default {
  name: 'LiveFeedTab',
  props: {
    path: String,
    title: String,
  },
};
</script>
