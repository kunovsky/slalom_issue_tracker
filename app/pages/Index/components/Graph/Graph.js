import React from 'react';
import _ from 'lodash';

import { Line as LineChart } from 'react-chartjs';
import { messages } from '../../../../config/messages';

import {
  chartDataOptions,
  chartConfigOptions
 } from '../../../../config/chart';

export default class Graph extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.controllTypes = ['days', 'weeks', 'months'];
    this.allDefects = 'All Defects';
    this.state = this._getInitialState();
  }

  render() {
    return (<div className="graph-component-container">
      {this.props.model.defects_count === 0 ?
        <div className="no-defects text-center"> {this._cms('no_defects')} </div>
        :
        <div>
          <div className="columns small-12"> {this._cms('graph_title')} </div>
          {this._createGraphControlls()}
          <LineChart data={this._createChartDataFromModel()}
                     options={chartConfigOptions()}
                     width="600"
                     height="400"
                     redraw />
          <div className="columns small-12 legend-title"> {this._cms('legend_title')} </div>
          {this._createGraphLegend()}
        </div>
      }

    </div>);
  }

  _getInitialState() {
    return {
      messages: messages(),
      chartDataOptions: chartDataOptions(),
      activeTimeInterval: this.controllTypes[0]
    };
  }

  _cms(message) {
    return this.state.messages['graph_component.' + message];
  }

  _createGraphControlls() {
    return this.controllTypes.map((type, idx) => {
      let classNames = 'label radius time-interval-controll color';
      let active = this.state.activeTimeInterval === type ? this.props.colorNumber : ' gray';
      return (<div className={classNames + active}
                  onClick={this._updateActiveTimeInterval.bind(this, type)}
                  key={idx}>
        {_.startCase(type)}
      </div>);
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
      datasets: this._createDataSets()
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
    const graphData = this._currentGraphData();
    const overlays = this.props.defectOverlays;

    let dataSets = [this._createDataSet({
      fill: fill,
      main: main,
      graphData: graphData
    })];

    if (!_.isEmpty(overlays)) {
      _.each(overlays, (overlay) => {
        dataSets.push(this._createOverlay(overlay));
      });
    }
    return dataSets;
  }

  _createOverlay(overlay) {
    const fill = this.state.chartDataOptions['fillColor' + overlay.colorNumber];
    const main = this.state.chartDataOptions['mainColor' + overlay.colorNumber];
    const priorityData = _.findWhere(this.props.model.priority_graph_data, {
      name: overlay.name
    });
    const graphData = priorityData.graph_data[this.state.activeTimeInterval];

    return this._createDataSet({
      fill: fill,
      main: main,
      graphData: graphData
    });
  }

  _createDataSet(options) {
    return {
        fillColor: options.fill,
        strokeColor: options.main,
        pointColor: options.main,
        pointStrokeColor: this.state.chartDataOptions.pointStrokeColor,
        pointHighlightFill: this.state.chartDataOptions.pointHighlightFill,
        pointHighlightStroke: options.main,
        data: this._createDataPoints(options.graphData)
      };
  }

  _createDataPoints(graphData) {
    return this._createLabels().map((label) => {
      // If there is not a value for some reason
      // We need to show 0 so ChartJs can plot something
      return graphData[label] || 0;
    });
  }

  _createGraphLegend() {
    let legend = [{name: this.allDefects, colorNumber: this.props.colorNumber}];
    _.each(this.props.defectOverlays, (overlay) => {
      legend.push(overlay);
    });
    return legend.map((item, idx) => {
      return (<div key={idx}
                   className={'label legend-label radius color' + item.colorNumber}>
        {item.name}
      </div>);
    });
  }
}

Graph.propTypes = {
  model: React.PropTypes.object.isRequired,
  defectOverlays: React.PropTypes.array.isRequired,
  colorNumber: React.PropTypes.number.isRequired
};
