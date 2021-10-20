import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Button, Segment, TransitionablePortal } from 'semantic-ui-react';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Pets } from '../../api/pet/Pet';
import PetProfileCard from '../components/PetProfileCard';
import PetProfilePhotoCard from '../components/PetProfilePhotoCard';
import 'bootstrap/dist/css/bootstrap';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class PetProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openEdit: true,
    };

    this.addToFavorites = this.addToFavorites.bind(this);
  }

  handleOpenEdit = () => this.setState({ openEdit: true });

  handleCloseEdit = () => this.setState({ openEdit: false })

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
    /*
    _id: PropTypes.string,
    name: PropTypes.string,
    breed: PropTypes.string,
    age: PropTypes.string,
    photoUrl: PropTypes.string,
*/
    const { _id, owner, description, petName, breed, status, age, photoUrl, photoSetUrls } = this.props.pet;

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
                  <div>
                    <TransitionablePortal
                      closeOnTriggerClick
                      openOnTriggerClick
                      onClose={this.handleCloseEdit}
                      onOpen={this.handleOpenEdit}
                      open={this.state.openEdit}
                      trigger={
                        <Button>Edit pet profile</Button>
                      }
                    >
                      <Segment
                        style={{ left: '30%', top: '20%', position: 'fixed', zIndex: 1000 }}
                      >
                        <p>Portals have tons of great callback functions to hook into.</p>
                        <p>To close, simply click the close button or click away</p>
                      </Segment>
                    </TransitionablePortal>
                  </div> :
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
                {
                  photoSetUrls.length > 0 ?
                    photoSetUrls.map((url, index) => (
                      <div key={index} className="col">
                        <PetProfilePhotoCard photoUrl={url}/>
                      </div>
                    )) :
                    'No photos and videos'
                }
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
