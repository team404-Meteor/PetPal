import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List petprofile table. See pages/ListStuff.jsx. */
class PetProfilePhotoCard extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div class="row justify-content-center">
          <div className="pet-image col-12 px-0">
            <img src={this.props.photoUrl}/>
          </div>
        </div>
      </div>
    );
  }
}

// Require a document to be passed to this component.
PetProfilePhotoCard.propTypes = {
  photoUrl: PropTypes.string,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PetProfilePhotoCard);
