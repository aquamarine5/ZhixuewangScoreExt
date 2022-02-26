class WaitForLoading {
    constructor(required) {
        this.required = required
    }
    wait(resolve) {
        const promise = new Promise(function (resolve, reject) {
            setTimeout(
                function (resolve, data) {
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        if ($(element) == undefined) return
                    }
                    resolve()
                }, 100, resolve, this.required
            )
        })
        promise.then(resolve(this.required))
    }
}

$.tryRemove=function(object,length){
    object=$(object)
    if(!object) return
    if(length!=undefined){ if(object[length]) object[length].remove()}
    else object.remove()
}