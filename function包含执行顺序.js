function fn1(fn2){
    console.log("fn1")
    return fn2
}

function fn2(){
    console.log("fn2")
    return "fn2"
}

function fn3(fn1,fn2){
    console.log("fn3")
    return fn1+fn2
}

console.log(fn3(fn1(fn2()),fn2()));

//执行顺序由里到外