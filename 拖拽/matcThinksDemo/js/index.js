

var app = new Vue({
    mixins:[appData],
    el: '#app',
    data:{

    },
    methods: {
        // 页面切换

        showRule: function () {
            this.popShow("rule");
            setTimeout(function () {
                rule.refresh();
            }, 100)
        },
        showRank: function (type) {
            ajax({
                url: sysParam.ajaxRankingList,
                data: {
                    "is_share": type,  // 0 分数排行榜  1 助力排行榜
                    "page": this.pageNum,  //获取页数
                }, callBack: function (data) {
                    app.popShow("rank");
                    if (app.pageNum == 1) {
                        app.rankList = data.result_data.total_page_list
                    } else {
                        app.rankList = app.rankList.concat(data.result_data.total_page_list)
                    }
                    app.maxPageNum = data.result_data.total_page_nums;

                    setTimeout(function () {
                        rankList.refresh();
                    }, 100)
                }
            })
        },

    },
    created: function () {

    }
});

// var rule;
$(function () {
    // rule = new IScroll("#rule");

    // rankList = new IScroll(".rankList ");
    // rankList.on("scrollEnd", function (e) {
    //     if (app.pageNum < app.maxPageNum && this.y == this.maxScrollY) {
    //         app.pageNum++;
    //         app.showRank();
    //     }
    // })
});