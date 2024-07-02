let websites = [];
let activeTabId = null;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ website: [] });
});

chrome.windows.onCreated.addListener(() => {
    chrome.windows.getAll({ populate: true }, (windows) => {
      windows.forEach((window) => {
        window.tabs.forEach((tab) => {
          chrome.storage.local.set({ [tab.id.toString()]: true });
        });
      });
    });
  });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.local.get("website", (result) => {
      websites = result.website || [];
      console.log(websites);

      current_url = new URL(tab.url).hostname;
      let match = websites.some((website) => current_url.includes(website));

      console.log('Current URL:', current_url);
      console.log('Match found:', match);

      if (match && tabId !== activeTabId) {
        chrome.storage.local.set({ url: tab.url }, () => {
          console.log('Stored URL:', tab.url);
        });

        chrome.storage.local.get(tabId.toString(), (result) => {
          if (!result[tabId]) {
            console.log('Running countdown and redirection');
            chrome.tabs.update(tabId, { url: chrome.runtime.getURL('countdown.html') });
            // chrome.storage.local.set({ [tabId.toString()]: true });
            // activeTabId = tabId; // Set the current active tab ID
          }
        });
      }
    });
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (tabId === activeTabId) {
    activeTabId = null; // Clear the active tab ID if the tab is closed
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') });
});
