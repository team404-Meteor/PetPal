import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import PetCard from '../components/PetCard';

const testPet = {
  name: 'Foo',
  breed: 'Baz',
  age: '2 years old',
  description: 'something something',
  photos: 'test',
  status: 'Available',
  type: 'Dog',
};

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

        <Grid.Row>
          <Grid.Column width={4}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Welcome to this template</h1>
            <p>Now get to work and modify this app!</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <PetCard pet={testPet} />
        </Grid.Row>

      </Grid>
    );
  }
}

export default Landing;
