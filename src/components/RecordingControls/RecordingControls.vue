<template>
  <b-card title="Controls">
    <b-form>
      <b-form-group id="name-group" label="Time-Lapse Name" label-for="timelapse-name">
        <b-form-input
            id="timelapse-name"
            :state="isTimelapseNameValid"
            placeholder="Set a time-lapse name"
            v-model="timelapseName"/>
      </b-form-group>
      <b-form-group id="delay-frame-group" label="Delay between frames (s)" label-for="delay-frame">
        <b-form-input
            id="delay-frame"
            type="range"
            min="1"
            max="60"
            placeholder="Time Between Frames in seconds"
            v-model="frameDelay"/>
        <div class="mt-2">Value: {{ frameDelay }}</div>
      </b-form-group>
      <b-form-group id="timelapse-end-group" label="End Time Selection">
        <Datepicker format="YYYY-MM-DD H:i:s" v-model="timelapseEnd"/>
      </b-form-group>
      <b-button v-if="isTimelapseNameValid && isTimelapseEndValid"
          variant="success" @click="onRecord">REC</b-button>
    </b-form>
  </b-card>
</template>

<script>
import request from 'request';
import moment from 'moment';
// eslint-disable-next-line
import Datepicker from 'vuejs-datetimepicker';
import Validator from '../../modules/Validator/Validator';
import data from '../../data/data';

export default {
  name: 'RecordingControls',
  components: {
    Datepicker,
  },
  computed: {
    isTimelapseNameValid() {
      return Validator.validateTimelapseName(this.timelapseName);
    },
    isTimelapseEndValid() {
      return Validator.validateTimelapseEnd(this.timelapseEnd);
    },
  },
  data() {
    return {
      timelapseName: '',
      frameDelay: 1,
      timelapseEnd: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
  },
  methods: {
    onRecord: function onRecord() {
      // eslint-disable-next-line
      console.log('On Record');

      const totalFrameCount = this.calculateFrameCount();

      const recordRequest = {
        url: `${data.recorderApi.url}${data.recorderApi.paths.startRecording}`,
        method: 'PUT',
        json: { timelapseName: this.timelapseName, totalFrameCount, frameDelay: this.frameDelay },
      };

      request(recordRequest, (err, response, body) => {
        if (err) {
          // eslint-disable-next-line
          console.log(err);
          this.$emit('onStateChange', { state: data.recorderStateStrs.notConnected });
        } else {
          // eslint-disable-next-line
          console.log(`Recording request: ${body.result}`);
          this.$emit('onStateChange', { state: data.recorderStateStrs.recording });
        }
      });
    },
    calculateFrameCount: function calculateFrameCount() {
      const timelapseDuration = Math.round(moment(this.timelapseEnd).diff(moment()) / 1000);
      // eslint-disable-next-line
      console.log(`Time-lapse duration: ${timelapseDuration}`);

      const totalFrameCount = Math.round(timelapseDuration / this.frameDelay);
      // eslint-disable-next-line
      console.log(`Total frame count: ${totalFrameCount}`);

      return totalFrameCount;
    },
  },
};
</script>
