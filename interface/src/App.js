import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import {IPFS_ADDRESS, IPFS_ABI} from './ipfs_contract';
import ipfs from './ipfs';

class App extends React.Component {
    constructor(props){
        super(props);
        this.handleFilePathChange = this.handleFilePathChange.bind(this);
        this.handleFileHashChange = this.handleFileHashChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleRetrieve = this.handleRetrieve.bind(this);
    }

    state = {
        filePath: '',
        fileHash: '',
        uploadText: '',
        retrieveText: ''
    }

    handleFilePathChange(event) {
        this.setState({filePath: event.target.value});
    }

    handleFileHashChange(event) {
        this.setState({fileHash: event.target.value});
    }

    async handleUpload(event) {
        event.preventDefault();
        const resp = await fetch(this.state.filePath, {crossDomain: true});
        const arrayBuffer = await resp.arrayBuffer();
        console.log(arrayBuffer);
        const resp2 = await ipfs.add(Buffer.from(arrayBuffer));
        this.setState({uploadText: `Uploaded with hash ${resp2[0].path}`});
    }

    async handleRetrieve(event) {
        event.preventDefault();
        console.log(this.state.fileHash);
        const resp = await ipfs.get(`/ipfs/${this.state.fileHash}`);
        console.log(resp);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleUpload}>
                    <label htmlFor='path'>Filepath to be uploaded: </label>
                    <input type='text' name='path' id='path' onChange={this.handleFilePathChange}></input>
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
