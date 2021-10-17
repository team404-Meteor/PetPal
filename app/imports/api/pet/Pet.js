import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { ImageField } from 'uniforms-semantic';

/**
 * The PetCollection. It encapsulates state and variable values for stuff.
 */
class PetCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PetCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      // <Segment>
      //   <TextField name='petName'/>
      //   <TextField name='breed'/>
      //   <TextField name='age'/>
      //   <TextField name='description'/>
      //   <TextField name='photoUrl'/>
      //   <SelectField name='status'/>
      //   <SelectField name='petType'/>
      //   <SubmitField value='Submit'/>
      //   <ErrorsField/>
      // </Segment>
      owner: String,
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

    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the PetCollection.
 * @type {PetCollection}
 */
export const Pets = new PetCollection();
