let match = false;
let current_url;
let websites =[];
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.local.get("website", (result) => {
    websites = result.website || [];
    console.log(websites)
  });

  current_url = tab.url
  let matchedWebsite = null; // Initialize a variable to store the matched website URL

  let match = websites.some((website) => {
    if (current_url.includes(website)) {
        matchedWebsite = website; // Store the matched website URL
        return true; // Return true to stop the iteration
    }
    return false;
  });
  console.log('Current URL:', current_url);
  console.log('Matched Website:', matchedWebsite)
  if (match && matchedWebsite) {
    chrome.storage.local.set({ url: current_url}, () => {
        console.log('Stored URL:', current_url);
        // chrome.tabs.update({ url: chrome.runtime.getURL('new.html') });
    });
    
  chrome.storage.local.get(tabId.toString(), (result) => {
    if (!result[tabId]){
      console.log('Running countdown and redirection');
      chrome.tabs.update({url: chrome.runtime.getURL('countdown.html')})
      chrome.storage.local.set({[tabId.toString()]: true})
    }

  })
    // chrome.tabs.get(tabId,(currentTab)=> {
    //   if ( !currentTab.state || !currentTab.state.extensionRan){
    //     chrome.tabs.update(tabId, {state: {extensionRan: true}}, () =>{
    //       console.log('Running countdown and redirection');
    //       chrome.tabs.update({url: chrome.runtime.getURL('new.html')})
    //     }
    //     )
    //   }
    // })

  }
})


  // const match = websites.some((website, index) => current_url.includes(website));
  // if (match) {
  //   console.log("hello")
  //   chrome.storage.local.set({url: websites[index]})
  //   chrome.tabs.update({url: chrome.runtime.getURL('new.html')})
  // }
  // chrome.tab.get((tabId,currentTab)=> {
  //   if ( !currentTab.state || !currentTab.state.extensionRan){
  //     chrome.tabs.update(tabId, {state: {extensionRan: true}}, () =>{
  //       console.log('Running countdown and redirection');
  //     }
  //     )
  //   }
  // })
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') });
});
// document.getElementById('addWebsiteBtn').addEventListener('click', console.log(websites));

// const redirectMap = {
//   "example.com": "https://example.com/redirected-page",
//   "anotherexample.com": "https://anotherexample.com/redirected-page"
//   // Add more websites and redirect URLs as needed
// };

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (websites.length === 0){
//     return websites
//   }
//   websites.forEach(website => {
//     console.log(website)
//     if (changeInfo.status === "complete" && tab.url == website) {
//         for (const [website, redirectUrl] of Object.entries(redirectMap)) {
//           if (tab.url.includes(website)) {
//             chrome.tabs.update(tabId, { url: redirectUrl });
//             break;
//           }
//         }
//       }
//   })
  
// });
