// recursive function to fetch all events where the issue was closed
const getIssueClosedEvents = (graphql, issueId, after = null, result = { events: [], body: '' }) => {
  const query = `query($issueId:ID!) {
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
    node(id: $issueId) {
      ... on Issue {
        body
        timelineItems(itemTypes: [CLOSED_EVENT], first: 1${after ? ', after: "' + after + '"' : ''}) {
          pageInfo {
              hasNextPage
              endCursor
          }
          nodes {
            ... on ClosedEvent {
              closer {
                ... on PullRequest {
                  author {
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  }`
  const variables = { issueId }

  return graphql(query, variables).then(res => {
    result.body = res.node.body
    result.events.push(...res.node.timelineItems.nodes)
    if (res.node.timelineItems.pageInfo.hasNextPage) {
      return getIssueClosedEvents(graphql, issueId, res.node.timelineItems.pageInfo.endCursor, result)
    } else {
      return result
    }
  }).catch(e => {
    throw e
  })
}

module.exports = async (graphql, username, issueId) => {
  return getIssueClosedEvents(graphql, issueId).then(result => {
    console.log(result)
    let releasedByPullRequest = false
    result.events.forEach(event => {
      if (event.closer && event.closer.author.login === username) {
        releasedByPullRequest = true
      }
    })
    
    const releasedByCommand = !!result.body.match(/\b\/release-eth\s+@${username}\b/igm)
    
    return releasedByCommand || releasedByPullRequest
  }).catch(e => {
    throw e
  })
}