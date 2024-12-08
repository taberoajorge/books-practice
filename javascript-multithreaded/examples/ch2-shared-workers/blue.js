console.log("blue.js loaded");

const worker = new SharedWorker("shared-worker.js");

const normalWorker = new Worker("normal-worker.js");

normalWorker.onmessage = (event) => {
  console.log("PING", event.data);
};

worker.port.onmessage = (event) => {
  console.log("EVENT", event.data);
};

window.addEventListener("beforeunload", () => {
  worker.port.postMessage("close");
});
