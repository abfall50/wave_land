// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "../node_modules/hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct User {
        address addressOfUser;
    }

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    mapping(address => uint256) addressToNumberOfWave;
    mapping(address => uint256) lastWavedAt;

    User[] users;
    Wave[] wavers;

    constructor() payable {
        console.log("One small step for man but one giant step for mankind!");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );

		lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        addressToNumberOfWave[msg.sender] += 1;
        if (addressToNumberOfWave[msg.sender] == 1) {
            users.push(User(msg.sender));
        }

        wavers.push(Wave(msg.sender, _message, block.timestamp));

        console.log(
            "%s has waved! He has sent a total of %d waves",
            msg.sender,
            addressToNumberOfWave[msg.sender]
        );

        seed = (block.timestamp + block.difficulty + seed) % 100;
        console.log("Random number: ", seed);

        if (seed < 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance);
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return wavers;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %s total waves!", totalWaves);
        return totalWaves;
    }

    function getTotalWavesBySender() public view returns (uint256) {
        console.log(
            "%s has sent %d waves",
            msg.sender,
            addressToNumberOfWave[msg.sender]
        );
        return addressToNumberOfWave[msg.sender];
    }

    function getTotalWavesByAddress(address _randomAddress)
        public
        view
        returns (uint256)
    {
        console.log(
            "%s has sent %d waves",
            _randomAddress,
            addressToNumberOfWave[_randomAddress]
        );
        return addressToNumberOfWave[_randomAddress];
    }

    function getAllUsers() public view returns (User[] memory) {
        return users;
    }
}
