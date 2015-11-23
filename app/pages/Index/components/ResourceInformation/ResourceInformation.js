/*eslint camelcase:0*/

import React from 'react';
import _ from 'lodash';
import AppActionCreator from '../../../../actions/AppActionCreator';
import LoadingWave from '../../../../components/LoadingWave/LoadingWave';
import { messages } from '../../../../config/messages';

export default class ResourceInformation extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = this._getInitialState();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading === true && nextProps.loading === false) {
      this.setState({loading: false});
    }
    this._refreshForm(nextProps.model);
  }

  render() {
    return (<div className="resource-information-component">
    {
      this.state.loading ?
      <div>
      <h3> {this._cms('updating_information')} </h3>
      <LoadingWave />
      </div>
      :
      <div>
        <h5> {this._cms('need_info')} </h5>
        <form onSubmit={this._updateSlalomResourceInformation.bind(this)}>
          {this._buildFormInputsFromModel()}
          <button className={'button round color' + this.props.colorNumber}
                  type="submit">
            {this._cms('update')}
          </button>
        </form>
      </div>
    }
    </div>);
  }

  _getInitialState() {
    return {
      messages: messages(),
      loading: false,
      resources: this._createResourceObjects(this.props.model)
    };
  }

  _cms(message) {
    return this.state.messages['resource_information.' + message];
  }

  _buildFormInputsFromModel() {
    return this.props.model.map((email, idx) => {
      return (<div className="resource-input"
                  key={idx}>
        <div className="columns small-12 medium-4">
          <label>
            {this._cms('email')}
          </label>
          <input name={'email' + idx}
                 type="email"
                 value={email}
                 disabled />
        </div>
        <div className="columns small-12 medium-4">
          <label>
            {this._cms('name')}
          </label>
          <input name={'name' + idx}
                 type="text"
                 ref={'name' + idx}
                 onChange={this._updateModel.bind(this, idx, 'name')}
                 required />
        </div>
        <div className="columns small-12 medium-4">
          <label>
            {this._cms('hourly_rate')}
          </label>
          <input name={'hourly_rate' + idx}
                 type="number"
                 ref={'hourly_rate' + idx}
                 step="1"
                 onChange={this._updateModel.bind(this, idx, 'hourly_rate')}
                 required/>
        </div>
      </div>);
    });
  }

  _refreshForm(model) {
    _.each(this.refs, (ref) => {
      ref.getDOMNode().value = '';
    });

    this.setState({
      resources: this._createResourceObjects(model)
    });
  }

  _updateSlalomResourceInformation(event) {
    event.preventDefault();
    this.setState({loading: true});
    AppActionCreator.updateSlalomResourceInformation(this._formatResourceObjects());
  }

  _updateModel(idx, type, event) {
    let resources = _.clone(this.state.resources);

    resources[idx][type] = event.target.value;
    this.setState({
      resources: resources
    });
  }

  _createResourceObjects(props) {
    let resourceObjects = {};

    _.each(props, (email, idx) => {
      resourceObjects[idx] = {email: email};
    });
    return resourceObjects;
  }

  _formatResourceObjects() {
    let resourceObjects = [];

    _.each(this.state.resources, (resource) => {
      resourceObjects.push({
        email: resource.email,
        name: resource.name,
        hourly_rate: resource.hourly_rate
      });
    });
    return {resources: JSON.stringify(resourceObjects)};
  }
}

ResourceInformation.propTypes = {
  model: React.PropTypes.object.isRequired,
  colorNumber: React.PropTypes.number.isRequired
};

