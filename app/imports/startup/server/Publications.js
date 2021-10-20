import { Meteor } from 'meteor/meteor';
import { Pets } from '../../api/pet/Pet';
import { Favorites } from '../../favorites/Favorites';

Pets.publish();

Meteor.publish(Favorites.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Favorites.collection.find({ _id: username });
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
