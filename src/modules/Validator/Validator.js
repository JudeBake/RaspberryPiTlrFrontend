import moment from 'moment';

export default {
  validateTimelapseName: outputName => outputName !== null && outputName !== '',
  validateTimelapseEnd: (timelapseEndDate, timelapseEndTime) => moment(timelapseEndDate)
    .hour(timelapseEndTime.HH).minute(timelapseEndTime.mm).diff(moment()) > 0,
};
