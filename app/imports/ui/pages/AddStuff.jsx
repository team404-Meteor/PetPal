import React from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';
import 'bootstrap/dist/css/bootstrap';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert({ name, quantity, condition, owner },
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
            <div className="row">
              <div className="col text-center">
                <h2>Add a Listing</h2><hr />
              </div>
            </div>
            <div className="row">
              <form>
                <div className="row">
                  <div className="col">
                    <label>Name *</label>
                    <input type="text" className="form-control py-3 mt-1" placeholder="Pet's name" required />
                  </div>
                  <div className="col">
                    <div class="row">
                      <div class="col-12">
                        <label>Pet Type *</label>
                      </div>
                      <div class="col-12">
                        <select class="custom-select my-1 mr-sm-2 w-100" id="inlineFormCustomSelectPref" required>
                          <option selected>Choose...</option>
                          <option value="1">Dog</option>
                          <option value="2">Cat</option>
                          <option value="3">Rabbit</option>
                          <option value="3">Gerbil</option>
                          <option value="3">Bird</option>
                          <option value="3">Fish</option>
                          <option value="3">Reptile</option>
                          <option value="3">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row pt-3">
                  <div class="col-lg-5 col-12">
                    <label>Breed</label>
                    <input type="text" className="form-control py-3 mt-1" placeholder="Breed name" />
                  </div>
                  <div class="col-lg-7 col-12">
                    <label>Age</label>
                    <div class="row">
                      <div class="col-8">
                        <input type="number" className="form-control py-3 mt-1" placeholder="Age" />
                      </div>
                      <div class="col-4">
                        <select class="custom-select my-1 mr-sm-2 w-100" id="inlineFormCustomSelectPref" required>
                          <option selected>Choose...</option>
                          <option value="1">Week(s)</option>
                          <option value="2">Month(s)</option>
                          <option value="3">Year(s)</option>
                          <option value="3">Unsure</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row pt-3 px-2">
                  <label>Pet Description</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="row py-3">
                  <label className="pb-3">Personality</label>

                </div>

                <div class="row pt-3">
                  <label>Add Photo for Listing</label>
                  <hr/>
                  <div class="col-12">
                    <div class="row">
                      <div class="col-lg-3 col-5">
                        <label>Upload Photo</label>
                      </div>
                      <div class="col">
                        <button type="button" class="btn btn-custom">Browse</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row pt-5 justify-content-center">
                  <div class="row">
                    <div class="col-12 text-center">
                      <button type="button" class="btn btn-custom2">Submit</button>
                    </div>
                  </div>
                </div>
              </form>
            </div >
          </div >
        </div >
      </div >
    );
  }
}

export default AddStuff;
