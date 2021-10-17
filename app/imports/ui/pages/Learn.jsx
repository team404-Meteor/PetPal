import React from 'react';
import { Link } from 'react-router-dom';
import { Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap';

/** A simple static component to render some text for the landing page. */
class Learn extends React.Component {
    render() {
        const colStyle = { backgroundColor: '#ffd3b6' };
        const rowStyle = { backgroundColor: '#e7e7e7', width: '100%', top: '88px', zIndex: '1' };
        const rowStyle2 = { zIndex: '-10' };
        const containerStyle = { marginTop: '-20px', zIndex: '-1' };
        return (
            <div className="container-fluid px-0 mx-0" style={containerStyle}>
                <div className="row pt-4 px-0 mx-0 w-100 justify content-center sticky-top" style={rowStyle}>
                    <div className="col-md-3 col-12 pb-4 text-center">
                        <Link to="#petHomelessness" scrollTo="#petHomelessness" replace>Pet Homelessness</Link>
                    </div>
                    <div className="col-md-3 col-12 pb-4 text-center">
                        <Link to="#populationControl" replace>Population Control</Link>
                    </div>
                    <div className="col-md-3 col-12 pb-4 text-center">
                        <Link to="#breedDiscrimination" replace>Breed Discrimination</Link>
                    </div>
                    <div className="col-md-3 col-12 pb-4 text-center">
                        <a onclick="test_function(this)" href="#">Find a store</a>
                    </div>
                </div>
                <div className="row py-5 justify-content-center" style={rowStyle2}>
                    <div className="col-lg-8 col-12 px-5 text-center">
                        <h1 id="petHomelessness">Pet Homelessness</h1>
                        <hr />
                        <div className="row mt-3 py-5 px-0 mx-0 justify-content-center">
                            <div className="col-md-5 pb-5">
                                <img src="/images/pet-facts-1.png" className="img-responsive img-circle" />
                            </div>
                            <div style={colStyle} className="col-md-6 rounded mx-3">
                                Pet homelessness text.
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-12 px-5 text-center">
                        <h1 id="populationControl">Population Control</h1>
                        <hr />
                        <div className="row mt-3 py-5 px-0 mx-0 justify-content-center">
                            <div className="col-md-5 pb-5">
                                <img src="/images/pet-facts-1.png" className="img-responsive img-circle" />
                            </div>
                            <div style={colStyle} className="col-md-6 rounded mx-3">
                                Pet homelessness text.
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-12 px-5 text-center">
                        <h1 id="breedDiscrimination">Breed Discrimination</h1>
                        <hr />
                        <div className="row mt-3 py-5 px-0 mx-0 justify-content-center">
                            <div className="col-md-5 pb-5">
                                <img src="/images/pet-facts-1.png" className="img-responsive img-circle" />
                            </div>
                            <div style={colStyle} className="col-md-6 rounded mx-3">
                                Pet homelessness text.
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-12 px-5 text-center works">
                        <h1 id="divid">The Solution</h1>
                        <hr />
                        <div className="row mt-3 py-5 px-0 mx-0 justify-content-center">
                            <div className="col-md-5 pb-5">
                                <img src="/images/pet-facts-1.png" className="img-responsive img-circle" />
                            </div>
                            <div style={colStyle} className="col-md-6 rounded mx-3">
                                Pet homelessness text.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Learn;
