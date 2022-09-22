async function main() {
  [signer1, signer2, signer3] = await ethers.getSigners();

  const Donation = await ethers.getContractFactory("Donation", signer1);
  const donation = await Donation.deploy();

  console.log(
    "Donation contract deployed to:",
    donation.address,
    "by",
    signer1.address
  );

  await signer1.sendTransaction({
    to: donation.address,
    value: ethers.utils.parseUnits("0.1", 18),
  });
  await signer2.sendTransaction({
    to: donation.address,
    value: ethers.utils.parseUnits("0.1", 18),
  });
  await signer3.sendTransaction({
    to: donation.address,
    value: ethers.utils.parseUnits("2", 18),
  });
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
