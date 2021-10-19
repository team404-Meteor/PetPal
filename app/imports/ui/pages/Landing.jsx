import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap';

// test
/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {
    const text = {
      fontSize: 43,
      textAlign: 'center',
    };
    return (
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
              <p className="pt-0 small-font">Already have an account? <Link className="text-custom-color" to="/signin">Sign in</Link></p>
              <Link className="btn btn-custom3" to="/signup">Sign Up</Link><br/>
          </div>
        </div>
      </div>

    );
  }
}

export default Landing;
