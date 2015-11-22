import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  FETCH_DEFECTS,
  SET_CURRENT_PROJECT,
  SET_DEFECT_OVERLAY,
  REMOVE_DEFECT_OVERLAY
}
from '../constants/AppConstants';

export default {

  fetchDefects() {
    AppDispatcher.dispatch({
      actionType: FETCH_DEFECTS
    });
  },

  setCurrentProject(name, colorNumber) {
    AppDispatcher.dispatch({
      actionType: SET_CURRENT_PROJECT,
      name: name,
      colorNumber: colorNumber
    });
  }
};
