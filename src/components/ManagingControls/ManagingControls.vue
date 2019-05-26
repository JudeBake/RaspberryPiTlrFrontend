<template>
  <b-card>
    <b-row class="justify-content-md-center">
      <b-col col lg="3">
        <h4 class="text-left">Time-Lapse List</h4>
      </b-col>
      <b-col col lg="1">
        <b-button class="is-small" variant="outline-dark" @click="updateTimelapseList">
          <font-awesome-icon icon="sync-alt"/>
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <TimelapseList
          :recorderWebSocket="recorderWebSocket"
          :timelapses="timelapses"
          v-on:updateTimelapseList="updateTimelapseList"/>
    </b-row>
  </b-card>
</template>

<script>
import TimelapseList from '../TimelapseList/TimelapseList.vue';

export default {
  name: 'ManagingControls',
  components: {
    TimelapseList,
  },
  props: {
    recorderWebSocket: Object,
  },
  created() {
    this.updateTimelapseList();
  },
  data() {
    return {
      timelapses: [],
    };
  },
  methods: {
    updateTimelapseList: function updateTimelapseList() {
      // eslint-disable-next-line
      console.log(`On update timelapse list`);
      this.recorderWebSocket.emit('getTimelapseList', (list) => {
        this.timelapses = list.timelapses;
      });
    },
  },
};
</script>
