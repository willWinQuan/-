/**
 *Created by chq on 2018/7/5
 */

/**
 * 加载资源
 * */
var load_resource_index={
    css:[
        'css/common/common.css',
        'css/index/index.css'
    ],
    js:[
        'js/common/common.js',
        'js/index/indexService.js'
    ]
};
setTimeout(function(){
    load_resource_fn('css',load_resource_index.css);
    load_resource_fn('js',load_resource_index.js).then(function(){
        var indexService=new IndexService();
        indexService.getTest();
    });
},500);









