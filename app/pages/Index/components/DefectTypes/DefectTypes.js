import React from 'react';
import _ from 'lodash';
import { messages } from '../../../../config/messages';
import { DefectLabels } from '../../../../constants/enums/DefectLabels';
import AppActionCreator from '../../../../actions/AppActionCreator';


export default class DefectTypes extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = this._getInitialState();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.model.name !== nextProps.model.name) {
      this.setState({selected: []});
    }
  }

  render() {
    return (<div className="defect-types-component text-left">
      {
        this.props.model.defects_count === 0 ?
        null
        :
        <div>
          {this._createDefetTypeHeaders()}
          {this._createDefectTypeInfo()}
        </div>
      }
    </div>);
  }

  _getInitialState() {
    return {
      messages: messages(),
      selected: []
    };
  }

  _cms(message) {
    return this.state.messages['defect_types.' + message];
  }

  _createDefetTypeHeaders() {
    return DefectLabels.map((label, idx) => {
      return (<div className="columns small-4 defect-type-label"
                   key={idx}>
        {label.title}
      </div>);
    });
  }

  _createDefectTypeInfo() {
    return this.props.model.priority_data.map((priority, idx) => {
      return (<div key={idx}>
        <div className="columns small-4 priority-data-column">
          <span className={'label radius priority-label color' + idx}>
            {_.trunc(priority.name, 12)}
          </span>
        </div>
        <div className="columns small-4 priority-data-column">
          {priority.defect_count}
        </div>
        <div className="columns small-4 priority-data-column">
          <span className={'label radius priority-label overlay color' + idx}
                onClick={this._overlayGraph.bind(this, priority.name, idx)}>
            {this._cms('overlay')}
          </span>
        </div>
      </div>);
    });
  }

  _overlayGraph(name, idx) {
    let selected = _.clone(this.state.selected);

    if (selected.indexOf(name) < 0){
      selected.push(name);
      AppActionCreator.setDefectOverlay(name, idx);
    }
    else {
      _.remove(selected, (s) => s === name);
      AppActionCreator.removeDefectOverlay(name);
    }
    this.setState({
      selected: selected
    });
  }
}

DefectTypes.propTypes = {
  model: React.PropTypes.object.isRequired,
  colorNumber: React.PropTypes.number.isRequired
};

