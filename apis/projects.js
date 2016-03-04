import { v1 } from 'node-uuid'
import Promise from 'bluebird'
import DynamoDoc from 'dynamodb-doc'
import ApiBuilder from 'claudia-api-builder'

const api         = new ApiBuilder()
const docClient   = new DynamoDoc.DynamoDB()
const P_DocClient = Promise.promisifyAll(docClient)

api.get('/projects', (req) => {
  return P_DocClient.scanAsync({ TableName: 'projects' })
})

api.post('/projects', (req) => {
  const payload = {
    TableName: 'projects',
    Item: {
      id: v1(),
      name: req.body.name,
      due: req.body.due
    }
  }

  return P_DocClient.putItemAsync(payload)
})

api.delete('/projects/{id}', (req) => {
  const payload = {
    TableName: 'projects',
    Key: {
      id: req.pathParams.id
    }
  }

  return P_DocClient.deleteItemAsync(payload)
})

api.put('/projects/{id}', (req) => {
  const payload = {
    TableName: 'projects',
    Item: {
      id: req.pathParams.id,
      name: req.body.name,
      due: req.body.due
    }
  }

  return P_DocClient.putItemAsync(payload)
})

module.exports = api
