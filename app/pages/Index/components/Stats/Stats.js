import React from 'react';
import _ from 'lodash';
import Stat from './components/Stat/Stat';
import { messages } from '../../../../config/messages';
import { DefectStatTypes } from '../../../../constants/enums/DefectStatTypes';

export default class Stats extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = this._getInitialState();
  }

  render() {
    const defectsCount = _.get(this.props.model, 'defects_count');
    return (<div className="stats-component">
      {
        defectsCount === 0 ?
        null
        :
        this._buildStats()
      }
    </div>);
  }

  _getInitialState() {
    return {
      messages: messages()
    };
  }

  _cms(message) {
    return this.state.messages['graph_component.' + message];
  }

  _buildStats() {
    return DefectStatTypes.map((type, idx) => {
     return (<div className="columns small-6 medium-3 stat-container"
                  key={idx}>
      <Stat model={_.get(this.props.model, type.key)}
            prefix={type.prefix}
            title={type.title}/>
    </div>);
    });
  }
}

Stats.propTypes = {
  model: React.PropTypes.object.isRequired
};
