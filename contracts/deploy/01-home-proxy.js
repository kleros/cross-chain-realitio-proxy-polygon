const HOME_CHAIN_IDS = [80001, 137];
const paramsByChainId = {
  80001: {
    fxChild: "0xCf73231F28B7331BBe3124B907840A94851f9f11",
    realitio: "0x92115220c28e78312cce86f3d1de652cfbd0357a",
    foreignChainId: 5,
    metadata:
      '{"tos":"ipfs://QmNV5NWwCudYKfiHuhdWxccrPyxs4DnbLGQace2oMKHkZv/Question_Resolution_Policy.pdf", "foreignProxy":true}',
  },
  137: {
    fxChild: "0x8397259c983751DAf40400790063935a11afa28a",
    realitio: "0x60573B8DcE539aE5bF9aD7932310668997ef0428",
    foreignChainId: 1,
    metadata:
      '{"tos":"ipfs://QmNV5NWwCudYKfiHuhdWxccrPyxs4DnbLGQace2oMKHkZv/Question_Resolution_Policy.pdf", "foreignProxy":true}',
  },
};

async function deployHomeProxy({ deployments, getNamedAccounts, getChainId }) {
  const { deploy } = deployments;

  const accounts = await getNamedAccounts();
  const { deployer } = accounts;
  const chainId = await getChainId();

  const { fxChild, realitio, foreignChainId, metadata } = paramsByChainId[chainId];

  const homeProxy = await deploy("RealitioHomeArbitrationProxy", {
    from: deployer,
    gas: 8000000,
    args: [fxChild, realitio, foreignChainId, metadata],
  });

  // Note that Foreign proxy should be manually linked post-deployment, using setFxRootTunnel() of homeProxy.

  console.log("Home Proxy:", homeProxy.address);
}

deployHomeProxy.tags = ["HomeChain"];
deployHomeProxy.skip = async ({ getChainId }) => !HOME_CHAIN_IDS.includes(Number(await getChainId()));

module.exports = deployHomeProxy;
