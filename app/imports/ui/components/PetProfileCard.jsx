import React from 'react';
import { Table, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List petprofile table. See pages/ListStuff.jsx. */
class PetProfileCard extends React.Component {
  render() {
    console.log(this.props.petprofile);
    return (
      <Card className="pet-card">
        <Card.Content>
          <div className="pet-image">
            <Image size="medium" circular src={this.props.petprofile.photoUrl}/>
          </div>
          <div className="pet-overview">
            <h2>{this.props.petprofile.petName}</h2>
            <h3>Breed: {this.props.petprofile.breed}</h3>
            <h3>Status: {this.props.petprofile.status ? 'Available' : 'Adopted'}</h3>
            <h3>Age: {this.props.petprofile.age}</h3>
          </div>
        </Card.Content>
      </Card>
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
