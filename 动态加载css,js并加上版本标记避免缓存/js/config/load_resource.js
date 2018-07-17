/**
 *Created by chq on 2018/7/5
 */
var config=new Config();


function load_resource_fn(cssJs,fileUrlArray,callback){

    var i=0,cssJs=cssJs,fileUrlArray=fileUrlArray,time=config.time,version=config.version;

    var loadStyle=function(){
        var link='';
        for(i=0;i<fileUrlArray.length;i++){
            link+='<link type="text/css" rel="stylesheet" href="'+fileUrlArray[i]+'?v='+version+'&t='+time+'" />'
            // var link = document.createElement('link');
            // link.type = 'text/index';
            // link.rel = 'stylesheet';
            // link.href = fileUrlArray[i]+'?v='+version+'&t='+time;
        };
        var head = document.getElementsByTagName('head')[0];
        $('head').append(link);
    };
    var loadScript=function(){
        var deferred = $.Deferred();
        var script='';
        for(i=0;i<fileUrlArray.length;i++){
            script+='<script type="text/javascript" src="'+fileUrlArray[i]+'?v='+version+'&t='+time+'"></script>'
            // var script = document.createElement('script');
            // script.type = 'text/javascript';
            // script.src = fileUrlArray[i]+'?v='+version+'&t='+time;
            // var head = document.getElementsByTagName('head')[0];
        };
        var head = document.getElementsByTagName('head')[0];
        $('head').append(script,function(){
            deferred.resolve({});
        });

        return deferred.promise();

    };
    switch (cssJs){
        case 'css':
            loadStyle();
            break;
        case 'js':
            loadScript(function(){
                typeof callback=='function' && callback({});
            });
            break;
    }
}

/**
 * 只添加版本号 && 时间
 */
function addVT(){
    var script = document.getElementsByTagName('script');
    var time=config.time,version=config.version;
    for(var i=0;i<script.length;i++){
        script[i].src=script[i].src+"?v="+version+"?t="+time;
    }
}
addVT();