import React from 'react';
import PropTypes from 'prop-types';

function PetOwner({
  pet: { owner },
}) {

  return (
      <div className="col-12">
          <p>{owner}</p>
      </div>
  );
}

PetOwner.propTypes = {
  pet: PropTypes.shape({
    photoUrl: PropTypes.string,
  }).isRequired,
};
export default PetOwner;
