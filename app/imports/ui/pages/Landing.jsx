import React from 'react';
import 'bootstrap/dist/css/bootstrap';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="container py-2 my-5">
        <div className="row px-kg-5 py-lg-5 my-lg-5">
          <div className="col-md-2 col-12 text-center mx-auto text-center h-100">
            <div class="row pb-5 justify-content-center">
              <div class="col mx-auto">
                <img src="/images/home-dog.png" className="img-fluid"></img>
              </div>
            </div>
            <div class="row pb-5 justify-content-center">
              <div class="col text-center">
                VIEW PETS
              </div>
            </div>
          </div>
          
          <div className="col-md-2 col-12 text-center mx-auto text-center h-100">
            <div class="row pb-5 justify-content-center">
              <div class="col mx-auto">
                <img src="/images/home-bunny1.png" className="img-fluid"></img>
              </div>
            </div>
            <div class="row pb-5 justify-content-center">
              <div class="col text-center">
                LIST A PET
              </div>
            </div>
          </div>
          
          <div className="col-md-2 col-12 text-center mx-auto text-center h-100">
            <div class="row pb-5 justify-content-center">
              <div class="col mx-auto">
                <img src="/images/home-bunny.png" className="img-fluid"></img>
              </div>
            </div>
            <div class="row pb-5 justify-content-center">
              <div class="col text-center">
                LEARN MORE
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
