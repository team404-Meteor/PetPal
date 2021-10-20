import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Link, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap';

// test
/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {
    return (
      <div>
        {this.props.currentUser ? ([
          <div className="container pt-lg-5 py-2 my-5 px-5">
            <div className="row py-lg-5 my-lg-5 justify-content-center">
              <div className="col-lg-4 col-md-7 col-12 text-center">
                <div className="col-lg-8 col-md-12 col-8 text-center mx-auto text-center h-100 position-relative">
                  <div className="row pb-3 justify-content-center">
                    <div className="col mx-auto">
                      <img src="/images/home-dog.png" className="img-fluid"></img>
                    </div>
                  </div>
                  <div className="row pb-5 justify-content-center">
                    <div className="col mb-5 text-center">
                      <Link to="/listPets" className="stretched-link">VIEW PETS</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-7 col-12 text-center">
                <div className="col-lg-8 col-md-12 col-7 text-center mx-auto text-center h-100 position-relative">
                  <div className="row pb-3 justify-content-center">
                    <div className="col mx-auto">
                      <img src="/images/home-cat.png" className="img-fluid"></img>
                    </div>
                  </div>
                  <div className="row pb-5 justify-content-center">
                    <div className="col mb-5 text-center">
                      <Link to="/add" class="stretched-link">LIST A PET</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-7 col-12 text-center">
                <div className="col-lg-8 col-md-12 col-7 text-center mx-auto text-center h-100 position-relative">
                  <div className="row pb-3 justify-content-center">
                    <div className="col mx-auto">
                      <img src="/images/home-other.png" className="img-fluid"></img>
                    </div>
                  </div>
                  <div className="row pb-5 justify-content-center">
                    <div className="col text-center">
                      <Link to="/learn" className="stretched-link">LEARN MORE</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>]
        ) : ''}
        {this.props.currentUser === '' ? ([
          <div className="container pt-4 py-2 my-2 px-5">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-11 pt-lg-0 mt-lg-0 mt-xl-3 mt-5">
                <img src="/images/home.png" />
              </div>
            </div>
            <div className="row justify-content-center pb-2">
              <div className="col-lg-6 col-12 text-center">
                <p style={{ textAlign: 'center' }}>PetPal serves to ensure that our furry friends will never have to experience life in a shelter. Looking to rehome your pet? Looking for a new companion?
                  <br />
                  PetPal is for you.
                </p>
                <p className="pt-0 small-font">
                  Already have an account?
                  <Link className="text-custom-color" to="/signin">Sign in</Link>
                </p>
                <Link className="btn btn-custom3" to="/signup">Sign Up</Link><br />
              </div>
            </div>
          </div>]
        ) : ''}
      </div>
    );
  }
}

// Declare the types of all properties.
Landing.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const LandingRoute = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(LandingRoute);

