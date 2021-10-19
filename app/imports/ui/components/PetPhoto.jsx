import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Dimmer, Form, Image, Loader, Segment, TransitionablePortal } from 'semantic-ui-react';

function PetPhoto({
  pet: { owner, photoUrl },
}) {

  return (
      <div className="col-12">
      <Image className="listing-image" size="medium" align="center" circular src={photoUrl}/>
      <p>{owner}</p>
      </div>
  );
}

PetPhoto.propTypes = {
  pet: PropTypes.shape({
    photoUrl: PropTypes.string,
  }).isRequired,
};
export default PetPhoto;
