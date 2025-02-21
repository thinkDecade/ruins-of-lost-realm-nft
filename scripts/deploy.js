const { ethers, upgrades } = require("hardhat");

async function main() {
  console.log("Deploying RunesOfLostRealms...");
  
  const baseURI = process.env.BASE_URI;
  if (!baseURI) {
    throw new Error("BASE_URI not set in environment");
  }

  const RunesOfLostRealms = await ethers.getContractFactory("RunesOfLostRealms");
  
  const runesContract = await upgrades.deployProxy(RunesOfLostRealms, 
    [baseURI],
    { 
      kind: 'uups',
      initializer: 'initialize'
    }
  );

  await runesContract.waitForDeployment();
  const runesAddress = await runesContract.getAddress();

  console.log("RunesOfLostRealms deployed to:", runesAddress);

  // Wait for some blocks for Arbiscan to index the deployment
  console.log("Waiting for 5 blocks...");
  await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds

  // Verify the implementation contract
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(runesAddress);
  console.log("Implementation address:", implementationAddress);

  console.log("Verifying contract...");
  await hre.run("verify:verify", {
    address: implementationAddress,
    constructorArguments: []
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 