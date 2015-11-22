import React from 'react';
import _ from "lodash";
import AppActionCreator from '../../actions/AppActionCreator';
import Graph from './components/Graph/Graph';
import GeneralProjectInfo from './components/GeneralProjectInfo/GeneralProjectInfo';
import Stats from './components/Stats/Stats';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoadingWave from '../../components/LoadingWave/LoadingWave';
import JiraStore from '../../stores/JiraStore/JiraStore';
import { messages } from '../../config/messages';


export default class Index extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = this._getInitialState();
  }

  componentWillMount() {
    JiraStore.addChangeListener(this._updateMode.bind(this));
    JiraStore.addErrorListener(this._displayFetchError.bind(this));
    AppActionCreator.fetchDefects();
  }

  componentWillUnmount() {
   JiraStore.removeChangeListener(this._updateMode.bind(this));
   JiraStore.removeErrorListener(this._displayFetchError.bind(this));
  }

  // TODO - set inverval to ask to update data ever minute

  render() {
    return (<div className="index-component-container">
      <Header />
      {
        this.state.currentMessage ?
        <h3> {this.state.currentMessage} </h3>
        :
        null
      }

      <div className="row">
        <div className="columns small-12 text-center">
          { _.isEmpty(this.state.model) ?
            <div>
              <h3 className="loading-message"> {this._cms('loading')} </h3>
              <LoadingWave />
            </div>
            :
            <div>
              <div className={"current-project-title"}> 
                <span className={"label radius color" + this.state.model.colorNumber}>
                  {this.state.model.currentProject}
                </span>
              </div>
              <div className="columns small-9">
                <Graph model={this.state.currentGraphData}
                       colorNumber={this.state.model.colorNumber}/>
              </div>
              <div className="columns small-3">
                <GeneralProjectInfo model={this.state.model} />
              </div>
              <div className="columns small-9 end">
                <Stats model={this.state.model} />
              </div>
            </div>
          }
        </div>
      </div>
      <Footer />

    </div>);
  }

  _getInitialState() {
    return {
      messages: messages(),
      model: JiraStore.getJiraData(),
      currentGraphData: JiraStore.getCurrentGraphData(),
      currentMessage: ''
    }
  }

  _updateMode() {
    this.setState({
      model: JiraStore.getJiraData(),
      currentGraphData: JiraStore.getCurrentGraphData()
    });
  }

  _displayFetchError() {
    this.setState({
      currentMessage: this._cms('error')
    });
  }

  _cms(message) {
    return this.state.messages['index.' + message];
  }

}

Index.contextTypes = {
  router: React.PropTypes.func.isRequired
};

