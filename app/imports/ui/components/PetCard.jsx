import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button, Icon } from 'semantic-ui-react';



function PetCard({
  pet: { name, breed, age, photoUrl },
}) {

  function addToFavorites(e) {
    e.preventDefault();
    console.log('Button Clicked!');
  }


  return (
    <Card className="pet-card">
      <Card.Content>

        <div>
          <Image className="listing-image" size="medium" circular src={photoUrl}/>
        </div>
        <div className="pet-overview pt-2">
          <h2>{name}</h2>
          <p className="mb-0">{breed}</p>
          <p>{age}</p>
        </div>

        <Button onClick={addToFavorites} circular inverted color='red' icon='heart' />


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
