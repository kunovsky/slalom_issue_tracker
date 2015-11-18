import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  ATTEMPT_LOGIN
}
from '../constants/AppConstants';

export default {

  attemptLogin(credentials) {
    AppDispatcher.dispatch({
      credentials: credentials,
      actionType: ATTEMPT_LOGIN
    });
  }
};
