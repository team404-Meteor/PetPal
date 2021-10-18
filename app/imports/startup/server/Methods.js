import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';

Meteor.methods({
  getEmailKey: function () {
    const serviceID = Meteor.settings.serviceID;
    const templateID = Meteor.settings.templateID;
    const userID = Meteor.settings.userID;

    return { serviceID, templateID, userID };
  },

  sendEmail: function (to) {

    check([to], [String]);

    this.unblock();

    Email.send({
      to,
      from: 'petpal.meteor@gmail.com',
      subject: 'A pet from your favorites list has been adopted!',
      text: 'A pet from your favorites list has been adopted!',
    });
  },
});
