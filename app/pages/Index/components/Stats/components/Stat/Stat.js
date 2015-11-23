import React from 'react';
import CountTo from 'react-count-to';
import { messages } from '../../../../../../config/messages';

export default class Stat extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = this._getInitialState();
  }

  render() {
    return (<div className="stat-component">
      <div className="stat-title"> {this.props.title} </div>
      <span> {this.props.prefix} </span>
      <CountTo to={this.props.model} speed={1000} />
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
}