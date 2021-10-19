import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import PetPhoto from '../components/PetPhoto';
import { Pets } from '../../api/pet/Pet';
import 'bootstrap/dist/css/bootstrap';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
function UserProfile({ petReady, pets }) {
    return ( 
    <div className="profile-wrapper">
    {
      petReady ?
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
          <div className="row pb-5">
            <div className="col-lg-3 col-4 pb-4"><a href="#">
              {
                pets.map((pet, index) => (
                  <div key={index} align='center' className="img-fluid">
                    <PetPhoto pet={{ photoUrl: pet.photoUrl }}/>
                  </div>
                ))
              }</a></div>
          </div>
            You currently have no listings. Add one <Link to="/add" className="d inline-block">here.</Link><br/><br/>
      
          Favorites<hr />
          <div className="row">
            <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-2.png"></img></a></div>
            <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-2.png"></img></a></div>
            <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-2.png"></img></a></div>
            <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-2.png"></img></a></div>
          </div>
        </div>
      </div>
    </div> : <div></div> }
    </div>
    );
  }

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  petReady: PropTypes.bool,
  pets: PropTypes.array,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const petSubscribe = Meteor.subscribe(Pets.userPublicationName);
  const pets = Pets.getPetsListedByOwner();
  return {
    petReady: petSubscribe.ready(),
    pets,
  };
})(UserProfile);


