import React from 'react';
import { messages } from '../../config/messages';

export default class Header extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = this._getInitialState();
  }

  render() {
    return (<div className="header-component-container">
      <div className="row header-row">
        <h1 className="columns small-12">
            <span className="header-title">{this.state.messages['global.site_title']}</span>
        </h1>
      </div>
    </div>);
  }

  _getInitialState() {
    return {
      messages: messages()
    }
  }
}