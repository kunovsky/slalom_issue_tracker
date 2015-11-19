import React from 'react';
import _ from "lodash";
import { Line as LineChart } from "react-chartjs";
import AppActionCreator from '../../actions/AppActionCreator';
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

  }

  componentWillUnmount() {
   
  }

  render() {
    const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
    const chartOptions = {};
    return (<div className="index-component-container">
      <Header />
      <div className="row">
        <div className="columns small-12 text-center">
          { _.isEmpty(this.state.model) ?
            <LoadingWave />
            :
            <LineChart data={chartData} options={chartOptions}/>
          }
        </div>
      </div>
      <Footer />
    </div>);
  }

  _getInitialState() {
    return {
      messages: messages(),
      model: JiraStore.getJiraData()
    }
  }
}

Index.contextTypes = {
  router: React.PropTypes.func.isRequired
};

