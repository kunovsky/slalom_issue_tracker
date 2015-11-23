import React from 'react';
import CountTo from 'react-count-to';
import { messages } from '../../../../../../config/messages';

export default class Stat extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = this._getInitialState();
    this.speed = 1000;
  }

  render() {
    return (<div className="stat-component">
      <div className="stat-title"> {this.props.title} </div>
      <span> {this.props.prefix} </span>
      <CountTo to={this.props.model} speed={this.speed} />
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
}

Stat.propTypes = {
  title: React.PropTypes.string.isRequired,
  prefix: React.PropTypes.string.isRequired,
  model: React.PropTypes.number.isRequired
};
