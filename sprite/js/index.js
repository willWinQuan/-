/**
 * Created by Arvinco on 2016/7/6.
 */

//03
(function () {
    var stage, manifest, loader, CT = createjs.Tween, clickIng = false;

    function init() {
        stage = new createjs.Stage("sprite");
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", tick);

        function inputRun(){
            if (!clickIng) {
                clickIng = true;
                var num = parseInt($("#input").val());
                var nextFloor = parseInt($("#input3").val());

                if (num) {
                    getImg({
                        picNum: num,
                        nextFloor:nextFloor?nextFloor:num,
                        imgBase: "images/",
                        qx: $("#input2").val()
                    })
                } else {
                    alert("请填写图片数量")
                }
            }
        }

        $("#input").on("keyup", function (e) {
            if (e.keyCode === 13) {
                inputRun()
            }
        });
        $("#btn").on("click", function () {
            inputRun()
        });
    }

    init();
    function getImg(b) {

        var kkk = new Image();

        kkk.src = b.imgBase + b.qx + "01.png";
        kkk.onload = function () {
            var width=0,height=0;


                width =parseInt(b.nextFloor)*this.width;
                height = Math.ceil(parseInt(b.picNum)/parseInt(b.nextFloor))* this.height;
                console.log(b.nextFloor,b.picNum);


            $("#sprite").attr({width:width, height:height});
            for (var i = 0; i < b.picNum; i++) {
                console.log(i)
                var num,x,y;
                num=parseInt(i)+1;
                if(num<10){
                    num="0"+num
                }
                console.log(num)

                var img = b.imgBase + b.qx +num + ".png";
                var pic = new createjs.Bitmap(img);
                var curNum= i;
                x = curNum%parseInt(b.nextFloor) * this.width;
                y = Math.floor(curNum/parseInt(b.nextFloor))* this.height;
                pic.setTransform(x, y);
                stage.addChild(pic)

            }
            setTimeout(function () {
                var newimg = new Image();
                newimg.src = document.getElementById("sprite").toDataURL("image/png");
                $("body").append(newimg);
                clickIng = false;
            }, 1000)
        };


    }

    function tick() {
        stage.update();
    }
})();




