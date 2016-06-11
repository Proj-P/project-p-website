export function webSocketFactory(socketFactory) {
  'ngInject';

  var myIoSocket = io.connect('ws://api.project-p.xyz:80');
  // Open a WebSocket connection
  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
}
