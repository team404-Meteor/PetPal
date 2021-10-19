import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Favorites } from '../../favorites/Favorites';
import { Redirect } from 'react-router-dom';


function PetCard({
  pet: { name, breed, age, photoUrl, _id },
}) {

  function addToFavorites(e) {
    e.preventDefault();
    const owner = Meteor.user().username;


    console.log('Button Clicked!');
    console.log('_id', _id);
    console.log('owner', owner);


    Meteor.call('updateWrap', owner, _id,
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
          return false;
        } else {
          swal('Success', 'Successfully added this listing to your favorites', 'success', {className: 'custom-swal'});
          return true;
        }
      });
  }

  // const isLogged = Meteor.userId() !== null;



  function LoggedInCheckForFave() {
    const isLoggedIn = Meteor.userId() !== null;
    if (isLoggedIn & addToFavorites == null) {
      return <Button onClick={addToFavorites} className="button-custom-heart pt-0 my-auto" />;
    }
    if (isLoggedIn && addToFavorites) {
      return <Button onClick={addToFavorites} className="button-custom-heart-active pt-0 my-auto" />;
    }
    return '';
  }



  return (
    <div class="container-fluid">
      <div class="row justify-content-center pt-5">
        <div class="col-lg-8 col-md-9 col-sm-12 text-center px-0">
          <div class="col-12 text-center">
            <img className="listing-image" className="rounded-circle img-fluid" src={photoUrl} />
          </div>
          <div class="col-12 text-center pt-2">
            <div class="row justify-content-center">
              <div class="col-auto px-0 mx-0 text-right">
                <LoggedInCheckForFave />
              </div>
              <div class="col-auto">
                <h2>{name}</h2>
              </div>
            </div>
          </div>
          <div class="col-12 text-center">
            <p className="mb-0">{breed}</p>
            <p>{age}</p>
          </div>
        </div>
        {/*
        <div className="pet-overview pt-1 row justify-content-center">
          <div class="row">
            <div class="col-12 text-center">
              <div class="col-2 px-0 mx-0 text-right">
                <LoggedInCheckForFave />
              </div>
              <div class="col-7 px-0 mx-0 text-left">
                <h2 class="d-inline0block">{name}</h2>
              </div>
            </div>
          </div>
          <div class="col-12 px-0 mx-0">
            <p className="mb-0">{breed}</p>
            <p>{age}</p>
          </div>
        </div>*/}
      </div>


      {/*<Button onClick={addToFavorites} circular inverted color='red' icon='heart'/>*/}



    </div>


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
