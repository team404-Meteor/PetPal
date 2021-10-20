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

const statusOptions = [
  { key: 't', text: 'Available', value: 'Available' },
  { key: 'f', text: 'Adopted', value: 'Adopted' },
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
      status: '',
    };

    this.addToFavorites = this.addToFavorites.bind(this);
  }

  handleOpenEdit = () => this.setState({ openEdit: !this.state.openEdit });

  handleChange = (e, { name, value }) => {

    this.setState({ [name]: value });
  }

  // On submit, insert the data.
  submit = (data, formRef) => {

    const updatedData = {
      petName: this.state.petName || this.props.pet.petName,
      breed: this.state.breed || this.props.pet.breed,
      age: this.state.age || this.props.pet.age,
      description: this.state.description || this.props.pet.description,
      photoUrl: this.state.photoUrl || this.props.pet.photoUrl,
      petType: this.state.petType || this.props.pet.petType,
    };

    const newStatus = () => {
      if (this.state.status) {
        return this.state.status === 'Available';
      }

      return this.props.pet.status;
    };

    updatedData.status = newStatus();

    if (!updatedData.status && this.props.pet.status) {
      Meteor.call('sendEmail', 'rexterds@gmail.com', updatedData.petName);
    }

    Pets.collection.update({ _id: this.props.pet._id }, { $set: updatedData },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Pet profile updated!', 'success');
        }
      });
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

    const { _id, owner, description, petName, breed, petType, status, age, photoUrl } = this.props.pet;

    return (
      <div className="profile-wrapper">
        <div className="container-fluid px-3 mt-5 py-lg-5 my-lg-5 pb-5">
          <div className="row px-lg-5 mx-lg-5 justify-content-center">
            <div className="col-md-4 col-10 pb-2 mx-auto text-center">
              <div className="col-md-8 col-7 mx-auto pb-3 text-center">
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
              </div>
              {
                owner === this.props.username ?

                  <TransitionablePortal
                    onClose={() => (this.state.openEdit ? this.setState({ openEdit: !this.state.openEdit }) : this.setState({ openEdit: this.state.openEdit }))}
                    open={this.state.openEdit}
                    trigger={
                      <a className="underline-text" onClick={this.handleOpenEdit}>Edit pet profile</a>
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
                              <Form.Input name="petName" label="Pet Name" placeholder={petName} onChange={this.handleChange}/>
                            </div>
                            <div className="col-lg-6 col-12 text-left pl-2">
                              <Form.Select
                                fluid
                                name="petType"
                                label='Pet Type'
                                options={typeOptions}
                                placeholder={petType}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="row pt-3 justify-content-center mx-auto pb-0">
                            <div className="col-6 text-left pl-2">
                              <Form.Input name="breed" label="Breed" placeholder={breed} onChange={this.handleChange}/>
                            </div>
                            <div className="col-6 text-left pl-2">
                              <Form.Input name="age" label="Age" placeholder={age} onChange={this.handleChange}/>
                            </div>
                          </div>
                          <div className="row pt-3 justify-content-center mx-auto">
                            <div className="col-12 text-left pl-2">
                              <Form.TextArea name="description" label="Description" placeholder={description} onChange={this.handleChange}/>
                            </div>
                          </div>
                          <div className="row pt-3 justify-content-center mx-auto">
                            <div className="col-lg-12 col-12 text-left pl-2">
                              <Form.Input name="photoUrl" label="Photo URL" placeholder={photoUrl} onChange={this.handleChange}/>
                            </div>
                          </div>
                          <div className="row pt-3 mb-0 justify-content-start">
                            <div className="col-lg-6 col-12 text-left pl-2 pb-0 mb-0">
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
                  <div className="row justify-content-center">
                    <div className="col-auto px-0 mx-0 text-right">
                      <Button onClick={(e) => this.addToFavorites(e)} className="button-custom-heart-active pt-0"/>
                    </div>
                    <div className="col-auto pt-2">
                      <p className="d-inline-block position-relative underline-text">Add to favorites</p>
                    </div>
                  </div>
              }
            </div>
            <div className="col-md-8 col-12 py-5 px-5 rounded shadow overflow-auto scroll-style">
              Contact <hr />
              {owner} <br/> <br/> <br/>
              Description<hr />
              {description || 'No description'} <br/> <br/>
              Photos and Videos<hr />
              <div className="row">
                <div className="col-lg-3 col-md-3 col-4 px-0">
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
