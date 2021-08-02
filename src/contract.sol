// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract Deposits {

    address owner;
    
    struct Deposit {
        address sender;
        string issueId;
        uint256 value;
    }
    uint256 nextDepositId = 0;
    mapping(address => uint256[]) depositsIdsBySender;
    mapping(uint256 => Deposit) depositsById;
    mapping(string => uint256) issueBalances;
    mapping(string => bool) withdrawnIssues;
    
    constructor() {
        owner = msg.sender;
    }
    
    function changeOwner(address _newOwner) public {
        require(msg.sender == owner, "Caller is not owner");
        owner = _newOwner;
    }
    
    function getDepositIdsBySender() public view returns(uint256[] memory) {
        return depositsIdsBySender[msg.sender];
    }

    function getDepositById(uint256 _depositId) public view returns(address, string memory, uint256) {
        return (depositsById[_depositId].sender, depositsById[_depositId].issueId, depositsById[_depositId].value);
    }

    function getIssueBalance(string calldata _issueId) public view returns(uint256) {
        return issueBalances[_issueId];
    }

    function deposit(string calldata _issueId) public payable {
        require(withdrawnIssues[_issueId] == false, "Issue has already been withdrawn.");
        issueBalances[_issueId] += msg.value;
        depositsById[nextDepositId] = Deposit(msg.sender, _issueId, msg.value);
        depositsIdsBySender[msg.sender].push(nextDepositId);
        nextDepositId++;
    }
    
    function cancel(uint256 _depositId) public {
        require(depositsById[_depositId].value > 0, "Deposit does not exist.");
        require(depositsById[_depositId].sender == msg.sender, "Deposit does not belong to you.");
        require(withdrawnIssues[depositsById[_depositId].issueId] == false, "Deposits for this issue have already been withdrawn.");
        
        uint256 value = depositsById[_depositId].value;
        issueBalances[depositsById[_depositId].issueId] -= depositsById[_depositId].value;
        delete depositsById[_depositId];
        payable(msg.sender).transfer(value);
    }

    function withdraw(string calldata _issueId, address _to) public {
        require(msg.sender == owner, "Caller is not owner");
        require(issueBalances[_issueId] > 0, "Issue has no deposits.");
        require(withdrawnIssues[_issueId] == false, "Issue has already been withdrawn.");
        
        uint256 value = issueBalances[_issueId];
        uint256 fee = value * 100 / 10000;
        issueBalances[_issueId] = 0;
        withdrawnIssues[_issueId] = true;
        payable(owner).transfer(fee);
        payable(_to).transfer(value - fee);
    }
}