/**
 * Created by caiyu on 2016/6/24.
 * 生成模板
 */
+ function ($) {
    $.fn.template = {
        /**
         * 正则替换
         * @param str   待替换字符串
         * @param replacements  数据字典
         * @returns {*|void|string|XML} 返回值
         */
        replace: function (str,replacements) {
            /* 正则模板替换，定义数据字典即可 */
            Array.prototype.each = function(trans) {
                for (var i=0; i<this.length; i++)
                    this[i] = trans(this[i], i, this);
                return this;
            };
            Array.prototype.map = function(trans) {
                return [].concat(this).each(trans);
            };
            RegExp.escape = function(str) {
                return new String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
            };
            function properties(obj) {
                var props = [];
                for (var p in obj) props.push(p);
                return props;
            }

            var regex = new RegExp(properties(replacements).map(RegExp.escape).join("|"), "g");
            str = str.replace(regex, function($0) { return replacements[$0]; });

            return str;

            /*//调用方式
            template.replace(template.index,{
                "${storeid}"    : 1,
                "${src}"        : "images/3.jpg"
            });*/
        },
        /**
         * 将评分转换为星号
         * @param num   评分等级{1-5}
         * @returns {string}
         */
        star: function (num) {
            var html = '';
            for(var i = 0; i < num; i++) {
                html += '<i class="fa fa-star fa-full"></i>';
            }
            for(i = 0; i < (5-num); i++) {
                html += '<i class="fa fa-star fa-empty"></i>';
            }
            return html;
        },
        /**
         * 格式化销售时间段 //逗号隔开
         * @param timeStr
         */
        times: function (timeStr) {
            var timeArray = timeStr.split(','), html = '';
            for (var i = 0; i < timeArray.length; i ++) {
                html += '<span>' + timeArray[i] + '</span>'
            }
            return html;
        },
        //用户协议
        agreement: '<h2>${title}</h2>\
                    <p>${content}</p>',
        //首页正则模板
        index: '<li class="align-top">\
                    <a href="store.html?storeid=${storeid}" class="item-content">\
                        <div class="item-media">\
                            <img src="${src}" alt="1" width="70">\
                        </div>\
                        <div class="item-inner">\
                            <div class="item-title-row">\
                                <div class="item-title">${title}</div>\
                                <div class="item-after"><span><small>¥</small>${qsj}</span>&nbsp;起送</div>\
                            </div>\
                            <div class="item-title-row">\
                                <div class="item-subtitle">\
                                    ${star}\
                                </div>\
                                <div class="item-footer"><span>¥${psj}</span>&nbsp;配送</div>\
                            </div>\
                            <div class="item-text item-date">\
                                <i class="fa fa-clock-o"></i>\
                                ${times}\
                            </div>\
                            <div class="item-text item-info">\
                                <div>\
                                    <div class="icon-cheapen"></div>\
                                    <span>${cheapen}</span>\
                                </div>\
                                <div>\
                                    <div class="icon-sales"></div>\
                                    <span>${sales}</span>\
                                </div>\
                            </div>\
                        </div>\
                    </a>\
                </li>',
        //商家列表页模板
        main: '<li class="align-top">\
                    <a href="store.html?storeid=${storeid}" class="item-content">\
                        <div class="item-media">\
                            <img src="${src}" alt="1" width="70">\
                        </div>\
                        <div class="item-inner">\
                            <div class="item-title-row">\
                                <div class="item-title">${title}</div>\
                                <div class="item-after"><span><small>¥</small>${qsj}</span>&nbsp;起送</div>\
                            </div>\
                            <div class="item-title-row">\
                                <div class="item-subtitle">\
                                    ${star}\
                                </div>\
                                <div class="item-footer"><span>¥${psj}</span>&nbsp;配送</div>\
                            </div>\
                            <div class="item-text item-date">\
                                <i class="fa fa-clock-o"></i>\
                                ${times}\
                            </div>\
                            <div class="item-text item-info">\
                                <div>\
                                    <div class="icon-cheapen"></div>\
                                    <span>${cheapen}</span>\
                                </div>\
                                <div>\
                                    <div class="icon-sales"></div>\
                                    <span>${sales}</span>\
                                </div>\
                            </div>\
                        </div>\
                    </a>\
                </li>',
        //我的订单列表模板
        order: ''
    }
}($);


var template = $.fn.template;