import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
<<<<<<< Updated upstream
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

        <Grid.Column width={4}>
          <Image size='small' circular src="/images/meteor-logo.png"/>
        </Grid.Column>

        <Grid.Column width={8}>
          <h1>Welcome to this template</h1>
          <p>Now get to work and modify this app!</p>
        </Grid.Column>

      </Grid>
=======
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
      </div>
>>>>>>> Stashed changes
    );
  }
}

export default Landing;
