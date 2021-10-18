import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment, Button } from 'semantic-ui-react';

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
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from} />;
    }
    const square = { width: 360, height: 360 };
    // Otherwise return the Login form.
    return (
      <div className="container-fluid pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-10 mt-5 px-5 py-3 rounded shadow text-center">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-5 text-center">
                <img src="/images/signin-signup.png"></img>
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
                      onChange={this.handleChange} ><input className="form-control py-3 mt-1 text-input"/></Form.Input>
                  </div>
                  <div className="col-12 text-left pt-3">
                    <label>Password</label>
                    <Form.Input
                      id="signin-form-password"
                      name="password"
                      type="password"
                      onChange={this.handleChange} ><input className="form-control py-3 mt-1 text-input"/></Form.Input>
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
      /*
      <Container id="signin-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={3}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
                Login to your account
            </Header>
            <Form onSubmit={this.submit} >
              <Segment id={'segment-background'} textAlign="center" style={square} circular>
                <Form.Input
                  size={'huge'}
                  label="Email"
                  id="signin-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  size={'huge'}
                  label="Password"
                  id="signin-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Button className={'btn-custom'}>Submit</Button>
                <p className={'paragraph'}>
                  Click <Link id={'salmon-pink-text'} to="/signup"><u>HERE</u></Link> to Register
                </p>
              </Segment>
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
          </Grid.Column>
        </Grid>
      </Container>*/
    );
  }
}

// Ensure that the React Router location object is available in case we need to redirect.
Signin.propTypes = {
  location: PropTypes.object,
};
