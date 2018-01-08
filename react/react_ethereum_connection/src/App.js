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
                          "constant": false,
                          "inputs": [],
                          "name": "kill",
                          "outputs": [],
                          "payable": false,
                          "stateMutability": "nonpayable",
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
      ContractInstance: MyContract.at ('0x03b0bfddd1936a4e838ea72c0186ae123a9160e8')
    }


    this.querySecret = this.querySecret.bind (this);
  }

  querySecret () {
      const { getSecret } = this.state.ContractInstance;

      getSecret ((err, secret) => {
        if(err) console.error ('An error occured::::', err);
        console.log('This is our contract\'s secret::::', secret);
      });
    }

  render() {
    return (
      <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <h1 className="App-title"> React & Ethereum Simple Application</h1>
          </header>

          <br />
          <br />
          <button onClick={ this.querySecret }> Query Smart Contract\'s Secret </button>
          <br />
          <br />
        </div>
    );
  }
}

export default App;
