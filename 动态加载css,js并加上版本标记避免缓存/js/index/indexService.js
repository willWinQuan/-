/**
 *Created by chq on 2018/7/5
 */

var load_resource_indexDao={
    js:[
        'js/index/indexDao.js'
    ]
};

load_resource_fn('js',load_resource_indexDao.js).then(function(){
    setTimeout(function(){
        console.log('indexService');
    });
    var indexDao=new IndexDao();

    var IndexService=function(){

        var getTest=function(){
            indexDao.getTest();
        };

        return {
            getTest:getTest
        }
    };
});


