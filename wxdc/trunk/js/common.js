/**
 * Created by Paytham on 2016/6/20.
 * E-mail: caiyuhao2015@gmail.com
 * QQ: 404961386
 */
var Cart = {

    /**
     * 总价格
     */
    totalPrice : 0,
    total:0,
    /**
     * 放入购物车
     * @param merchantId 商家id
     * @param obj 商品对象
     */
    pushCart : function(merchantId,obj){

        //Storage.clear();

        var data = Storage.getItem("Cart");

        var value = JSON.parse(data);
        /**
         *如果购物车为空
         */
        if(!data){

            var parent = {};
            var arr = {};

            obj.total = 1;
            Cart.totalPrice += obj.price;
            Cart.total += 1;

            arr[obj.goodsid] = obj;


            parent[merchantId] = arr;
            var value = JSON.stringify(parent);

            Storage.setItem("Cart",value);


        }else{

            var value = JSON.parse(data);

            if(!value[merchantId]){
                var arr = {};

                obj.total = 1;
                Cart.totalPrice += obj.price;
                Cart.total += 1;

                arr[obj.goodsid] = obj;


                value[merchantId] = arr;
                var value = JSON.stringify(value);

                Storage.setItem("Cart",value);

            }else{

                if(value[merchantId].hasOwnProperty(obj.goodsid)){
                    var item = value[merchantId][obj.goodsid];

                    item.total += 1;
                    Cart.totalPrice += item.price;
                    Cart.total += 1;

                }else{

                    obj.total = 1;
                    Cart.totalPrice += obj.price;
                    Cart.total += 1;

                    value[merchantId][obj.goodsid] = obj;

                }

                Storage.setItem("Cart",JSON.stringify(value));

            }


        }
        return {'total':Cart.countTotal(merchantId),'totalPrice':Cart.countPrice_(merchantId)};
    },
    /**
     * 从购物车中删除
     * @param merchantId 商家id
     * @param goodsid 商品id
     */
    popCart : function(merchantId,goodsid){

        var data = Storage.getItem("Cart");

        if(data){

            var value = JSON.parse(data);

            if(value[merchantId]){

                if(value[merchantId].hasOwnProperty(goodsid)){

                    var item = value[merchantId][goodsid];

                    if(item.total > 1){
                        item.total = item.total - 1;
                    }else{
                        delete  value[merchantId][goodsid];
                    }
                }

                var str = JSON.stringify(value);
                Storage.setItem("Cart",str);

            }

        }
        return {'total':Cart.countTotal(merchantId),'totalPrice':Cart.countPrice_(merchantId)};

    },
    /**
     * 根据id移除商家商品
     * @param merchantId
     */
    removeMerchant: function(merchantId){

        var data = Storage.getItem("Cart");

        if(data){
           var value = JSON.parse(data);
            if(value[merchantId]){
                delete value[merchantId];
                Storage.setItem("Cart",JSON.stringify(value));
            }

        }
    },
    /**
     * 遍历购物车
     * @param merchantid 商家id
     * @return 对象数组
     */
    loopCart : function(merchantid){
        var data = Storage.getItem("Cart");

        var objArr = [];

        if(data){

            var value = JSON.parse(data);

            if(value[merchantid]){
                if(value[merchantid].length != 0){
                    for(var key in value[merchantid]){
                        objArr.push(value[merchantid][key]);
                    }
                }
            }
        }

        return objArr;
    },
    /**
     * 查询购物车中的商品信息
     * @param merchantid 商家id
     * @param goodsid 商品id
     */
    queryCart : function(merchantid,goodsid){

        var data = Storage.getItem("Cart");

        if(data){

            var value = JSON.parse(data);

            if(value[merchantid]){

                if(value[merchantid].hasOwnProperty(goodsid)){

                    return value[merchantid][goodsid];
                }
            }

        }
    },
    /**
     * 统计总共的商品数据
     * @param merchantid 商家id
     */
    countTotal : function(merchantid){

        var total = 0;
        var objs = Cart.loopCart(merchantid);

        $(objs).each(function(i,item){

            total += item.total;
        });
        return total;
    },
    countPrice : function(merchantid){
        var price = 0;
        var objs = Cart.loopCart(merchantid);

        $(objs).each(function(i,item){


            var s = parseFloat(item.price);

            price += (item.total)*s+(item.total)*item.packageEx;

        });
        return price.toFixed(2);
    },
    countPrice_ : function(merchantid){
        var price = 0;
        var objs = Cart.loopCart(merchantid);

        $(objs).each(function(i,item){


            var s = parseFloat(item.price);

            price += (item.total)*s;

        });
        return price.toFixed(2);
    }

}


var Des = {
    des : [],
    query : function(name){

        var resId = '';
        $(Des.des).each(function(index,item){

            if(item.name == name){
                resId = item.id;
            }

        });
        return resId;
    },
    getNameArr : function(){

        var namearr = [];

        $(Des.des).each(function(index,item){

            namearr.push(item.name);

        });

        return namearr;
    }
}

function transTime(str){
    var data = str.split(" ");

    var date = data[0].trim()+data[1].trim()+data[2].trim()+data[3].trim()+data[4].trim();
    var time = data[5].trim()+data[6].trim()+data[7].trim();

    return date+" "+time;
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null)
        return  decodeURIComponent(r[2]);
    return null;
}

function lightTimeHandler(catorytimee,timeStr){
    var lighttime = [];
    var timeGap = catorytimee.split('-');

    var starTime = new Date(timeGap[0].substring(0,2),timeGap[0].substring(2,timeGap[0].length));
    var endTime  = new Date(timeGap[1].substring(0,2),timeGap[0].substring(2,timeGap[1].length));
    var times = timeStr.split(' ');
    $(times).each(function (index,item) {

        var t = item.split(':');
        var tm = new Date(t[0],t[1]);
        if((starTime <= tm)&&(tm <= endTime)){
            lighttime.push(item);
        }

    });
    lighttime.sort();
    return lighttime[0];
}


/**
 * 符合的时间高亮
 */
function lightTime(catory,timeStr){

    var lighttime = [];

    var zaocan = '0000-0959';
    var wucan  = '1000-1559';
    var wancan = '1600-2059';
    var xiaoye = '2100-2359';

    var res = '';
    if(catory == 'zaocan'){

        res = lightTimeHandler(zaocan,timeStr);

    }else if(catory == 'wucan'){

        res = lightTimeHandler(wucan,timeStr);
    }else if(catory == 'wancan'){

        res = lightTimeHandler(wancan,timeStr);
    }else if(catory == 'xiaoye'){
        res = lightTimeHandler(xiaoye,timeStr);
    }
    lighttime.push(res);
    return lighttime;

}

function getRealTime(time){
    var t = time.split(':');
    var date = new Date(t[0],t[1]);

    return date;
}

function getDay(){
    var today = new Date();

    var targetday_milliseconds=today.getTime() + 1000*60*60*24*1;

    today.setTime(targetday_milliseconds); //注意，这行是关键代码

    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear+"年"+tMonth+"月"+tDate+"日 ";
}
function doHandleMonth(month){
    var m = month;
    if(month.toString().length == 1){
        m = "0" + month;
    }
    return m;
}

function showRealTime() {
    var now=new Date();
    var year=now.getFullYear();
    var month=(now.getMonth()+1)< 10 ? "0"+(now.getMonth()+1) : (now.getMonth()+1);
    var day=now.getDate()+1 < 10 ? "0"+(now.getDate()+1) : (now.getDate()+1);
    var hours=now.getHours() < 10 ? "0"+now.getHours() : now.getHours();
    var minutes=now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes();
    var seconds=now.getSeconds() < 10 ? "0"+now.getSeconds() : now.getSeconds();

    $('.bar-time > span').html('请选择预定时间');
    $('.bar-time > span').attr('data-time',getDay()+hours+":00");
    //一秒刷新一次显示时间
    var timeID=setTimeout(showRealTime, 60 * 1000);
}

function getLocTime() {
    var now=new Date();
    var year=now.getFullYear();
    var month=(now.getMonth()+1)< 10 ? "0"+(now.getMonth()+1) : (now.getMonth()+1);
    var day=now.getDate() < 10 ? "0"+now.getDate() : now.getDate();

    return year+"-"+month+"-"+day;
}

function formatGoodsTime(time){

    var timearr = time.split("-");
    var restime = "";

    $(timearr).each(function(index,item){

        var hour = item.substring(0,2);
        var time = item .substring(2,4);

        restime +=hour+":"+time+" ";

    });
    return restime;
}


$(function () {
    'use strict';


    // $(document).on('click','.next', function () {
    //     var $span = $(this).prev('span'),
    //         num = Number($span.text());
    //     $span.text(num+1);
    // });
    //
    // $(document).on('click','.prev', function () {
    //     var $span = $(this).next('span'),
    //         num = Number($span.text());
    //     $span.text(num-1);
    // });
    /* 用户协议 */
    $(document).on('pageInit', '#agreement', function (e, id, page) {

        $('#index_window_').hide();
        if(!config.token){
            config.token = GetQueryString('token');
        }
        // var picurl = "http://"+window.location.hostname;
        //
        // var url = picurl+"/api";
        // config.url = url;
        // config.picurl = picurl;
        Storage.ready(function () {
            var data = Storage.getItem('isAgreement');
            if (!data) {
                //对话框
                $(page).on('click','.alert-text',function () {
                    $.alert('您需同意本站协议,才可享受本站提供的服务');
                });
                $(page).on('click', '.button-agree', function () {
                    
                    if($('input[name="checkbox"]').is(':checked')) {
                        Storage.setItem('isAgreement', true);
                    }
                    //同意用户协议
                    network.agree();
                    $.router.loadPage('#index');
                });
                // 获取用户协议
                network.agreeMent();
            } else {
                $.router.loadPage({
                    url: "#index",
                    noAnimation: true,
                    replace: true
                })
            }
        });
    });

    var isSetIndexImage = false;
    /* 首页 */
    $(document).on('pageInit','#index',function (e, id, page) {

        $('#index_window_').show();
        /**
         * 获取用户信息
         */
        if(config.iscustomization){
            //true定制
            network.getLoginUserInfo();

            //防止控件刷新时覆盖加载导致报错
            if(!isSetIndexImage){
                network.getIndexImage();
                isSetIndexImage = true;
            }

        }else{

            var html = template.showHide;
            $('#hide_window_').children().remove();
            $('#hide_window_').html(html);

            //获取当前位置
            getLoation();

            //不定制
            //加载首页广告
            network.getLoginUserInfoNoDingzhi();
            //防止控件刷新时覆盖加载导致报错
            if(!isSetIndexImage){
                network.getIndexImage();
                isSetIndexImage = true;
            }
            

            /**
             * 点击弹出搜索取餐点界面
             */
            $('#search').unbind('click');
            $('#search').bind('click',function(e){

                $('#search_index').val('');
                
                //获取取餐点信息并保存到本地
                network.getSearchLocationPoint();

                //搜索页面弹出时初始化页面数据
                //var localDataBase = JSON.parse(Storage.getItem('localDataBase'));
                network.renderSearchViewList(config.locationData);
             
                $('#search_bar').addClass('searchbar-active');
                $.popup('.poptop');
            });

            /**
             * 点击关闭搜索取餐点界面
             */
            $('#close_popup').unbind('click');
            $('#close_popup').bind('click',function (e) {
                
                $.closeModal('.poptop');
                Storage.removeItem("localDataBase");

            });

            /**
             * 绑定搜索框事件
             */
            $('#search_index').keyup(function(){

               network.renderSearchView();
            });

        }
        
        // 动态刷新时间
        showRealTime();
        
    });

    /* 主页 */
    $(document).on('pageInit','#main',function (e, id, page) {

        /**
         * 获取取餐点
         */
        network.getQuCanLocation($("#qc_loc"));


        // 动态刷新时间
        showRealTime();
        //获取符合条件的商家列表
        
    });

    /**
     * 取餐界面
     */
    $(document).on('pageInit','#qucan',function(e,id,page){



        var str = $('#qucan').attr('data-value');

        if(str){
            //console.log(str);
            //var order = JSON.parse(decodeURIComponent(GetQueryString("param")));
            var order = JSON.parse(decodeURIComponent(str));

            var orderIds = [];
            if(order.childOrders.length != 0){
                //如果有子订单
                $(order.childOrders).each(function(index,item){
                    orderIds.push(item.id);
                });
            }else{
                orderIds.push(order.id);
            }
            $('#qucan_orderId').text(order.id);

            network.renderBoxLoc($('#qucan_location'),orderIds);
            // $('#qucan_location').text(order.boxID);
            $('input[name=gianCode]').val(order.gainCode);
            $(page).on('click','#saoCode',function(e){

                qrCode();
            })

            $(page).on('click','#getCode',function(e){

                var code = $("input[name=gianCode]").val();
                if(order.gainCode != code){
                    $.alert("取餐码不正确!");
                }else{

                    $.ajax({

                        url: config.url + '/v1/res/box/pick/'+code,
                        type: 'GET',
                        dataType: 'json',
                        beforeSend: function (request) {
                            request.setRequestHeader("Authorization", config.token);
                        },
                        success: function (data) {

                            if(data.status == 'true'){
                                $.alert('取餐成功');
                            }else{
                                $.alert(data.message);
                            }

                        },
                        error : function(data){
                            console.log("ajax error");
                        }

                    });

                }

            });
        }

    });

    $(document).on('pageInit','#store',function (e, id, page) {

        $('#index_window_').hide();
        $('#store_back_').click(function(){
            $.router.back();
            $('#index_window_').show();
        });
        //alert(GetQueryString('storeid'));
        // var menuScroll = new IScroll('.box-menu', { mouseWheel: true, click: true });
        // var itemScroll = new IScroll('.box-content', {mouseWheel: true, click: true });
        //
        // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

        /**
         * 获取数据
         */
        var storeid = GetQueryString('storeid');
        var imgsrc  = GetQueryString('src');
        var title   = GetQueryString('title');
        var qsj     = GetQueryString('qsj');
        var psj     = GetQueryString('psj');
        var star    = GetQueryString('star');
        var times   = GetQueryString('times');
        var catory  = GetQueryString('catoryid');
        var sellTime = GetQueryString('sellTime');

        var createTime = GetQueryString('createTime');
        var describeTxt = GetQueryString('describeTxt');
        var merchantAdr = GetQueryString('merchantAdr');
        //var cheapen = GetQueryString('cheapen');
        //var sales   = GetQueryString('sales');
        Storage.removeItem('Cart');

        
        $("#store_title").text(title);
        $("#store_star").html(template.star(star));
        $("#store_time").text(times);
        $('#create_time').text(createTime);
        $('#store_addr').text(merchantAdr);
        $('#store_desc').text(describeTxt);
        
        /**
         * 拼接评价星级
         * @type {string}
         */
        var starHtml= template.star(star);
        
        var time_='';
        var paramArr = '';
        if(catory){

            var t = times.split(' ');
            var l = lightTime(catory,times);

            paramArr = l;
            $(t).each(function(i,t){

                $(l).each(function(index,item){

                    if(t == item){
                       t = ' <font id="select_time" color="green">'+t+'</font>';
                    }
                });
                time_ +=' '+t;

            });
        }else{
            var conDate = $('#index_time').text();

            var conTime = conDate.split(' ');
            var t = times.split(' ');

            //console.log(conTime);
            var l = [];

            if(times.indexOf(conTime[1]) != -1){
                l.push(conTime[1]);
            }else{
                l.push(t[0]);
            }

            paramArr = l;

            $(t).each(function(i,t){
                $(l).each(function(index,item){

                    if(t == item){
                        t = ' <font id="select_time" color="green">'+t+'</font>';
                    }
                });
                time_ +=' '+t;
            });
        }

        /**
         * 渲染头部
         */
        var html = template.replace(template.merchantInfo,{
            '${src}':config.picurl+imgsrc,
            '${title}' : title,
            '${qsj}': qsj,
            '${star}':starHtml,
            '${psj}':psj,
            '${times}':time_,
            '${cheapen}':' ',
            '${sales}':' '//暂时模拟
        });

        $("#merchantInfo").html(html);

        network.getGoodsCatory(storeid,title,paramArr);


        var timeHtime = ''
        $(times.split(' ')).each(function(index,item){
            timeHtime += '<li><a href="#" class="list-button item-link item_time_store">'+item+'</a></li>'
        });
        $('#store_list_time').html(timeHtime);

        $('.item_time_store').click(function () {
            //$('.open-popover').text($(this).html());;

            //$.alert('ok');
            Storage.removeItem('Cart');
            $('#totalNum').text('0');
            $('#totalCash').text('0.00');
            var l = [];
            l.push($(this).html());

            var t = times.split(' ');

            var times_ = '';
            $(t).each(function(i,t){

                $(l).each(function(index,item){

                    if(t == item){
                        t = ' <font id="select_time" color="green">'+t+'</font>';
                    }
                });
                times_ +=' '+t;
            });

            $('#store_times_').html(times_);

            network.getGoodsCatory(storeid,title,l);

            $.closeModal();

        });

        /**
         * 获取评价
         */
        $('input[name=pageNo]').val('1');
        network.getMyEvalute(storeid);

        var loading = false;
        $(page).on('infinite', '.infinite-scroll',function() {
            // 如果正在加载，则退出
            if (loading) return;
            // 设置flag
            loading = true;
            setTimeout(function() {
                loading = false;
                var pageNo = parseInt($('input[name=pageNo]').val());
                var totalPage = parseInt($('input[name=totalPage]').val());
                if(pageNo*10 > totalPage) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').remove();
                    return;
                }
                $('input[name=pageNo]').val(parseInt($('input[name=pageNo]').val())+1);
                network.getMyEvalute(storeid);
            }, 1000);
        });


        // $(pape).on('click','#store',function(e){
        //     $('.store-cart').slideDown('slow');
        // });
         var isopen = false;
        /**
         * 绑定购物车点击事件
         */
        $(page).on('click','.cart',function(e){


            $('#storeCart').children().remove();
            var arr = Cart.loopCart(storeid);

            var htmlcart = '';
            $(arr).each(function(index,item){
                
                htmlcart += template.replace(template.store_cart,{
                    '${src}':config.picurl+item.src,
                    '${title}':item.title,
                    '${price}':(item.price*item.total).toFixed(2),
                    '${addobj}':config.jsonToStr(item),
                    '${delobj}':config.jsonToStr(item),
                    '${total}':item.total
                });

            });

            if(arr.length>4){
                $('.store-cart').attr('style','height:15rem');
            }else{
                $('.store-cart').attr('style','height:auto')
            }


            $('#storeCart').html(htmlcart);


            if(!isopen){
                $('.store-cart').show("slow");
                $('.shadowpanel').show();
                isopen = true;
            }else{
                $('.store-cart').hide('slow');
                $('.shadowpanel').hide();
                isopen = false;
            }

        });

        if(!isopen){
            $(page).on('click','.nextcart',function(e){

                var $span = $(this).prev('span'),
                    $prev = $(this).prev('span').prev('span'),
                    num = Number($span.text());
                $prev.attr("style","display:block");

                $span.text(num+1);


                var str = $(this).data('obj');

                var obj = config.strToObj(str);

                var res = Cart.pushCart(storeid,obj);
                
                $("#totalNum").text('');
                $("#totalNum").text(res.total);
                $("#totalCash").text('');
                $("#totalCash").text(res.totalPrice);

                var goodObj = Cart.queryCart(storeid,obj.goodsid);
                console.log(goodObj);

                $('.numlist').each(function(i,el){

                    var tempObj = config.strToObj($(el).next('span').data('obj'));
                    if(tempObj.goodsid == goodObj.goodsid){
                        var num = Number($(el).text());
                        $(el).text(num+1);
                    }

                });

                var $goodprice = $span.parent('div').prev('div').find('span');

                $goodprice.text((goodObj.price*goodObj.total).toFixed(2));
            });


            /**
             * 绑定删除事件
             */
            $(page).on('click','.prevcart',function(e){

                var $span = $(this).next('span'),
                    num = Number($span.text());
                if(num > 1){
                    $span.text(num-1);
                }else{

                    $span.text('');
                    $(this).attr("style","display:none");
                }


                var str = $(this).data('obj');

                var obj = config.strToObj(str);

                var goodObj = Cart.queryCart(storeid,obj.goodsid);

                var $goodprice = $span.parent('div').prev('div').find('span');

                $goodprice.text((Number($goodprice.text())-goodObj.price).toFixed(2));

                $('.numlist').each(function(i,el){

                    var tempObj = config.strToObj($(el).prev('span').data('obj'));
                    if(tempObj.goodsid == goodObj.goodsid){
                        var num = Number($(el).text());

                        if(num > 1){
                            $(el).text(num-1);
                        }else{

                            $(el).text('');
                            $(el).prev('span').attr("style","display:none");
                        }

                    }

                });

                var res = Cart.popCart(storeid,obj.goodsid);

                $("#totalNum").text('');
                $("#totalNum").text(res.total);
                $("#totalCash").text('');
                $("#totalCash").text(res.totalPrice);

            });
        }
        $('.shadowpanel').click(function(e){

            $('.store-cart').hide();
            $(this).hide();
        });

        /**
         * 清空购物车
         */
        $(page).on('click','#clear_cart',function(e){

            Storage.removeItem('Cart');

            $('#storeCart').children().remove();
            $('#totalCash').text('0');
            $('#totalNum').text('0');
            $('.numlist').text('');
            $('.prev_').attr('style','display:none');

        });


        /**
         * 绑定添加事件
         */
        $(page).on('click','.next_',function(e){

            var $span = $(this).prev('span'),
                $prev = $(this).prev('span').prev('span'),
                num = Number($span.text());
            $prev.attr("style","display:block");
            $span.text(num+1);


            var str = $(this).data('obj');

            var obj = config.strToObj(str);
            

            var res = Cart.pushCart(storeid,obj);
            $("#totalNum").text('');
            $("#totalNum").text(res.total);
            $("#totalCash").text('');
            $("#totalCash").text(res.totalPrice);
           
        });

        /**
         * 绑定删除事件
         */
        $(page).on('click','.prev_',function(e){

            var $span = $(this).next('span'),
                num = Number($span.text());
            if(num > 1){
                $span.text(num-1);
            }else{

                $span.text('');
                $(this).attr("style","display:none");
            }


            var str = $(this).data('obj');
            var obj = config.strToObj(str);

            var res = Cart.popCart(storeid,obj.goodsid);
            $("#totalNum").text('');
            $("#totalNum").text(res.total);
            $("#totalCash").text('');
            $("#totalCash").text(res.totalPrice);
        });

        /**
         * 渲染底部
         */
        var _total = Cart.countTotal(storeid);
        var _totalPrice = Cart.countPrice(storeid);
        $("#totalNum").text('');
        $("#totalNum").text(_total);
        $("#totalCash").text('');
        $("#totalCash").text(_totalPrice);

        $('a[href="#tab1"]').click(function(){

            $('.bar_cart').show();
        });
        $('a[href="#tab2"]').click(function(){

            $('.bar_cart').hide();
        });
        $('a[href="#tab3"]').click(function(){

            $('.bar_cart').hide();
        });

    });

    $(document).on('pageInit', '#payment', function (e, id, page) {

        config.isSubmitOrder = 'false';
        var merchantid = GetQueryString("merchantid");
        var merchantname = GetQueryString("title");

        network.confirmOrder(merchantid,merchantname);
        
        $(page).on("click","#conOrder",function(){
            
            network.submitOrder(merchantid);
            
        });

    });


    /**
     * 添加备注
     */
    $(document).on('pageInit','#remark',function (e,id,page) {

        var location = GetQueryString("location");
        var merchantname = GetQueryString("merchantname");

        $("input[name=loc]").val(location);
        $("input[name=merchantname]").val(merchantname);

        $(page).on("click","#confirm",function(e){

            var content = $("textarea").val();

            var data = Storage.getItem("order");

            var order = JSON.parse(data);
            order.describeTxt = content;

            var showContent = content.substring(0,10);

            $('.order_remark').text(showContent);
            Storage.setItem("order",JSON.stringify(order));
            $.router.back("#payment.html");
        });
        $(page).on("click","#cancel",function(e){

            $.router.back("#payment.html");
        });
    });

    /**
     * 会员积分
     */
    $(document).on('pageInit','#credit',function(e,id,page){
        var point = GetQueryString("point");
        $("#point_").text(point);
    });
    /**
     * 会员等级
     */
    $(document).on('pageInit','#grade',function(e,id,page){
        var grade = GetQueryString("grade");
        $("#grade_").text(grade);
    });
    /**
     * 商品清单
     */
    $(document).on('pageInit','#inventory',function(e,id,page){
        var merchantid = GetQueryString("merchantid");
        var merchantname = GetQueryString("merchantname");
        $("#c_name").text(merchantname);
        network.renderInventory(merchantid);
    });
    /**
     * 商品详细页
     */
    $(document).on('pageInit','#detail',function(e,id,page){
        var param = GetQueryString("param");
        var goods = JSON.parse(decodeURIComponent(param));

        $("#goodspic").attr("src",config.picurl+goods.goodsPic);
        ///$("#goodspic").attr("src",'images/detail.jpg');
        $("#goodsname_").text(goods.goodsName);
        $('#godds_star').html(template.star(goods.level));
        
        var html = template.replace(template.goods_detial,{
            '${desc}':goods.describeTxt,
            '${price}':goods.goodsPrice,
            '${qsprice}':goods.packageEx,
            '${pstime}':formatGoodsTime(goods.sellTime)
        });
        
        $("#desc_content").html(html);
    });

    $(document).on('pageInit','#order',function (e, id, page) {

        $('#order').find('input[name=totalPage]').val('');
        $('input[name=pageNo]').val('1');
        $('input[name=sellDate_gte]').val(getLocTime());
        $("#orderInfo").children('li').remove();
        network.getOrderList();

        var loading = false;
        $(page).on('infinite', '.infinite-scroll',function() {

            // 如果正在加载，则退出
            if (loading) return;

            // 设置flag
            loading = true;

            setTimeout(function() {
                loading = false;

                var pageNo = parseInt($('input[name=pageNo]').val());
                var totalPage = parseInt($('input[name=totalPage]').val());
                if(pageNo*10 > totalPage) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').remove();
                    return;
                }

                $('input[name=pageNo]').val(parseInt($('input[name=pageNo]').val())+1);
                network.getOrderList();

            }, 1000);
        });

        //network.getSignature();

    });


    /**
     * 订单详情页
     */
    $(document).on('pageInit','#orderdetail',function(e,id,page){

        var orderId = GetQueryString("item");

        //var obj = JSON.parse(decodeURIComponent(data));
        network.orderDetial(orderId,config.token);

        // if(obj.orderStatus == 'UnPaid'){
        //     $(page).on("click","#paid_button",function(e){
        //
        //        network.payOrder(orderId);
        //
        //     });
        // }

    });

    /**
     * 关于我的信息
     */
    $(document).on('pageInit','#my',function(e,id,page){
        network.getMyInfo();
    });

    /**
     * 我的详细信息
     */
    $(document).on('pageInit',"#information",function(e,id,page){
        
        network.renderMyInfo();    
    });


    
    $(document).on('pageInit', '#evaluate', function (e, id, page) {

        var data = GetQueryString("param");
        var obj = JSON.parse(decodeURIComponent(data));
        network.renderEvaluate(obj);

        var id1 = 0;
        var id2 = 0;
        $("#theFile", "#fileDiv").click(function () {
            id1++;
            id2++;
            $(this).blur();
        });

        $("#theFile", "#fileDiv").change(function () {
            
            var ida = id1+"a";
            var idb = id2+"b";

            network.PreviewImage(this, ida, idb);
            // alert("预览已生成!");
            $("#imageUpload").prop("disabled", false);
        });
        
        /**
         * 绑定取消事件
         */
        $(page).on("click","#evaluate_cancel",function(e){

            $.router.back();

        });
        $(page).on("click","#evaluate_again",function(e){
           $.router.loadPage("#index");
        });

        var goodss = [];
        var feedbackMStar;

        $('.rating').barrating({
            theme: 'fontawesome-stars',
            showSelectedRating: false,
            onSelect: function (value, text) {
                var $obj = $(this).parent().parent().parent().prev();
                var goodsid = $obj.attr("data-goodsid");

                if(goodsid){
                    var gobj = {
                        "goodsID":goodsid,
                        "feedbackGStar":value*2
                    }
                    goodss.push(gobj);
                }else{
                    feedbackMStar = value*2;
                }


                /**
                 * 绑定提交事件
                 */
                $('#evaluate_submit').unbind('click');
                $('#evaluate_submit').bind('click',function(){

                    network.submitEvaluate(obj,goodss,feedbackMStar);
                })

            }
        });





    });

    $(document).on('pageInit', '#activity', function (e, id, page) {
        $(page).on('click','.create-actions', function () {
            var buttons1 = [
                {
                    text: '全部',
                    onClick: function() {
                        $.alert("你选择了全部");
                    }
                }, {
                    text: '教师餐厅',
                    onClick: function() {
                        $.alert("你选择了教师餐厅");
                    }
                }, {
                    text: '香樟园餐厅',
                    onClick: function () {
                        $.alert('你选择了香樟园餐厅');
                    }
                }, {
                    text: '西部餐厅',
                    onClick: function () {
                        $.alert('你选择了西部餐厅');
                    }
                }
            ];
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        });
    });

    $(document).on('pageInit','#coupon',function (e,id,page) {

        var mid = GetQueryString("merchantid");
        var satisfy = GetQueryString("satisfy");

        network.getUseCoupon(mid,satisfy);


    })

    $(document).on('pageInit','#mycoupon', function (e, id, page) {
        $(page).on('click','.create-actions', function () {
            var buttons1 = [
                {
                    text: '全部',
                    onClick: function() {
                        $.alert("你选择了全部");
                    }
                }, {
                    text: '教师餐厅',
                    onClick: function() {
                        $.alert("你选择了教师餐厅");
                    }
                }, {
                    text: '香樟园餐厅',
                    onClick: function () {
                        $.alert('你选择了香樟园餐厅');
                    }
                }, {
                    text: '西部餐厅',
                    onClick: function () {
                        $.alert('你选择了西部餐厅');
                    }
                }
            ];
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        });

        network.getUserCouPonList();

        var loading = false;
        $(page).on('infinite', '.infinite-scroll',function() {

            // 如果正在加载，则退出
            if (loading) return;

            // 设置flag
            loading = true;

            setTimeout(function() {
                loading = false;

                var pageNo = parseInt($('input[name=pageNo]').val());
                var totalPage = parseInt($('input[name=totalPage]').val());
                if(pageNo*10 > totalPage) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').remove();
                    return;
                }

                $('input[name=pageNo]').val(parseInt($('input[name=pageNo]').val())+1);
                network.getUserCouPonList();

            }, 1000);
        });

    });

    //我的历史订单
    $(document).on('pageInit', '#myorder', function (e, id, page) {
        $(page).on('click','.create-actions', function () {
            var buttons1 = [
                {
                    text: '全部',
                    onClick: function() {
                        $.alert("你选择了全部");
                    }
                }, {
                    text: '时间',
                    onClick: function() {
                        $.alert("你选择了时间");
                    }
                }, {
                    text: '已取',
                    onClick: function () {
                        $.alert('你选择了已取');
                    }
                }, {
                    text: '退款中',
                    onClick: function () {
                        $.alert('你选择了退款中');
                    }
                }, {
                    text: '已退',
                    onClick: function () {
                        $.alert('你选择了已退');
                    }
                }, {
                    text: '废餐',
                    onClick: function () {
                        $.alert('你选择了废餐');
                    }
                }, {
                    text: '未付',
                    onClick: function () {
                        $.alert('你选择了未付');
                    }
                }
            ];
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);


        });


        $('input[name=pageNo]').val('1');
        $('input[name=sellDate_lt]').val(getLocTime());
        network.getMyHistoryOrder();

        var loading = false;
        $(page).on('infinite', '.infinite-scroll',function() {

            // 如果正在加载，则退出
            if (loading) return;

            // 设置flag
            loading = true;

            setTimeout(function() {
                loading = false;

                var pageNo = parseInt($('input[name=pageNo]').val());
                var totalPage = parseInt($('input[name=totalPage]').val());
                if(pageNo*10 > totalPage) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').remove();
                    return;
                }

                $('input[name=pageNo]').val(parseInt($('input[name=pageNo]').val())+1);
                network.getMyHistoryOrder();

            }, 800);
        });

    });

    /**
     * 我的评价
     */
    $(document).on('pageInit','#myevaluate',function (e, id, page) {
        $(page).on('click','.create-actions', function () {
            var buttons1 = [
                {
                    text: '全部',
                    onClick: function() {
                        $.alert("你选择了全部");
                    }
                }, {
                    text: '时间',
                    onClick: function() {
                        $.alert("你选择了时间");
                    }
                }, {
                    text: '商家',
                    onClick: function () {
                        $.alert('你选择了商家');
                    }
                }, {
                    text: '商品',
                    onClick: function () {
                        $.prompt("请输入商品名称", function (value) {
                            $.alert('你输入的商品名称是 "' + value + '"');
                        });
                    }
                }
            ];
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        });

        $('input[name=pageNo]').val('1');
        //$('input[name=sellDate_gte]').val(getLocTime());
        //console.log($('input[name=sellDate_gte]').val());
        network.getMyEvalute();

        var loading = false;
        $(page).on('infinite', '.infinite-scroll',function() {
            // 如果正在加载，则退出
            if (loading) return;
            // 设置flag
            loading = true;
            setTimeout(function() {
                loading = false;
                var pageNo = parseInt($('input[name=pageNo]').val());
                var totalPage = parseInt($('input[name=totalPage]').val());
                if(pageNo*10 > totalPage) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').remove();
                    return;
                }
                $('input[name=pageNo]').val(parseInt($('input[name=pageNo]').val())+1);
                network.getMyEvalute();
            }, 1000);
        });
        
    });

    /**
     * 用户协议
     */
    $(document).on('pageInit',"#protocol",function(e, id, page){

        network.getProtocal();

    });

    /**
     * 我的投诉
     */
    $(document).on('pageInit',"#mycomplain",function(e,id,page){
        
        $('input[name=pageNo]').val('1');
        network.getMyComplain();
        var loading = false;
        $(page).on('infinite', '.infinite-scroll',function() {
            // 如果正在加载，则退出
            if (loading) return;
            // 设置flag
            loading = true;
            setTimeout(function() {
                loading = false;
                var pageNo = parseInt($('input[name=pageNo]').val());
                var totalPage = parseInt($('input[name=totalPage]').val());
                
                if(pageNo*10 > totalPage) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').remove();
                    return;
                }
                $('input[name=pageNo]').val(parseInt($('input[name=pageNo]').val())+1);
                network.getMyComplain();
            }, 800);
        });

    });


    /**
     * 
     */
    $(document).on('pageInit',"#complain",function(e, id, page){
        var data = GetQueryString("param");
        var obj = JSON.parse(decodeURIComponent(data));

        network.renderComplain(obj);

        var id1 = 0;
        var id2 = 0;
        $("#theFile", "#fileDiv").click(function () {
            id1++;
            id2++;
            $(this).blur();
        });

        $("#theFile", "#fileDiv").change(function () {
            
            var ida = id1+"a";
            var idb = id2+"b";
            
            network.PreviewImage(this, ida, idb);
            // alert("预览已生成!");
            $("#imageUpload").prop("disabled", false);
        });

        /**
         * 绑定提交事件
         */
        $(page).on("click","#complain_submit",function(e){

            network.submitComplain(obj);
        });
        /**
         * 绑定取消事件
         */
        $(page).on("click","#complain_cancel",function(e){

            $.router.back();

        });

    });

    /**
     * 评价详情页面
     */
    $(document).on('pageInit','#evaluatedetail',function(e){
        

        var param = GetQueryString('param');
        var merchantid = GetQueryString('merchantId');
        var obj = JSON.parse(decodeURIComponent(param));
        /**
         * 渲染界面
         */
        network.renderEvaluateDetail(obj,'evaluate',merchantid);
        
    });

    /**
     * 投诉详情页面
     */
    $(document).on('pageInit','#complaindetail',function(e){


        var param = GetQueryString('param');
        var obj = JSON.parse(decodeURIComponent(param));
        /**
         * 渲染界面
         */
        network.renderEvaluateDetail(obj,'complain');

    });

    /**
     * 餐厅登陆
     */
    $(document).on('pageInit','#indexlogin',function(e,id,page){

        $(page).on('click','#ctlogin',function(e){
            network.cantingLogin();
        })
        
    });
    
    /**
     * 餐厅管理
     */
    $(document).on('pageInit', '#admin', function (e, id, page) {

        var obj = GetQueryString('param');

        var data = JSON.parse(decodeURIComponent(obj));
        $("#pctitle").text("云味食堂餐厅管理系统("+data.result.merchant+")");
        $("#shopkeeper").text("店长："+data.result.name);
        $("input[name=ctoken]").val(data.result.authToken);
        $("input[name=adminctid]").val(data.result.shopId);
        network.renderAdminIndex(data.result.shopId);
        

        $("#cloctime").text('今天('+getLocTime()+')');

        $(page).on("click","#queryOrder",function(e){
            $('input[name=pageNo]').val("1");
            network.corderList("Normal");
        });

        $(page).on("click","#queryCancelOrder",function(e){

            $('input[name=pageNo]').val("1");
            network.corderList("Cancelled");
        });

        $(page).on('refresh', '.pull-to-refresh-content',function(e){
            setTimeout(function() {
                network.corderList($('input[name=indexstatus]').val());
                $.pullToRefreshDone('.pull-to-refresh-content');
            }, 1000);
        });

    });

    //申请取消
    $(document).on('pageInit','#cancel',function(e,id,page){

        var order = JSON.parse(decodeURIComponent(GetQueryString('param')));

        console.log(order);
        $('#cancel_orderId').text(order.id);
        $('#cancel_status').text('已订');
        $('#cancel_loc').text(order.destName);
        $('#cancel_merchant').text(order.merchantName);

        var date = order.sellDate;
        var time = order.sellTime;
        var date_time = date.split(' ')[0]+' '+time.substring(0,2)+':'+time.substring(2,4);
        $('#cancel_sell').text(date_time);


        $(page).on('click','#cancel_cancel',function(){

            $.router.back();
        });

        $(page).on('click','#cancel_confirm',function(){

            //发送取消订单请求
            network.orderCancel(order.id);
        });

    });

    /**
     * 登陆
     */
    $(document).on('pageInit','#deliverylogin',function(e,id,page){

        $(page).on('click','#dellogin',function(e){
            network.operateLogin(Des);

        });

        
    });

    /**
     * 配送端
     */
    $(document).on('pageInit', '#delivery', function (e, id, page) {


        var obj = GetQueryString('param');

        var data = JSON.parse(decodeURIComponent(obj));
        $("#pusername").text("配送员："+data.result.name);
        $("input[name=puserid]").val(data.result.userId);
        $("#picker").val(data.result.merchant);
        $("input[name=pshop]").val(data.result.shopId);
        $('input[name=pstoken]').val(data.result.authToken);


        //渲染时间选择控件
        network.renderTime(data.result.shopId);
        //拿到商户的取餐点信息
        network.getDestinationP(Des,data.result.shopId);
        
        /**
         * 清柜l;
         */
        $(page).on("click","#btnLeft",function(e){

            network.getClearCarbinet();
        });
        /**
         * 补货
         */
        $(page).on("click","#btnRight",function(e){

            network.getReplenishment();

        });

        
    });

    $.init();
    

});

