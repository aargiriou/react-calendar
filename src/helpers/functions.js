import moment from 'moment';
import { DATE_FORMAT } from './constants';

function getToday() {
  return moment().format(DATE_FORMAT);
}

export {
  getToday
};
