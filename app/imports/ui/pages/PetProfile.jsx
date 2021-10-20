import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Loader, Form, Button, Segment, TransitionablePortal, Header, Checkbox } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Pets } from '../../api/pet/Pet';
import PetProfileCard from '../components/PetProfileCard';
import PetProfilePhotoCard from '../components/PetProfilePhotoCard';
import 'bootstrap/dist/css/bootstrap';

// Create a schema to specify the structure of the data to appear in the form.
const typeOptions = [
  { key: 'd', text: 'Dog', value: 'Dog' },
  { key: 'c', text: 'Cat', value: 'Cat' },
  { key: 'b', text: 'Bunny', value: 'Bunny' },
  { key: 'r', text: 'Reptile', value: 'Reptile' },
  { key: 'o', text: 'Other', value: 'Other' },
];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class PetProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openEdit: false,
      petName: '',
      petType: '',
      breed: '',
      age: '',
      description: '',
      photoUrl: '',
      available: true,
    };

    this.addToFavorites = this.addToFavorites.bind(this);
  }

  handleOpenEdit = () => this.setState({ openEdit: !this.state.openEdit });

  handleChange = (e, { value }) => {
    console.log(e);
    console.log(value);
  }

  // On submit, insert the data.
  submit = (data, formRef) => {

    console.log(data);
    console.log(formRef);
    /*
    const updatedData = {
      petName: data.petName,
      breed: data.breed,
      age: data.age,
      description: data.description,
      photoUrl: data.photoUrl,
      status: data.available,
      petType: data.petType,
    };

    Pets.collection.update({ _id: this.props.pet._id }, { $set: updatedData },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Pet profile updated!', 'success');
          formRef.reset();
        }
      });
      */
  }

  addToFavorites(e) {
    e.preventDefault();

    Meteor.call('updateWrap', this.props.username, this.props.pet._id,
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
          return false;
        }
        swal('Success', 'Successfully added this listing to your favorites', 'success', { className: 'custom-swal' });
        return true;

      });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return this.props.ready ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    let fRef = null;

    const { _id, owner, description, petName, breed, petType, status, age, photoUrl, photoSetUrls } = this.props.pet;

    return (
      <div className="profile-wrapper">
        <div className="container-fluid px-5 py-lg-5 my-lg-5">
          <div className="row px-lg-5 mx-lg-5">
            <div className="col-md-4 col-10 pb-5 mx-auto text-center">
              <PetProfileCard petprofile={
                {
                  photoUrl: photoUrl,
                  petName: petName,
                  breed: breed,
                  status: status,
                  age: age,
                  _id: _id,
                }
              }/>
              {
                owner === this.props.username ?

                  <TransitionablePortal
                    open={this.state.openEdit}
                    trigger={
                      <Button onClick={this.handleOpenEdit}>Edit pet profile</Button>
                    }
                  >
                    <Segment
                      style={{ left: '30%', top: '20%', position: 'fixed', zIndex: 1000 }}
                    >
                      <Header>Edit pet profile</Header>
                      <Form ref={ref => { fRef = ref; }} onSubmit={data => this.submit(data, fRef)}>
                        <div className="col-11 pt-1 text-center mx-auto">
                          <div className="row justify-content-center mx-auto">
                            <div className="col-lg-6 col-12 text-left pl-2">
                              <Form.Input name="petName" label="Pet Name"value={petName} onChange={this.handleChange}/>
                            </div>
                            <div className="col-lg-6 col-12 text-left pl-2">
                              <Form.Select
                                fluid
                                name="petType"
                                label='Pet Type'
                                options={typeOptions}
                                value={petType}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="row pt-3 justify-content-center mx-auto">
                            <div className="col-6 text-left pl-2">
                              <Form.Input name="breed" label="Breed" value={breed} onChange={this.handleChange}/>
                            </div>
                            <div className="col-6 text-left pl-2">
                              <Form.Input name="age" label="Age" value={age} onChange={this.handleChange}/>
                            </div>
                          </div>
                          <div className="row pt-3 justify-content-center mx-auto">
                            <div className="col-12 text-left pl-2">
                              <Form.TextArea name="description" label="Description" value={description} onChange={this.handleChange}/>
                            </div>
                          </div>
                          <div className="row pt-3 justify-content-center mx-auto">
                            <div className="col-lg-12 col-12 text-left pl-2">
                              <Form.Input name="photoUrl" label="Photo URL" value={photoUrl} onChange={this.handleChange}/>
                            </div>
                          </div>
                          <div className="row pt-3 justify-content-start mx-auto">
                            <div className="col-lg-6 col-12 text-left pl-2">
                              <Checkbox name="status" label="Available" value={status} defaultChecked={status} onClick={this.handleChange}/>
                            </div>
                          </div>
                          <div className="row pt-3 justify-content-center mx-auto">
                            <div className="col-12 text-left my-auto text-center">
                              <Button type='submit' className="btn btn-custom">Submit</Button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </Segment>
                  </TransitionablePortal> :
                  <div>
                    <Button onClick={(e) => this.addToFavorites(e)} className="button-custom-heart-active pt-0 my-auto"/>
                    Add to favorites
                  </div>
              }
            </div>
            <div className="col-md-8 col-12 py-5 px-5 rounded shadow overflow-auto scroll-style">
              Description<hr />
              {description || 'No description'} <br/> <br/>
              Photos and Videos<hr />
              <div className="row">
                <div className="col">
                  <PetProfilePhotoCard photoUrl={photoUrl}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
PetProfile.propTypes = {
  username: PropTypes.string,
  pet: PropTypes.object,
  ready: PropTypes.bool,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {

  const petId = match.params._id;
  const username = match.params._user;

  const petSubscribe = Meteor.subscribe(Pets.adminPublicationName);
  const pet = Pets.viewPet(petId);

  return {
    pet: pet[0],
    ready: petSubscribe.ready(),
    username,
  };
})(PetProfile);
