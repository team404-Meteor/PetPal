import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Pets } from '../../api/pet/Pet';
import StuffItem from '../components/StuffItem';
import { Stuffs } from '../../api/stuff/Stuff';
import { PetProfileCard } from "../components/PetProfileCard";
import 'bootstrap/dist/css/bootstrap';







/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class PetProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className="profile-wrapper">
        <div className="container-fluid px-5 py-lg-5 my-lg-5">
          <div className="row px-lg-5 mx-lg-5">
            <div className="col-md-4 col-10 pb-5 mx-auto text-center">
              <div className="col-md-8 col-7 mx-auto pb-3">
                <img src="images/placeholder-1.png"></img>
              </div>
                {this.props.pets.map((pet) => <PetProfileCard key={pet._id} pet={pet} />)}
            </div>
            <div className="col-md-8 col-12 py-5 px-5 rounded shadow overflow-auto scroll-style">
              Description<hr />
              
              <div className="row pb-5">
                <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-1.png"></img></a></div>
                <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-1.png"></img></a></div>
                <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-1.png"></img></a></div>
                <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-1.png"></img></a></div>
              </div>
                You currently have no listings. Add one <a href="#" className="d inline-block">here.</a><br/><br/>

              Favorites<hr />
              <div className="row">
                <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-2.png"></img></a></div>
                <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-2.png"></img></a></div>
                <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-2.png"></img></a></div>
                <div className="col-lg-3 col-4 pb-4"><a href="#"><img src="images/placeholder-2.png"></img></a></div>
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
  pets: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Pets.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const pets = Pets.collection.find({}).fetch();
  return {
    pets,
    ready,
  };
})(PetProfile);