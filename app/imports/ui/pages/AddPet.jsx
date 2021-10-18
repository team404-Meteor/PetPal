import React from 'react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField, LongTextField, BoolField, HiddenField, ImageField, AutoField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Pets } from '../../api/pet/Pet';
import 'bootstrap/dist/css/bootstrap';
import MultiSelectField from '../controllers/MultiSelectField';


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
      'Gerbil',
      'Bird',
      'Fish',
      'Other',
    ],
  },
  timeFrame: {
    type: String,
    allowedValues: [
      'Week(s)',
      'Month(s)',
      'Year(s)',
    ],
  },
  personality: {
    type: Array,
  },
  'personality.$': {
    type: String, allowedValues: [
      'Enjoys games of fetch',
      'Enjoys long walks, runs and hikes',
      'Friendly',
      'Laid back',
      'Has lots of energy',
      'Loves naps',
      'Loves toys',
      'Loves treats',
      'Playful',
      'Potty trained',
      'Shy',
      'Smart',
      'Sociable with other animals',
      'Great with kids',
    ],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddPet extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { petName, breed, age, description, photoUrl, status, petType, timeFrame, personality } = data;
    const owner = Meteor.user().username;
    Pets.collection.insert({ petName, breed, age, description, photoUrl, status, petType, timeFrame, personality, owner },
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

      <div className="container-fluid pb-5 mb-5">
        <div className="row">
          <div className="col-lg-6 col-10 rounded shadow mx-auto mt-lg-5 px-5 pt-5 pb-2">
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <ErrorsField/>
              <div className="row">
                <div className="col">
                  <label>Name</label>
                  <TextField id={'txt-field'} name='petName' className="mr-sm-2 w-100" placeholder="Pet's name" label=''/>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-12">
                      <label>Pet Type </label>
                    </div>
                    <div className="col-12">
                      <SelectField name='petType' className=" mr-sm-2 w-100" id="inlineFormCustomSelectPref" label='' placeholder={'Choose'}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-lg-5 col-12">
                  <label>Breed</label>
                  <TextField id={'txt-field'} name='breed' className="mr-sm-2 w-100" placeholder="Breed name" label=''/>
                </div>
                <div className="col-lg-7 col-12">
                  <label>Age</label>
                  <div className="row">
                    <div className="col-4">
                      <NumField id={'txt-field'} name='age' className="mr-sm-2 w-100" placeholder="Age" min={0} label=''/>
                    </div>
                    <div className="col-8">
                      <SelectField name='timeFrame' className="custom-select mr-sm-2 w-100" id="inlineFormCustomSelectPref" label='' placeholder="weeks/months/years"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-3 px-2">
                <label>Pet Description</label>
                <LongTextField name='description' className="py-3 mt-1" placeholder="" label=''/>
              </div>
              <div className="row py-3">
                <label className="pb-3">Personality</label>
              </div>
              <MultiSelectField name='personality' label=''/>
              <div className="row pt-3">
                <label>Add Photo for Listing</label>
                <hr/>
                <div className="col-12">
                  <div className="row">
                    <div className="col-lg-3 col-5">
                      <label>Upload Photo</label>
                      <TextField name='photoUrl' placeholder="image url" label=''/>
                    </div>
                  </div>
                </div>
              </div>
              <HiddenField name='status' label=''/>
              <div className="row pt-5 justify-content-center">
                <div className="row">
                  <div className="col-12 text-center">
                    <SubmitField value='Submit' id="btn-custom"/>
                  </div>
                </div>
              </div>
            </AutoForm>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPet;
