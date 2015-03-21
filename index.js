const fs      = require('fs')
const express = require('express')
const PORT    = process.env.PORT || 3000
const https   = require('https')

const privateKey  = fs.readFileSync(__dirname+'/ssl/server.key', 'utf8');
const certificate = fs.readFileSync(__dirname+'/ssl/server.crt', 'utf8');

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

const DOGECOIN_ADDRESS = 'D7sJFKkqVnVc1TEpJPvMmfyUyACpb2x3Pz'

app.get('/ripple_federation', (req, res) => {
  let dogecoinAddress = req.query['destination']
  
  dogecoin.validateAddress(dogecoinAddress, (error, resp) => {
    if (error) { return res.status(500).send({error: error}) }

    if (resp.isvalid) {
      res.status(200).send({
        "federation_json" : {
          "type" : "federation_record",
          "destination" : dogecoinAddress,
          "domain" : '127.0.0.1:3000',
          "destination_address" : 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
          "destination_tag" : 12345,
          "currencies" : [
             {
                "currency" : 'DOG',
                "issuer" : 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
             }
          ],
          "expires" : new Date(),
        },
        "result" : "success"
      })
    } else {
      res.status(400).send({ error: 'invalid dogecoin address' })
    }
  })
})

app.use(express.static(__dirname+'/public'))

if (process.env.SSL) {

  const  httpsServer = https.createServer({
    key: privateKey,
    cert: certificate
  }, app);

  httpsServer.listen(PORT, () => {
    console.log("listening on port", PORT)
  })

} else {

  app.listen(PORT, () => {
    console.log("listening on port", PORT)
  })
}
