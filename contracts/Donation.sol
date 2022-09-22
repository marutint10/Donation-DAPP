//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
contract Donation {
  address owner;
  uint256 totalDonations;

  struct Donations {
    address donor;
    uint256 amount;
  }
  Donations donation;
  Donations[] donations;

  constructor() {
    owner = msg.sender;
  }

  receive() external payable {
    donation  = Donations(
      msg.sender,
      msg.value
    );

    donations.push(donation);
    totalDonations += msg.value;
  }

  function getDonations() external view returns (Donations[] memory) {
    return donations;
  }

  function getTotalDonations() external view returns (uint256) {
    return totalDonations;
  }
}