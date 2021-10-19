import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Favorites } from '../../favorites/Favorites';
import { Redirect } from 'react-router-dom';


function PetCardForUserProfile({
                   pet: { owner, name, breed, age, photoUrl, _id },
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
        } else {
          swal('Success', 'Item added successfully', 'success');
        }
      });
  }

  // const isLogged = Meteor.userId() !== null;



  function LoggedInCheckForFave() {
    const isLoggedIn = Meteor.userId() !== null;
    if (isLoggedIn) {
        return '';
    }
    return '';
  }



  return (
    <div className="container-fluid mx-0 px-0">
      <div className="row justify-content-center">
        <div className="col-12 mx-0 px-3">
          <img className="listing-image img-fluid rounded-circle" align="center" circular src={photoUrl}/>
        </div>
        <div className="col-12 mx-0 px-0 text-center">
          <h2>{name}</h2>
          <p className="mb-0">{breed}</p>
          <p>{age}</p>
          <p class="small-font2">{owner}</p>
        </div>

        <LoggedInCheckForFave/>



        {/*<Button onClick={addToFavorites} circular inverted color='red' icon='heart'/>*/}


      </div>

    </div>


  );
}

PetCardForUserProfile.propTypes = {
  pet: PropTypes.shape({
    owner: PropTypes.string,
    name: PropTypes.string,
    breed: PropTypes.string,
    age: PropTypes.string,
    photoUrl: PropTypes.string,
  }).isRequired,
};
export default PetCardForUserProfile;
