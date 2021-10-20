import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';

function PetCard({
  pet: { name, breed, age, photoUrl, _id },
}) {

  function addToFavorites(e) {
    e.preventDefault();
    const owner = Meteor.user().username;

    Meteor.call('updateWrap', owner, _id,
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
          return false;
        }
        swal('Success', 'Successfully added this listing to your favorites', 'success', { className: 'custom-swal' });
        return true;

      });
  }

  // const isLogged = Meteor.userId() !== null;

  function LoggedInCheckForFave() {
    const isLoggedIn = Meteor.userId() !== null;
    if (isLoggedIn && addToFavorites == null) {
      return <Button onClick={addToFavorites} className="button-custom-heart pt-0 my-auto" />;
    }
    if (isLoggedIn && addToFavorites) {
      return <Button onClick={addToFavorites} className="button-custom-heart-active pt-0 my-auto" />;
    }
    return '';
  }

  return (

    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-lg-8 col-12 text-center px-0">
          <div className="col-12 text-center">
            <img className="listing-image rounded-circle img-fluid" src={photoUrl} />
          </div>
          <div className="col-12 text-center pt-2">
            <div className="row justify-content-center">
              <div className="col-auto px-0 mx-0 text-right">
                <LoggedInCheckForFave />
              </div>
              <div className="col-auto">
                <h2>{name}</h2>
              </div>
            </div>
          </div>
          <div className="col-12 text-center">
            <p className="mb-0">{breed}</p>
            <p>{age}</p>
          </div>
        </div>
      </div>
    </div>

  );
}

PetCard.propTypes = {
  pet: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    breed: PropTypes.string,
    age: PropTypes.string,
    photoUrl: PropTypes.string,
  }).isRequired,
};
export default PetCard;
