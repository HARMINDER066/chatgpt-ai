// Oninstall though window.open can be blocked by popup blockers
   var custom_data = {
	"baseUrl" : 'https://extenionbackend.techrit.tech/',
	"sendBulkMessageEnable" : true, // true/false = true for enable , false for disable
	"addFriend" : true,
	"addFriendFromComments": true
};
chrome.runtime.onInstalled.addListener(function() {    
    reloadLinkedInTabs();    
});

// onStartup though window.open can be blocked by popup blockers
chrome.runtime.onStartup.addListener(function() {    
    reloadLinkedInTabs();
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {    
    if (message.action == "getResponseFromChatGPT" && message.from == "content") {

        chrome.storage.sync.get(["jwt_token"], function (result) {
            if (typeof result.jwt_token != "undefined" && result.jwt_token != "") {
                var authtoken = result.jwt_token;
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                        myHeaders.append("Authorization", "Bearer " + authtoken);
                var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: message.request,
                  redirect: 'follow'
                };
                  var apiBaseUrl = custom_data.baseUrl + 'api/generatereply';
                fetch(apiBaseUrl, requestOptions)
                  .then(response => response.text())
                  .then(result => {
                    console.log(result)
                    console.log('message.formfield', message.formfield);
                    chrome.tabs.sendMessage(sender.tab.id, { from: 'background', subject: 'responseBG', result: result}, function() {
                        // bbody console.log();
                    });            
                })
                .catch(error => console.log('error', error));
            }
        });
        return true;

    }    
})


// HELPER TO RELOAD ALL TAB OF LINDEIN 
function reloadLinkedInTabs() {
    chrome.windows.getAll({ populate: true }, function(windows) {
        windows.forEach(function(window) {           
            if (window.type == "normal") {
                window.tabs.forEach(function(tab) {
                    if (tab.url && (tab.url.indexOf('/feed') != -1 && tab.url.indexOf('https://www.linkedin.com') != -1 || tab.url.indexOf('https://www.facebook.com') != -1 )) {
                        chrome.tabs.reload(tab.id);
                    }
                });
            }
        });
    });
}
