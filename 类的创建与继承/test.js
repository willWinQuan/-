
// 定义一个动物类
function Animal (name) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function(){
        console.log(this.name + '正在睡觉！');
    }
}
// 原型方法
Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃：' + food);
};

// --原型链继承
function Cat(){ }
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';
//&emsp;Test Code
var cat = new Cat();
console.log(cat.name); //cat
console.log(cat.eat('fish')); //cat正在吃：fish
console.log(cat.sleep()); //undefined
console.log(cat instanceof Animal); //true
console.log(cat instanceof Cat); //true

//构造继承
function Cat_two(name){
    Animal.call(this);
    this.name = name || 'Tom';
}
// Test Code
var Cat_two = new Cat_two();
console.log(Cat_two.name); //Tom
console.log(Cat_two.sleep()); //Tom正在睡觉！
console.log(Cat_two instanceof Animal); // undefined
// console.log(Cat_two instanceof cat); // true
// console.log(Cat_two.eat('fish')); //TypeError: Cat_two.eat is not a function

//组合继承
function Cat_three(name){
    Animal.call(this);
    this.name = name || 'Tom';
}
Cat_three.prototype = new Animal();
Cat_three.prototype.constructor = Cat_three;
// Test Code
var Cat_three = new Cat_three();
console.log(Cat_three.name);//Tom
console.log(Cat_three.sleep());//Tom正在睡觉！
console.log(Cat_three instanceof Animal); // true
console.log(Cat_three instanceof Cat); // false
// 特点：可以继承实例属性/方法，也可以继承原型属性/方法
// 缺点：调用了两次父类构造函数，生成了两份实例

//寄生组合继承
function Cat_four(name){
    Animal.call(this);
    this.name = name || 'Tom';
}
(function(){
    // 创建一个没有实例方法的类
    var Super = function(){};
    Super.prototype = Animal.prototype;
    //将实例作为子类的原型
    Cat_four.prototype = new Super();
})();
// Test Code
var Cat_four = new Cat_four();
console.log(Cat_four.name);
console.log(Cat_four.sleep());
console.log(Cat_four instanceof Animal); // true
console.log(Cat_four instanceof Cat); //false


