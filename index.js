const fs      = require('fs')
const express = require('express')
const PORT    = process.env.PORT || 3000
const https   = require('https')
const http    = require('superagent')

const privateKey  = fs.readFileSync(__dirname+'/ssl/server.key', 'utf8');
const certificate = fs.readFileSync(__dirname+'/ssl/server.crt', 'utf8');

const DOMAIN = process.env.DOMAIN || 'doge-gate.com'
const DOGECOIN_ADDRESS = 'D7sJFKkqVnVc1TEpJPvMmfyUyACpb2x3Pz'

import FederationResponse from './lib/federation_response'
import GatewayzenClient from './lib/gatewayzen_client'

const dogecoin = require('node-dogecoin')({
  host: process.env.DOGECOIN_RPC_HOST,
  port: process.env.DOGECOIN_RPC_PORT,
  user: process.env.DOGECOIN_RPC_USER,
  pass: process.env.DOGECOIN_RPC_PASS
})

let app = express()

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.status(200).send({ success: true })
})

let gatewayZen = new GatewayzenClient(
  process.env.DOGEGATE_GATEWAYZEN_GATEWAY_ID,
  process.env.DOGEGATE_GATEWAYZEN_API_KEY
)

app.get('/ripple_federation', (req, res) => {
  let dogecoinAddress = req.query['destination']

  gatewayZen.lookupName(dogecoinAddress).then(identifier => {

    if (identifier) {
      let federation = new FederationResponse(dogecoinAddress, identifier.tag)
      res.status(200).send(federation.render())
    } else {

      dogecoin.validateAddress(dogecoinAddress, (error, resp) => {
        if (error) { return res.status(500).send({error: error}) }
        if (resp.isvalid) {
          
          gatewayzen.registerIdentifier(dogecoinAddress).then(identifier => {
            let federation = new FederationResponse(dogecoinAddress, identifier.tag)
            res.status(200).send(federation.render())
          })
          .error(error => {
            res.status(500).send({error: error}) 
          })
        } else {
          res.status(200).send({ success: false })
        }
      })
    }

  })
})

app.use(express.static(__dirname+'/public'))

app.listen(PORT, () => {
  console.log("listening on port", PORT)
})

