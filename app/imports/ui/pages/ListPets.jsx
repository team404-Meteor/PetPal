import React from 'react';
import { Meteor } from 'meteor/meteor';
// import PropTypes from 'prop-types';
import emailjs from 'emailjs-com';
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

  const sendEmail = () => {
    // const { templateID, serviceID } = Meteor.settings.monti;

    Meteor.call('getEmailKey', (e, value) => {
      const { serviceID, templateID, userID } = value;

      const emailParams = {
        name: 'Joe',
        email: 'rexterds@gmail.com',
      };

      emailjs.send(serviceID, templateID, emailParams, userID)
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
    });
  };

  return (
    <div>
      <nav className='navbar navbar-light pet-filter sticky-top' style={rowStyle}>
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
            <Form style={formStyle}>
              <Form.Group grouped>
                <label className="bold">Pet Type</label>
                <div className='row pb-1'>
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
                <label className="bold pt-1">Age</label>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
              </Form.Group>
              <Form.Group grouped>
                <label className="bold pt-1">Size</label>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
                <Form.Field label='Less than 1 year' control='input' type='checkbox'/>
              </Form.Group>
              <Form.Group grouped>
                <label className="bold pt-1">Gender</label>
                <div className='row'>
                  <div className='col'>
                    <Form.Checkbox label='Male'/>
                  </div>
                  <div className='col'>
                    <Form.Checkbox label='Male'/>
                  </div>
                </div>
              </Form.Group>
              <div align='center'>
                <Button className="btn-custom3">APPLY</Button>
              </div>
            </Form>
          </Segment>
        </TransitionablePortal>
        <Button onClick={sendEmail}>TEST EMAIL</Button>
      </nav>
      <div className='container pet-listing px-3'>
        <div className='row px-5 py-5'>
          {
            petArray.map((value, index) => (
              <div key={index} className='col-sm-6 col-md-4 col-10 pb-3 card-style text-center' align='center'>
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
