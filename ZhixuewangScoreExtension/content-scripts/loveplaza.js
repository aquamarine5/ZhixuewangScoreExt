function checkScore(s) {
    return s == 520 || s == 521
}
function checkButtonDisplay(s) {
    if (checkScore(s)) showButton()
    else {
        $(".general span.specific")[0].setAttribute("style", "display: initial; ")
        var elements = document.getElementsByClassName("ext_loveplaza_start_btn")
        if (elements.length > 0)
            document.getElementsByClassName("ext_loveplaza_start_btn")[0].remove()
    }
}
function checkButtonDisplayBuiltin() {
    checkButtonDisplay(parseInt($(".general span.increase")[0].textContent))
}
function showButton() {
    if ($(".ext_loveplaza_start_btn").length != 0)
        return
    if ($(".general span.specific").length != 0)
        $(".general span.specific")[0].setAttribute("style", "display: none; ")
    $("span.bold")[0].setAttribute("style", "margin-right: revert; display: ruby; ")
    var button = createElementEx("div", "ext_loveplaza_start_btn", $("span.bold")[0])
    var img = createElementEx("img", "ext_loveplaza_start_img", button)
    img.setAttribute("src", chrome.runtime.getURL("images/loveplaza_maltese_start.png"))
    button.onclick = onButtonClick
}
function feedback() {
    var http = new XMLHttpRequest()
    http.open("GET", "https://api.visitorbadge.io/api/visitors?path=loveplaza_zhixueExt")
    http.send()
    http.onreadystatechange = function (ev) {
        if (ev.currentTarget.status = 200 && ev.currentTarget.readyState == 4) {
            console.log("feedback success!")
        }
    }
}
function onButtonClick() {
    setTimeout(function () {
        $(".ext_loveplaza_start_img")[0].setAttribute("src", chrome.runtime.getURL("images/loveplaza_maltese_frame1.png"))
        setTimeout(function () {
            $(".ext_loveplaza_start_img")[0].setAttribute("src", chrome.runtime.getURL("images/loveplaza_maltese_frame2.png"))
            setTimeout(function () {
                onAnimateStarted()
            }, 500)
        }, 700)
    }, 100)
    feedback()
}
function onAnimateStarted() {
    cleanupLayout()
    $("div.hierarchy")[0].setAttribute("style",
        "display: flex; justify-content: space-around; padding-bottom: 20px; ")
    var parent = $("div.hierarchy")[0].children[0]
    var image = createElementEx("img", "ext_loveplaza_img", $("div.hierarchy")[0])
    image.setAttribute("src", chrome.runtime.getURL("images/loveplaza_pt0.png"))
    var fontStyle = createElementEx("style", "ext_loveplaza_font", parent)
    fontStyle.textContent = "mi{font-family: KaTeX_Math;}mo mn{font-family: KaTeX_Main;}math{font-size: larger;}" +
        "@font-face {font-family: KaTeX_Main; src: url(" + chrome.runtime.getURL("fonts/KaTeX_Main-Regular.woff2") + ") format(\"woff2\"); font-weight: 400; font-style: normal}" +
        "@font-face {font-family: KaTeX_Math; src: url(" + chrome.runtime.getURL("fonts/KaTeX_Math-Italic.woff2") + ") format(\"woff2\"); font-weight: 400; font-style: italic}"
    var formula = createElementEx("div", "ext_loveplaza_formula", parent)
    formula.innerHTML = "<math xmlns='http://www.w3.org/1998/Math/MathML' style='font-family: KaTeX_Main'>" +
        "<mi> f </mi>  <mrow>    <mo> ( </mo><mi> x </mi>    <mo> ) </mo>  </mrow>  <mo> = </mo>" +
        "<msup>    <mrow><mi> x </mi>    </mrow>    <mrow><mfrac><mrow>  <mn> 2 </mn></mrow><mrow>  <mn> 3 </mn></mrow></mfrac>    </mrow>  </msup>" +
        "<mo> + </mo>  <mn> 0.9 </mn>  <msqrt>    <mn> 9 </mn>    <mo> - </mo>    <msup><mrow><mi> x </mi></mrow><mrow><mn> 2 </mn></mrow>    </msup>  </msqrt>  " +
        "<mi> sin </mi>  <mrow>    <mo> ( </mo><mfrac><mrow>  <mn class='ext_loveplaza_score'> 0 </mn></mrow><mrow>  <mi style='padding-block: 2px;'> &#x03C0;  </mi></mrow></mfrac><mi> x </mi>    <mo> ) </mo>  </mrow></math>"
    var progressDiv = createElementEx("div", "ext_loveplaza_progress_div", parent)
    var progressContainer = createElementEx("div", "ext_loveplaza_progress_container", progressDiv)
    var progressBar = createElementEx("div", "ext_loveplaza_progress_bar", progressContainer)
    progressBar.setAttribute("style", "--progress: 0%;")
    var maltese = createElementEx("img", "ext_loveplaza_maltese", progressDiv)
    maltese.setAttribute("src", chrome.runtime.getURL("images/loveplaza_maltese_sidebar.png"))
    maltese.setAttribute("style", "--step: -7%")
    var copyright = createElementEx("span", "ext_loveplaza_copyright", parent)
    copyright.innerHTML = "Illustration from © MALTESE, @妘箖.<br />" +
        "Designed by LovePlaza 2024, @aquamarine5, @海蓝色的咕咕鸽, RC."
    var final = createElementEx("div", "ext_loveplaza_final_container", parent)
    var loveplaza_img = createElementEx("img", "ext_loveplaza_logo", final)
    loveplaza_img.setAttribute("src", chrome.runtime.getURL("images/loveplaza_logo.png"))
    var replay_div = createElementEx("div", "ext_loveplaza_final_btn", final)
    var replay_img = createElementEx("img", "ext_loveplaza_final_fg", replay_div)
    replay_img.setAttribute("src", chrome.runtime.getURL("images/loveplaza_replay.png"))
    replay_div.onclick = function () {
        if (document.ext_plaza_playend != undefined)
            history.go(0)
    }
    var tiktok_div = createElementEx("div", "ext_loveplaza_final_btn", final)
    var tiktok_img = createElementEx("img", "ext_loveplaza_final_fg", tiktok_div)
    tiktok_img.setAttribute("src", chrome.runtime.getURL("images/loveplaza_tiktok.png"))
    tiktok_div.onclick = function () {
        if (document.ext_plaza_playend != undefined)
            window.open("https://www.douyin.com/user/MS4wLjABAAAApuyqymIaQkpvKkbdH1X6W3A6XEgJl7kddGrZHxipJ7TbA1lCRaPJK5gZ1KX7pR1n")
    }
    setTimeout(onKeyAnimatedFrame, 1000, 0, 5)
}
function onKeyAnimatedFrame(i, maxIndex) {
    const blueBasedStyle = "transition: left .5s cubic-bezier(0.23, 1, 0.320, 1), top .5s cubic-bezier(0.23, 1, 0.320, 1), " +
        "font-size .5s cubic-bezier(0.23, 1, 0.320, 1),opacity .5s cubic-bezier(0.95, 0.31, 0.67, 0.21); " +
        "z-index: 1; position: absolute; "
    var image = $(".ext_loveplaza_img")[0]
    var score = $(".ext_loveplaza_score")[0]
    var progerssBar = $(".ext_loveplaza_progress_bar")[0]
    var subject = $(".sub-item")[i]
    var blue = subject.getElementsByClassName("blue")[0]
    console.log("onAnimatedFrame: " + (i + 1).toString())
    console.log(score)
    score.textContent = parseFloat(score.textContent) + parseFloat(blue.textContent)
    image.setAttribute("src", chrome.runtime.getURL("images/loveplaza_pt" + (i + 1).toString() + ".png"))
    var clonedDiv = blue.cloneNode(true)
    clonedDiv.setAttribute("id", "ext_loveplaza_cloned")
    blue.parentNode.prepend(clonedDiv)
    blue.setAttribute("style", blueBasedStyle +
        "left: " + (score.getBoundingClientRect().left - 20).toString() +
        "px; top: " + (score.getBoundingClientRect().top.toString() - 230) + "px; " +
        "font-size: 26px; opacity: 0; ")
    setTimeout(function () {
        blue.remove()
    }, 500)
    var step = ((score.textContent / 520) * 100).toFixed(3)
    progerssBar.setAttribute("style", "--progress:" + step + "%;")
    $(".ext_loveplaza_maltese")[0].setAttribute("style", "--step:" + (step - 7) + "%;")
    if (i == maxIndex) {
        onAnimateEnded()
        return
    }
    else
        setTimeout(onKeyAnimatedFrame, 1000, i + 1, maxIndex)
}
function onAnimateEnded() {
    document.ext_plaza_playend = true
    var finalImg = createElementEx("img", "ext_loveplaza_final_img", $("div.hierarchy")[0])
    finalImg.setAttribute("src", chrome.runtime.getURL("images/loveplaza_maltese_final.png"))
    setTimeout(function () {
        finalImg.setAttribute("style", "opacity: 1;")
    }, 450)
    for (const iterator of $(".ext_loveplaza_final_btn")) {
        iterator.setAttribute("style", "opacity: 1; ")
    }
}
function cleanupLayout() {
    if ($(".ext_recommend_div").length != 0)
        $(".ext_recommend_div")[0].remove()
    for (const iterator of $(".ext_editmode_container")) {
        iterator.remove()
    }
    $(".ext_loveplaza_start_btn")[0].remove()
    $(".single")[0].setAttribute("style", "max-width: 488px; ")
    $(".general")[0].setAttribute("style", "border-bottom: revert; max-width:488px; ")
    if ($(".ext_recommend_notice_div").length != 0)
        $(".ext_recommend_notice_div")[0].remove()
    const blueBasedStyle = "transition: left .5s cubic-bezier(0.23, 1, 0.320, 1), top .5s cubic-bezier(0.23, 1, 0.320, 1), " +
        "font-size .5s cubic-bezier(0.23, 1, 0.320, 1),opacity .5s cubic-bezier(0.95, 0.31, 0.67, 0.21); " +
        "z-index: 1; position: absolute; opacity: 1; "
    for (const iterator of $(".ext_classrank")) {
        iterator.remove()
    }
    for (const iterator of $(".blue")) {
        iterator.setAttribute("style", blueBasedStyle + "left: auto; top: auto;")
        iterator.setAttribute("style", blueBasedStyle +
            "left: " + (iterator.offsetLeft.toString() - 80) +
            "px; top: " + iterator.offsetTop.toString() + "px;")
    }
    for (const iterator of $(".single span.specific")) {
        var score = iterator.parentNode.getElementsByClassName("blue")[0].textContent
        var margin = 40
        if (score.length == 2) margin = 40
        else if (score.length == 3) margin = 47
        else if (score.length == 4) margin = 45
        else if (score.length == 5) margin = 54
        iterator.setAttribute("style", "margin-left: " + margin.toString() + "px;")
    }
    var subjectItems = $("div.sub-item")
    for (let index = 0; index < subjectItems.length; index++) {
        const element = subjectItems[index];
        element.getElementsByTagName("div")[1].setAttribute("style", "margin-left: 70px;")
    }
    var subjectItems = $("div.subject")
    for (let index = 0; index < subjectItems.length; index++) {
        const element = subjectItems[index];
        element.setAttribute("style", "width: revert;")
    }

}

function createElementEx(tagName, className, parent) {
    var e = document.createElement(tagName)
    e.className = className
    parent.appendChild(e)
    return e
}

document.ext_functions_plaza = checkButtonDisplayBuiltin