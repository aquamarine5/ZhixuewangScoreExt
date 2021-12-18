const generate = document.getElementById("generate");
if (generate) {
  generate.onclick = function() {
    console.log("Available")
    chrome.tabs.query({currentWindow:true,active:true},function(tabs){
      chrome.tabs.sendMessage(tabs[0].id,{},function(responce){});
    })
  }
}
