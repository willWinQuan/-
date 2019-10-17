/**
 * Created by Arvinco on 2016/8/10.
 */
var game, Sound, SoundManager;
$(function () {
    var WebGL = Laya.WebGL;
    var w = 640, h = window.innerHeight;
    Laya.init(w, h, WebGL);
    Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
    var Stage = Laya.stage;

    var Loader = laya.net.Loader; //加载资源
    var Handler = laya.utils.Handler;
    var Sprite = Laya.Sprite; //元素
    var Tween = Laya.Tween; //缓动
    var TimeLine = Laya.TimeLine; //时间线
    var Ease = Laya.Ease; //缓动函数
    var Event = laya.events.Event;
    var Text = Laya.Text;
    var Animation = Laya.Animation;
    SoundManager = Laya.SoundManager; //音效
    Sound = Laya.Sound; //音效
    var isGameStart = false;
    var isPause = false;
    //性能显示
    // var Stat = laya.utils.Stat;
    // Stat.show(0, 1008);
    var resArr = [];
    for (var i = 0; i < res.length; i++) {
        resArr[i] = {};
        resArr[i].url = res[i].src + sysParam.version;
        if (res[i].src.indexOf("json") != -1) {
            resArr[i].type = Loader.ATLAS
        } else if (res[i].src.indexOf("mp3") != -1) {
            resArr[i].type = Loader.SOUND
        } else {
            resArr[i].type = Loader.IMAGE
        }

    }
    var lab = [];
    var metre = 0;
    var isPlaying = false;
    var isStop = false;
    var thingsLength = 0;


    // 初始化游戏
    game = (function () {
        var _this, g = function () {
            _this = this;
            this.load();
            this.roadLine = 785;
            this.speed = 4
        };
        //加载资源
        g.prototype.load = function () {
            Laya.loader.load(resArr, Handler.create(this, getLab));
            $(".gameView").prepend($("#layaContainer"));

            function getLab() {
                for (var i = 0; i < res.length; i++) {
                    lab[res[i].id]={};
                    lab[res[i].id].x =res[i].left;
                    lab[res[i].id].y =res[i].top;
                    if (resArr[i].type == Loader.IMAGE) {
                        lab[res[i].id].url = Loader.getRes(resArr[i].url)
                    } else {
                        lab[res[i].id].url = resArr[i].url
                    }
                }
                this.init();
                sys.lazyLoad(".body", function () {
                    sys.loadingComplete();
                });
            }
        };
        var stageArr=[
            {
                bg:"bg1",
                goods:[
                    {label:"goods1",result:"goodsResult1"},
                    {label:"goods2",result:"goodsResult2"},
                    ],
                goodsBox:"goodsBox1",
                noGoods:"noGoods1"
            }
        ];
        g.prototype.init = function () {
            this.createStage(0);
        };

        g.prototype.createStage= function (type) {
            var source = stageArr[type];
            Stage._childs=[];
            var bg=createImg(source.bg);
            bg.scaleY= h/1008;
            Stage.addChild(bg);

            // 生成盒子
            var goodsBoxArr=[];
            for(var i=0;i<4;i++){
                var goodsBoxObj= new Sprite();
                goodsBoxObj.pos(i*122+17,872/1008*h);
                var goodsBoxObjBg =createImg(source.goodsBox);
                goodsBoxObj.addChild(goodsBoxObjBg);
                var goodsBoxObjBgPos =goodsBoxObjBg.getBounds();
                goodsBoxObj.size(goodsBoxObjBgPos.width,goodsBoxObjBgPos.height);
                var noGoods = createImg(source.noGoods);
                goodsBoxObj.addChild(noGoods);
                var delBtn = createImg("delBtn");
                goodsBoxObj.addChild(delBtn);
                delBtn.visible = false;
                goodsBoxObj.id=i;
                goodsBoxArr.push(goodsBoxObj);
                goodsBoxObj.goodsThinksBox = new Sprite();
                goodsBoxObj.addChild(goodsBoxObj.goodsThinksBox);
                (function(goodsBoxObj,noGoods,delBtn){
                    var selectThinks="";
                    //获取物品到篮子
                    goodsBoxObj.getThinks =function(obj){
                        if(goodsBoxObj.goodsThinksBox._childs.length==0){
                            selectThinks=obj.id;
                            goodsBoxObj.goodsThinksBox._childs=[];
                            var re =createImg(obj.result);
                            goodsBoxObj.goodsThinksBox.addChild(re);
                            noGoods.visible =false;
                            delBtn.visible = true;
                        }
                    };
                    //删除篮子物品
                    delBtn.on(Event.CLICK,this,function () {
                        noGoods.visible =true;
                        delBtn.visible = false;
                        goods[selectThinks].visible=true;
                        Tween.to(goods[selectThinks],{x:goods[selectThinks].curX,y:goods[selectThinks].curY,alpha:1},200);
                        goodsBoxObj.goodsThinksBox._childs=[];
                    })
                })(goodsBoxObj,noGoods,delBtn);
                Stage.addChild(goodsBoxObj);
            }

            var goods=[];
            // 生成物品列表
            for(var i in source.goods){
                var item = source.goods[i];
                var obj=createImg(item.label);
                obj.isMove=false;
                obj.curX=obj.x;
                obj.id=i;
                obj.result = item.result;
                obj.curY=obj.y;
                goods.push(obj);
                (function (obj) {
                   // 按下物品
                    obj.on(Event.MOUSE_DOWN,this,function () {
                        obj.isMove=true;
                        obj.oldX =Stage.mouseX;
                        obj.oldY =Stage.mouseY;
                    });
                    // 移动物品
                    Stage.on(Event.MOUSE_MOVE,this,function () {
                        if(obj.isMove){
                            obj.x = (Stage.mouseX-obj.oldX)+obj.curX;
                            obj.y = (Stage.mouseY-obj.oldY)+obj.curY;
                        }
                    });
                    // 停止触碰
                    Stage.on(Event.MOUSE_UP,this,out);
                    Stage.on(Event.MOUSE_OUT,this,out);

                    /**hitTestPoint-检测某个点是否在此对象内。*/
                    function out() {
                        if(obj.isMove){
                            obj.isMove=false;
                            var hitNum="";
                            for(var i in goodsBoxArr){
                                if( goodsBoxArr[i].hitTestPoint(Stage.mouseX,Stage.mouseY)){
                                    hitNum = i;
                                }
                            }
                            //监测是否碰撞到选框
                            if(hitNum!==""&& goodsBoxArr[hitNum].goodsThinksBox._childs.length==0){
                                Tween.to(obj,{alpha:0},200,"",Handler.create(this,function () {
                                    obj.visible=false;
                                }));
                                goodsBoxArr[hitNum].getThinks(obj)
                            }else {
                                Tween.to(obj,{x:obj.curX,y:obj.curY},200);

                            }
                        }
                    }

                })(obj);


                Stage.addChild(obj);
            }


        };


        return new g()
    })();


    function getData() {
        return (new Date()).valueOf()
    }

    //已知半径，圆心，角度求圆上的点
    function getXY(r, ao, x, y) {
        // r半径,ao角度，圆心 xy
        return {
            x: Math.floor(x + r * Math.cos(ao * 3.14 / 180)),
            y: Math.floor(y + r * Math.sin(ao * 3.14 / 180))
        }
    }

    function hitTestObj(obj, dobj) {
        var o = {
            x: obj.x,
            y: obj.y,
            w: obj.width,
            h: obj.height
        };
        var dobjPos = dobj.getBounds();
        var d = {
            x: dobj.x - dobjPos.width / 2,
            y: dobj.y - dobjPos.height,
            w: dobj.width,
            h: dobj.height
        };

        var px, py;
        px = o.x <= d.x ? d.x : o.x;
        py = o.y <= d.y ? d.y : o.y;
        // 判断点是否都在两个对象中
        if (px >= o.x && px <= o.x + o.w && py >= o.y && py <= o.y + o.h && px >= d.x && px <= d.x + d.w && py >= d.y && py <= d.y + d.h) {
            return true;
        } else {
            return false;
        }
    }

    //求两点距离角度
    function getLengthAngle(x1, x2, y1, y2) {
        var xDiff = x2 - x1,
            yDiff = y2 - y1;
        return {
            length: Math.ceil(Math.sqrt(xDiff * xDiff + yDiff * yDiff)),
            angle: Math.round((Math.atan2(yDiff, xDiff) * 180) / Math.PI)
        };
    }

    // 新建一个元件
    function createImg(img, x, y, c) {  //c不填 中心点在左上角 c=1中心点在元素中心
        var Bitmap = new Sprite(), skin = lab[img].url;
        Bitmap.graphics.drawTexture(skin, 0, 0);
        Bitmap.size(skin.width, skin.height);
        Bitmap.width = skin.width;
        Bitmap.height = skin.height;
        var regX = skin.width / 2, regY = skin.height / 2;
        Bitmap.center = c;
        x = x ? x : lab[img].x;
        y = y ? y/1008*h : lab[img].y/1008*h;
        if (c == 1) {
            Bitmap.pivot(regX, regY);
            x=x+regX
        } else if (c == 2) {
            Bitmap.pivot(regX, skin.height);
            x=x+regX
        }

        Bitmap.pos(x, y);
        return Bitmap
    }
});




