export function webSocketFactory(socketFactory) {
  'ngInject';

  var myIoSocket = io.connect('https://api.project-p.xyz:443', {secure: true});
  // Open a WebSocket connection
  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
}
