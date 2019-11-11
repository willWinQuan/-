
var num=0;
function fn1 (name,val1,val2){
    num++;
   if(!(this instanceof fn1)){
      console.log(name,"1:");
      return new fn1(name,val1,val2)
   }
   console.log(name,"2:")
   this.name=name;
   this.val1=val1;
   this.val2=val2
}

fn1('test1','test2',fn1('test3'))


