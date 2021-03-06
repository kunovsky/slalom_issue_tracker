import React from 'react';

export default class LoadingWave extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
  }

  render() {
    return (<div className="sk-wave">
      <div className="sk-rect sk-rect1"></div>
      <div className="sk-rect sk-rect2"></div>
      <div className="sk-rect sk-rect3"></div>
      <div className="sk-rect sk-rect4"></div>
      <div className="sk-rect sk-rect5"></div>
    </div>);
  }
}

