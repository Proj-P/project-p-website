export function webSocket($websocket, $log) {
  'ngInject';

  // Open a WebSocket connection
  let dataStream = $websocket('ws://192.168.2.26/ws');

  let collection = [];

  dataStream.onMessage(function(message) {
    $log.log(message);
    collection.push(JSON.parse(message.data));
  });

  let methods = {
    collection: collection,
    get: function() {
      dataStream.send(JSON.stringify({ action: 'get' }));
    }
  };

  return methods;
}
