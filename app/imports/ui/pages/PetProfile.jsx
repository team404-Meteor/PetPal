import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Pets } from '../../api/pet/Pet';
import { PetProfileCard } from "../components/PetProfileCard";
import { PetProfilePhotoCard } from "../components/PetProfilePhotoCard"; 
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
                {this.props.pets.map((pet) => <PetProfileCard key={pet._id} pet={pet} />)}
              </div>
            </div>
            <div className="col-md-8 col-12 py-5 px-5 rounded shadow overflow-auto scroll-style">
              Description<hr />
                {this.props.pets.description}
              Photos & Videos<p />
              <div className="row">
                <Grid colums={3} divided>
                  {this.props.pets.map((pet) => <PetProfilePhotoCard key={pet._id} pet={pet} />)} 
                </Grid>
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
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get access to Pet documents.
  const documentId = match.params._id;
  // Get access to Pet documents.
  const subscription = Meteor.subscribe(Pets.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Pets.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(PetProfile);