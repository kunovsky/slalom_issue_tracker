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
    this._model = {};
  }

  getJiraData() {
    return [
    {title: 'Defect 1'},
    {title: 'Defect 2'},
    {title: 'Defect 3'},
    {title: 'Defect 4'},
    {title: 'Defect 5'},
    {title: 'Defect 6'},
    ];
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

