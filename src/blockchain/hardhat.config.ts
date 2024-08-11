import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const ALCHEMY_API_KEY = "pZrY82LiRq-ebekynxrUcYzSdtPfDPEn";

const SEPOLIA_PRIVATE_KEY =
  "3419239e818b7aaa3bd6293b6ad34f0efba02cfbefb6933144548dfd09bea8ae";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};

export default config;
