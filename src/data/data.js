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
      liveFeed: '/video_feed',
      downloads: '/downloads',
    },
  },
};
