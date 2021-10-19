import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Form, Message } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  // Initialize component state with properties for login and redirection.
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  // Update the form controls each time the user interacts with them.
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  // Handle Signin submission using Meteor's account mechanism.
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  // Render the signin form.
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from} />;
    }
    // Otherwise return the Login form.
    return (
      <div className="container-fluid pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-10 mt-5 px-5 py-3 rounded shadow text-center">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-5 text-center">
                <img src="/images/signin-signup.png" alt={'paw logo'}/>
              </div>
              <div className="col-12 text-center pt-3">
                <h1>Sign In</h1>
                <hr />
              </div>
              <Form onSubmit={this.submit} >
                <div className="form">
                  <div className="col-12 text-left pt-3">
                    <label>Email</label>
                    <Form.Input 
                      id="signin-form-email"
                      name="email"
                      type="email"
                      onChange={this.handleChange} ><input className="form-control mt-1 py-3 text-input"/></Form.Input>
                  </div>
                  <div className="col-12 text-left pt-3">
                    <label>Password</label>
                    <Form.Input 
                      id="signin-form-password"
                      name="password"
                      type="password"
                      onChange={this.handleChange} ><input className="form-control mt-1 py-3 text-input"/></Form.Input>
                    <p className="caption">Need to create an account? Sign up <Link to="/signup">here.</Link></p>
                  </div>
                  <div className="col-12 text-center pt-3">
                    <button className="btn btn-custom">Submit</button>
                  </div>
                </div>
              </Form>
              {this.state.error === '' ? (
                ''
              ) : (
                <Message
                  error
                  header="Login was not successful"
                  content={this.state.error}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Ensure that the React Router location object is available in case we need to redirect.
Signin.propTypes = {
  location: PropTypes.object,
};
