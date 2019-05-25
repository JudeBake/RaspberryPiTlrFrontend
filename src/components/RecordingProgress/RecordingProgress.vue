<template>
  <b-card title="Progress">
    <h2>
      {{ recorderStatus.timelapseInfo.progress.recordingStep }}
      "{{ recorderStatus.timelapseInfo.name}}" Time-Lapse
    </h2>
    <h3 v-if="displayProgressBar">
      Recording End Time: {{ recorderStatus.timelapseInfo.capturingEndTime }}
    </h3>
    <b-progress
        v-if="displayProgressBar"
        :max="maxStillCaptureProgess"
        :value="capturingProgress" animated>
    </b-progress>
    <b-spinner v-else variant="primary"/>
    <b-button
        v-if="displayProgressBar"
        class="mt-2" variant="danger"
        v-b-modal.stopOptions>
      STOP
    </b-button>
    <b-modal id="stopOptions" title="Process or Discrad ?">
      <template slot="default">
        <p>Do you want to process or discard the captured frames?</p>
      </template>
      <template slot="modal-footer">
        <b-button variant="danger" @click="onDiscard">Discard</b-button>
        <b-button variant="success" @click="onProcess">Process</b-button>
      </template>
    </b-modal>
  </b-card>
</template>

<script>
export default {
  name: 'RecordingProgress',
  props: {
    recorderStatus: Object,
    recorderWebSocket: Object,
  },
  computed: {
    displayProgressBar() {
      return this.recorderStatus.timelapseInfo.progress.recordingStep === 'Capturing';
    },
    capturingProgress() {
      return Math.round((this.calculateRunningTime()
        / this.recorderStatus.timelapseInfo.progress.totalRecordingTime * 100));
    },
  },
  data() {
    return {
      maxStillCaptureProgess: 100,
    };
  },
  methods: {
    calculateRunningTime() {
      return this.recorderStatus.timelapseInfo.progress.totalRecordingTime
        - this.recorderStatus.timelapseInfo.progress.remainingTime;
    },
    onProcess: function onProcess() {
      // eslint-disable-next-line
      console.log('On Process');
      this.$bvModal.hide('stopOptions');
      this.recorderWebSocket.emit('stopAndProcess');
    },
    onDiscard: function onDiscard() {
      // eslint-disable-next-line
      console.log('On Discard');
      this.$bvModal.hide('stopOptions');
      this.recorderWebSocket.emit('stopAndDiscard');
    },
  },
};
</script>
