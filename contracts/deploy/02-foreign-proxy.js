const FOREIGN_CHAIN_IDS = [5, 1];
const paramsByChainId = {
  5: {
    checkpointManager: "0x2890bA17EfE978480615e330ecB65333b880928e",
    fxRoot: "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA",
    arbitrator: "0x1128eD55ab2d796fa92D2F8E1f336d745354a77A", // KlerosLiquid Goerli
    arbitratorExtraData:
      "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    metaEvidence: "/ipfs/QmYAomciorEQ3pisZP7DuzFN9TGhT5YaQYMJfnnw3ZJQYV/realitio.json",
    winnerMultiplier: 3000,
    loserMultiplier: 7000,
    loserAppealPeriodMultiplier: 5000,
  },
  1: {
    checkpointManager: "0x86e4dc95c7fbdbf52e33d563bbdb00823894c287",
    fxRoot: "0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2",
    arbitrator: "0x988b3a538b618c7a603e1c11ab82cd16dbe28069", // KlerosLiquid address
    arbitratorExtraData:
      "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f", // General Court - 31 jurors
    metaEvidence: "/ipfs/QmXWr4ZWCpBYtAHNHzTbKW9SkV1MwQicpWfthhDHkNYxKk/realitio.json",
    winnerMultiplier: 3000,
    loserMultiplier: 7000,
    loserAppealPeriodMultiplier: 5000,
  },
};

async function deployForeignProxy({ deployments, getNamedAccounts, getChainId }) {
  const { deploy } = deployments;

  const accounts = await getNamedAccounts();
  const { deployer } = accounts;
  const chainId = await getChainId();

  const {
    checkpointManager,
    fxRoot,
    arbitrator,
    arbitratorExtraData,
    metaEvidence,
    winnerMultiplier,
    loserMultiplier,
    loserAppealPeriodMultiplier,
  } = paramsByChainId[chainId];

  const foreignProxy = await deploy("RealitioForeignArbitrationProxyWithAppeals", {
    from: deployer,
    args: [
      checkpointManager,
      fxRoot,
      arbitrator,
      arbitratorExtraData,
      metaEvidence,
      winnerMultiplier,
      loserMultiplier,
      loserAppealPeriodMultiplier,
    ],
    gas: 8000000,
  });

  // Note that Home proxy should be manually linked post-deployment, using setFxChildTunnel() of foreignProxy.

  console.log("Foreign Proxy:", foreignProxy.address);
}

deployForeignProxy.tags = ["ForeignChain"];
deployForeignProxy.skip = async ({ getChainId }) => !FOREIGN_CHAIN_IDS.includes(Number(await getChainId()));

module.exports = deployForeignProxy;
