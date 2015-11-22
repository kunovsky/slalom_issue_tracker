import React from 'react';
import _ from 'lodash';

import { Line as LineChart } from "react-chartjs";
import { messages } from '../../../../config/messages';
import AppActionCreator from '../../../../actions/AppActionCreator';

import { 
  chartDataOptions,
  chartConfigOptions
 } from '../../../../config/chart';

export default class Graph extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.controllTypes = ['days', 'weeks', 'months'];
    this.state = this._getInitialState();
  }

  render() {
    return (<div className="graph-component-container">
      {this.props.model.defects_count === 0 ?
        <div className="no-defects text-center"> {this._cms('no_defects')} </div>
        :
        <div>
          {this._createGraphControlls()}
          <LineChart data={this._createChartDataFromModel()} options={chartConfigOptions()} width="600" redraw height="400"/>
        </div>
      }
      
    </div>);
  }

  _getInitialState() {
    return {
      messages: messages(),
      chartDataOptions: chartDataOptions(),
      activeTimeInterval: this.controllTypes[0]
    }
  }

  _cms(message) {
    return this.state.messages['graph_component.' + message];
  }

  _createGraphControlls() {
    return this.controllTypes.map((type, idx) => {
      let classNames = 'label radius time-interval-controll color';
      let active = this.state.activeTimeInterval === type ? this.props.colorNumber : ' gray';
      return <div className={classNames + active}
                  onClick={this._updateActiveTimeInterval.bind(this, type)}
                  key={idx}> 
        {_.startCase(type)} 
      </div>;
    });
  }

  _updateActiveTimeInterval(type) {
    this.setState({
      activeTimeInterval: type
    });
  }

  _createChartDataFromModel() {
    return {
      labels: this._createLabels(),
      datasets: [this._createDataSets()]
    };
  }

  _createLabels(){
    return Object.keys(this._currentGraphData());
  }

  _currentGraphData() {
    return this.props.model.graph_data[this.state.activeTimeInterval];
  }

  _createDataSets() {
    const fill = this.state.chartDataOptions['fillColor' + this.props.colorNumber];
    const main = this.state.chartDataOptions['mainColor' + this.props.colorNumber];
      return {
      label: this.props.model.name,
      fillColor: fill,
      strokeColor: main,
      pointColor: main,
      pointStrokeColor: this.state.chartDataOptions.pointStrokeColor,
      pointHighlightFill: this.state.chartDataOptions.pointHighlightFill,
      pointHighlightStroke: main,
      data: this._createDataPoints()
    };
  }

  _createDataPoints() {
    let graphData = this._currentGraphData();
    return this._createLabels().map((label) => {
      return graphData[label];
    })
  }

}

Graph.contextTypes = {
  model: React.PropTypes.object.isRequired
};