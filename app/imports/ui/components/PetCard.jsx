import React from 'react';
import PropTypes from 'prop-types';

function PetCard({
  pet: { name, breed, age, description, photos, status, type },
}) {

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}

PetCard.propTypes = {
  pet: PropTypes.shape({
    name: PropTypes.string,
    breed: PropTypes.string,
    age: PropTypes.string,
    description: PropTypes.string,
    photos: PropTypes.array,
    status: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};
export default PetCard;

/*
Name (for search view)
Breed (for search view)
Age (for search view)
Description (for profile)
Personality traits (for profile)
Photos (for profile)
Videos (for profile)
Status (for profile)
Type (for filter view)

*/
