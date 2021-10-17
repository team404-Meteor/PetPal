import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Pets } from '../../api/pet/Pet';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  petName: {
    type: String,
  },
  breed: {
    type: String,
  },
  age: {
    type: String,
  },
  description: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  status: {
    type: String,
    allowedValues: [
      'Available',
      'Adopted',
    ],
  },
  petType: {
    type: String,
    allowedValues: [
      'Dog',
      'Cat',
      'Bunny',
      'Reptile',
      'Other',
    ],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddPet extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { petName, breed, age, description, photoUrl, status, petType, } = data;
    const owner = Meteor.user().username;
    Pets.collection.insert({ petName, breed, age, description, photoUrl, status, petType, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Pet</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
            <Segment>
              <TextField name='petName'/>
              <TextField name='breed'/>
              <TextField name='age'/>
              <TextField name='description'/>
              <TextField name='photoUrl'/>
              <SelectField name='status'/>
              <SelectField name='petType'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddPet;
