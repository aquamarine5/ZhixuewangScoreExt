console.log("Content-Scripts Load.")

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Receive message of the popup.")
    if (request.type == "RealModeStatusChanged") {
        window.image_url = request.image_url
        window.realmode = true
    }
    else if (request.type == "FullMarkCallback") {
        execZhixuewangAction(request, sendResponse)
    }
    else if (request.type == "GetRankCallback") {
        getRank(request, sendResponse)
    }
})
function getRank(request, sendResponse) {
    if (window.location.href.match("www.zhixue.com/activitystudy/web-report") == null) {
        sendResponse({ "status": 1, "message": "当前页面不是智学网成绩报告页面（开头为www.zhixue.com/activitystudy/web-report 的链接），请检查是否在正确的页面调用。\nThe current page is not the Zhixuewang Grade Reporting page (the link that starts with www.zhixue.com/activitystudy/web-report), so please check to see if you are calling from the correct page!" })
    }
    var examId = sessionStorage.getItem('zxbReportExamId')
    var http = new XMLHttpRequest()
    http.open("GET", "https://www.zhixue.com/zhixuebao/report/exam/getLevelTrend?examId=" +
        examId + "&pageIndex=1&pageSize=5&")
    http.setRequestHeader("XToken", localStorage.getItem("xToken"))
    http.send()
    http.onreadystatechange = function (ev) {
        if (ev.currentTarget.status = 200 && ev.currentTarget.readyState == 4) {
            console.log(ev)
            let classTotalNumber = 0, schoolTotalNumber = 0
            var r = JSON.parse(ev.currentTarget.responseText)
            r.result.list.forEach(element => {
                console.log(element)
                if (element.tag.code == "grade") schoolTotalNumber = element.totalNum
                else classTotalNumber = element.totalNum
            });
            var nhttp = new XMLHttpRequest()
            nhttp.open("GET", "https://www.zhixue.com/zhixuebao/report/exam/getSubjectDiagnosis?examId=" +
                examId + "&")
            nhttp.setRequestHeader("XToken", localStorage.getItem("xToken"))
            nhttp.send()
            nhttp.onreadystatechange = function (ev) {
                if (ev.currentTarget.status = 200 && ev.currentTarget.readyState == 4) {
                    var list = {};
                    JSON.parse(ev.currentTarget.responseText).result.list.forEach(element => {
                        list[element.subjectName] = element.myRank
                    })
                    const subjectScore = $("div.single div.sub-item")
                    for (let index = 0; index < subjectScore.length; index++) {
                        const element = subjectScore[index];
                        const subjectName = encodeURIComponent(element.getElementsByClassName("subject")[0].textContent).replaceAll("%20", "").replaceAll("%0A", "")
                        console.log(list)
                        console.log(subjectName)
                        const bold = element.getElementsByClassName("bold-level")[0]
                        var s = document.createElement("span")
                        s.setAttribute("style", "font-weight: normal;")
                        s.textContent = " 估算班排  "
                        bold.appendChild(s)
                        var f = document.createElement('span')
                        f.setAttribute("style", "font-weight: 700; color:#1473e5;")
                        f.className="ext_classrank"
                        f.textContent = Math.ceil(list[decodeURIComponent(subjectName)] / 100 * classTotalNumber).toString() + "( " + (list[decodeURIComponent(subjectName)] / 100 * classTotalNumber).toFixed(1) + " )"
                        if (list[decodeURIComponent(subjectName)] == 0) f.textContent = "1 ( first )"
                        bold.appendChild(f)
                    }
                }
            }
        }
    }
    sendResponse({ "status": 0, "message": "成功。\nSuccess." })
}
function original_roll_detail(request, sendResponse) {
    let scoretext = document.getElementsByClassName("total-score-text")[0];
    const subject = document.getElementsByClassName("zx-tab-item tab-item current-tab");
    if (subject.length == 1) {
        let subjectname = subject[0].getElementsByTagName("span")[0].textContent;
        if (subjectname == "语文" || subjectname == "数学" || subjectname == "英语") scoretext.textContent = "150";
        else scoretext.textContent = "100";
    }
    const userscoreCollection = document.getElementsByClassName("user-score");
    for (let index = 0; index < userscoreCollection.length; index++) {
        const element = userscoreCollection[index];
        element.textContent = element.textContent.replace(/-\d+/, "-0");
    }
    const tickCollection = document.getElementsByClassName("topic-sign");
    for (let index = 0; index < tickCollection.length; index++) {
        const element = tickCollection[index];
        if (element.alt != "正确") {
            element.alt = "正确";
            element.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAeCAMAAACPKmerAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjIxMkEzQkNENzc2MTFFODk5MjJFODJENkQzMzYzNEYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjIxMkEzQkJENzc2MTFFODk5MjJFODJENkQzMzYzNEYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOTYwNjk3MTVGMTIxMUU0QjBGQ0U4MTU0OThGRUI5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOTYwNjk3MjVGMTIxMUU0QjBGQ0U4MTU0OThGRUI5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt18bckAAAFWUExURf8WJ/8oOP/8/P/j5f8cLf8iMv8eL/8YKf8aKv/s7f+nrf8uPf8gMP9HVP/5+f/e4P/Mz/8mNv/29v9pc//V2P+Mlf9RXf/7/P/w8f+2u/9eav+Kkv86SP89S//X2v/l5/8qOv+co/9GU/9IVv/5+v/P0//Z3P+dpP+aof/DyP9BT/91f/+Tm/83Rf+Pl/+Vnf/09f+Wnv8jM//Lzv/f4f/Cxv/6+//p6/8bLP+6v//4+P9LWP/v8f8rOv97hP/39//S1f/m6P/Gyv/T1v+/w//N0P+gpv9zff8xQP9rdv9wev/Fyf+rsv81RP9mcf+Kk//y8/8XKP90fv8+TP+rsf9FUv+Rmf94gv9WYv8vPv/Hy/+Ci//n6f90f/9KV/9ZZf8fL/+utP8kNP/9/f+HkP+VnP/d4P+7wP9vef8ZKf9hbf9XY/8zQv9DUf+kq/84Rv8VJv///y0NGBsAAABydFJOU///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AHzXy+gAAAFYSURBVHjarNRVc8MwDADgUJumzLCuW8fMzNAxMzPznP//ssSWu6yBerv5KVG+0+VkSZz6m8MxusG744nzKUYt1iHt7LDpzI2OEc+ig4ccxijPoB/eEZxOTceziX4HvOYC6+nSajLyjJA/bmejKzTx27xewUr9ccwGV+Uofknjevvxi9cSf7jBSk1wO0ekOONmuxWjiT8L9C5DEg60mfB0B8Wx7u+bz+KI3FCCa4bBur3GPhldx8HaW6NNV9DEucafXfVIwgsGHF6ieDFa2oMkT0QpRts9YF3X5o4VSaGeIKa80sT7Iav+PsDfuD780uIDy00GLaehHl8oahVUVdiUAUcydrMzQECzepakf3Eh2k/aBha9ezzY7dOUw1zO0L4kh59znuIeI04OlZn51G7Rygmh7IY4geFDvlWWfbJM8KXCtH2qr/Thu2fdVbMBKRD+l832F/0lwAA4DSk2i4BtpgAAAABJRU5ErkJggg==";
        }
    }
    sendResponse({ "status": 0, "message": "成功。\nSuccess." })
}
/** 
 * This method not available in now report detail page.
 * @deprecated
 */
function report_detail_v1(request) {
    var canvas = document.getElementsByClassName("subject_analysis")[0]
    canvas.remove()
    var analyse_div = document.getElementsByClassName("subject_analysis_div")[0]
    var img = document.createElement("img");
    img.setAttribute('src', request.image_url)
    analyse_div.appendChild(img)
    const scores = document.getElementsByClassName("guideWapper")
    for (let index = 0; index < scores.length; index++) {
        const element = scores[index];
        var mask = element.getElementsByClassName("subject_analysis_mark_span")
        if (mask.length == 0) {
            /*
            var parent=element.getElementsByClassName("subject_analysis_mark_bg_div_normal")[0]
            parent.className="subject_analysis_mark_bg_div_mask"
            var m=document.createElement("span")
            m.setAttribute("class","subject_analysis_mark_span")
            m.setAttribute("style","background:#06C1AE;")
            m.textContent="很赞"
            parent.appendChild(m)*/
        }
        else {
            if (mask[0].textContent == "偏科") {
                mask[0].textContent = "很赞"
                mask[0].setAttribute("style", "background:#06C1AE;")
            }
        }
    }
    var fullscore = document.getElementsByClassName("tspt_fullScore")[0].textContent.match(/(\d+\.?\d?)/)[0]
    var totalscore = document.getElementsByClassName("tspt_score")[0]
    totalscore.textContent = totalscore.textContent.replace(/(\d+\.?\d?)/, fullscore).replace("分", "")
    var text = document.createElement("em")
    text.setAttribute("style", "")
    text.textContent = "分"
    totalscore.appendChild(text)
    var scorelist = document.getElementsByClassName("tspt_sujectList")[0].getElementsByTagName("li")
    for (let index = 0; index < scorelist.length; index++) {
        const element = scorelist[index];
        var fs = element.getElementsByTagName("i")[0].textContent.match(/(\d+)/)[0]
        var ts = element.getElementsByClassName("tspt_subjectScore")[0]
        ts.textContent = ts.textContent.replace(/(\d+\.?\d?)/, fs)
        var mask = element.getElementsByClassName("grade-tips")
        if (mask.length == 0) {
            var parent = element.getElementsByClassName("tspt_subjectWrap")[0]
            var m = document.createElement("span")
            m.setAttribute("class", "grade-tips")
            m.setAttribute("style", "background: rgb(6, 193, 174);")
            m.textContent = "很赞"
            parent.appendChild(m)
        }
        else {
            if (mask[0].textContent == "偏科") {
                mask[0].textContent = "很赞"
                mask[0].setAttribute("style", "background: rgb(6, 193, 174);")
            }
        }
    }
}

function report_detail_v2(request, sendResponse) {
    function change_full_score() {
        // 单科成绩或全科总成绩
        edit_class_rank()
        if ($(".general span.specific")[0] != undefined) var head = ".general "
        else var head = ""
        var fullscore = $(head + "span.specific")[0].textContent.match(/(\d+\.?\d?)/g)[0];
        var fullscore_position = $(head + "span.increase")[0]
        fullscore_position.textContent = fullscore_position.textContent.replace(/(\d+\.?\d?)/g, fullscore)
        // 全科成绩的分成绩
        const subjectScore = $("div.single div.sub-item")
        for (let index = 0; index < subjectScore.length; index++) {
            const element = subjectScore[index];
            element.getElementsByClassName("blue")[0].textContent = element.getElementsByClassName("specific")[0].textContent.match(/(\d+\.?\d?)/g)[0]
        }
    }
    function edit_class_rank(){

        const predictedClassRank = document.getElementsByClassName("ext_classrank")
        for (let index = 0; index < predictedClassRank.length; index++) {
            predictedClassRank[index].textContent="1 ( first )"
        }
    }
    function edit_container_0() { }
    function edit_container_2() {
        $.tryRemove(".container-backgrounde[index='2'] .class-score-level-selected-exam-name", 0)
        $.tryRemove(".container-backgrounde[index='2'] canvas")
        $(".container-backgrounde[index='2'] .class-running")[0].setAttribute("style", "left: 50.8114514%;")
        const levelpoints = $(".container-backgrounde[index='2'] .class-score-level-point-tag")
        const levelpopup = $(".container-backgrounde[index='2'] .class-score-level-popup")
        const levelwappers = $(".container-backgrounde[index='2'] .class-score-level-tag-container")
        var img = document.createElement("img");
        img.setAttribute("src", request.scoreRanks[parseInt(levelpoints.length - 1)])
        $(".container-backgrounde[index='2'] div[style='position: relative;']")[0].appendChild(img)
        for (let index = 0; index < levelpoints.length; index++) {
            const element = levelpoints[index];
            element.setAttribute("style", element.getAttribute("style").replace(/top: \d+px/, "top: 40px"))
            element.innerHTML = element.innerHTML.replace(/[A-D]等/, "A等")
            levelwappers[index].setAttribute("style", levelwappers[index].getAttribute("style").replace(/top: \d+px/, "top: 29px"))
            levelpopup[index].innerHTML = levelpopup[index].innerHTML.replace(/[A-D]等/, "A等")
        }
    }
    function edit_container_3() {
        $.tryRemove($(".subject_analysis"), 0)
        var img = document.createElement("img");
        img.setAttribute('src', request.image_url)
        $(".subject_analysis_div")[0].appendChild(img)
    }
    function edit_container_5() {
        $.tryRemove(".container-backgrounde[index='5'] .loss-analysis", 0)
        $.tryRemove(".container-backgrounde[index='5'] .loss-diagnosis", 0)
        $.tryRemove(".container-backgrounde[index='5'] .class-b-container", 0)
        $(".container-backgrounde[index='5'] .class-a-title-tips")[0].textContent = "太棒了! 你竟然没有错题! "  // 编的
    }
    function edit_container_6() {
        $.tryRemove(".container-backgrounde[index='6'] .index-pane", 0)
        $(".container-backgrounde[index='6'] .class-a-title-tips")[0].textContent = "竟然没有错题! 继续复习吧"
    }
    const containers = $(".container-backgrounde")
    const container_indexs = [
        edit_container_0, edit_container_0, edit_container_2,
        edit_container_3, edit_container_0, edit_container_5,
        edit_container_6]
    for (let index = 0; index < containers.length; index++) {
        container_indexs[parseInt(containers[index].getAttribute("index"))]();
    }
    change_full_score()
    sendResponse({ "status": 0, "message": "成功。\nSuccess." })
}

function execZhixuewangAction(request, sendResponse) {

    if (window.location.href.match("www.zhixue.com/activitystudy/web-report") == null) {
        sendResponse({ "status": 1, "message": "当前页面不是智学网成绩报告页面（开头为www.zhixue.com/activitystudy/web-report 的链接），请检查是否在正确的页面调用。\nThe current page is not the Zhixuewang Grade Reporting page (the link that starts with www.zhixue.com/activitystudy/web-report), so please check to see if you are calling from the correct page!" })
    }
    if (document.location.href.search("report-detail") != -1) {
        report_detail_v2(request, sendResponse);
    }
    if (document.location.href.search("original-roll-detail") != -1) {
        original_roll_detail(request, sendResponse)
    }
}
document.ext_functions_getRank = getRank
document.ext_functions_report_detail = report_detail_v2
