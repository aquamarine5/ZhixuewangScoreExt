const generate = document.getElementById("generate");
const checkbox = document.getElementById("checkbox");
checkbox.onclick = function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type:"RealModeStatusChanged",
            image_url: chrome.extension.getURL("images/fullmark_analyse.png")
        }, function (responce) { });
      })
}
if (generate) {
    generate.onclick = function () {
        console.log("Available")
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
var load=document.getElementById("scoreRank_load")
load.onclick=function(ev){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id,{
        type:"GetInformation"
    }, function(responce){
        document.info=responce;
        document.info.panelValue=[]
        const scorerpanel=document.getElementById("scoreRank")
        for (let index = 0; index < document.info.subjectCount; index++) {
            var slider=document.createElement("input")
            slider.setAttribute("type","slider")
            slider.setAttribute("min","1")
            slider.setAttribute("max","100")
            slider.setAttribute("id","panelSlider_"+index)
            slider.value=100
            slider.onchange=function(ev){
                document.info.panelValue[parseInt(ev.target.id.split("_")[1])].text.value=ev.target.value
            }
            var text=document.createElement("input")
            text.setAttribute("type","number")
            text.setAttribute("min","1")
            text.setAttribute("max","100")
            text.id="panelText_"+index
            text.onchange=function(ev){
                document.info.panelValue[parseInt(ev.target.id.split("_")[1])].slider.value=ev.target.value
            }
            var panel=document.createElement("div")
            panel.id="panelPanel_"+index
            scorerpanel.appendChild(panel)
            panel.append(document.info.subjectName[index]+": ")
            panel.appendChild(slider)
            panel.appendChild(text)
            document.info.panelValue[index]={
                slider:slider,
                panel:panel,
                text:text
            }
        }
    })
})
}
