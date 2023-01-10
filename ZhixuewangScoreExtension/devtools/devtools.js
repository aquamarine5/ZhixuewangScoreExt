// Idea: https://blog.csdn.net/sw_onload/article/details/115250322
chrome.devtools.panels.create(
    "ZhixuewangScoreExt:WebRequestPanel",
    "../icons/Albedo_128x128.png",
    "panel.html", function (panel) { })
var bgPage = chrome.runtime.connect({ name: "devtools-page" });
chrome.devtools.network.onRequestFinished.addListener(
    function (request) {
        request.getContent(function (content, encoding) {
            if (request.request.url == "") {
                chrome
            }
        })
    }
)