import $ from 'jquery';
import { config } from '../../config/config';

export function updateSlalomResourceInformation(formData) {
  return $.ajax({
    url: config().resources,
    type: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    data: formData
  });
}