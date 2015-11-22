import EventEmmiter from 'events';
import _ from 'lodash';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import {
  fetchDefects
} from '../../api/Defects/DefectsApi';

import {
  FETCH_DEFECTS,
  ON_CHANGE,
  ERROR_EVENT,
  SET_CURRENT_PROJECT,
  SET_DEFECT_OVERLAY,
  REMOVE_DEFECT_OVERLAY
}
from '../../constants/AppConstants';

class JiraStore extends EventEmmiter {

  constructor() {
    super();
    this._model = {};
  }

  getJiraData() {
   return this._model;
  }

  getCurrentGraphData() {
    return _.findWhere(this._model.projects, {name: this._model.currentProject});
  }

  addChangeListener(listener) {
    this.on(ON_CHANGE, listener);
  }

  removeChangeListener(listener) {
    this.removeListener(ON_CHANGE, listener);
  }

  addErrorListener(listener) {
    this.on(ERROR_EVENT, listener);
  }

  removeErrorListener(listener) {
    this.removeListener(ERROR_EVENT, listener);
  }

  _fetchDefects() {
    const deferred = fetchDefects();

    deferred.done((response) => {
      this._model = response;
      const name = _.get(_.first(response.projects), 'name', '');
      this._setCurrentProject(name);      
    });

    deferred.fail(() => {
      this.emit(ON_ERROR);
    });
  }

  _formatResponseData(response) {
    this._model.generalProjectInfo = this._generateGeneralProjectInfo(response);
  }

  _setCurrentProject(name, colorNumber=0) {
    this._model.currentProject = name;
    this._model.colorNumber = colorNumber;
    this._model.defectOverlays = null;
    this.emit(ON_CHANGE);
  }

  _setDefectOverlay(name) {

  }

  _removeDefectOverlay(name) {

  }
}

let store = new JiraStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case FETCH_DEFECTS:
      store._fetchDefects();
      break;
    case SET_CURRENT_PROJECT:
      store._setCurrentProject(action.name, action.colorNumber);
      break;
    case SET_DEFECT_OVERLAY:
      store._setDefectOverlay(action.name);
      break;
    case REMOVE_DEFECT_OVERLAY:
      store._removeDefectOverlay(action.name);
      break;
    }
});

export default store;

