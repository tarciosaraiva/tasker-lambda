import AWS from 'aws-sdk'

export function handler (event, context) {
  const docClient = new AWS.DynamoDB.DocumentClient()

  docClient.scan({ TableName: 'projects' }, (err, data) => {
    if (err) {
      context.fail(err)
    } else {
      context.done(null, data)
    }
  })
}
