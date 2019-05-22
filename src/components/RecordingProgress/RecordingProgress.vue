<template>
  <b-card title="Progress">
    <h2 v-if="recorderStatus.progress">{{ recorderStatus.progress.recordingStep }}</h2>
    <b-progress
        v-if="displayProgressBar"
        :value="recorderStatus.progress.value"
        :max="maxStillCaptureProgess"
        animated>
    </b-progress>
    <b-spinner v-else variant="primary"/>
  </b-card>
</template>

<script>
export default {
  name: 'RecordingProgress',
  props: {
    recorderStatus: Object,
  },
  computed: {
    displayProgressBar() {
      return this.recorderStatus.progress && this.recorderStatus.progress.recordingStep === 'Capturing Frames';
    },
  },
  data() {
    return {
      maxStillCaptureProgess: 100,
    };
  },
};
</script>
