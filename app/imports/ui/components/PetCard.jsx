import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

function PetCard({
  pet: { name, breed, age, photoUrl },
}) {

  return (
    <Card className="pet-card">
      <Card.Content>
        <div className="pet-image">
          <Image size="medium" circular src={photoUrl}/>
        </div>
        <div className="pet-overview pt-2">
          <h2>{name}</h2>
          {breed}<br/>
          {age}
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
