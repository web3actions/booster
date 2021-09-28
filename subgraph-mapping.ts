import { store, BigInt } from '@graphprotocol/graph-ts'
import { CancelEvent, DepositEvent, WithdrawEvent } from "./subgraph/generated/Deposits/Deposits"
import { Issue, Deposit, Sender } from "./subgraph/generated/schema"

export function handleDepositEvent(event: DepositEvent): void {
  let issue = Issue.load(event.params.issueId.toString())
  if (issue == null) {
    issue = new Issue(event.params.issueId.toString())
    issue.withdrawalRound = BigInt.fromString('0')
    issue.save()
  }

  let sender = Sender.load(event.params.sender.toHexString())
  if (sender == null) {
    sender = new Sender(event.params.sender.toHexString())
    sender.save()
  }

  let deposit = new Deposit(event.params.depositId.toString())
  deposit.sender = event.params.sender.toHexString()
  deposit.issue = event.params.issueId
  deposit.value = event.params.value
  deposit.withdrawalRound = event.params.withdrawalRound
  deposit.save()
}

export function handleCancelEvent(event: CancelEvent): void {
  let deposit = new Deposit(event.params.depositId.toString())
  if (deposit != null) {
    store.remove('Deposit', event.params.depositId.toString())
  }
}

export function handleWithdrawEvent(event: WithdrawEvent): void {
  let issue = Issue.load(event.params.issueId.toString())
  if (issue != null) {
    issue.withdrawalRound = event.params.withdrawalRound
    issue.save()
  }
}
