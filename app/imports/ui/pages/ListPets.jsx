import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Button, Form, Image, Segment, TransitionablePortal } from 'semantic-ui-react';
import PetCard from '../components/PetCard';

const pet = {
  name: 'Max and Minnie',
  breed: 'Chihuahua Mix',
  age: '3 and 4 years old',
  description: 'This is their description',
  photoUrl: '/images/meteor-logo.png',
  status: 'Available',
  type: 'Dogs',
};

const petArray = [pet, pet, pet, pet, pet, pet];

/*

function ListPets({
  pets: { name, breed, age, description, photoUrl, status, type },
}) {

*/

function ListPets() {

  // const [openFilter, setOpenFilter] = useState(false);

  const filterStyle = {
    position: 'fixed',
    top: '15%',
    left: '20%',
    zIndex: 1000,
    borderRadius: '25px',
  };

  return (
    <div>
      <nav className='navbar navbar-light pet-filter'>
        <TransitionablePortal
          closeOnTriggerClick
          openOnTriggerClick
          onOpen={() => true}
          onClose={() => false}
          trigger={
            <Button className='filter-button'>
              <span className='filter-text'>FILTER</span>
              <Image src='/images/list-filter.png' avatar/>
            </Button>
          }
        >
          <Segment
            style={filterStyle}
          >
            <Form>
              <Form.Group grouped>
                <label>Pet Type</label>
                <div className='row'>
                  <div className='col-4'>
                    <Form.Checkbox label='Dog'/>
                    <Form.Checkbox label='Dog'/>
                  </div>
                  <div className='col-4'>
                    <Form.Checkbox label='Dog'/>
                    <Form.Checkbox label='Dog'/>

                  </div>
                  <div className='col-4'>
                    <Form.Checkbox label='Dog'/>
                  </div>
                </div>
              </Form.Group>
              <Form.Group grouped>
                <label>Age</label>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
              </Form.Group>
              <Form.Group grouped>
                <label>Size</label>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
              </Form.Group>
              <Form.Group grouped>
                <label>Gender</label>
                <div className='row'>
                  <div className='col'>
                    <Form.Checkbox label='Male'/>
                  </div>
                  <div className='col'>
                    <Form.Checkbox label='Male'/>
                  </div>
                </div>
              </Form.Group>
            </Form>
          </Segment>
        </TransitionablePortal>
      </nav>
      <div className='container pet-listing'>
        <div className='row'>
          {
            petArray.map((value, index) => (
              <div key={index} className='col-sm-6 col-md-4' align='center'>
                <PetCard pet={{ name: value.name, breed: value.breed, age: value.age, photoUrl: value.photoUrl }}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

/*
ListPets.propTypes = {
  pets: PropTypes.shape({
    name: PropTypes.string,
    breed: PropTypes.string,
    age: PropTypes.string,
    description: PropTypes.string,
    photoUrl: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
  }),
};
*/

export default ListPets;

/*
Name (for search view)
Breed (for search view)
Age (for search view)
Description (for profile)
Personality traits (for profile)
Photos (for profile)
Videos (for profile)
Status (for profile)
Type (for filter view)

*/
