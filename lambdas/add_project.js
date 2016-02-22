import AWS from 'aws-sdk'
import { v1 } from 'node-uuid'

export function handler (event, context) {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const payload = {
    TableName: 'projects',
    Item: {
      id: v1(),
      name: event.name,
      due: event.due
    }
  }

  docClient.put(payload, (err, data) => {
    if (err) {
      context.fail(err)
    } else {
      context.done()
    }
  })
}
