import React from 'react';
import PropTypes from 'prop-types';

function PetOwner({
    pet: { owner },
}) {
    return (
        <div className="col-12 custom-col">
            <p className="mb-0">
                <b className="text-custom">Current User:</b><br/>
                 {owner}
            </p>
        </div>
    );
}

PetOwner.propTypes = {
    pet: PropTypes.shape({
        owner: PropTypes.string,
    }).isRequired,
};
export default PetOwner;