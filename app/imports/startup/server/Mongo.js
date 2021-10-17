import { Meteor } from 'meteor/meteor';
import { Pets } from '../../api/pet/Pet.js';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Pets.collection.insert(data);
}

// Initialize the PetsCollection if empty.
if (Pets.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating pet default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
