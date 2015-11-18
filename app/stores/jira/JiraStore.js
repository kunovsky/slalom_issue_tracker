import EventEmmiter from 'events';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import {
  attemptLogin
} from '../../api/Login/LoginApi';

import {
  ATTEMPT_LOGIN,
  ERROR_EVENT
}
from '../../constants/AppConstants';

class JiraStore extends EventEmmiter {

  constructor() {
    super();
  }

  addErrorListener(listener) {
    this.on(ERROR_EVENT, listener);
  }

  removeErrorListener(listener) {
    this.removeListener(ERROR_EVENT, listener);
  }

  _login() {

  }
}

let store = new JiraStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ATTEMPT_LOGIN:
      store._login(action.credentials);
      break;
    }
});

export default store;

