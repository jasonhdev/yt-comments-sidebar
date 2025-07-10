let isCommentsRight = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggle-comments') {
    isCommentsRight = !isCommentsRight;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0] && tabs[0].id) {
        let scriptToExecute = isCommentsRight ? "toggle.js" : "default.js";
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: [scriptToExecute]
        });
      }
    });
  }
});