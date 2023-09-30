const generate = document.getElementById("generate");
const rank = document.getElementById("rank");
generate.textContent=chrome.i18n.getMessage("btn_fullscore")
rank.textContent=chrome.i18n.getMessage("btn_getrank")
if (generate) {
    generate.onclick = function () {
        console.log("ZhixuewangScoreExt[popup.js]: FullMarkCallback")
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type:"FullMarkCallback",
                image_url: chrome.runtime.getURL("images/fullmark_analyse.png"),
                scoreRanks:[
                    chrome.runtime.getURL("images/full_scoreRank_1.png"),
                    chrome.runtime.getURL("images/full_scoreRank_2.png"),
                    chrome.runtime.getURL("images/full_scoreRank_3.png"),
                    chrome.runtime.getURL("images/full_scoreRank_4.png"),
                    chrome.runtime.getURL("images/full_scoreRank_5.png")
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
            }, function (responce) { 
                var color;
                if(responce.status==0) color="#009933"
                else if(responce.status==1) color="#FF0000"
                else color="#9933FF"
                var l=document.createElement("span")
                l.style.color=color
                l.textContent=responce.message
                document.getElementById("log_table").appendChild(l)
            });
        })
    }
}
