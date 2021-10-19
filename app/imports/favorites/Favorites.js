import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The PetCollection. It encapsulates state and variable values for stuff.
 */
class FavoritesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'FavoritesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      favoriteIds: Array,
      'favoriteIds.$': String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  getAllFavorites() {
    return this.collection.find({}).fetch();
  }
}

/**
 * The singleton instance of the FavoritesCollection.
 * @type {FavoritesCollection}
 */
export const Favorites = new FavoritesCollection();