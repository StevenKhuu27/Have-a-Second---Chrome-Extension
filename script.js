// For Websites that we want to block
let websites;
chrome.storage.local.get("website", (result) => {
    websites = result.website || [];
    console.log(websites)
    renderWebsites()
  });

function addWebsite() {
    const input = document.getElementById('websiteInput');
    const website = input.value.trim();

    if (website !== '') {
        websites.push(website);
        input.value = '';
        renderWebsites();
    }
    console.log(websites)
}

function removeWebsite(index) {
    websites.splice(index, 1);
    renderWebsites();
}

function renderWebsites() {
    const list = document.getElementById('websiteList');
    list.innerHTML = '';
    websites.forEach((website, index) => {
        const li = document.createElement('li');
        li.className = 'websiteItem';
        const span = document.createElement('span');
        span.textContent = website;
        li.appendChild(span);
        
        const button = document.createElement('button');
        button.className = 'removeBtn';
        button.textContent = 'Remove';
        button.addEventListener('click', () => {
            removeWebsite(index);
        });
        li.appendChild(button);
        
        list.appendChild(li);
    });
    chrome.storage.local.set({ website: websites }).then(() => {
        console.log("Value was set");
      });
}

document.getElementById('addWebsiteBtn').addEventListener('click', addWebsite);
// For websites that we would prefer to use instead

var websiteInput = document.getElementById("websiteInput");
// Execute a function when the user presses a key on the keyboard
websiteInput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("addWebsiteBtn").click();
    }
  });

let helpfulWebsites;
chrome.storage.local.get("helpfulWebsites", (result) => {
    helpfulWebsites = result.helpfulWebsites || [];
    console.log(helpfulWebsites)
    renderHelpfulWebsites()
  });
// let helpfulwebsite = ["stackoverflow.com","kindle.com"]

function addHelpfulWebsite() {
    const input = document.getElementById('helpfulWebsiteInput');
    const helpfulWebsite = input.value.trim();

    if (helpfulWebsite !== '') {
        helpfulWebsites.push(helpfulWebsite);
        input.value = '';
        renderHelpfulWebsites();
    }
    console.log(helpfulWebsites)
}

function removeHelpfulWebsite(index) {
    helpfulWebsites.splice(index, 1);
    renderHelpfulWebsites();
}

function renderHelpfulWebsites() {
    const list = document.getElementById('helpfulWebsiteList');
    list.innerHTML = '';
    helpfulWebsites.forEach((helpfulWebsite, index) => {
        const li = document.createElement('li');
        li.className = 'helpfulWebsiteItem';
        const span = document.createElement('span');
        span.textContent = helpfulWebsite;
        li.appendChild(span);
        
        const button = document.createElement('button');
        button.className = 'removeBtn';
        button.textContent = 'Remove';
        button.addEventListener('click', () => {
            removeHelpfulWebsite(index);
        });
        li.appendChild(button);
        
        list.appendChild(li);
    });
    chrome.storage.local.set({ helpfulWebsites: helpfulWebsites }).then(() => {
        console.log("Value was set");
      });
}
var helpfulWebsiteinput = document.getElementById("helpfulWebsiteInput");

// Execute a function when the user presses a key on the keyboard
helpfulWebsiteinput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("addHelpfulWebsiteBtn").click();
  }
});
document.getElementById('addHelpfulWebsiteBtn').addEventListener('click', addHelpfulWebsite);
// document.getElementById('addHelpfulWebsiteBtn').addEventListener('keydown', addHelpfulWebsite);

// Countdown
let countdown;
chrome.storage.local.get("countdownTimer", (result) => {
    countdown = result.countdownTimer || [];
    document.getElementById('countdownTimer').value = countdown
  });

document.getElementById('countdownTimer').addEventListener('input', () => {
    countdown = document.getElementById('countdownTimer').value || 5
    console.log(countdown)
    chrome.storage.local.set({ countdownTimer: countdown }).then(() => {
        console.log("Value was set");
    });
})
