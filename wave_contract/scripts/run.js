const main = async () => {
  const [owner, randomPeople] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deploy to:", waveContract.address);
  console.log("Contract deploy by:", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  const firstWaveTxn = await waveContract.wave("First wave");
  firstWaveTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  await waveContract.getTotalWaves();

  const secondWaveTxn = await waveContract
    .connect(randomPeople)
    .wave("Second wave");
  await secondWaveTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  const thirdWaveTxn = await waveContract
    .connect(randomPeople)
    .wave("Third wave");
  await thirdWaveTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  await waveContract.getTotalWavesBySender();
  await waveContract.connect(randomPeople).getTotalWavesBySender();

  await waveContract.getTotalWaves();

  await waveContract.getAllUsers();

  const allWaves = await waveContract.getAllWaves();
  console.log("All waves:", allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
