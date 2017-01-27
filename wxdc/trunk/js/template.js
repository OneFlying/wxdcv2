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
         * @param num   评分等级{1-10}
         * @returns {string}
         */
        star: function (num) {
            var html = '',
                full = parseInt(num / 2),
                half = num % 2;
            for(var i = 0; i < full; i++) {
                html += '<i class="fa fa-star fa-full"></i>';
            }
            for(i = 0; i < half; i++) {
                html += '<i class="fa fa-star-half-o fa-full"></i>';
            }
            return html;
        },
        pic:function(url){
            var html = '';
            if(url){
                $(url.split(",")).each(function(index,item){

                    html +='<div class="item-title"><img src='+item+' alt="1" width="70"></div>';

                });
            }else{
                html = ' ';
            }

            return html;
        },
        picuser:function(url){
            var html = '';
            if(url){
                $(url.split(",")).each(function(index,item){

                    html +='<div class="item-title"><img src='+config.picurl+item+' alt="1" width="70"></div>';

                });
            }else{
                html = ' ';
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
        /**
         * 取餐list
         */
        qc_list : '<li>\
                    <div class="item-content">\
                        <div class="item-inner">\
                            <div class="item-input">\
                                <input class="open-indicator" type="text" value="${name}">\
                                <input type="hidden" value="${qc_id}"/>\
                            </div>\
                        </div>\
                    </div>\
                    </li>',
        //商家列表页模板
        main: '<li style="${parentstyle}" enclass="align-top">\
                    <a href="${storeid}" class="item-content">\
                        <div class="item-media">\
                            <img src="${src}" alt="1" width="70">\
                        </div>\
                        <div class="item-inner">\
                            <div class="item-title-row">\
                                <div id="merchantname" class="item-title">${title}</div>\
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
                            <div class="item-text item-info">\
                                ${case}\
                            </div>\
                        </div>\
                    </a>\
                </li>',
        //我的订单列表模板
        order: '<li>\
                    <a href="orderdetial.html" class="item-content item-link">\
                        <div class="item-inner">\
                            <div class="item-title-row">\
                                <div class="item-title">2016年3月21日 12:00</div>\
                                <div class="item-after"><span>¥${price}</span></div>\
                            </div>\
                            <div class="item-title-row">\
                                <div class="item-subtitle">宫保鸡丁等2件菜品</div>\
                                <div class="item-after">${status}</div>\
                            </div>\
                        </div>\
                    </a>\
                </li>',
        /**
         * 商家详细信息头部模板
         */
        merchantInfo : '<div class="item-media">\
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
                                <div class="item-footer"><span id="psj">¥${psj}</span>&nbsp;配送</div>\
                            </div>\
                            <div  class="item-text item-date">\
                                <i class="fa fa-clock-o"></i>\
                                <span id="store_times_" class="open-popover" data-popover=".popover-links_">${times}</span>\
                                    </div>\
                                    <div class="item-text item-info">\
                                <div>\
                            </div>\
                        </span>',
        goodsCatory : '<li>\
                            <a id="${catoryid}" class="${active}"><span>${desc}</span></a>\
                       </li>',
        goodsList :'<li id="${goodsid}" enabled="${parentpermission}" style="${parentstyle}" class="align-top">\
                        <a class="item-content item-store">\
                            <div class="item-media">\
                                <img class="title_" data-param="${param}" src="${src}" alt="1" width="40">\
                            </div>\
                            <div class="item-inner">\
                                <div class="item-title-row">\
                                    <div class="item-title title_" data-param="${param}">${title}</div>\
                                    <div class="item-title">${quan}</div>\
                                </div>\
                                <div class="item-title-row">\
                                    <div class="item-subtitle">\
                                        ${star}\
                                    </div>\
                                <div class="item-footer">\
                                    ${desc}\
                                </div>\
                            </div>\
                                <div class="item-title-row item-op">\
                                    <div class="item-subtitle"><small>¥</small><span>${price}</span></div>\
                                    <div class="item-footer">\
                                        <span class="prev prev_ link-btn" style="${style}" data-obj="${addobj}"><i class="fa fa-minus"></i> </span>\
                                        <span class="num numlist">${total}</span>\
                                        <span class="next next_ link-btn" style="${sty}" data-obj="${delobj}"><i class="fa fa-plus"></i> </span>\
                                    </div>\
                                </div>\
                            </div>\
                        </a>\
                    </li>',
        /**
         * 确认下单界面
         */
        confirmOrder : '<div class="content-normal">\
        <div class="list-block list-nomargin media-list list-noborder">\
        <ul>\
        <li>\
        <a href="#" class="item-content item-link">\
        <div class="item-media">\
        <i class="fa fa-map-marker fa-2x"></i>\
        </div>\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">${username}<span>${sex}&nbsp;${phone}</span></div>\
    </div>\
    <div class="item-title-row">\
        <div class="item-subtitle">${loc}</div>\
        </div>\
        </div>\
        </a>\
        </li>\
        </ul>\
        </div>\
        </div>\
        <div class="list-block media-list list-small">\
        <ul>\
        <li>\
        <a href="#" class="item-content">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">预计送达时间</div>\
        <div class="item-after">${pretime}</div>\
    </div>\
    </div>\
    </a>\
    </li>\
    <li>\
    <a href="#" class="item-content">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">商家</div>\
        <div class="item-after">${merchantname}</div>\
        </div>\
        </div>\
        </a>\
        </li>\
        <li>\
        <a href="${inventoryurl}" class="item-content">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">配送费</div>\
        <div class="item-after">${psprice}</div>\
    </div>\
    </div>\
    </a>\
    </li>\
        <li>\
        <a href="${inventoryurl}" class="item-content item-link">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">商品清单</div>\
        <div class="item-after">共${total}菜品&nbsp;¥${price}</div>\
    </div>\
    </div>\
    </a>\
    </li>\
    <li>\
    <a href="${url}" class="item-content item-link">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">订单备注</div>\
        <div class="item-after order_remark">口味，偏好等其他需求</div>\
    </div>\
    </div>\
    </a>\
    </li>\
    </ul>\
    </div>\
    <div class="list-block media-list list-small">\
        <ul>\
        <li>\
        <a href="${gradeurl}" class="item-content item-link">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">会员等级</div>\
        <div class="item-after"></div>\
    </div>\
    </div>\
    </a>\
    </li>\
    <li>\
    <a href="${crediturl}" class="item-content item-link">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">会员积分</div>\
        <div class="item-after"></div>\
    </div>\
    </div>\
    </a>\
    </li>\
    <li>\
    <a href="${couponurl}" class="item-content item-link">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">优惠券</div>\
        <div class="item-after coupon_after"></div>\
        </div>\
        </div>\
        </a>\
        </li>\
        </ul>\
        </div>\
        <div class="list-block media-list list-small">\
        <ul>\
        <li>\
        <a href="#" class="item-content">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">会员打折</div>\
        <div class="item-after"></span></div>\
    </div>\
    </div>\
    </a>\
    </li>\
    <li>\
    <a href="#" class="item-content">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">积分换购</div>\
        <div class="item-after"><span></span></div>\
    </div>\
    </div>\
    </a>\
    </li>\
    <li>\
    <a href="#" class="item-content">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">优惠券使用</div>\
        <div class="item-after"><span id="coupon_use"></span></div>\
    </div>\
    </div>\
    </a>\
    </li>\
    <li>\
    <a href="#" class="item-content">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-after"><span></span></div>\
        </div>\
        </div>\
        </a>\
        </li>\
        <li>\
        <a href="#" class="item-content">\
        <div class="item-inner">\
        <div class="item-title-row">\
        <div class="item-title">&nbsp;</div>\
    <div class="item-after"><span></span></div>\
        </div>\
        </div>\
        </a>\
        </li>\
        </ul>\
        </div>\
        <div class="content-fixed"></div>',

        /**
         * 订单详情
         */
        orderInfo : '<li>\
                    <a href="#" data-param="${param}" data-item="${item}" class="item-content item-link">\
                        <div class="item-inner">\
                            <div class="item-title-row">\
                                <div class="item-title time_title_" >${time}</div>\
                                <div class="item-after">\
                                    ${button}\
                                    <span>¥${price}</span>\
                                </div>\
                            </div>\
                            <div class="item-title-row">\
                                <div class="item-subtitle">${name}等${total}件菜品</div>\
                                <div class="item-after">${status}</div>\
                            </div>\
                            <div class="item-title-row">\
                                <div class="item-subtitle">取餐码</div>\
                                <div class="item-after">${gainCode}</div>\
                            </div>\
                        </div>\
                    </a>\
                </li>',
        /**
         * 订单可取状态
         */
        order_status_delivered:'<p class="buttons-row" style="margin: 0 0">\
                                    <a href="${complainurl}" class="button button-fill button-danger button-big button-noradius">投诉</a>\
                                    <a href="${url}" class="button button-fill button-success button-big button-noradius">再来一单</a>\
                                </p>',
        /**
         * 订单已定
         */
        order_status_paid:'<p class="buttons-row" style="margin: 0 0">\
            <a href="${complainurl}" class="button button-fill button-danger button-big button-noradius">投诉</a>\
            <a href="${evaluateurl}" class="button button-fill button-success button-big button-noradius">申请取消</a>\
            <a href="${url}" class="button button-fill button-success button-big button-noradius">再来一单</a>\
            </p>',
        /**
         * 订单未付
         */
        order_status_unPaid:'<p class="buttons-row" style="margin: 0 0">\
                <a href="${complainurl}" class="button button-fill button-danger button-big button-noradius">投诉</a>\
                <a id="paid_button" class="button button-fill button-success button-big button-noradius">付款</a>\
                <a href="${url}" class="button button-fill button-success button-big button-noradius">再来一单</a>\
                </p>',
        /**
         * 订单已取
         */
        order_status_picked:'<p class="buttons-row" style="margin: 0 0">\
            <a href="${complainurl}" class="button button-fill button-danger button-big button-noradius">投诉</a>\
            <a href="${evaluateurl}" class="button button-fill button-success button-big button-noradius">评价</a>\
            <a href="${url}" class="button button-fill button-success button-big button-noradius">再来一单</a>\
            </p>',
        order_status_Refunded:'<p class="buttons-row" style="margin: 0 0">\
                                <a  class="button button-fill button-dark button-big fa-full">已提交</a>\
                                <a  class="button button-fill button-dark button-big"><i class="fa fa-long-arrow-right fa-full"></i> </a>\
                                <a  class="button button-fill button-dark button-big fa-full">审核中</a>\
                                <a  class="button button-fill button-dark button-big"><i class="fa fa-long-arrow-right fa-full"></i> </a>\
                                <a  class="button button-fill button-dark button-big">已退款</a>\
                                </p>',
        /**
         * 退款中
         */
        order_status_refunding:'<p class="buttons-row" style="margin: 0 0">\
            <a href="${complainurl}" class="button button-fill button-dark button-big fa-full">已提交</a>\
            <a href="${url}" class="button button-fill button-dark button-big"><i class="fa fa-long-arrow-right fa-full"></i> </a>\
            <a href="${complainurl}" class="button button-fill button-dark button-big fa-full">审核中</a>\
            <a href="${url}" class="button button-fill button-dark button-big"><i class="fa fa-long-arrow-right fa-full"></i> </a>\
            <a href="${complainurl}" class="button button-fill button-dark button-big">已退款</a>\
            </p>',

        goodsDetail : '<div class="item-title-row">\
                        <div class="item-title">${name}</div>\
                        <div class="item-after">X${total}&nbsp;&nbsp;<span>¥${totalprice}</span></div>\
                    </div>',
        fee : '<div class="item-title-row">\
                    <div class="item-title">包装费</div>\
                    <div class="item-after">X${wraptotal}&nbsp;&nbsp;<span>¥${wrapfee}</span></div>\
                </div>\
                <div class="item-title-row">\
                    <div class="item-title">配送费</div>\
                    <div class="item-after">X${pstotal}&nbsp;&nbsp;<span>¥${psfee}</span></div>\
                </div>',
        /**
         * 等级和积分
         */
        grade_point : '<div class="col-50">\
                            <h2>${grade}</h2>\
                            <div>等级</div>\
                            </div>\
                        <div class="col-50">\
                            <h2>${point}</h2>\
                            <div>积分</div>\
                        </div>',
        /**
         * 我的资料
         */
        myinfo : '<a href="${url}" class="item-content item-link">\
                        <div class="item-media"><i class="fa fa-user"></i></div>\
                        <div class="item-inner">\
                            <div class="item-title">我的资料</div>\
                        </div>\
                    </a>',
        /**
         * 我的评价
         */
        myevalute : '<div class="card card_evaluate" data-param="${feedbackid}">\
                            <div class="card-header">\
                                <div class="pull-left">\
                                ${ca_name}\
                                </div>\
                            </div>\
                            <div class="card-content">\
                                <div class="list-block media-list">\
                                    <ul class="align-top">\
                                        <li class="item-content">\
                                            <div class="item-title-row">\
                                                ${pic_url}\
                                            </div>\
                                        </li>\
                                        <li class="item-content">\
                                             <div class="item-title-row">\
                                                <div class="item-subtitle">\
                                                ${star}\
                                                </div>\
                                             </div>\
                                        </li>\
                                        <li class="item-content">\
                                             <div>\
                                                <div class="item-subtitle" >\
                                                    ${content}\
                                                </div>\
                                             </div>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                            <div class="card-footer">\
                                <span>评价日期：${date}</span>\
                            </div>\
                    </div>',
        myevalute_m : '<div class="card card_evaluate" data-param="${feedbackid}">\
                            <div class="card-header">\
                                <div class="pull-left">\
                                ${ca_name}\
                                </div>\
                            </div>\
                            <div class="card-content">\
                                <div class="list-block media-list">\
                                    <ul class="align-top">\
                                        <li class="item-content">\
                                            <div class="item-inner">\
                                                <div class="item-subtitle">\
                                                    ${star}\
                                                </div>\
                                                <div class="item-subtitle" style="word-break: normal;width: auto;white-space: pre-wrap;word-wrap: break-word;overflow: hidden;">${content}</div>\
                                                </div>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            <div class="card-footer">\
                            <span>评价日期：${date}</span>\
                        </div>\
                    </div>',
        /**
         * 评价时商品列表信息
         */
        evaluateGoods : '<div class="item-title-row">\
                            <div data-goodsid="${id}" class="item-title evaluate_title">${goodsname}</div>\
                            <div class="item-after">\
                                <select class="rating" name="rating" title="">\
                                <option value="1">1</option>\
                                <option value="2">2</option>\
                                <option value="3">3</option>\
                                <option value="4">4</option>\
                                <option value="5">5</option>\
                                </select>\
                            </div>\
                        </div>',
        corderList : '<div data-orderid="${orderid}" class="row no-gutter mark">\
                        <div class="col-15">${seq}</div>\
                        <div class="col-20">${user}</div>\
                        <div class="col-25">${id}</div>\
                        <div class="col-20">${status}</div>\
                        <div class="col-20" style="text-align:right;padding-right:10px;">¥${totalfee}</div>\
                        </div>',
        imgtpl : '<li data-pic="${url}" class="weui_uploader_file">\
                        <div style="width: 100%;height: 100%;">\
                            <div id="${id1}" style="width: 100%;height: 100%;">\
                                <div style="width: 100%;height: 100%;">\
                                    <img id="${id2}" style="width: 100%;height: 100%;"/>\
                                </div>\
                            </div>\
                        </div>\
                    </li>',
        mycomplain : '<div class="card">\
                            <div class="card-header">\
                            <div class="pull-left click_complain" data-param="${param-data}">\
                            我的投诉\
                            </div>\
                            <div class="pull-right">\
                            ${date}\
                            </div>\
                        </div>\
                        <div class="card-content">\
                            <div class="list-block media-list">\
                                <ul class="align-top">\
                                    <li class="item-content">\
                                            <div class="item-title-row">\
                                                ${pic_url}\
                                            </div>\
                                        </li>\
                                        <li class="item-content">\
                                             <div>\
                                                <div class="item-subtitle" >\
                                                    ${content}\
                                                </div>\
                                             </div>\
                                        </li>\
                                </ul>\
                            </div>\
                        </div>\
                        <div class="card-footer">\
                            <span>&nbsp;</span>\
                        <span>\
                            </span>\
                            </div>\
                            </div>',
        c_footer_print : '<p class="buttons-row" style="margin: 0 0;">\
                        <a id="testprint" class="button button-fill button-dark button-big button-noradius">返回</a>\
                        <a id="hcprint" class="button button-fill button-dark button-big button-noradius">后厨打印</a>\
                        <a id="cprint" class="button button-fill button-dark button-big button-noradius">打印</a>\
                        </p>',
        c_footer_query:'<p class="buttons-row" style="margin: 0 0;">\
                        <a id="queryOrder" class="button button-fill button-dark button-big button-noradius">查看订单</a>\
                        <a id="queryCancelOrder" class="button button-fill button-dark button-big button-noradius">查看取消单</a>\
                        </p>',
        inventory : '<li class="align-top">\
                        <a href="${url}" class="item-content item-store">\
                            <div class="item-media">\
                                <img src="${picurl}" alt="1" width="40">\
                            </div>\
                            <div class="item-inner">\
                                <div class="item-title-row">\
                                    <div class="item-title">${goodsname}</div>\
                                </div>\
                                <div class="item-title-row">\
                                    <div class="item-subtitle">\
                                        ${star}\
                                    </div>\
                                </div>\
                                <div class="item-title-row item-op">\
                                    <div class="item-subtitle"><small>¥</small>${price}</div>\
                                    <div class="item-footer">\
                                    <span class="prev"><i class="fa fa-minus"></i> </span>\
                                    <span class="num">${total}</span>\
                                    <span class="next"><i class="fa fa-plus"></i> </span>\
                                    </div>\
                                </div>\
                            </div>\
                        </a>\
                    </li>',
        inven_goodslist : '<li>\
                            <a href="#" class="item-content">\
                            <div  class="item-inner">\
                            <div class="item-title-row">\
                            <div class="item-title">${goodsname}</div>\
                            <div class="item-after">X${total}&nbsp;&nbsp;<span>¥${totalfee}</span></div>\
                        </div>\
                        </div>\
                        </a>\
                        <a href="#" class="item-content">\
                            <div id="inventory_fee" class="item-inner">\
                            <div class="item-title-row">\
                            <div class="item-title">包装费</div>\
                            <div class="item-after">X${wraptotal}&nbsp;&nbsp;<span>¥${wrapfee}</span></div>\
                        </div>\
                        </div>\
                        </a>\
                        </li>',
        goods_detial : '<div class="item-inner">\
                            <div class="pull-left">描述:</div>\
                            <div class="item-subtitle pull-right">${desc}</div>\
                        </div>\
                        <div class="item-inner">\
                            <div class="pull-left">价格:</div>\
                            <div class="item-subtitle pull-right">¥${price}</div>\
                        </div>\
                        <div class="item-inner">\
                            <div class="pull-left">包装费:</div>\
                            <div class="item-subtitle pull-right">¥${qsprice}</div>\
                        </div>\
                        <div class="item-inner">\
                            <div class="pull-left">配送时间:</div>\
                        </div>\
                        <div class="item-inner">\
                            <div class="item-subtitle pull-left">${pstime}</div>\
                        </div>',
        evaluatedetail_title:'<div class="item-inner">\
                                    <div class="item-title-row">\
                                        ${pic_url}\
                                    </div>\
                                     <div class="item-title-row">\
                                        <div class="item-subtitle">\
                                        ${star}\
                                        </div>\
                                     </div>\
                                     <div>\
                                        <div class="item-subtitle" >\
                                            ${content}\
                                        </div>\
                                     </div>\
                                </div>',
        evaluatedetail_title_m:'<div class="item-inner">\
                                    <div class="item-title-row">\
                                        ${pic_url}\
                                    </div>\
                                     <div class="item-title-row">\
                                        <div class="item-subtitle">\
                                        ${star}\
                                        </div>\
                                     </div>\
                                     <div>\
                                        <div class="item-subtitle" >\
                                            ${content}\
                                        </div>\
                                     </div>\
                                </div>',
        evaluatedetail_reply:'<div class="card-header">\
                                <div class="pull-left">\
                                商家回复\
                                </div>\
                                <div class="pull-right">\
                                ${time}\
                            </div>\
                            </div>\
                            <div class="card-content">\
                                <div class="list-block media-list">\
                                <ul class="align-top">\
                                <li class="item-content">\
                                <div class="item-inner">\
                                ${content}\
                                </div>\
                                </li>\
                                </ul>\
                                </div>\
                                </div>',
        store_cart : '<li class="align-top">\
                        <a href="#" class="item-content item-store">\
                            <div class="item-media">\
                                <img src="${src}" alt="1" width="40">\
                            </div>\
                            <div class="item-inner">\
                                <div class="item-title-row">\
                                    <div class="item-title">${title}</div>\
                                </div>\
                                    <div class="item-title-row item-op">\
                                        <div class="item-subtitle"><small>¥</small><span>${price}</span></div>\
                                        <div class="item-footer">\
                                            <span class="prev prevcart" data-obj="${addobj}"><i class="fa fa-minus" ></i> </span>\
                                            <span class="num cart_num">${total}</span>\
                                            <span class="next nextcart" data-obj="${delobj}"><i class="fa fa-plus"></i> </span>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </a>\
                        </li>',
        loc_list:'<li>\
                    <a data-value="${qc_id}" class="item-content qucan_loc" style="display: inline-block;text-align: center;">\
                    <div class="item-title-row" >\
                    <div class="item-title" style="color: #fff;">${loc}</div>\
                    </div>\
                    </a>\
                    </li>',
        coupon:'<div class="card">\
                    <div class="card-header">\
                    <div class="pull-left">\
                    ${title}\
                    </div>\
                    <div class="pull-right">\
                    </div>\
                    </div>\
                    <div class="card-content">\
                    <div class="list-block media-list">\
                    <ul class="align-top">\
                    <li class="item-content">\
                    <div class="item-media">\
                    <img src="${url}" alt="1" width="70">\
                    </div>\
                    <div class="item-inner">\
                    <div class="item-subtitle">${desc}</div>\
                    </div>\
                    </li>\
                    <li class="item-content">\
                    <div class="item-inner item-info">\
                    有效期：${time}\
                </div>\
                </li>\
                </ul>\
                </div>\
                </div>\
                <div class="card-footer">\
                    <div style="width: 70%">&nbsp;</div>\
                <!--<span class="prev"><i class="fa fa-minus"></i> </span>-->\
                    <!--<span class="num">1</span>-->\
                    <!--<span class="next"><i class="fa fa-plus"></i> </span>-->\
                    <button class="button button-danger coupon_button" data-name="${couponName}" data-discount="${discount}" data-couponid="${id}">使用</button>\
                    </div>\
                    </div>',
        mycoupon:'<div class="card">\
                    <div class="card-header">\
                    <div class="pull-left">\
                        商家：${merchant}\
                    </div>\
                    <div class="pull-right">\
                        ${title}\
                    </div>\
                    </div>\
                    <div class="card-content">\
                    <div class="list-block media-list">\
                    <ul class="align-top">\
                        <li class="item-content">\
                            <div class="item-media">\
                                <img src="${url}" alt="1" width="70">\
                            </div>\
                            <div class="item-inner">\
                                <div class="item-subtitle">${desc}</div>\
                            </div>\
                        </li>\
                        <li class="item-content">\
                            <div class="item-inner item-info">\
                            有效期：${time}\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
                </div>\
                <div class="card-footer">\
                    <div style="width: 70%">${status}</div>\
                    </div>\
                    </div>',
        img_tpl:'<span><img alt="1" src="${imgurl}"></span>',
        fee_detail:'<div class="item-title-row">\
                    <div class="item-title">会员等级优惠</div>\
                    <div class="item-after"><span>- ¥0</span></div>\
                    </div>\
                    <div class="item-title-row">\
                    <div class="item-title">积分兑换</div>\
                    <div class="item-after"><span>- ¥0</span></div>\
                    </div>\
                    <div class="item-title-row">\
                    <div class="item-title">优惠券</div>\
                    <div class="item-after"><span>- ¥${coupon}</span></div>\
                    </div>',
        new_index_img:'<span id="${qid}" data-id="${id}" data-name="${name}"><img src="${src}" style="width:40%;"/></span>',

        /**
         * 搜索结果模板
         */
        index_search_tpl:'<li >\
                            <a class="item-content item-link search_list" data-id="${lid}" data-name="${lname}">\
                                <div class="item-inner">\
                                    <div class="item-title">${locname}</div>\
                                    <div class="item-after">${distance}km</div>\
                                </div>\
                            </a>\
                          </li>',

        /**
         * 历史订单
         */
        showHide:'<div class="popup popup-about poptop" >\
        <div class="content-block theme-blue">\
        <header class="bar bar-nav">\
        <!--<a class="icon icon-left pull-left back"></a>-->\
        <h1 class="title">搜索取餐点</h1>\
        </header>\
        <div class="bar bar-header-secondary">\
        <div id="search_bar" class="searchbar">\
        <a class="searchbar-cancel" id="close_popup">取消</a>\
        <div class="search-input">\
        <label class="icon icon-search" for="search_index"></label>\
        <input type="text" id="search_index" placeholder="请输入取餐点">\
        </div>\
        </div>\
        </div>\
        <div class="content">\
        <div class="list-block list-small list-setting">\
        <ul id="index_search_list">\
        </ul>\
        </div>\
        </div>\
        </div>\
        </div>\
        <!--时间选择弹出层-->\
        <div class="popover popover-linktime" style="width: 80% !important;">\
        <div class="popover-angle"></div>\
        <div class="popover-inner">\
        <div class="list-block list-small">\
        <ul id="qc_list_time">\
        </ul>\
        </div>\
        </div>\
        </div>\
        <!--取餐点弹出层-->\
        <!--<div class="content">-->\
        <!--<div  class="content-block">-->\
        <div class="popover popover-link0" style="width: 80% !important;">\
        <div class="popover-angle"></div>\
        <div class="popover-inner">\
        <div class="list-block list-small">\
        <ul id="qc_list">\
        <!--<li>-->\
        <!--<div class="item-content">-->\
        <!--<div class="item-inner">-->\
        <!--<div class="item-input">-->\
        <!--<input type="text" placeholder="条件1">-->\
        <!--</div>-->\
        <!--</div>-->\
        <!--</div>-->\
        <!--</li>-->\
        </ul>\
        </div>\
        </div>\
        </div>\
        <!--</div>-->\
        <!--</div>-->\
        <!-- 分类弹出层 -->\
        <div class="popover popover-link1">\
        <div class="popover-angle"></div>\
        <div class="popover-inner">\
        <div class="list-block">\
        <ul>\
        <li><a data-time="0000-0959" class="zaocan list-button item-link">早餐</a></li>\
        <li><a data-time="1000-1559" class="wucan list-button item-link">午餐</a></li>\
        <li><a data-time="1600-2059" class="wancan list-button item-link">晚餐</a></li>\
        <li><a data-time="2100-2359" class="yexiao list-button item-link">夜宵</a></li>\
        </ul>\
        </div>\
        </div>\
        </div>\
        <!-- 排序弹出层 -->\
        <div class="popover popover-link2">\
        <div class="popover-angle"></div>\
        <div class="popover-inner">\
        <div class="list-block">\
        <ul>\
        <li><a class="level list-button item-link">商户星级</a></li>\
        <li><a class="createtime list-button item-link">创建时间</a></li>\
        </ul>\
        </div>\
        </div>\
        </div>\
        <!-- 筛选弹出层 -->\
        <div class="popover popover-link3">\
        <div class="popover-angle"></div>\
        <div class="popover-inner">\
        <div class="list-block list-small">\
        <ul>\
        <li>\
        <div class="item-content">\
        <div class="item-inner">\
        <div class="item-title label">条件1</div>\
        <div class="item-input">\
        <input type="text" placeholder="条件1">\
        </div>\
        </div>\
        </div>\
        </li>\
        <li>\
        <div class="item-content">\
        <div class="item-inner">\
        <div class="item-title label">条件2</div>\
        <div class="item-input">\
        <input type="text" placeholder="条件2">\
        </div>\
        </div>\
        </div>\
        </li>\
        <li>\
        <div class="item-content">\
        <div class="item-inner">\
        <div class="item-title label">条件3</div>\
        <div class="item-input">\
        <input type="text" placeholder="条件3">\
        </div>\
        </div>\
        </div>\
        </li>\
        </ul>\
        </div>\
        <div class="content-normal">\
        <a href="#" class="button button-big button-fill button-success">确定</a>\
        </div>\
        </div>\
        </div>',
        historyOrder : ''

    }
}($);


var template = $.fn.template;