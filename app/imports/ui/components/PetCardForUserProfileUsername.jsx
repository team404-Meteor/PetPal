import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Favorites } from '../../favorites/Favorites';
import { Redirect } from 'react-router-dom';


function PetCardForUserProfileUsername({
    pet: { owner, name, breed, age, photoUrl, _id },
}) {

    function addToFavorites(e) {
        e.preventDefault();
        const owner = Meteor.user().username;

        Meteor.call('updateWrap', owner, _id,
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'Item added successfully', 'success');
                }
            });
    }

    // const isLogged = Meteor.userId() !== null;



    function LoggedInCheckForFave() {
        const isLoggedIn = Meteor.userId() !== null;
        if (isLoggedIn) {
            return '';
        }
        return '';
    }



    return (
        <div className="container-fluid mx-0 px-0">
            <div className="row justify-content-center">
                <div className="col-12 mx-0 px-0 text-center">
                    <p class="small-font2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg> {owner}</p>
                </div>

                <LoggedInCheckForFave />



                {/*<Button onClick={addToFavorites} circular inverted color='red' icon='heart'/>*/}


            </div>

        </div>


    );
}

PetCardForUserProfileUsername.propTypes = {
    pet: PropTypes.shape({
        owner: PropTypes.string,
        name: PropTypes.string,
        breed: PropTypes.string,
        age: PropTypes.string,
        photoUrl: PropTypes.string,
    }).isRequired,
};
export default PetCardForUserProfileUsername;
