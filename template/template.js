(function (window, document, undefined) {
    var Include39485748323 = function () {
    };
    Include39485748323.prototype = {
//倒序循环
        forEach: function (array, callback) {
            var size = array.length;
            for (var i = size - 1; i >= 0; i--) {
                callback.apply(array[i], [i]);
            }
        },
        getFilePath: function () {
            var curWwwPath = window.document.location.href;
            var pathName = window.document.location.pathname;
            var localhostPaht = curWwwPath.substring(0, curWwwPath.indexOf(pathName));
            var projectName = pathName.substring(0, pathName.substr(1).lastIndexOf('/') + 1);
            return localhostPaht + projectName;
        },
//获取文件内容
        getFileContent: function (url) {
            var ie = navigator.userAgent.indexOf('MSIE') > 0;
            var o = ie ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
            o.open('get', url, false);
            o.send(null);
            return o.responseText;
        },
        parseNode: function (content) {
            var objE = document.createElement("div");
            objE.innerHTML = content;
            return objE.childNodes;
        },
        executeScript: function (content) {
            var mac = /<script>([\s\S]*?)<\/script>/g;
            var r = "";
            while (r = mac.exec(content)) {
                eval(r[1]);
            }
        },
        getHtml: function (content) {
            var mac = /<script>([\s\S]*?)<\/script>/g;
            content.replace(mac, "");
            return content;
        },
        getPrevCount: function (src) {
            var mac = /\.\.\//g;
            var count = 0;
            while (mac.exec(src)) {
                count++;
            }
            return count;
        },
        getRequestUrl: function (filePath, src) {
            if (/http:\/\//g.test(src)) {
                return src;
            }
            var prevCount = this.getPrevCount(src);
            while (prevCount--) {
                filePath = filePath.substring(0, filePath.substr(1).lastIndexOf('/') + 1);
            }
            return filePath + "/" + src.replace(/\.\.\//g, "");
        },
        replaceIncludeElements: function () {
            var $this = this;
            var filePath = $this.getFilePath();
            var includeTals = document.getElementsByTagName("include");
            this.forEach(includeTals, function () {
                //拿到路径
                var src = this.getAttribute("src");
                //拿到文件内容
                var content = $this.getFileContent($this.getRequestUrl(filePath, src));
                //将文本转换成节点
                var parent = this.parentNode;
                var includeNodes = $this.parseNode($this.getHtml(content));
                var size = includeNodes.length;
                for (var i = 0; i < size; i++) {
                    parent.insertBefore(includeNodes[0], this);
                }
                //执行文本中的额javascript
                $this.executeScript(content);
                parent.removeChild(this);
                //替换元素 this.parentNode.replaceChild(includeNodes[1], this);
            })
        }
    };
    new Include39485748323().replaceIncludeElements();

    //操作模板
    Vue.component(
        "ctrl-tab",
        {
            template: '#ctrlTab',
            props: {
                columnsData: Array,
            },
            data() {
                return {
                    checkedData: [],
                }
            },
            methods: {
                changeColumns(e, id) {
                    this.$emit("on-change", {
                        isshow: e,
                        id: id
                    })
                },
            }

        }
    );

    // 运费模板
    Vue.component(
        "freight-rule",
        {
            template: '#freightRule',
            props: {
                value: Array,
            },
            data() {
                return {
                    data: [{}],
                    columns: [
                        {title: '收货地区', key: 'date'},
                        {title: '默认重量（kg）', key: 'date', slot: ""},
                        {title: '默认费用（元）', key: 'date', slot: ""},
                        {title: '每续重量（kg）', key: 'date', slot: ""},
                        {title: '每续费用（元）', key: 'date', slot: ""},
                        {title: '操作', key: 'date', slot: "action"},
                    ]
                }
            },
            methods: {
                changeColumns(e, id) {
                    this.$emit("on-change", {
                        isshow: e,
                        id: id
                    })
                },
            }

        }
    );
    // 地区选择模板
    Vue.component(
        "choose-city",
        {
            props: {
                value: Array,
            },
            data() {
                return {
                    cityList: [{title: "全部", id: 0, children: cityList, expand: true}],
                }
            },
            methods: {},
            template: '#chooseCity',
        }
    );

})(window, document);

