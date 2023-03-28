module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const purchaseCap = ethers.utils.parseEther(String(333340));

  await deploy("IDOSale", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy

    from: deployer,
    args: ["0x28cb21bd49351699C0414CF18BEE720BC64CcB7c", "0xCfEF4B3F7B2a606a0Ed5c2C2C933973B224baa4a", 6666700, 5155, purchaseCap],
    log: true,
  });
  // await deploy("APD", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy

  //   from: deployer,
  //   log: true,
  // });

  // await deploy("ARB", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy

  //   from: deployer,
  //   log: true,
  // });
};
// module.exports.tags = ["ARB"];
// module.exports.tags = ["APD"];
// module.exports.tags = ["IDOSale"];
