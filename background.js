chrome.omnibox.onInputEntered.addListener(function(text) {
       chrome.tabs.create({
                           url: 'http://www.editpad.org/'
                           }, function(tab) {
                           // chrome.tabs.executeScript takes a string that will be parsed and run
                           // as JavaScript code. To pass a string, you need to make sure that it
                           // does not contain any invalid characters. This can easily be achieved
                           // by serializing the input string to JSON.
                           var serializedValue = JSON.stringify(text);
                                    chrome.tabs.executeScript(tab.id, {                                                                                       code: 'document.getElementById("text").value = ' + serializedValue,                                                                                       }, function(result) {
                                                              if (!result) {
                                                              // This usually happens when you do not have the permission to
                                                              // run code in the page. Add the site to the "permissions"
                                                              // section manifest.json.
                                                              alert('Failed to run content script.\n' +
                                                                    chrome.runtime.lastError.message);
                                                              return;
                                                              }
                                                              // The value of the last expression is passed to the callback of
                                                              // chrome.tabs.executeScript, for each frame. The code runs only in
                                                              // the top-level frame (because `allFrames: true` is not specified),
                                                              // so the result is an array with only one element.
                                                              });
                          });
    });