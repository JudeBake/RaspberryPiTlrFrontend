<template>
  <b-card title="Controls">
    <b-form>
      <b-form-group id="name-group" label="Time-Lapse Name" label-for="timelapse-name">
        <b-form-input
            id="timelapse-name"
            :state="isTimelapseNameValid"
            placeholder="Set a time-lapse name"
            @input="restrictSpaceSpecial"
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
        <Datepicker
            class="text-center"
            placeholder="Select Date"
            v-model="timelapseEndDate">
        </Datepicker>
        <VueTimepicker class="mt-2" :minute-interval="5" v-model="timelapseEndTime"/>
      </b-form-group>
      <b-button v-if="isTimelapseNameValid && isTimelapseEndValid"
          variant="success" @click="onRecord">REC</b-button>
    </b-form>
  </b-card>
</template>

<script>
import moment from 'moment';
// eslint-disable-next-line
import Datepicker from 'vuejs-datepicker';
// eslint-disable-next-line
import VueTimepicker from 'vuejs-timepicker'
import Validator from '../../modules/Validator/Validator';

export default {
  name: 'RecordingControls',
  components: {
    Datepicker,
    VueTimepicker,
  },
  props: {
    recorderWebSocket: Object,
  },
  computed: {
    isTimelapseNameValid() {
      return Validator.validateTimelapseName(this.timelapseName);
    },
    isTimelapseEndValid() {
      return Validator.validateTimelapseEnd(this.timelapseEndDate, this.timelapseEndTime);
    },
    timelapseEnd() {
      return moment(this.timelapseEndDate).hour(this.timelapseEndTime.HH)
        .minute(this.timelapseEndTime.mm);
    },
  },
  data() {
    return {
      timelapseName: '',
      frameDelay: 1,
      timelapseEndDate: moment().format(),
      timelapseEndTime: { HH: moment().format('HH'), mm: moment().format('mm') },
    };
  },
  methods: {
    restrictSpaceSpecial: function restrictSpaceSpecial(e) {
      this.timelapseName = e.replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },
    onRecord: function onRecord() {
      // eslint-disable-next-line
      console.log('On Record');

      const timelapseInfo = {
        name: this.timelapseName,
        capturingEndTime: this.timelapseEnd.format('YYYY-MM-DD HH:mm:00'),
        frameDelay: this.frameDelay,
      };

      this.recorderWebSocket.emit('startRecording', timelapseInfo, (response) => {
        if (response.result === 'success') {
          this.fireSuccessToast(response.message);
        } else {
          this.fireFailureToast(response.message);
        }
      });
    },
    fireSuccessToast: function fireSuccessToast(message) {
      this.$bvToast.toast(message, {
        title: 'Success',
        variant: 'success',
        autoHideDelay: 10000,
      });
    },
    fireFailureToast: function fireFailureToast(message) {
      this.$bvToast.toast(message, {
        title: 'Failure',
        variant: 'danger',
        autoHideDelay: 10000,
      });
    },
  },
};
</script>
