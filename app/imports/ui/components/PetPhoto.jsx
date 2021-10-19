import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

function PetCard({
    pet: { owner, photoUrl },
}) {

    return (
        <div className="col-12">
            <img className="img-fluid rounded-circle" circular src={photoUrl} />
            <p className="mb-0">{owner}</p>
        </div>
    );
}

PetCard.propTypes = {
    pet: PropTypes.shape({
        owner: PropTypes.string,
        photoUrl: PropTypes.string,
    }).isRequired,
};
export default PetCard;
