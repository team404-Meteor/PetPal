import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Favorites } from '../../favorites/Favorites';
import 'bootstrap/dist/css/bootstrap';
import { Pets } from '../../api/pet/Pet';
import PetCard from '../components/PetCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.FavoritesReady && this.props.PetsReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    console.log('userListings', this.props.userListings);

    // console.log(this.props.favorites);
    // const faveIds = this.props.favorites[0].favoriteIds;
    let favoritePetProfileIds = [];
    if (this.props.favorites.length > 0) {
      favoritePetProfileIds = this.props.favorites[0].favoriteIds;
    }
    // const favoritePetProfileIds = [] in this.props.favorites ? [] : this.props.favorites[0].favoriteIds;
    // console.log(favoritePetProfileIds);

    // console.log('favoritePetProfileIds', favoritePetProfileIds);
    const favoriteProfilesQuery = Pets.collection.find({ _id: { $in: favoritePetProfileIds } }).fetch();
    // console.log('favoriteProfilesQuery', favoriteProfilesQuery);

    // console.log('favoriteProfiles', favoriteProfiles);

    return (
      <div className="profile-wrapper">
        <div className="container-fluid px-5 mt-5 py-lg-5 my-lg-5 pb-5">
          <div className="row px-lg-5 mx-lg-5">
            <div className="col-md-4 col-10 pb-5 mx-auto text-center">
              <div className="col-md-8 col-7 mx-auto pb-3">
                <img src="images/placeholder-1.png"></img>
              </div>
              <h3>Username</h3>
            </div>
            <div className="col-md-8 col-12 py-5 px-5 rounded shadow overflow-auto scroll-style">
              Listings<hr />
              <div className='container pet-listing px-3'>
                <div className='row px-5 py-5'>
                  {
                    this.props.userListings.map((userListing, index) => (
                      <div key={index} className='col-sm-6 col-md-4 col-10 pb-3 card-style text-center' align='center'>
                        <PetCard pet={{ name: userListing.petName, breed: userListing.breed, age: userListing.age, photoUrl: userListing.photoUrl, _id: userListing._id }}/>
                      </div>
                    ))
                  }
                </div>
              </div>

              Favorites<hr />
              <div className='container pet-listing px-3'>
                <div className='row px-5 py-5'>
                  {
                    favoriteProfilesQuery.map((favoriteProfile, index) => (
                      <div key={index} className='col-sm-6 col-md-4 col-10 pb-3 card-style text-center' align='center'>
                        <PetCard pet={{ name: favoriteProfile.petName, breed: favoriteProfile.breed, age: favoriteProfile.age, photoUrl: favoriteProfile.photoUrl, _id: favoriteProfile._id }}/>
                      </div>
                    ))
                  }
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
UserProfile.propTypes = {
  favorites: PropTypes.array.isRequired,
  userListings: PropTypes.array.isRequired,
  FavoritesReady: PropTypes.bool.isRequired,
  PetsReady: PropTypes.bool.isRequired,
  // PetsUserReady: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {

  // Get access to Stuff documents.
  const FavoritesSubscription = Meteor.subscribe(Favorites.userPublicationName);
  const PetsSubscription = Meteor.subscribe(Pets.adminPublicationName);
  // const PetsUserSubscription = Meteor.subscribe(Pets.userPublicationName);

  // get the username
  const username = match.params._id;
  // console.log('username', username);

  // Determine if the subscription is ready
  const FavoritesReady = FavoritesSubscription.ready();
  const PetsReady = PetsSubscription.ready();
  // const PetsUserReady = PetsUserSubscription.ready();


  // Get the Stuff documents
  const favorites = Favorites.collection.find({ _id: username }).fetch();
  const userListings = Pets.collection.find({ owner: username }).fetch();

  return {
    favorites,
    FavoritesReady,
    PetsReady,
    userListings,
  };
})(UserProfile);
