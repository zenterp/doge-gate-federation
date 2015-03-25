import http from 'superagent'
import Promise from 'bluebird'

export default class GatewayzenClient {
  constructor(id, key) {
    this.id = id
    this.key = key
  }

  lookupName(name) {
    return new Promise((resolve, reject) => {
      http
        .get(`https://gatewayzen.com/api/gateways/${this.id}/identifiers/${name}/tag?token=${this.key}`)
        .end((error, response) => {
          if (error) { return reject(error) } 
          resolve(response.body)
        })
    })
  }
  
  listIdentifiers() {
    return new Promise((resolve, reject) => {
      http
        .get(`https://gatewayzen.com/api/gateways/${this.id}/identifiers?token=${this.key}`)
        .end((error, response) => {
          if (error) { return reject(error) } 
          resolve(response.body)
        })
    })
  }

  registerIdentifier(name) {
    return new Promise((resolve, reject) => {
      http
        .post(`https://gatewayzen.com/api/gateways/${this.id}/identifiers`)
        .send({
          token: this.key,
          name: name
        })
        .end((error, response) => {
          if (error) { return reject(error) } 
          resolve(response.body)
        })
    })
  }
}

