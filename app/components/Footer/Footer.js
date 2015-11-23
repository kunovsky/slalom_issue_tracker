import React from 'react';
import { messages } from '../../config/messages';

export default class Footer extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = this._getInitialState();
  }

  render() {
    return (<footer>
      <div className="row">
        <div className="small-12 columns footer-text">{this._cms('version')}</div>
      </div>
    </footer>);
  }

  _getInitialState() {
    return {
      messages: messages()
    };
  }

  _cms(message) {
    return this.state.messages['footer.' + message];
  }
}
