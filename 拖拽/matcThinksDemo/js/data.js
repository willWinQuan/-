/**
 * Created by Arvinco on 2018/3/31.
 */
var appData= {
    data:function () {
        return{
            loading: true,
            ajaxLoading: false,
            //页面
            page: {
                index: false,
                gameView: true,
            },
            //弹窗
            pop: {
                rule: false,
            },
            //弹窗黑色背景
            popupBg: false,
            fAlert: {
                show: false,
                text: "提示"
            },
            popAlert: {
                show: false,
                text: "提示"
            }
        }
    },
    methods:{
        pageShow: function (id) {
            for (var i in this.page) {
                this.page[i] = i == id ? true : false;
            }
        },

        //弹窗切换
        popShow: function (id) {
            for (var i in this.pop) {
                this.pop[i] = i == id ? true : false;
            }
            this.popupBg = id ? true : false;
        },

        //关闭弹窗
        close: function () {
            this.popShow();
        },

        // 错误提示淡入淡出
        fadeAlert: function (text, time) {
            if (this.fadeAlertSetTime) {
                clearTimeout(this.fadeAlertSetTime)
            }
            this.fAlert.show = true;
            this.fAlert.text = text;
            this.fadeAlertSetTime = setTimeout(function () {
                app.fAlert.show = false;
            }, time ? time : 1500);
        },

        //信息弹窗
        alert: function (text) {
            this.popAlert.show = true;
            this.popAlert.text = text;
            this.popupBg = true;
        },

        //关闭信息弹窗
        closeAlert: function () {
            var num = 0;
            for (var i in this.pop) {
                if (this.pop[i] == true) {
                    num++
                }
            }
            this.popAlert.show = false;
            if (num < 1) {
                this.popupBg = false;
            }
        },
    }
};