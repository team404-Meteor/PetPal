import React from 'react';
import { Table, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List petprofile table. See pages/ListStuff.jsx. */
class PetProfileCard extends React.Component {
  render() {
    const { photoUrl, petName, breed, status, age } = this.props.petprofile;
    return (
      <div className="col-lg-8 col-12 text-center px-0">
        <div className="col-12 text-center">
          <img className="listing-image rounded-circle img-fluid" src={photoUrl} />
        </div>
        <div className="col-12 text-center pt-2">
          <div className="row justify-content-center">
            <div className="col-auto">
              <h2>{petName}</h2>
            </div>
          </div>
        </div>
        <div className="col-12 text-center">
          <p className="mb-0">Breed: {breed}</p>
          <p>Status: {status ? 'Available' : 'Adopted'}</p>
          <p>Age: {age}</p>
        </div>
      </div>
    );
  }
}

// Require a document to be passed to this component.
PetProfileCard.propTypes = {
  petprofile: PropTypes.shape({
    photoUrl: PropTypes.string,
    petName: PropTypes.string,
    breed: PropTypes.string,
    status: PropTypes.bool,
    age: PropTypes.string,
    _id: PropTypes.string,
  }),
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default PetProfileCard;
