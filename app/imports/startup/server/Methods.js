import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { Favorites } from '../../favorites/Favorites';

Meteor.methods({
  getEmailKey: function () {
    const serviceID = Meteor.settings.serviceID;
    const templateID = Meteor.settings.templateID;
    const userID = Meteor.settings.userID;

    return { serviceID, templateID, userID };
  },

  sendEmail: function (to, petName) {

    check([to, petName], [String]);

    this.unblock();

    Email.send({
      to,
      from: 'petpal.meteor@gmail.com',
      subject: 'A pet from your favorites list has been adopted!',
      text: `${petName} from your favorites list has been adopted!\n\n-PetPal Team`,
    });
  },

  updateWrap: function (owner, _id) {
    check([owner, _id], [String]);
    Favorites.collection.update(owner, { $addToSet: { favoriteIds: _id } }, { upsert: true });
  },
});
