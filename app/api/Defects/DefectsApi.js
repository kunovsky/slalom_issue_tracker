import $ from 'jquery';
import { config } from '../../config/config';

export function fetchDefects(force) {
  let options = {
    url: config().issues,
    type: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }
  
  if (force === true) {
    options.data = {force: true}
  }

  return $.ajax(options);
}