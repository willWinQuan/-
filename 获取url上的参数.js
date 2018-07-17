/**
 * decodeURI 中文乱码需要这个方法解析
 * @param url
 * @param key
 * @returns {*}
 */

function getUrlData(url,key) {

    var url=url,url_l=url.length,i=0,
        Qindex=url.indexOf('?'),urlObj={},
        urlParam=url.substring(Qindex+1,url_l),
        urlArray=urlParam.split('&'),url_aa=[];

        for(i=0;i<urlArray.length;i++){
            url_aa=urlArray[i].split('=');
            urlObj[url_aa[0]]=decodeURI(url_aa[1]);
        }
        return urlObj[key];
}

console.time('执行时间测试1');
var url='http://test.com.cn/#/index?test=12&chq=陈海泉';
var test=getUrlData(url,'test'),chq=getUrlData(url,'chq');
console.log(test);
console.log(chq);
console.timeEnd('执行时间测试1');