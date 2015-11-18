import React from 'react';

export default class Footer extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
  }

  render() {
    return (<footer>
      <div className="row">
        <div className="small-12 columns footer-text">Version 1 of Slalom Issue Tracker</div>
      </div>
    </footer>);
  }

}

