import moment from 'moment';

export default {
  validateTimelapseName: outputName => outputName !== null && outputName !== '',
  validateTimelapseEnd: timelapseEnd => moment(timelapseEnd).diff(moment()) > 0,
};
