import { Pets } from '../../api/pet/Pet.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.petName} (${data.breed}, ${data.petType})`);
  Pets.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Pets.collection.find({}).count() === 0) {
  console.log('Creating pet data.');

  const filename = 'pets.json';
  const petJson = JSON.parse(Assets.getText(filename));

  petJson.petData.map(data => addData(data));
}
