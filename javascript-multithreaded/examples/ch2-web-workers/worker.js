self.onmessage = (msg) => {
  if (msg.data.action === "fetch") {
    fetchData(msg.data.url);
  } else if (msg.data.action === "block") {
    blockEventLoop();
  }
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log("fetch response", json);
    self.postMessage(json);
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};

const blockEventLoop = () => {
  // Simulate a blocking task
  const start = Date.now();
  while (Date.now() - start < 5000) {
    // Busy-wait for 5 seconds
  }
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => {
      console.log("fetch response", json);
      self.postMessage(json);
    })
    .catch((error) => {
      self.postMessage({ error: error.message });
    });
};
