import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { _ } from 'lodash';

/**
 * The urlCollection. It encapsulates state and variable values for stuff.
 */

class PetPhotos {
    constructor() {
        this.name = 'PetPhotos';
        this.collection = new Mongo.Collection(this.name);
        this.schema = new SimpleSchema({
            owner: String,
            photoUrl: {
                type: String,
            }
        }, { tracker: Tracker });

        // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
        this.collection.attachSchema(this.schema);
        // Define names for publications and subscriptions
        this.userPublicationName = `${this.name}.publication.user`;
        this.adminPublicationName = `${this.name}.publication.admin`;
    }
    // Returns an array containing all the pets from the user.
    getAllPets(owner) {
        const petsListed = this.collection.find({ owner }).fetch();
        const petsList = [];

        _.forEach(petsListed, function (data) {
            const { petName, breed, age, description, photoUrl, status, petType } = data;

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
    
  // Checks if owner has any pet listings
  recordExists(owner) {
    const petListing = this.collection.find({ owner }).fetch();
    if (petListing.length === 0) {
      return false;
    }
    return true;
  }
  
  // Returns the most recent check-in.
  getAllPetsPhotoUrl(owner) {
    return this.collection.find({ owner }).fetch();
  }

}



export const photoUrl = new PetPhotos();