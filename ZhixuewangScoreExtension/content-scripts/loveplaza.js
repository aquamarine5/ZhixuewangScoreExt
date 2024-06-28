function checkScore(s) {
    return s == 520 || s == 521
}
function checkButtonDisplay(s) {
    if (checkScore(s)) showButton()
    else {
        var elements = document.getElementsByClassName("ext_loveplaza_button")
        if (elements.length > 0)
            document.getElementsByClassName("ext_loveplaza_button")[0].remove()
    }
}
function checkButtonDisplayBuiltin() {
    checkButtonDisplay(parseInt($(".general span.increase")[0].textContent))
}
function showButton() {
    $("span.bold")[0].setAttribute("style","margin-right: revert;")
    var button = createElementEx("div", "ext_loveplaza_button", $("span.bold")[0])
    button.textContent = "❤️🎉"
    button.onclick = onButtonClick
}
function onButtonClick() {
    document.getElementsByClassName("ext_loveplaza_button")[0].remove()
    cleanupLayout()
    $("div.hierarchy")[0].setAttribute("style","display: flex; justift-content: space-around; ")
    var image=createElementEx("img","ext_loveplaza_img",$("div.hierarchy")[0])
    image.setAttribute("src",chrome.runtime.getURL("images/loveplaza_pt1.png"))
    var fontStyle=createElementEx("style","ext_loveplaza_font",$("div.hierarchy")[0].children[0])
    fontStyle.textContent="mi{font-family: KaTeX_Math;}mo mn{font-family: KaTeX_Main;}"+
        "@font-face {font-family: KaTeX_Main; src: url("+chrome.runtime.getURL("fonts/KaTeX_Main-Regular.woff2")+") format(\"woff2\"); font-weight: 400; font-style: normal}"+
        "@font-face {font-family: KaTeX_Math; src: url("+chrome.runtime.getURL("fonts/KaTeX_Math-Italic.woff2")+") format(\"woff2\"); font-weight: 400; font-style: italic}"
    var formula=createElementEx("div","ext_loveplaza_formula",$("div.hierarchy")[0].children[0])
    formula.innerHTML="<math xmlns='http://www.w3.org/1998/Math/MathML' style='font-family: KaTeX_Main'>  <mi> f </mi>\n  <mrow>\n    <mo> ( </mo>\n      <mi> x </mi>\n    <mo> ) </mo>\n  </mrow>\n  <mo> = </mo>\n  <msup>\n    <mrow>\n      <mi> x </mi>\n    </mrow>\n    <mrow>\n      <mfrac>\n        <mrow>\n          <mn> 2 </mn>\n        </mrow>\n        <mrow>\n          <mn> 3 </mn>\n        </mrow>\n      </mfrac>\n    </mrow>\n  </msup>\n  <mo> + </mo>\n  <mn> 0.9 </mn>\n  <msqrt>\n    <mn> 9 </mn>\n    <mo> - </mo>\n    <msup>\n      <mrow>\n        <mi> x </mi>\n      </mrow>\n      <mrow>\n        <mn> 2 </mn>\n      </mrow>\n    </msup>\n  </msqrt>\n  <mi> sin </mi>\n  <mrow>\n    <mo> ( </mo>\n      <mfrac>\n        <mrow>\n          <mn> 521 </mn>\n        </mrow>\n        <mrow>\n          <mi> &#x03C0; \x3C!-- greek small letter pi --> </mi>\n        </mrow>\n      </mfrac>\n      <mi> x </mi>\n    <mo> ) </mo>\n  </mrow>\n</math>\n"
}
function cleanupLayout() {
    $(".general span.specific")[0].remove()
    $(".single")[0].setAttribute("style","max-width: 488px; ")
    $(".general")[0].setAttribute("style","border-bottom: revert; max-width:488px; ")
    var subjectItems=$("div.sub-item")
    for (let index = 0; index < subjectItems.length; index++) {
        const element = subjectItems[index];
        element.getElementsByTagName("div")[1].setAttribute("style","margin-left: 70px;")
    }
    var subjectItems=$("div.subject")
    for (let index = 0; index < subjectItems.length; index++) {
        const element = subjectItems[index];
        element.setAttribute("style","width: revert;")
    }
}

function createElementEx(tagName, className, parent) {
    var e = document.createElement(tagName)
    e.className = className
    parent.appendChild(e)
    return e
}

document.ext_functions_plaza = checkButtonDisplayBuiltin