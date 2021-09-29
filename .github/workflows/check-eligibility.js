module.exports = async (context, github) => {
  const issueId = JSON.parse(context.payload.issue.body).issueId
  const username = context.payload.issue.user.login
  const query = `query($issueId:ID!) {
    node(id: $issueId) {
      ... on Issue {
        closed
        comments (last: 100, orderBy: { field: , UPDATED_AT, direction: DESC}) {
          nodes {
            body
            author {
              login
            }
          }
        }
        timelineItems(itemTypes: [CLOSED_EVENT], last: 1) {
          nodes {
            ... on ClosedEvent {
              actor {
                login
              }
              closer {
                __typename
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
  const issue = await github.graphql(query, variables)
  const closedEvent = issue.node.timelineItems.nodes[0]

  if (!issue.closed) return false

  // either the issue was closed by a pull request by the user
  if (
    closedEvent.closer &&
    closedEvent.closer.__typename === 'Pull Request' &&
    closedEvent.closer.author.login === username
  ) {
    return true
  } else {
    // or the person who closed the issue must mention that user in a comment ("release to @username")
    let releasedByComment = false
    console.log(issue)
    issue.node.comments.nodes.forEach(comment => {
      console.log(comment)
      if (
        comment.author.login === closedEvent.actor.login &&
        comment.body.toLowerCase().includes('release bounty to @' + username)
      ) {
        releasedByComment = true
      }
    })
    
    return releasedByComment
  }
}