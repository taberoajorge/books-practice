console.log("main.js loaded");

const worker = new Worker("worker.js");

worker.onmessage = (msg) => {
  console.log("message received from worker", msg.data);
  document.getElementById("status").className = "responsive";
  document.getElementById("status").textContent =
    msg.data.message || JSON.stringify(msg.data);
};

const blockMainThread = () => {
  document.getElementById("status").className = "blocked";
  document.getElementById("status").textContent = "Main thread is blocked";

  // Simulate a blocking task
  const start = Date.now();
  while (Date.now() - start < 5000) {
    // Busy-wait for 5 seconds
  }
  console.log("Blocking task completed on main thread");

  document.getElementById("status").className = "responsive";
  document.getElementById("status").textContent = "Main thread is responsive";
};

const delegateBlockingTaskToWorker = () => {
  document.getElementById("status").className = "blocked";
  document.getElementById("status").textContent = "Worker is processing task";
  worker.postMessage({ action: "block" });
};

const fetchDataFromWorker = () => {
  document.getElementById("status").className = "blocked";
  document.getElementById("status").textContent = "Worker is fetching data";
  worker.postMessage({
    action: "fetch",
    url: "https://jsonplaceholder.typicode.com/todos/1",
  });
};

// Log a message every second to show the main thread is free
setInterval(() => {
  console.log("Main thread is still responsive");
}, 1000);

console.log("main.js done");
