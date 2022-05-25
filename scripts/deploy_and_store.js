const { ethers } = require("hardhat");

async function main() {
  await hre.run("compile");
  // deploying contract
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();
  await simpleStorage.deployed();

  //call the store function
  const transactionResponse = await simpleStorage.store(1);

  /*transactionRecipt is the one that have our events 
  once we waited for the block to confirm*/
  const transactionReceipt = await transactionResponse.wait();
  //console.log(transactionReceipt);
  //print specific information from event 0
  console.log(transactionReceipt.events[0].args.oldNumber.toString());
  console.log(transactionReceipt.events[0].args.newNumber.toString());
  console.log(transactionReceipt.events[0].args.addedNumber.toString());
  console.log(transactionReceipt.events[0].args.sender);

  console.log("contract address:", simpleStorage.address);
  //console.log(transactionReceipt.events[0]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
