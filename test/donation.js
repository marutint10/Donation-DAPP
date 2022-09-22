const { expect } = require("chai");

describe("Donation", function () {
  beforeEach(async function () {
    [signer1, signer2, signer3] = await ethers.getSigners();

    Donation = await ethers.getContractFactory("Donation", signer1);
    donation = await Donation.deploy();
  });

  describe("donateEther", function () {
    it("transfers ether to the contract", async function () {
      const provider = waffle.provider;

      await signer2.sendTransaction({
        to: donation.address,
        value: "100",
      });

      expect(await provider.getBalance(donation.address)).to.equal("100");
    });
  });

  describe("getTotalDonations", function () {
    it("returns the sum of donations transferred to the contract", async function () {
      const provider = waffle.provider;

      await signer1.sendTransaction({
        to: donation.address,
        value: "1",
      });
      await signer2.sendTransaction({
        to: donation.address,
        value: "5",
      });
      await signer3.sendTransaction({
        to: donation.address,
        value: "50",
      });

      expect(await donation.connect(provider).getTotalDonations()).to.equal(
        "56"
      );
    });
  });

  describe("getDonations", function () {
    it("returns an array of donations transferred to the contract", async function () {
      const provider = waffle.provider;

      await signer1.sendTransaction({
        to: donation.address,
        value: "10",
      });
      await signer2.sendTransaction({
        to: donation.address,
        value: "20",
      });

      const donations = await donation.connect(provider).getDonations();

      expect(donations[0].donor).to.equal(signer1.address);
      expect(donations[0].amount).to.equal("10");
      expect(donations[1].donor).to.equal(signer2.address);
      expect(donations[1].amount).to.equal("20");
    });
  });
});
