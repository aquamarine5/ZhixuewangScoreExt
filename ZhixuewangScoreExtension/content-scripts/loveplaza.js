function checkScore(s){
    return s==520 || s==521
}
function checkButtonDisplay(s){
    if(checkScore(s)) showButton()
    else document.getElementsByClassName("ext_loveplaza_button")[0].remove()
}
function checkButtonDisplayBuiltin(){

    checkButtonDisplay(parseInt($(".general span.increase")[0].textContent))
}
function showButton(){
    var button=createElementEx("div","ext_loveplaza_button",$("span.increase")[0])
    button.textContent="♥🎉"
    button.onclick=onButtonClick
}
function onButtonClick(){
    document.getElementsByClassName("ext_loveplaza_button")[0].remove()
    cleanupLayout()
}
function cleanupLayout(){
    $(".general span.specific")[0].remove()
}

function createElementEx(tagName, className, parent) {
    var e = document.createElement(tagName)
    e.className = className
    parent.appendChild(e)
    return e
}

document.ext_functions_plaza=checkButtonDisplayBuiltin
checkButtonDisplayBuiltin()