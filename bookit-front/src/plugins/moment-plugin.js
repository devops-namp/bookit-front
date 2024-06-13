import moment from 'moment';

export default {
  install(app) {
    app.config.globalProperties.$moment = moment;
  }
};