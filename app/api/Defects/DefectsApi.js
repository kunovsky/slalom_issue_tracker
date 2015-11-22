import $ from 'jquery';
import { config } from '../../config/config';

export function fetchDefects() {
  return $.ajax({
    url: config().issues,
    type: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });
}