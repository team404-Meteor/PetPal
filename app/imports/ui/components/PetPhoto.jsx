import React from 'react';
import PropTypes from 'prop-types';

function PetPhoto({
    pet: { owner, photoUrl },
}) {
    return (
        <div className="col-12 custom-col">
            <img className="img-fluid rounded-circle" src={photoUrl} />
            <p className="mb-0">
                {owner}
            </p>
        </div>
    );
}

PetPhoto.propTypes = {
    pet: PropTypes.shape({
        owner: PropTypes.string,
        photoUrl: PropTypes.string,
    }).isRequired,
};
export default PetPhoto;
