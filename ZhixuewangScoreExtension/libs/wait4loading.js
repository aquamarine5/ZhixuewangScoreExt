$.tryRemove=function(object,length){
    object=$(object)
    if(!object) return
    if(length!=undefined){ if(object[length]) object[length].remove()}
    else object.remove()
}