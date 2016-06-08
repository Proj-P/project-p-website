export function webSocketFactory(socketFactory, $log) {
  'ngInject';

  // Open a WebSocket connection
  return socketFactory({
    ioSocket: io.connect('ws://api.project-p.xyz:80')
  });
}
