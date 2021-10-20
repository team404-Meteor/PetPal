import React from 'react';
import { Table, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List petprofile table. See pages/ListStuff.jsx. */
class PetProfilePhotoCard extends React.Component {
  render() {
    return (
      <Card className="pet-card">
        <Card.Content>
          <div className="pet-image">
            <Image fluid src={this.props.photoUrl}/>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
PetProfilePhotoCard.propTypes = {
  photoUrl: PropTypes.string,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PetProfilePhotoCard);
