import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

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
      owner: String,
      petName: String,
      breed: String,
      age: String,
      description: {
        type: String,
        defaultValue: '',
      },
      photoUrl: {
        type: String,
        defaultValue: 'images/default-pet-photo.png',
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
      photoSetUrls: Array,
      'photoSetUrls.$': String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  getAllPets() {
    return this.collection.find({}).fetch();
  }
  // Returns all the pets. (subscribe to admin)
  getAllPetsAdmin() {
    return this.collection.find({}).fetch();
  }

  // Returns an array containing all the pets from the user.
  getAllPets(owner) {
    const petsListed = this.collection.find({ owner }).fetch();
    const petsList = [];

    _.forEach(petsListed, function (data) {
      const { petName, breed, age, description, photoUrl, status, petType, _id } = data;

      petsList.push({
        petName,
        breed,
        age,
        description,
        photoUrl,
        status,
        petType,
        _id,
      });
    });

    return petsList;
  }

  // Returns the most recent check-in.
  getAllPetsPhotoUrl(owner) {
    return this.collection.find({ owner }).fetch();
  }

  // Checks if owner has any pet listings
  recordExists(owner) {
    const petListing = this.collection.find({ owner }).fetch();
    if (petListing.length === 0) {
      return false;
    }
    return true;
  }
}

/**
 * The singleton instance of the PetCollection.
 * @type {PetCollection}
 */
export const Pets = new PetCollection();
