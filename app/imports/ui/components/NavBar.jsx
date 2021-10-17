import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const navStyle = { border: '0', boxShadow: 'none' };
    return (
      <nav className="navbar navbar-light bg-white shadow py-3 sticky-top navbar-top">
        <a className="navbar-brand" href="#">
          <img className="mx-4" src="/images/logo.png" width="auto" height="auto" alt="logo"/>
        </a>

        {this.props.currentUser ? (
          [<ul className="navbar-side" id="navbarSide">
            <li className="navbar-side-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16" color="#5f5f5f">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
              <Link to="/userProfile" className="side-link">Profile</Link>
            </li>
            <li className="navbar-side-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16" color="#5f5f5f">
                <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z"/>
                <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
              </svg>
              <Link to="/signout" className="side-link" to="/signout">Sign Out</Link>
            </li>
          </ul>]
        ) : ''}

        {this.props.currentUser === '' ? ([
            <ul className="navbar-side" id="navbarSide">
              <li className="navbar-side-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16" color="#5f5f5f">
                  <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                  <path
                    d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
                </svg>
                <Link to="/signin" className="side-link">Sign In</Link>
              </li>
              <li className="navbar-side-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16" color="#5f5f5f">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <Link to="/signin" className="side-link" to="/signup">Sign Up</Link>
              </li>
            </ul>]
        ) : ''}

        <div className="overlay"></div>

        <button style={navStyle} className="navbar-toggler pull-xs-right mx-4" type="button" id="navbarSideButton">
          <img src="/images/hamburger-icon.png" width="30" height="30"/>
        </button>
      </nav>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
