const hre =require("hardhat")

async function main(){
 
  const gallery=await hre.ethers.deployContract("Gallery");

  await gallery.waitForDeployment();

  console.log(`Deployed to  ${gallery.target}` );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});