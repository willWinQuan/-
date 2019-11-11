
function fn1(){
   console.log("fn1")
}
function fn2(){
    console.log("fn2")
 }
 function fn3(){
    console.log("fn3")
 }
 function fn4(){
    console.log("fn4")
 }

new Promise(function(resolve,reject){
    throw new Error('a')
}).then(fn2,fn1).then(fn3).catch(fn4)