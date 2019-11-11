
/***
 * 对象浅克隆改变数据，原对象也会改变
 * 对象深克隆会建立一个新的对象,改变数据原对象不会跟着改变
 */

 var obj_1={id:1,name:"test"},
 obj_2={id:1,name:"test",chidldObj:{name:"test2"},val:undefined,val2:null,fn1:function(num){
    return num
 }};
 obj_3={id:1,name:"test",childObj:{name:"test2"},val:undefined,val2:null,function(){
    console.log(13)
 }};
    
 //浅克隆
 var obj1=obj_1;
     obj1.name="test2";
     console.log(obj_1.name); //test2
    
//深克隆 方法1
//纵深对象时对象会指向同一个空间,修改值会把原对象值也修改
var obj2=function(){
    var obj={}
    for(var i in obj_2){
      obj[i]=obj_2[i]
    }
    return obj
}()
obj2.chidldObj.name="test5"
console.log(obj_2.chidldObj.name,"111")
console.log(obj2) //{ id: 1,name: 'test',val: undefined,val2: null,function: [Function: function] }

//深克隆 方法 2 
// undefined 未被枚举 此方法会过滤该字段
// function 也是会被过滤
//此方法克隆纵深对象修改值不会改变原对象的值。
var obj3=JSON.parse(JSON.stringify(obj_2))
obj3.chidldObj.name="test07"
console.log(obj_2.chidldObj.name,"222"); //test05
console.log(obj3) //{ id: 1, name: 'test', val2: null }

//折中克隆 es6方法 把一个对象复制到目标对象里
//此方法克隆纵深对象时对象会指向同一个空间,修改值会把原对象值也修改
var obj4=Object.assign({},obj_3)
console.log(obj4); //{ id: 1,name: 'test',val: undefined,val2: null,function: [Function: function] }
obj4.childObj.name="test4"
console.log(obj_3.childObj.name);//test4


//深克隆 递归方法
//解决复杂纵深对象的克隆
function cloneFn(objo,target){
       var obj=target || {}
       var toStr=Object.prototype.toString;
       for(var key in objo){
           if(objo.hasOwnProperty(key)){
               //hasOwnProperty 检查key是否是objo的自身(非继承)属性
               // null 属于对象 [object Null]
               if(typeof objo[key] !== 'object' || toStr.call(obj[key]) === '[object Null]'){
                 obj[key]=objo[key]
               }else{
                 //对象原型的toString.call方法判断是数组还努力了是对象 先给空值然后递归赋值
                 obj[key]=toStr.call(obj[key]) === '[object object]' ? {}:
                 toStr.call(obj[key]) === '[object Array]'?[]:{};
                 cloneFn(objo[key],obj[key])
               }
           }
       }
    return obj
}

var obj5=cloneFn(obj_2);
console.log(obj5)
obj5.chidldObj.name="test9";
console.log(obj_2.chidldObj.name); //test5
a
console.log(Object.prototype.toString.call(null))


