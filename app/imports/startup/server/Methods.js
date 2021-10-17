import { Meteor } from 'meteor/meteor';

Meteor.methods({
  getEmailKey: function () {
    const serviceID = Meteor.settings.serviceID;
    const templateID = Meteor.settings.templateID;
    const userID = Meteor.settings.userID;

    return { serviceID, templateID, userID };
  },
});
