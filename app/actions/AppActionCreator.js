import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  FETCH_DEFECTS,
  SET_CURRENT_PROJECT,
  SET_DEFECT_OVERLAY,
  REMOVE_DEFECT_OVERLAY,
  UPDATE_SLALOM_RESOURCE_INFORMATION
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
  },

  updateSlalomResourceInformation(formData) {
    AppDispatcher.dispatch({
      actionType: UPDATE_SLALOM_RESOURCE_INFORMATION,
      formData: formData
    });
  },

  setDefectOverlay(name, colorNumber) {
    AppDispatcher.dispatch({
      actionType: SET_DEFECT_OVERLAY,
      name: name,
      colorNumber: colorNumber
    });
  },

  removeDefectOverlay(name) {
    AppDispatcher.dispatch({
      actionType: REMOVE_DEFECT_OVERLAY,
      name: name
    });
  }
};
