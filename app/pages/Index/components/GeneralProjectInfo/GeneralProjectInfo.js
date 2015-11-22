import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import { messages } from '../../../../config/messages';
import AppActionCreator from '../../../../actions/AppActionCreator';


export default class GeneralProjectInfo extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = this._getInitialState();
  }

  render() {
    return (<div className="general-project-info-component">
      {this._createGeneralProjectInfo()}
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

  _createGeneralProjectInfo() {
    return this.props.model.projects.map((project, idx) => {

      const classNames = cx("project-name label radius color" + idx,{
        'active': this.props.model.currentProject === project.name
      });

      return <div className={classNames}
                  onClick={this._showDataForProject.bind(this, project.name, idx)}
                  key={idx}>
        {_.trunc(project.name, 21)} - {project.defects_count} 
      </div>
    });
  }

  _showDataForProject(name, colorNumber) {
    AppActionCreator.setCurrentProject(name, colorNumber);
  }
}

GeneralProjectInfo.contextTypes = {
  model: React.PropTypes.object.isRequired
};

