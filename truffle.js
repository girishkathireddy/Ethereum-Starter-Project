// Allows us to use ES6 in our migrations and tests.
require('babel-register')
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "retire picnic run spider net border foam crucial coil target gossip pony"

module.exports = {
  networks: {
    "ropsten": {
      network_id: 3,    // Official ropsten network id
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/your keys ")
      },
      gas: 4700000
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gas: 6600000
    }
  },
  rpc: {
    // Use the default host and port when not using ropsten
    host: "localhost",
    port: 8545
  }
};
