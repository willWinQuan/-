
var promise1=new Promise(function(resolve,reject){
    resolve("promise1 resolve");
})

var promise2=new Promise(function(resolve,reject){
    resolve("promise2 resolve");
    // reject("promise2 reject")
})

Promise.all([promise1,promise2]).then(function(res){
    console.log(res)
}).catch(function(error){
    console.log(error)
})