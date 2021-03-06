import React, { Component } from 'react';
import Web3 from 'web3';
import ethmemphisLogo from './ethmemphis-logo.png';
import '../css/oswald.css';
import '../css/open-sans.css';
import '../css/pure-min.css';
import './styles.css';

let apply;
// let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
let web3 = window.web3
// stolen code zone vvv

if (typeof web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
  web3 = new Web3(window.web3.currentProvider);
  console.log("first case");
} else {
  console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
}

// stolen code zone ^^^

let AFAbi = require('../../ABIs/Application-Form-Abi.js');
let AFAddress = require('../../Contract-Address/Rinkeby-Address.js');
let AF = web3.eth.contract(AFAbi).at(AFAddress);

class ApplicationForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      firstName : '',
      lastName : '',
      email : '',
      gitHubUrl : '',
      linkedInUrl : '',
      interest : ''
    }

    this.imgUrl = './ethMemphis.jpg';

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleTextChange=this.handleTextChange.bind(this);
  }

  handleTextChange = (event) => {
    if(this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Apply fired!");
    console.log(AF.getTotalApplications((err,res)=>{
      if(err){
        console.log("there is an error with the callback");
      }
      console.log("success!");
      console.log(res);
    }));
    apply = AF.apply(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.gitHubUrl,
      this.state.linkedInUrl,
      this.state.interest,
      {from: web3.eth.accounts[0], gas: 3000000},
      (err,res)=>{
        if(err){
          console.log("there is an error with the callback");
        }
        console.log("success!");
        console.log(res);
      }
    );
    console.log(apply);
  }

  render(){
    return(
      <main className="container">
      <div className="ApplicationForm">
        <fieldset>
          <legend><img src={ethmemphisLogo} role="presentation"></img></legend>
          <p>First Name:
            <input id="firstName" type="text" onChange={this.handleTextChange} value={this.state.firstName} />
          </p>
          <p>Last Name:
            <input id="lastName" type="text" onChange={this.handleTextChange} value={this.state.lastName} />
          </p>
          <p>Email:
            <input id="email" type="text" onChange={this.handleTextChange} value={this.state.email} />
          </p>
          <p>GitHub URL:
            <input id="gitHubUrl" type="text" onChange={this.handleTextChange} value={this.state.gitHubUrl} />
          </p>
          <p>LinkedIn URL:
            <input id="linkedInUrl" type="text" onChange={this.handleTextChange} value={this.state.linkedInUrl} />
          </p>
          <p>Your skills and interests:
            <input id="interest" type="text" onChange={this.handleTextChange} value={this.state.interest} />
          </p>
          <hr/>
          <p>
            <input id="submit" type="submit" value="Select Rinkeby Test Network in MetaMask and Click Here!" onClick={this.handleSubmit} />
          </p>
        </fieldset>
      </div>
      </main>
    )
  }
}

export default ApplicationForm
