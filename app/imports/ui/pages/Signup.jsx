import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Button } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    const square = { width: 360, height: 360 };
    return (
      
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-10 mt-5 px-5 py-3 rounded shadow text-center">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-5 text-center">
                <img src="/images/signin-signup.png"></img>
              </div>
              <div className="col-12 text-center pt-3">
                <h1>Sign Up</h1>
                <hr />
              </div>
              <Form onSubmit={this.submit} >
                <div className="form">
                  <div className="col-12 text-left pt-3">
                    <label>Email</label>
                    <Form.Input className="form-control py-3 mt-1 text-input"
                      id="signin-form-email"
                      name="email"
                      type="email"
                      onChange={this.handleChange} />
                  </div>
                  <div className="col-12 text-left pt-3">
                    <label>Password</label>
                    <Form.Input className="form-control py-3 mt-1 text-input"
                      id="signin-form-password"
                      name="password"
                      type="password"
                      onChange={this.handleChange} />
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

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
