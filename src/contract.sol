// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract Deposits {

    address owner;
    mapping(string => uint256) depositSums;
    
    struct Deposit {
        string issueId;
        uint256 value;
    }
    mapping(address => Deposit[]) deposits;
    mapping(string => bool) withdrawn;
    
    constructor() {
        owner = msg.sender;
    }
    
    function changeOwner(address _newOwner) public {
        require(msg.sender == owner, "Caller is not owner");
        owner = _newOwner;
    }
    
    function getDeposits() public view returns(Deposit[] memory) {
        return deposits[msg.sender];
    }

    function deposit(string calldata _issueId) public payable {
        require(withdrawn[_issueId] == false, "Issue has already been withdrawn.");
        depositSums[_issueId] += msg.value;
        deposits[msg.sender].push(Deposit(_issueId, msg.value));
    }
    
    function cancel(uint256 _index) public {
        require(deposits[msg.sender][_index].value > 0, "Deposit does not exist.");
        require(withdrawn[deposits[msg.sender][_index].issueId] == false, "Issue has already been withdrawn.");
        
        uint256 value = deposits[msg.sender][_index].value;
        depositSums[deposits[msg.sender][_index].issueId] -= deposits[msg.sender][_index].value;
        delete deposits[msg.sender][_index];
        payable(msg.sender).transfer(value);
    }

    function withdraw(string calldata _issueId, address _to) public {
        require(msg.sender == owner, "Caller is not owner");
        require(depositSums[_issueId] > 0, "Issue has no deposits.");
        require(withdrawn[_issueId] == false, "Issue has already been withdrawn.");
        
        uint256 value = depositSums[_issueId];
        depositSums[_issueId] = 0;
        withdrawn[_issueId] = true;
        payable(_to).transfer(value);
    }
}