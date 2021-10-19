import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Pets } from '../../api/pet/Pet';

Meteor.publish(Pets.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Pets.collection.find({ owner: username });
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
