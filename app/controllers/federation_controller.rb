
class FederationController < ApplicationController

  def index
    puts "params: #{params}"

    json = {
      federation_json: {
        type: 'federation_record',
        destination: 'steven',
        domain: '127.0.0.1:3000',
        destination_address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
        destination_tag: 127,
        dt: 127,
        currencies: [{ currency: 'DOG', issuer: 'rBHSN8boGYyff8aVmnzpfpZQeJpHo93A7y' }]
      },
      result: 'success'
    }

    render json: json
  end
end

