import React from 'react';
import { AutoForm, ErrorsField, HiddenField, BoolField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
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
    type: Boolean,
    defaultValue: true,
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
      <div className="container-fluid pt-lg-5 mt-5 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-11 card rounded shadow px-3 py-3">
            <div class="row justify-content-center">
              <div class="col-11 pt-3 text-center">
                <h1>Add a Pet</h1>
                <hr />
              </div>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                <div class="col-11 pt-1 text-center mx-auto">
                  <div class="row justify-content-center mx-auto">
                    <div class="col-lg-6 col-12 text-left pl-2">
                      <TextField name='petName' />
                    </div>
                    <div class="col-lg-6 col-12 text-left pl-2">
                      <SelectField name='petType' placeholder={' '}/>
                    </div>
                  </div>
                  <div class="row pt-3 justify-content-center mx-auto">
                    <div class="col-6 text-left pl-2">
                      <TextField name='breed' />
                    </div>
                    <div class="col-6 text-left pl-2">
                      <TextField name='age' />
                    </div>
                  </div>
                  <div class="row pt-3 justify-content-center mx-auto">
                    <div class="col-12 text-left pl-2">
                      <LongTextField name='description' />
                    </div>
                  </div>
                  <div class="row pt-3 justify-content-center mx-auto">
                    <div class="col-lg-12 col-12 text-left pl-2">
                      <TextField name='photoUrl' />
                    </div>
                  </div>
                  <div className="row pt-3 justify-content-center mx-auto">
                    <div className="col-lg-6 col-12 text-left pl-2">
                      <HiddenField name="status" />
                    </div>
                  </div>
                  <div class="row pt-3 justify-content-center mx-auto">
                    <div class="col-12 text-left my-auto text-center">
                      <SubmitField value='Submit' className="btn btn-custom" />
                      <ErrorsField />
                    </div>
                  </div>
                </div>
              </AutoForm>
            </div>
          </div>
        </div>
        {/*
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
      </Grid>*/}
      </div>
    );
  }
}

export default AddPet;
