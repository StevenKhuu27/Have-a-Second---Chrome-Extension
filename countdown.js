let countdown;
let user_url = '';

chrome.storage.local.get('countdownTimer', (result) => {
  countdown = result.countdownTimer || 5
  console.log(countdown)
})

function updateCountdown(tabId) {
  document.getElementById("countdown").textContent = countdown;
  if (countdown === 0) {
    if (!user_url.startsWith("http")) {
      user_url = "http://" + user_url; // Assuming it's a valid domain without the protocol
    }
    chrome.tabs.update(tabId, { url: user_url }, (tab) => {
      // Tab updated successfully
      chrome.storage.local.set({ [tabId.toString()]: true });
      console.log('Tab updated:', tab);
    }); // Default website choice
    chrome.runtime.lastError && console.error(chrome.runtime.lastError);
  } else {
    countdown--;
    setTimeout(() => updateCountdown(tabId), 1000);
  }
}


chrome.tabs.getCurrent(tab =>  {
  chrome.storage.local.get("url", (result) => {
    user_url = result.url;
    console.log(user_url)
    chrome.storage.local.remove("url");
    updateCountdown(tab.id);
  }).catch(error => {
    console.log("Error: ",error);
  });
});

function renderHelpfulWebsites(helpfulWebsites) {
  const list = document.getElementById('helpfulWebsitesList');
  list.innerHTML = '';
  helpfulWebsites.forEach((helpfulWebsite, index) => {
    if (!helpfulWebsite.startsWith("http")) {
      helpfulWebsite = "https://www." + helpfulWebsite; // Assuming it's a valid domain without the protocol
    }
    const li = document.createElement('li');
    li.className = 'helpfulWebsiteItem';
    const a = document.createElement('a');
    a.textContent = helpfulWebsite;
    a.setAttribute('href', helpfulWebsite)
    li.appendChild(a);
    
    list.appendChild(li);
  });
}

chrome.storage.local.get('helpfulWebsites', (result) => {
  helpfulWebsites = result.helpfulWebsites || ['google.com']
  console.log(helpfulWebsites)
  renderHelpfulWebsites(helpfulWebsites)
})


// updateCountdown();


// function getquote(){
//     const api_url ="https://zenquotes.io/api/quotes/";

//     async function getapi(url)
//     {
//     const response = await fetch(url);
//     var data = await response.json();
//     console.log(data);
//     }

//     getapi(api_url);
// }

// setInterval(getquote, 1000 * 60 * 60 * 24);
