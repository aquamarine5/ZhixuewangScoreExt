console.log("ZhixuewangScoreExt beta feature enabled: PopupRecommend.")

var i = 0;
var interval = setInterval(function () {
    i++;
    console.log(i)
    if (document.getElementsByClassName("hierarchy").length != 0) {
        console.log("Load successfully!")
        clearInterval(interval)
        interval = null;
        setTimeout(execPopupRecommend, 1000)
    }
    if (i > 3000) {
        clearInterval(interval)
        interval = null;
    }
}, 100)
function execPopupRecommend() {
    if (checkAllScorePublished()) {
        console.log("a")
        var parent_div = document.getElementsByClassName("hierarchy")[0].children[0]
        var recommend_div = createElementEx("div", "ext_recommend_div", parent_div)
        var text = createElementEx("div", "ext_recommend_text", recommend_div)
        text.innerText = "需要智学网插件的帮助吗？"
        var classrank_button = createElementEx("div", "ext_recommend_button", text)
        var fullscore_button = createElementEx("div", "ext_recommend_button", text)
        var hide_button = createElementEx("div", "ext_recommend_button", text)
        hide_button.innerText = "隐藏"
        classrank_button.innerText = "查看班级排名"
        fullscore_button.innerText = "一键满分"
        hide_button.onclick = hideButton
        classrank_button.onclick = classrankButton
        fullscore_button.onclick = fullscoreButton
        var tips = createElementEx("div", "ext_recommend_tips", recommend_div)
        tips.innerText = "插件功能由 ZhixuewangScoreExt 提供，并非官方提供的功能。"
        var github_repo = createElementEx("a", "ext_recommend_link", tips)
        var github_script = createElementEx("a", "ext_recommend_link", tips)
        
        github_repo.setAttribute("href", "https://github.com/aquamarine5/ZhixuewangScoreExt")
        github_script.setAttribute("href", "https://github.com/aquamarine5/ZhixuewangScoreExt/blob/main/ZhixuewangScoreExtension/content-scripts/core.js")
        
        github_repo.innerText = "Github 项目地址"
        github_script.innerText = "Github 脚本页面"
        console.log(github_repo)
        document.recommend_div = recommend_div
    }
}

function hideButton() {
    document.getElementsByClassName("ext_recommend_div")[0].remove()
}

function classrankButton() {
    document.ext_functions_getRank(null, function (_) { })
}
function fullscoreButton() {
    var error = createElementEx("div", "ext_recommend_error", document.recommend_div)
    error.innerText = "啊哦！我还不会从这里调用这项功能，不过其实你可以去右上角的扩展小拼图图标点开智学网分数插件调用的😊"
    setTimeout(function () {
        error.remove()
    }, 3000)
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
