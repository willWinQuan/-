/**
 *Created by chq on 2018/7/5
 */
var Config=function(){

    var version="v1.0.0";
    var _config=configuration('uat');
    var now_time=new Date().getTime();

    return {
        time:now_time,
        version:version,
        _config:_config
    };

    function configuration(env){
        /**
         * 开发
         */
        this.dev={
            API:''
        };

        /**
         * 测试
         */
        this.uat={
            API:''
        };

        /**
         * 生产
         */
        this.prod={
            API:''
        };

        return this[env]
    }


};