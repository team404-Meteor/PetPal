import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

function PetCard({
  pet: { name, breed, age, photoUrl },
}) {

  return (
    <Card className="pet-card">
      <Card.Content>
        <div>
          <Image className="listing-image" size="medium" align="center" circular src={photoUrl}/>
        </div>
        <div className="pet-overview pt-2">
          <h2>{name}</h2>
          <p className="mb-0">{breed}</p>
          <p>{age}</p>
        </div>
      </Card.Content>
    </Card>
  );
}

PetCard.propTypes = {
  pet: PropTypes.shape({
    name: PropTypes.string,
    breed: PropTypes.string,
    age: PropTypes.string,
    photoUrl: PropTypes.string,
  }).isRequired,
};
export default PetCard;
