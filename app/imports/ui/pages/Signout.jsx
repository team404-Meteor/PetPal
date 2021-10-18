import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <div id="signout-page" className="container-fluid px-5 my-5">
        <div class="row justify-content-center pt-5 mt-5">
          <div class="col-8 text-center">
            <img src="/images/goodbye.png"></img>
          </div>
        <div class="row justify-content-center">
          <div class="col-12 text-center pt-4">
            <h1>You have signed out.</h1>
            Return <Link to="/">Home.</Link>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

