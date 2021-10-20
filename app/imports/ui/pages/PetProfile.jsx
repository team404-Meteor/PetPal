import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Pets } from '../../api/pet/Pet';
import PetProfileCard from '../components/PetProfileCard';
import PetProfilePhotoCard from '../components/PetProfilePhotoCard';
import 'bootstrap/dist/css/bootstrap';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class PetProfile extends React.Component {

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
    const { _id, description, petName, breed, status, age, photoUrl, photoSetUrls } = this.props.pet;

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
  pet: PropTypes.object,
  ready: PropTypes.bool,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {

  const petId = match.params._id;

  const petSubscribe = Meteor.subscribe(Pets.adminPublicationName);
  const pet = Pets.viewPet(petId);

  return {
    pet: pet[0],
    ready: petSubscribe.ready(),
  };
})(PetProfile);
