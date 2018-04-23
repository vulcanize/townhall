var path = require('path');
module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*"
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777
    },
    integration: {
      host: "127.0.0.1",
      port: 8545,
      gas: 4700000,
      gasPrice: 0,
      network_id: 17
    },
    rinkeby: {
      host: "127.0.0.1",
      port: 8545,
      gas: 4612388,
      from: "0xa1A3dDb9cF67580cA4852f0a8fCCDB1399f04F55",
      network_id: 4,
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  }
}
