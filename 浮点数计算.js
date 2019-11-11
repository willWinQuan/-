
var float1=0.692,float2=0.2;

//浮点相加出现多位小数问题
function floatReckon(float1,float2,type){
    //思路：转换为整数计算后转换为小数
    //判断多少小数
    var float1_sl=float1.toString().split('.')[1].length,
        float2_sl=float2.toString().split('.')[1].length;
    var maxL=float1_sl>=float2_sl?float1_sl:float2_sl; //去最多小数点
    var float1_num=float1*Math.pow(10,maxL),
        float2_num=float2*Math.pow(10,maxL);
    return type === "add" ? (float1_num+float2_num)/Math.pow(10,maxL):
    (float1_num-float2_num)/Math.pow(10,maxL)
}

console.log(floatReckon(float1,float2,"-"))