import $ from 'jquery';
import { config } from '../../config/config';

export function attemptLogin(credentials) {
  return $.ajax({
    url: config().login,
    type: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    data: {
      password: credentials.password,
      email: credentials.email
    }
  });
}