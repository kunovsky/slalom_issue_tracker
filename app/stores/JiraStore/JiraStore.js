import EventEmmiter from 'events';
import _ from 'lodash';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import { fetchDefects } from '../../api/Defects/DefectsApi';
import { updateSlalomResourceInformation } from '../../api/Resources/SlalomResourcesApi';

import {
  FETCH_DEFECTS,
  ON_CHANGE,
  ON_ERROR,
  SET_CURRENT_PROJECT,
  SET_DEFECT_OVERLAY,
  REMOVE_DEFECT_OVERLAY,
  UPDATE_SLALOM_RESOURCE_INFORMATION
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

  getCurrentProject() {
    return _.findWhere(this._model.projects, {name: this._model.currentProject});
  }

  addChangeListener(listener) {
    this.on(ON_CHANGE, listener);
  }

  removeChangeListener(listener) {
    this.removeListener(ON_CHANGE, listener);
  }

  addErrorListener(listener) {
    this.on(ON_ERROR, listener);
  }

  removeErrorListener(listener) {
    this.removeListener(ON_ERROR, listener);
  }

  _fetchDefects(force=false) {
    const deferred = fetchDefects(force);

    deferred.done((response) => {
      this._model = response;
      const name = _.get(_.first(response.projects), 'name', '');
      this._setCurrentProject(name);
    });

    deferred.fail(() => {
      this.emit(ON_ERROR);
    });
  }

  _updateSlalomResourceInformation(formData) {
    let deferred = updateSlalomResourceInformation(formData);

    deferred.done(() => {
      this._fetchDefects(true);
    });

    deferred.fail(() => {
      this.emit(ON_ERROR);
    });
  }

  _setCurrentProject(name, colorNumber=0) {
    this._model.currentProject = name;
    this._model.colorNumber = colorNumber;
    this._model.defectOverlays = [];
    this.emit(ON_CHANGE);
  }

  _setDefectOverlay(name, colorNumber) {
    this._model.defectOverlays.push({
      name: name, colorNumber: colorNumber
    });
    this.emit(ON_CHANGE);
  }

  _removeDefectOverlay(name) {
    let defectOverlays = _.clone(this._model.defectOverlays);
    _.remove(defectOverlays, (o) => o.name === name);
    this._model.defectOverlays = defectOverlays;
    this.emit(ON_CHANGE);
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
      store._setDefectOverlay(action.name, action.colorNumber);
      break;
    case REMOVE_DEFECT_OVERLAY:
      store._removeDefectOverlay(action.name);
      break;
    case UPDATE_SLALOM_RESOURCE_INFORMATION:
      store._updateSlalomResourceInformation(action.formData);
      break;
    }
});

export default store;

