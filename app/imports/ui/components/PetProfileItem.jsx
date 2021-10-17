import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List petprofile table. See pages/ListStuff.jsx. */
class PetProfileItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.petprofile.photoUrl}</Table.Cell>
        <Table.Cell>{this.props.petprofile.petName}</Table.Cell>
        <Table.Cell>{this.props.petprofile.breed}</Table.Cell>
        <Table.Cell>{this.props.petprofile.status}</Table.Cell>
        <Table.Cell>{this.props.petprofile.age}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
PetProfileItem.propTypes = {
  petprofile: PropTypes.shape({
    photoUrl: PropTypes.string,
    petName: PropTypes.number,
    breed: PropTypes.string,
    status: PropTypes.string,
    age: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PetProfileItem);
