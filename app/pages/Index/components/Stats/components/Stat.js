import React from 'react';
import { messages } from '../../../../../../config/messages';

export default class Stat extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = this._getInitialState();
  }

  render() {
    return (<div className="stat-component">

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