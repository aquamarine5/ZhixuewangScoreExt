var i = 0;
var interval = setupInterval()
function setupInterval(){
    if(window.location.href.match("/activitystudy/web-report") == null){
        console.log("not web-report page, stopInterval")
        return
    }
    return setInterval(function () {
        i++;
        console.log(i)
        if (document.getElementsByClassName("hierarchy").length != 0) {
            console.log("Load successfully!")
            clearInterval(interval)
            interval = null;
            setTimeout(execPopupRecommend, 1000)
        }
        if (i > 100) {
            console.log("try 100 times, clear interval action.")
            clearInterval(interval)
            interval = null;
        }
    }, 100)
}
function execPopupRecommend() {
    if (checkAllScorePublished()) {
        document.ext_functions_plaza()
        var parent_div = document.getElementsByClassName("hierarchy")[0]
        var recommend_div = document.createElement("div")
        recommend_div.className="ext_recommend_div"
        parent_div.after(recommend_div)
        var text_div = createElementEx("div", "ext_recommend_text", recommend_div)
        text_div.innerText = "需要智学网插件的帮助吗？"
        var classrank_button = createElementEx("div", "ext_recommend_button", text_div)
        var fullscore_button = createElementEx("div", "ext_recommend_button", text_div)
        document.ext_editmode = false
        var editmode_button = createElementEx("div", "ext_recommend_button", text_div)
        editmode_button.onclick = editModeButton
        editmode_button.innerText = "进入编辑分数模式"
        editmode_button.setAttribute("id","ext_btn_editmode")
        document.recommend_div = recommend_div
        var hide_button = createElementEx("div", "ext_recommend_button", text_div)
        hide_button.innerText = "隐藏"
        classrank_button.innerText = "查看班级排名"
        fullscore_button.innerText = "一键满分"
        hide_button.onclick = hideButton
        classrank_button.onclick = classrankButton
        fullscore_button.onclick = fullscoreButton
        var douyin_button=createElementEx("div","ext_recommend_button", text_div)
        douyin_button.innerText="看看作者的抖音 >>"
        douyin_button.onclick=function(){window.open("https://www.douyin.com/user/MS4wLjABAAAApuyqymIaQkpvKkbdH1X6W3A6XEgJl7kddGrZHxipJ7TbA1lCRaPJK5gZ1KX7pR1n")}
        var tips = createElementEx("div", "ext_recommend_tips", recommend_div)
        var version = chrome.runtime.getManifest().version
        tips.innerText = "插件功能由 ZhixuewangScoreExt(v" + version + ") 提供，并非官方提供的功能。 @海蓝色的咕咕鸽 (@aquamarine5, RenegadeCreation)"
        var github_repo = createElementEx("a", "ext_recommend_link", tips)
        var github_script = createElementEx("a", "ext_recommend_link", tips)
        github_repo.setAttribute("href", "https://github.com/aquamarine5/ZhixuewangScoreExt")
        github_script.setAttribute("href", "https://github.com/aquamarine5/ZhixuewangScoreExt/blob/main/ZhixuewangScoreExtension/content-scripts/core.js")
        github_repo.setAttribute("target","_blank")
        github_script.setAttribute("target","_blank")
        github_repo.innerText = "Github 项目地址"
        github_script.innerText = "Github 脚本页面"
        var dropdownlist=$(".el-select-dropdown__list li")
        for (let index = 0; index < dropdownlist.length; index++) {
            const element = dropdownlist[index];
            element.onclick=function(){
                clearInterval(interval)
                interval=setupInterval()
            }
        }
    }
}
function editModeButton() {
    if (document.ext_editmode == undefined) document.ext_editmode = false
    function createButtonEx(tagName, className, parent_div, onClick, textContent) {
        var item = createElementEx(tagName, className, parent_div)
        item.setAttribute("onclick", onClick)
        item.textContent = textContent
        return item
    }
    var editmodeButton = document.getElementById("ext_btn_editmode")
    if (!document.ext_editmode) {
        editmodeButton.textContent = "退出编辑分数模式"
        var subjectItems = document.getElementsByClassName("sub-item")
        for (let index = 0; index < subjectItems.length; index++) {
            const element = subjectItems[index];
            var container = createElementEx("div", "ext_editmode_container", element)
            
            var onclickCommand = "var s=this.parentNode.parentNode.getElementsByClassName('blue')[0];s.textContent=parseFloat(s.textContent)%%;var g=document.getElementsByClassName('general')[0].getElementsByClassName('increase')[0];g.textContent=parseFloat(g.textContent)%%;document.ext_functions_plaza()"
            createButtonEx("div", "ext_editmode_btn_minus", container, onclickCommand.replace(/%%/g, "-5"), "-5")
            createButtonEx("div", "ext_editmode_btn_minus", container, onclickCommand.replace(/%%/g, "-1"), "-1")

            createButtonEx("div", "ext_editmode_btn_plus", container, onclickCommand.replace(/%%/g, "+0.5"), "+0.5")
            createButtonEx("div", "ext_editmode_btn_plus", container, onclickCommand.replace(/%%/g, "+1"), "+1")
            createButtonEx("div", "ext_editmode_btn_plus", container, onclickCommand.replace(/%%/g, "+5"), "+5")
        }
    } else {
        editmodeButton.textContent = "进入编辑分数模式"
        for (let index = 0; index < 4; index++) {
            var editmodeContainers = document.getElementsByClassName("ext_editmode_container")
            for (let index = 0; index < editmodeContainers.length; index++) {
                const element = editmodeContainers[index];
                element.remove()
            }
            if (document.getElementsByClassName("ext_editmode_container").length == 0) break;
        }
    }
    document.ext_editmode = !document.ext_editmode
}

function hideButton() {
    document.getElementsByClassName("ext_recommend_div")[0].remove()
}

function classrankButton() {
    document.ext_functions_getRank(null, function (_) { })
}
function fullscoreButton() {
    document.ext_functions_report_detail({
        type: "FullMarkCallback",
        image_url: {
            "default": chrome.runtime.getURL("images/fullmark_analyse_9.png"),
            "6": chrome.runtime.getURL("images/fullmark_analyse_6.png"),
            "9": chrome.runtime.getURL("images/fullmark_analyse_9.png")
        },
        scoreRanks: [
            chrome.runtime.getURL("images/full_scoreRank_1.png"),
            chrome.runtime.getURL("images/full_scoreRank_2.png"),
            chrome.runtime.getURL("images/full_scoreRank_3.png"),
            chrome.runtime.getURL("images/full_scoreRank_4.png"),
            chrome.runtime.getURL("images/full_scoreRank_5.png")
        ]
    }, function (_) { })
}
function createElementEx(tagName, className, parent) {
    var e = document.createElement(tagName)
    e.className = className
    parent.appendChild(e)
    return e
}

function checkAllScorePublished() {
    return document.getElementsByClassName("subject_analysis_div").length != 0
}
