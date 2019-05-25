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
    ip: '192.168.1.18',
  },
  recorderApi: {
    url: 'http://192.168.1.18:5000',
    paths: {
      recorderStatus: '/status',
      liveFeed: '/video_feed',
      startRecording: '/recording/start',
      stopRecording: '/recording/stop',
      recordingProgess: '/recording/progess',
    },
  },
};
