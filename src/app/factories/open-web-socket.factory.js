export function webSocketFactory(socketFactory) {
  'ngInject';
  var myIoSocket = io.connect('localhost:5000', {secure: true});
  // Open a WebSocket connection
  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
}
