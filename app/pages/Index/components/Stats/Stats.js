import React from 'react';
import _ from 'lodash';
// import Stat from './components/Stat/Stat';
import { messages } from '../../../../config/messages';
import { DefectStatTypes } from '../../../../constants/enums/DefectStatTypes';

export default class Stats extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = this._getInitialState();
  }

  render() {
    return (<div className="stats-component">
      {this._buildStats()}
    </div>);
  }

  _getInitialState() {
    return {
      messages: messages()
    }
  }

  _cms(message) {
    return this.state.messages['graph_component.' + message];
  }

  _buildStats() {
    return DefectStatTypes.map((type) => {
     return <div className="columns small-3"> {type.title} </div>
    });
  }
}

Stats.contextTypes = {
  model: React.PropTypes.object.isRequired
};

