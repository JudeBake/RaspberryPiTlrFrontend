export default {
  recorderStateStrs: {
    notConnected: 'Not Connected',
    idle: 'Idle',
    recording: 'Recording',
  },
  recorderStateMap: ['Not Connected', 'Idle', 'Recording'],
  recorderStateVariantMap: ['danger', 'success', 'warning'],
  recorderInfo: {
    name: 'Time-Lapse Recorder',
    ip: '192.168.1.22',
  },
  recorderApi: {
    url: 'http://192.168.1.22:5000',
    paths: {
      recorderState: '/state',
      liveFeed: '/video_feed',
      startRecording: '/recording/start',
      stopRecording: '/recording/stop',
      recordingProgess: '/recording/progess',
    },
  },
};
