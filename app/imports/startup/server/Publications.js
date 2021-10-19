import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Pets } from '../../api/pet/Pet';
import { Favorites } from '../../favorites/Favorites';

Meteor.publish(Favorites.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Favorites.collection.find({ _id: username });
  }
  return this.ready();
});

Meteor.publish(Pets.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Pets.collection.find({ owner: username });
  }
  return this.ready();
});

// Publish everything
Meteor.publish(Pets.adminPublicationName, function () {
  return Pets.collection.find();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.methods({
  updateWrap: function (owner, _id) {
    Favorites.collection.update(owner, { $addToSet: { favoriteIds: _id } }, { upsert: true });
  },
});
