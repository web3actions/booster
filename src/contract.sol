// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract Deposits {

    address owner;
    
    struct Deposit {
        address sender;
        string issueId;
        uint256 value;
        uint256 issueWithdrawalRound;
    }
    uint256 nextDepositId = 0;
    mapping(address => uint256[]) depositsIdsBySender;
    mapping(uint256 => Deposit) depositsById;
    mapping(string => uint256) issueBalances;
    mapping(string => uint256) issueWithdrawalRounds;
    
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

    function getIssueWithdrawalRound(string calldata _issueId) public view returns(uint256) {
        return issueWithdrawalRounds[_issueId];
    }

    function deposit(string calldata _issueId) public payable {
        issueBalances[_issueId] += msg.value;
        depositsById[nextDepositId] = Deposit(msg.sender, _issueId, msg.value, issueWithdrawalRounds[_issueId]);
        depositsIdsBySender[msg.sender].push(nextDepositId);
        nextDepositId++;
    }
    
    function cancel(uint256 _depositId) public {
        require(depositsById[_depositId].sender == msg.sender, "Deposit is not yours or does not exist.");
        require(depositsById[_depositId].issueWithdrawalRound == issueWithdrawalRounds[depositsById[_depositId].issueId], "Deposit has already been withdrawn.");
        
        uint256 value = depositsById[_depositId].value;
        issueBalances[depositsById[_depositId].issueId] -= value;
        delete depositsById[_depositId];
        payable(msg.sender).transfer(value);
    }

    function withdraw(string calldata _issueId, address _to) public {
        require(msg.sender == owner, "Caller is not owner");
        require(issueBalances[_issueId] > 0, "Issue has no deposits.");
        
        uint256 value = issueBalances[_issueId];
        uint256 fee = value * 100 / 10000;
        issueBalances[_issueId] = 0;
        issueWithdrawalRounds[_issueId]++;
        payable(owner).transfer(fee);
        payable(_to).transfer(value - fee);
    }
}