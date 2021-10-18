import React, { Component } from 'react';
import axios from 'axios';

class TestAddPet extends React.Component {
    state = {
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        axios.post('')
    }

    render() {
        return (
            <div className="container-fluid py-5 my-5">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <label>Upload a photo</label>
                        <input className="btn-custom" type="file" onChange={this.fileSelectedHandler} multiple />
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-12">
                        <button className="btn btn-custom2" onClick={this.fileUploadHandler}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestAddPet;