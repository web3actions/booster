// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.7;

import "@web3actions/contracts/src/GithubWorkflowClient.sol";

contract Deposits is GithubWorkflowClient {
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

    constructor(string memory _hash, address _signer) {
        registerGithubWorkflow(msg.sender, "withdraw", _hash);
        githubWorkflowSigner = _signer;
    }

    function getDepositIdsBySender() public view returns (uint256[] memory) {
        return depositsIdsBySender[msg.sender];
    }

    function getDepositById(uint256 _depositId)
        public
        view
        returns (
            address,
            string memory,
            uint256,
            uint256
        )
    {
        return (
            depositsById[_depositId].sender,
            depositsById[_depositId].issueId,
            depositsById[_depositId].value,
            depositsById[_depositId].issueWithdrawalRound
        );
    }

    function getIssueBalance(string calldata _issueId)
        public
        view
        returns (uint256)
    {
        return issueBalances[_issueId];
    }

    function getIssueWithdrawalRound(string calldata _issueId)
        public
        view
        returns (uint256)
    {
        return issueWithdrawalRounds[_issueId];
    }

    event DepositEvent(
        uint256 depositId,
        address sender,
        string issueId,
        uint256 value,
        uint256 withdrawalRound
    );

    function deposit(string calldata _issueId) public payable {
        issueBalances[_issueId] += msg.value;
        depositsById[nextDepositId] = Deposit(
            msg.sender,
            _issueId,
            msg.value,
            issueWithdrawalRounds[_issueId]
        );
        depositsIdsBySender[msg.sender].push(nextDepositId);

        emit DepositEvent(
            nextDepositId,
            msg.sender,
            _issueId,
            msg.value,
            issueWithdrawalRounds[_issueId]
        );

        nextDepositId++;
    }

    event CancelEvent(uint256 depositId);

    function cancel(uint256 _depositId) public {
        require(
            depositsById[_depositId].sender == msg.sender,
            "Deposit is not yours or does not exist."
        );
        require(
            depositsById[_depositId].issueWithdrawalRound ==
                issueWithdrawalRounds[depositsById[_depositId].issueId],
            "Deposit has already been withdrawn."
        );

        uint256 value = depositsById[_depositId].value;
        issueBalances[depositsById[_depositId].issueId] -= value;
        delete depositsById[_depositId];
        payable(msg.sender).transfer(value);

        emit CancelEvent(_depositId);
    }

    event WithdrawEvent(string issueId, address to, uint256 withdrawalRound);

    function withdraw(
        string calldata _issueId,
        address _to,
        uint256 _runId,
        bytes calldata _signature
    ) public onlyWorkflow(_runId, "withdraw", _signature) {
        require(issueBalances[_issueId] > 0, "Issue has no deposits.");

        payout(_issueId, _to);

        emit WithdrawEvent(_issueId, _to, issueWithdrawalRounds[_issueId]);
    }

    function payout(string memory _issueId, address _to) internal {
        uint256 value = issueBalances[_issueId];
        uint256 fee = (value * 100) / 10000;
        issueBalances[_issueId] = 0;
        issueWithdrawalRounds[_issueId]++;
        payable(githubWorkflows["withdraw"].account).transfer(fee);
        payable(_to).transfer(value - fee);
    }
}
