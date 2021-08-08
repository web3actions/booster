import { CancelEvent, DepositEvent, WithdrawEvent } from "./generated/Deposits/Deposits"
import { Issue, Deposit } from "./generated/schema"

export function handleDepositEvent(event: DepositEvent): void {
  let issue = Issue.load(event.params.issueId.toString())
  if (issue == null) {
    issue = new Issue(event.params.issueId.toString())
    issue.save()
  }

  let deposit = new Deposit(event.params.depositId.toString())
  deposit.sender = event.params.sender
  deposit.issue = event.params.issueId
  deposit.value = event.params.value
  deposit.withdrawalRound = event.params.withdrawalRound
  deposit.save()
}

export function handleCancelEvent(event: CancelEvent): void {}

export function handleWithdrawEvent(event: WithdrawEvent): void {}
