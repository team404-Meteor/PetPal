import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap';

// test
/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {
    return (
      <div className="container py-2 my-5 px-5">
        <div className="row px-lg-5 px-lg-5 py-lg-5 my-lg-5">
          <div className="col-md-3 col-8 text-center mx-auto text-center h-100 position-relative">
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

          <div className="col-md-3 col-7 text-center mx-auto text-center h-100 position-relative">
            <div className="row pb-3 justify-content-center">
              <div className="col mx-auto">
                <img src="/images/home-cat.png" className="img-fluid"></img>
              </div>
            </div>
            <div className="row pb-5 justify-content-center">
              <div className="col mb-5 text-center">
                <Link to="/testAdd" class="stretched-link">LIST A PET</Link>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-8 text-center mx-auto text-center h-100 position-relative">
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
    );
  }
}

export default Landing;
