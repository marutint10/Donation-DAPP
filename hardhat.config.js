require("@nomiclabs/hardhat-waffle");

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.13",
  paths: {
    artifacts: "./client/src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/qvjcU_5bNspZf2D1YZwenKWNd_Vkxyc3",
      accounts: [
        "24173b87776698ba47483a1544331168b3a61f4110e78e96d32c99b910f8518d",
      ],
      chainId: 4,
      blockConfirmations: 6,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
};
