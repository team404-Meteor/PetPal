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
        } else {
          swal('Success', 'Item added successfully', 'success');
        }
      });
  }

  // const isLogged = Meteor.userId() !== null;



  function LoggedInCheckForFave() {
    const isLoggedIn = Meteor.userId() !== null;
    if (isLoggedIn) {
      return <Button onClick={addToFavorites} circular inverted color='red' icon='heart'/>;
    }
    return '';
  }



  return (
    <Card className="pet-card">
      <Card.Content>

        <div>
          <Image className="listing-image" size="medium" align="center" circular src={photoUrl}/>
        </div>
        <div className="pet-overview pt-2">
          <h2>{name}</h2>
          <p className="mb-0">{breed}</p>
          <p>{age}</p>
        </div>

        <LoggedInCheckForFave/>



        {/*<Button onClick={addToFavorites} circular inverted color='red' icon='heart'/>*/}


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
