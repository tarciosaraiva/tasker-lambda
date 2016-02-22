import AWS from 'aws-sdk'

export function handler (event, context) {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const payload = {
    TableName: 'projects',
    Key: {
      id: event.id
    }
  }

  console.log(payload)

  docClient.delete(payload, (err, data) => {
    if (err) {
      context.fail(err)
    } else {
      context.done(null, 'Delete successfully.')
    }
  })
}
