var dataColumns = [
    {
        key: "facilitator",
        name: "物流服务商",
        type: "String", //String 字符串，Array数组
        screenType: ["顺丰", "德邦"]
    },
    {
        key: "rule",
        name: "运费规则",
        type: "Array", //String 字符串，Array数组
    },
];


var columnsData=[];
var app = new Vue({
    el: '#app',
    data: {
        templateType: "",
        templateList: [
            {value: '模板名称', label: '模板名称'},
            {value: '模板名称1', label: '模板名称1'},
        ],
        columns: [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {title: '模板ID', key: 'date'},
            {title: '模板名称', key: 'date'},
            {title: '物流服务商', key: 'date'},
            {title: '运费规则', key: 'date'},
            {title: '包邮条件', key: 'date'},
            {title: '保价条件', key: 'date'},
            {title: '状态', key: 'date'},
            {title: '操作', slot: 'action', width: 150, align: 'center'},

        ],
        data: [
            {
                name: '模板ID',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03'
            },
        ],


    },
    methods: {
        getDataColumns: function () {
            this.columns = [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
            ];
            dataColumns.forEach(item => {
                let column = {
                    title: item.name,
                    key: item.key
                };
                if (item.screenType) {
                    column.filters = [];
                    item.screenType.forEach(i => {
                        column.filters.push({
                            label: i,
                            value: i
                        })
                    });
                    column.filterMethod = function (value, row) {
                        console.log(value)
                        // return row.address.indexOf(value) > -1;
                    }
                }
                columnsData.push({
                    label: item.key,
                    title: item.name,
                    isShow: item.isshow
                });
                this.columns.push(column);

            });
            this.columns.push({title: '操作', slot: 'action', width: 150, align: 'center',renderHeader: (h, params) => {
                    return h('ctrl-tab', {
                        props: Object.assign({}, {
                            columnsData: columnsData
                        }),
                        on: {
                            "on-change": e => {
                                // this.changeUserColumns(e)
                                console.log(e)
                            }
                        }
                    });
                }})
        },
        change: function () {

        }
    },
    mounted: function () {
        this.getDataColumns();
    }
});
