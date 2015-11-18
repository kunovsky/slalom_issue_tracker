import React from 'react';
import AppActionCreator from '../../actions/AppActionCreator';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { messages } from '../../config/messages';


export default class Login extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);
  }

  componentWillMount() {

  }

  componentWillUnmount() {
   
  }

  render() {
    return (<div className="login-component-container">
      <Header />
      <div className="row">
        <div className="columns small-12 text-center">
          Here will go the content
        </div>
      </div>
      <Footer />
    </div>);
  }
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
};

