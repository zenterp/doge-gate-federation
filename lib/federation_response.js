
export default class FederationResponse {
  constructor(name, tag) {
    this.name = name
    this.destination = 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    this.domain = DOMAIN
    this.tag = tag
  }

  render() {
    return {
      "federation_json" : {
        "type" : "federation_record",
        "destination" : this.name,
        "domain" : this.domain,
        "destination_address" : this.destination,
        "destination_tag" : this.tag,
        "currencies" : [
           {
              "currency" : 'DOG',
              "issuer" : 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
           }
        ],
        "expires" : new Date(),
      },
      "result" : "success"
    }
  }
}

