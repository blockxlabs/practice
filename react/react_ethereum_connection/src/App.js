import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props);

    const MyContract = window.web3.eth.contract ([
                        {
                          "constant": true,
                          "inputs": [],
                          "name": "you_awesome",
                          "outputs": [
                            {
                              "name": "",
                              "type": "string"
                            }
                          ],
                          "payable": false,
                          "stateMutability": "view",
                          "type": "function"
                        },
                        {
                          "constant": true,
                          "inputs": [],
                          "name": "pseudoRandomResult",
                          "outputs": [
                            {
                              "name": "",
                              "type": "bool"
                            }
                          ],
                          "payable": false,
                          "stateMutability": "view",
                          "type": "function"
                        },
                        {
                          "constant": true,
                          "inputs": [],
                          "name": "getState",
                          "outputs": [
                            {
                              "name": "",
                              "type": "string"
                            }
                          ],
                          "payable": false,
                          "stateMutability": "view",
                          "type": "function"
                        },
                        {
                          "constant": true,
                          "inputs": [],
                          "name": "getSecret",
                          "outputs": [
                            {
                              "name": "",
                              "type": "string"
                            }
                          ],
                          "payable": false,
                          "stateMutability": "view",
                          "type": "function"
                        },
                        {
                          "anonymous": false,
                          "inputs": [
                            {
                              "indexed": false,
                              "name": "result",
                              "type": "bool"
                            }
                          ],
                          "name": "ExperimentComplete",
                          "type": "event"
                        },
                        {
                          "constant": false,
                          "inputs": [],
                          "name": "kill",
                          "outputs": [],
                          "payable": false,
                          "stateMutability": "nonpayable",
                          "type": "function"
                        },
                        {
                          "constant": false,
                          "inputs": [],
                          "name": "setExperimentInMotion",
                          "outputs": [
                            {
                              "name": "",
                              "type": "bool"
                            }
                          ],
                          "payable": true,
                          "stateMutability": "payable",
                          "type": "function"
                        },
                        {
                          "constant": false,
                          "inputs": [
                            {
                              "name": "newState",
                              "type": "string"
                            }
                          ],
                          "name": "setState",
                          "outputs": [],
                          "payable": true,
                          "stateMutability": "payable",
                          "type": "function"
                        },
                        {
                          "inputs": [],
                          "payable": false,
                          "stateMutability": "nonpayable",
                          "type": "constructor"
                        },
                        {
                          "payable": true,
                          "stateMutability": "payable",
                          "type": "fallback"
                        }
                      ]);
    this.state = {
      ContractInstance: MyContract.at ('0xe2f36534d829ecbc5e2fb36924c194f6d80c33ac'),
      contractState: ''
    }


    this.querySecret = this.querySecret.bind (this);
    this.queryContractState = this.queryContractState.bind (this);    
    this.handleContractStateSubmit = this.handleContractStateSubmit.bind (this);
    this.queryConditionResult = this.queryConditionResult.bind (this);
    this.activateExperiment = this.activateExperiment.bind (this);
    this.state.event = this.state.ContractInstance.ExperimentComplete();
  }

  querySecret () {
      const { getSecret } = this.state.ContractInstance;

      getSecret ((err, secret) => {
        if(err) console.error ('An error occured::::', err);
        console.log('This is our contract\'s secret::::', secret);
      });
  }

  queryContractState () {
    const { getState } = this.state.ContractInstance;

    getState ((err, state) => {
      if (err) console.error ('An error occured::::', err);
      console.log ('This is our contract\'s state::::', state);
    });
  }

  handleContractStateSubmit (event) {
    event.preventDefault ();
    const { setState } = this.state.ContractInstance;
    const { contractState: newState } = this.state;

    setState (
      newState,
        {
          gas: 300000,
          from: window.web3.eth.accounts[0],
          value: window.web3.toWei (0.01, 'ether')
        }, (err, result) => {
          console.log ('Smart contract state is changing.');
        }
      )
  }

  queryConditionResult () {
    const { pseudoRandomResult } = this.state.ContractInstance;

    pseudoRandomResult ((err, result) => {
      console.log ('This is the smart contract conditional::::', result);
    });
  }

  activateExperiment () {
    const { setExperimentInMotion } = this.state.ContractInstance;

    setExperimentInMotion ({
      gas: 300000,
      from: window.web3.eth.accounts[0],
      value: window.web3.toWei (0.01, 'ether')
    }, (err, result) => {
      console.log ('Experiment to determine true or false set in motion.');
    });
  }

  render() {
    
    this.state.event.watch ((err, event) => {
      if (err) console.error ('An error occured::::', err);
      console.log ('This is the event::::', event);
      console.log ('This is the Experiment result::::', event.arg.result);
    });

    return (
      <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <h1 className="App-title"> React & Ethereum Simple Application</h1>
          </header>

          <br />
          <br />
          <button onClick={ this.querySecret }> Query Smart Contract's Secret </button>
          <br />
          <br />
          <button onClick={ this.queryContractState }> Query Smart Contract's State </button>
          <br />
          <br />
          <button onClick={ this.queryConditionResult }> Query Smart Contract Conditinal Result </button>
          <br />
          <br />
          <button onClick={ this.activateExperiment }> Start Experiment on smart Contract </button>
          <br />
          <br />
          <form onSubmit={ this.handleContractStateSubmit }>
            <input type="text" name="name-change" placeholder="Enter new state.."
              value={ this.state.contractState }
              onChange={ event => this.setState ({contractState: event.target.value })} />
            <button type="submit"> Submit </button>
          </form>
        </div>
    );
    
  }
}

export default App;
