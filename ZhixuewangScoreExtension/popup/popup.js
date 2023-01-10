const generate = document.getElementById("generate");
const rank = document.getElementById("rank");
if (generate) {
    generate.onclick = function () {
        console.log("ZhixuewangScoreExt[popup.js]: FullMarkCallback")
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type:"FullMarkCallback",
                image_url: chrome.extension.getURL("images/fullmark_analyse.png"),
                scoreRanks:[
                    chrome.extension.getURL("images/full_scoreRank_1.png"),
                    chrome.extension.getURL("images/full_scoreRank_2.png"),
                    chrome.extension.getURL("images/full_scoreRank_3.png"),
                    chrome.extension.getURL("images/full_scoreRank_4.png")
                ]
            }, function (responce) { });
        })
    }
}
if (rank) {
    rank.onclick = function () {
        console.log("ZhixuewangScoreExt[popup.js]: GetRankCallback")
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type:"GetRankCallback"
            }, function (responce) { });
        })
    }
}
