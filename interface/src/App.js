import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import {IPFS_ADDRESS, IPFS_ABI} from './ipfs_contract';
import ipfs from './ipfs';

class App extends React.Component {
    constructor(props){
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFileHashChange = this.handleFileHashChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleRetrieve = this.handleRetrieve.bind(this);
        this.convertToBuffer = this.convertToBuffer.bind(this);
    }

    state = {
        fileBuffer: null,
        fileHash: '',
        uploadText: '',
        retrieveText: ''
    }

    handleFileChange(event) {
        event.preventDefault();
        const file = event.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => this.convertToBuffer(reader);
    }

    async convertToBuffer(reader){
        const buffer = await Buffer.from(reader.result);
        this.setState({fileBuffer: buffer});
        console.log(buffer);
    }

    handleFileHashChange(event) {
        this.setState({fileHash: event.target.value});
    }

    async handleUpload(event) {
        event.preventDefault();
        const resp2 = await ipfs.add(this.state.fileBuffer);
        this.setState({uploadText: `Uploaded with hash ${resp2[0].path}`});
    }

    async handleRetrieve(event) {
        event.preventDefault();
        const resp = await ipfs.get(`/ipfs/${this.state.fileHash}`);
        let buffer = Buffer.from(resp[0].content);
        console.log(buffer);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleUpload}>
                    <label htmlFor='path'>File to be uploaded: </label>
                    <input type='file' name='path' id='path' onChange={this.handleFileChange}></input>
                    <button type='submit'>Upload</button>
                    <span>{this.state.uploadText}</span>
                </form>
                <form onSubmit={this.handleRetrieve}>
                    <label htmlFor='hash'>Hash to be retrieved: </label>
                    <input type='text' name='hash' id='hash' onChange={this.handleFileHashChange}></input>
                    <button type='submit'>Retrieve</button>
                    <span>{this.state.retrieveText}</span>
                </form>
            </div>
        )
    }
}

export default App;
