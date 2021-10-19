import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Checkbox, Dimmer, Form, Image, Loader, Segment, TransitionablePortal } from 'semantic-ui-react';
import PetCard from '../components/PetCard';
import { Pets } from '../../api/pet/Pet';

const saveFilter = {
  Dog: false,
  Cat: false,
  Bunny: false,
  Reptile: false,
  Other: false,
};

function ListPets({ petReady, pets }) {

  const filterStyle = {
    position: 'fixed',
    marginTop: '-270px',
    marginRight: 'auto',
    marginBottom: '0',
    marginLeft: '-190px',
    width: '380px',
    top: '50%',
    left: '50%',
    zIndex: '2000',
  };

  const formStyle = {
    paddingTop: '25px',
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingBottom: '10px',
    fontSize: '12pt',
    color: '#5f5f5f',
    letterSpacing: '2px',
    align: 'center',
  };

  const rowStyle = { backgroundColor: '#e7e7e7', width: '100%', top: '88px', zIndex: '1' };

  const [openFilter, setOpenFilter] = useState(false);
  const [filterTypes, setFilterTypes] = useState(saveFilter);

  const selectPetType = (e, data) => {
    const current = saveFilter[data.label];
    saveFilter[data.label] = !current;
    setFilterTypes({ ...saveFilter });
  };

  const submitFilter = () => {
    setOpenFilter(!openFilter);
  };

  const sendEmail = () => {

    // Meteor.call('sendEmail', '');
  };

  return (
    <div>
      <nav className='navbar navbar-light pet-filter sticky-top' style={rowStyle}>
        <TransitionablePortal
          onClose={() => (openFilter ? setOpenFilter(!openFilter) : setOpenFilter(openFilter))}
          open={openFilter}
          trigger={
            <Button className='filter-button' onClick={() => setOpenFilter(!openFilter)}>
              <span className='filter-text'>FILTER</span>
              <Image src='/images/list-filter.png' avatar/>
            </Button>
          }
        >
          <Segment
            style={filterStyle}
          >
            <Form style={formStyle} onSubmit={() => submitFilter()}>
              <Form.Group grouped>
                <label className="bold">Pet Type</label>
                <div className='row pb-1'>
                  <div className='col-4'>
                    <Checkbox checked={filterTypes.Dog}label='Dog' onChange={(e, data) => selectPetType(e, data)}/>
                    <Checkbox checked={filterTypes.Cat} label='Cat' onChange={(e, data) => selectPetType(e, data)}/>
                  </div>
                  <div className='col-4'>
                    <Checkbox checked={filterTypes.Bunny} label='Bunny' onChange={(e, data) => selectPetType(e, data)}/>
                    <Checkbox checked={filterTypes.Reptile} label='Reptile' onChange={(e, data) => selectPetType(e, data)}/>

                  </div>
                  <div className='col-4'>
                    <Checkbox checked={filterTypes.Other} label='Other' onChange={(e, data) => selectPetType(e, data)}/>
                  </div>
                </div>
              </Form.Group>
              <div align='center'>
                <Button type="submit" className="btn-custom3">DONE</Button>
              </div>
            </Form>
          </Segment>
        </TransitionablePortal>
        <Button onClick={sendEmail}>TEST EMAIL</Button>
      </nav>
      {
        petReady ?
          <div className='container pet-listing px-3'>
            <div className='row px-5 py-5 justify-content-center'>
              {
                // filter pets first then map the resulting array to pet card
                // eslint-disable-next-line consistent-return
                _.filter(pets, function (pet) {
                  const { Dog, Cat, Bunny, Reptile, Other } = filterTypes;

                  // return if the user did not check anything
                  if (!Dog && !Cat && !Bunny && !Reptile && !Other) return pet;

                  if (Dog && pet.petType === 'Dog') return pet;
                  if (Cat && pet.petType === 'Cat') return pet;
                  if (Bunny && pet.petType === 'Bunny') return pet;
                  if (Reptile && pet.petType === 'Reptile') return pet;
                  if (Other && pet.petType === 'Other') return pet;

                }).map((pet, index) => (
                  <div key={index} className='col-sm-6 col-md-4 col-10 pb-3 card-style text-center' align='center'>
                    <PetCard pet={{ name: pet.petName, breed: pet.breed, age: pet.age, photoUrl: pet.photoUrl, _id: pet._id }}/>
                  </div>
                ))
              }
            </div>
          </div> :
          <div>
            <Dimmer active inverted>
              <Loader inverted>Getting pets</Loader>
            </Dimmer>
          </div>
      }
    </div>
  );
}

ListPets.propTypes = {
  petReady: PropTypes.bool,
  pets: PropTypes.array,
};

export default withTracker(() => {
  // subscribe to all the data since the page is not user specific
  const petSubscribe = Meteor.subscribe(Pets.adminPublicationName);

  const pets = Pets.getAllPetsAdmin();

  return {
    petReady: petSubscribe.ready(),
    pets,
  };
})(ListPets);
