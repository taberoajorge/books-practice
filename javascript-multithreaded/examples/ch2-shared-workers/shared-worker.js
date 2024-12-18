const ID = Math.floor(Math.random() * 999999);
console.log("shared-worker.js loaded", ID);

const ports = new Set();

self.onconnect = (event) => {
  const port = event.ports[0];
  ports.add(port);
  console.log("PORT CONNECTED", ID, ports.size);

  port.onmessage = (event) => {
    console.log("MESSAGE", ID, event.data);
    if (event.data === "close") {
      ports.delete(port);
      console.log("PORT DISCONNECTED", ID, ports.size);
      return;
    }
    for (const p of ports) {
      p.postMessage([ID, event.data]);
    }
  };
};
