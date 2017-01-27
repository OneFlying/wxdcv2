/**
 * Created by caiyu on 2016/6/27.
 * email: caiyuhao2015@gmail.com
 * qq: 404961386
 * ajax请求文件
 */

+function ($) {

    /**
     * 装换 订单订单状态
     * @param status
     * @returns {*}
     */
    function transOrderStatus(status){

        switch(status){

            case 'UnPaid': return '未付';
            case 'Invalid': return '无效';
            case 'Paid': return '已付';
            case 'Cancelled': return '取消';
            case 'Refunding': return '退款中';
            case 'Refunded': return '已退';
            case 'Delivered': return '可取';
            case 'Overdue': return '废餐';
            case 'Picked':return '已取';
            default: return '无效';
        }
    }


    function parseStrToJSON(str) {

        var strArray = str.split('&');
        var strJSON = {};
        for (var i=0; i<strArray.length; i++) {
            var key = strArray[i].split('=')[0],
                value = decodeURIComponent(strArray[i].split('=')[1]).replace(/\ /g, ' ');
                //value = strArray[i].split('=')[1].replace(/\+/g, ' ');
            strJSON[key] = value;
        }

        return strJSON;
    }
    function newDate(str){

            var date = new Date(str.substring(0,2),str.substring(2,str.length));
            return date;
    }

    function trimLeft(s){
        if(s == null) {
            return "";
        }
        var whitespace = new String(" \t\n\r");
        var str = new String(s);
        if (whitespace.indexOf(str.charAt(0)) != -1) {
            var j=0, i = str.length;
            while (j < i && whitespace.indexOf(str.charAt(j)) != -1){
                j++;
            }
            str = str.substring(j, i);
        }
        return str;
    }
    function isAdapterTime(timeGap,item){

        var boolean = false;

        var time = timeGap.split("-");

        var startime = newDate(time[0]);
        var endtime = newDate(time[1]);

        var date = item.split("-");

        $(date).each(function(index,item){

            var  t = newDate(item);

            if((startime <= t)&&(t <= endtime)){
                boolean = true;
            }
        });

        return boolean;
    }

    /**1
     * 格式化日期
     * @param timeStr
     */
    function formatTime(dateStr,timeStr) {

        if(timeStr){
            var temp = dateStr.split(" ");
            var date = temp[0];
            var time = temp[1];

            var d = date.split("-");

            var t = time.split(":");

            return (d[0]+"年"+d[1]+"月"+d[2]+"日 "+timeStr.substring(0,2)+":"+timeStr.substring(2,timeStr.length));
        }else{
            var temp = dateStr.split(" ");
            var date = temp[0];
            var time = temp[1];

            var d = date.split("-");

            var t = time.split(":");

            return (d[0]+"年"+d[1]+"月"+d[2]+"日 "+t[0]+":"+t[1]);
        }
    }

    /**
     * 格式化日期为年月日时分秒
     * @param dateStr
     * @param timeStr
     * @returns {string}
     */
    function formatDateTime(dateStr,timeStr) {

        var temp = dateStr.split(" ");
        var date = temp[0];
        var time = temp[1];

        var d = date.split("-");

        var t = time.split(":");

        return (d[0]+"年"+d[1]+"月"+d[2]+"日 "+t[0]+":"+t[1]+":"+t[2]);

    }

    function newRealDate(dateStr){
        var temp = dateStr.split(" ");
        var date = temp[0];
        var time = temp[1];

        var d = date.split("-");

        var t = time.split(":");

        return new Date(d[0],d[1],d[2],t[0],t[1],t[2]);
    }

    function formatDate(date){

        var comTime = date.split(":");

        return comTime[0]+comTime[1];

    }

    /**
     * 格式化日期
     * @param str
     * @returns {Date}
     */
    function formatDay(str){

        var day = str.split("-");

        var date = new Date(day[0],day[1],day[2]);
        return date;
    }

    /**
     * 判断是否大于等于当前时间
     * @param day
     * @returns {boolean}
     */
    function isCurrentDay(day){

        var boolean = false;
        var date = day.split(" ")[0];

        var currentDay = getLocTime();

        if(formatDay(currentDay) <= formatDay(date)){
            boolean = true;
        }

        return boolean;
    }

    /**
     * 是否小于当前时间
     * @param day
     * @returns {boolean}
     */
    function isLtCurrentDay(day){

        var boolean = false;
        var date = day.split(" ")[0];

        var currentDay = getLocTime();

        if(formatDay(currentDay) > formatDay(date)){
            boolean = true;
        }
        return boolean;
    }


    function formartCTime(time){

       // console.log(time);
        var time = time.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g,"-");
        var date = time.substring(0,10);
        var hour = time.substring(12,time.length);
        var min = hour.split(":");

        var t = '';
        if(parseInt(min[1]) < 30){
            t = min[0]+':00';
        }else{
            t = min[0]+':30';
        }
        return (date+' '+t);

    }

    /**
     * 获取当前时间的后一天
     * @returns {string}
     */
    function getLocDate() {
        var now=new Date();
        var year=now.getFullYear();
        var month=(now.getMonth()+1)< 10 ? "0"+(now.getMonth()+1) : (now.getMonth()+1);
        var day=now.getDate() < 10 ? "0"+now.getDate()+1 : now.getDate()+1;

        return year+"年"+month+"月"+day+"日";
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

    function isContainTime(timeArr,timeGap){

        var arr = new Array();
        var boolean = false;
        $(timeArr).each(function(index,item){
            var time = item.split(':');
            var temp = time[0]+time[1];

            if(timeGap.indexOf(temp) != -1){
                arr.push(temp);
            }

        });

        if(arr.length != 0 ){
            boolean = true;
        }

        return boolean;
    }

    var result;

    var HashMap = {
        obj:{},
        put:function(key,value){
            HashMap.obj[key] = value;
        },
        get:function(key){
            if(HashMap.obj.hasOwnProperty(key)){
                return HashMap.obj[key];
            }
        },
        containKey:function(key){
            if(HashMap.obj.hasOwnProperty(key)){
                return true;
            }else{
                return false;
            }
        }
    }
    $.fn.network = {
        /**
         * 定制版本 接口
         * @param token
         */
        getLoginUserInfo : function(){
            //config.token = token;
            $.ajax({

                url: config.url + '/v1/member',
                type: 'GET',
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {
                    if(data.status === 'true') {

                        /**
                         * 登录后先清除购物车信息
                         */
                        Storage.removeItem('Cart');
                        config.user = data.result;

                        /**
                         * 登录成功后再去获取信息
                         * 获取取餐点
                         */
                        $.fn.network.getQuCanLocation($("#qc_loc"));

                    } else {
                        $.alert('获取用户协议失败');
                    }
                },
                error: function (data) {
                    console.log(data);
                    console.log('do ajax error');
                }

            });
        },
        /**
         * 非定制版本通道接口
         */
        getLoginUserInfoNoDingzhi : function(){

            $.ajax({

                url: config.url + '/v1/member',
                type: 'GET',
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {
                    if(data.status === 'true') {

                        /**
                         * 登录后先清除购物车信息
                         */
                        Storage.removeItem('Cart');
                        config.user = data.result;

                        /**
                         * 登录成功后再去获取信息
                         * 获取取餐点
                         */
                        $.fn.network.getLocationNoDingZhi($("#qc_loc"));

                    } else {
                        $.alert('获取用户协议失败');
                    }
                },
                error: function (data) {
                    console.log(data);
                    console.log('do ajax error');
                }

            });
        },

        /**
         * 获取用户协议
         */
        agreeMent: function () {
            //获取用户协议
            $.ajax({
                url: config.url + '/v1/auth/agreeMent',
                type: 'GET',
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {
                    if(data.status === 'true') {
                       result = data.result;
                        Storage.setItem('agreement',data.result);
                        var html = template.replace(template.agreement, {
                            '${title}' : data.result.name,
                            '${content}': data.result.content
                        });
                        $('#wxdcAgreement').html(html);
                    } else {
                        $.alert('获取用户协议失败');
                    }
                },
                error: function (data) {
                    console.log(data);
                    console.log('do ajax error');
                }
            });
        },
        
        /**
         * 获取 取餐点
         */
        getQuCanLocation : function(el){

            $.ajax({
                url: config.url + '/v1/res/destPoint',
                type: 'GET',
                contentType: "application/json",
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {

                    if(data.status == "true"){

                        var html = ''
                        $(data.result).each(function(index,item){

                            var name = item.dPName+item.dPAdr;
                            var   id = item.id;
                            if(index == 0){
                                
                                $.fn.network.renderQcList('',id,name);

                            }
                            if(id == '3806194320353132544'){

                                html += template.replace(template.new_index_img,{
                                    '${id}':id,
                                    '${name}':name,
                                    '${src}':'images/noselected_sanjiao.png',
                                    '${qid}':'sanjiao'
                                });
                            }else if(id == '3806194450351390721'){
                                html += template.replace(template.new_index_img,{
                                    '${id}':id,
                                    '${name}':name,
                                    '${src}':'images/noselected_sijiao.png',
                                    '${qid}':'sijiao'
                                });
                            }
                        });
                        
                        $('#loc_list').html('');
                        $('#loc_list').html(html);

                        var flag = $('#qc_loc').attr('data-flag');
                        if(flag == 'true'){

                            var obj = config.savepath;
                            $('#'+obj.type).find('img').attr('src',obj.path);
                            if(obj.type == 'sanjiao'){
                                $('#'+obj.type).find('img').attr('src',obj.path);
                            }else if(obj.type = 'sijiao'){
                                $('#'+obj.type).find('img').attr('src',obj.path);
                            }
                        }

                        $('#sanjiao').unbind('click');
                        $('#sanjiao').bind('click',function(){

                            var name = $(this).attr('data-name');
                            var id = $(this).attr('data-id');

                            $('#zaocan img').attr('src','images/zaocan.png');

                            $(this).find('img').attr('src','images/selected_sanjiaoplus.png');
                            $('#sijiao').find('img').attr('src','images/noselected_sijiao.png');
                            $('#qc_loc').attr('data-flag','true');

                            config.savepath = {type:'sanjiao',path:'images/selected_sanjiaoplus.png'};
                            $.showIndicator();

                            $.fn.network.renderQcList(el,id,name);
                            $.closeModal();

                        });
                        $('#sijiao').bind('click',function(){

                            var name = $(this).attr('data-name');
                            var id = $(this).attr('data-id');

                            $('#zaocan img').attr('src','images/zaocan.png');

                            $(this).find('img').attr('src','images/selected_sijiaoplus.png');
                            $('#sanjiao').find('img').attr('src','images/noselected_sanjiao.png');
                            $('#qc_loc').attr('data-flag','true');

                            config.savepath = {type:'sijiao',path:'images/selected_sijiaoplus.png'};
                            $.showIndicator();

                            $.fn.network.renderQcList(el,id,name);
                            $.closeModal();

                        });
                    }
                },
                error: function (data) {
                    console.log('do ajax error');
                }
            });
            
        },
        /**
         * 获取取餐点非定制版本的接口
         */
        getLocationNoDingZhi:function(el){
            
            $(el).attr('data-flag','true');
            $.ajax({
                url: config.url + '/v1/res/destPoint',
                type: 'GET',
                contentType: "application/json",
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {

                    if(data.status == "true"){

                        var html = ''
                        var locationData=[];
                        $(data.result).each(function(index,item){

                            var name = item.dPName+item.dPAdr;
                            var   id = item.id;

                            if(index == 0){

                                html += template.replace(template.qc_list,{
                                    '${name}':name,
                                    '${qc_id}':id
                                });
                                
                                $.fn.network.renderQcPopover(el,id,name)

                            }else{

                                html += template.replace(template.qc_list,{
                                    '${name}':name,
                                    '${qc_id}':id
                                });
                            }
                            
                        });
                        $('#qc_list').html('');
                        $('#qc_list').html(html);

                        $('#qc_list').find('input[type=text]').each(function(index,item){

                            $(item).click(function(){

                                var name = $(this).val();
                                var id = $(this).next().val();

                                $.showIndicator();
                                $.fn.network.renderQcPopover(el,id,name);
                                $.closeModal();
                            });

                        });

                    }


                },
                error: function (data) {
                    console.log('do ajax error');
                }
            });
        },

        /**
         * 获取搜索的取餐点
         */
        getSearchLocationPoint:function(){

            $.ajax({
                url: config.url + '/v1/res/destPoint',
                type: 'GET',
                async: false,//发送同步请求
                contentType: "application/json",
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {
                    if(data.status == "true"){

                        var locationData=[];
                        $(data.result).each(function(index,item){

                            var name = item.dPName+item.dPAdr;
                            var   id = item.id;

                            var distance = "";
                            if((item.lng)&&(item.lat)){

                                distance = getDistance(item.lng,item.lat);
                            }

                            /**
                             * 将获取到的取餐点缓存起来
                             */
                            var locationObj = {};
                            locationObj.name = name;
                            locationObj.id = id;
                            locationObj.distance = distance;
                            locationObj.searchkey = codefans_net_CC2PY(name);
                            locationData.push(locationObj);

                        });
                        /**
                         * 将获取到的取餐点信息保存到临时数据库中
                         */
                        //Storage.setItem("localDataBase",JSON.stringify(locationData));
                        config.locationData = locationData;
                    }

                },
                error: function (data) {
                    console.log('do ajax error');
                }
            });

        },

        /**
         * 渲染搜索界面
         */
        renderSearchView:function(){
            
            //本地数据库
            var localDataBase = config.locationData;
            
            //搜索关键字
            var searchKey = codefans_net_CC2PY($('#search_index').val());

            //关键字模糊搜索
            var relativeSearchKey = [];

            $(localDataBase).each(function(index,item){

                if(item.searchkey.indexOf(searchKey) != -1){

                    relativeSearchKey.push(item);
                }

            });

            $.fn.network.renderSearchViewList(relativeSearchKey);

        },
        renderSearchViewList : function(arr){

            var html = '';
            $(arr).each(function(i,t){

                var distance = (Number(t.distance)/1000)+"";

                distance = distance.substring(0,distance.indexOf(".")+3);
                html += template.replace(template.index_search_tpl,{

                    "${lid}":t.id,
                    "${lname}":t.name,
                    "${locname}":t.name,
                    "${distance}":distance
                });

            });

            //先清空
            $('#index_search_list').children().remove();
            //再填充
            $('#index_search_list').html(html);

            $('.search_list').each(function(index,item){

                $(this).unbind('click');
                $(this).bind('click',function(){

                    var id = $(this).attr('data-id');
                    var name = $(this).attr('data-name');
                    $.fn.network.renderQcPopover($("#qc_loc"),id,name);

                    $.closeModal('.popup');
                    //Storage.removeItem("localDataBase");

                });

            });

        },


        /**
         * 首页轮播图片
         */
        getIndexImage:function(){

            $.ajax({
                url: config.url + '/v1/adv/advertise',
                type: 'GET',
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {
                    if(data.status == "true"){
                        var indexImg = [];
                        var adverImg = [];

                        $(data.result).each(function (index,item) {

                            if(item.advertiseType == "1"){
                                indexImg.push(item);
                            }else if(item.advertiseType == "2"){
                                adverImg.push(item);
                            }
                        });

                        var indexHtml = '';
                        $(indexImg).each(function (index,item) {
                            indexHtml += template.replace(template.img_tpl,{
                               '${imgurl}':config.picurl+item.advertiseImg
                            });
                        });

                        var adverHtml = '';
                        $(adverImg).each(function(index,item){

                            adverHtml += template.replace(template.img_tpl,{
                                '${imgurl}':config.picurl+item.advertiseImg
                            });

                        });

                        $('#banner').children().remove();
                        $('#advertise').children().remove();
                        $('#banner').html(indexHtml);
                        $('#advertise').html(adverHtml);

                        try{
                            if(indexImg.length != 1){
                                $('#banner').slidesjs({
                                    // width: 260,
                                    // height: 100,
                                    play: {
                                        active: true,
                                        auto: true,
                                        interval: 10000,
                                        swap: true
                                    }
                                });
                            }

                            if(adverImg.length != 1){
                                $('#advertise').slidesjs({
                                    // width: 260,
                                    // height: aut,
                                    play: {
                                        active: true,
                                        auto: true,
                                        interval: 10000,
                                        swap: true
                                    }
                                });
                            }
                        }catch (ex){
                            console.log('报错了');
                        }


                    }
                },
                error: function (data) {
                    console.log(data);
                    console.log('do ajax error');
                }
            });

        },
        chanageLoc : function(){

        },
        renderQcList : function(el,id,name){
            $(el).text(name);
            var locObj = {
                "id":id,
                "name":name
            }
            config.location = locObj;

            var flag = $('#qc_loc').attr('data-flag');
            // if(flag == 'true'){
            //
            //     var obj = config.savepath;
            //     $('#'+obj.type).find('img').attr('src',obj.path);
            //     if(obj.type == 'sanjiao'){
            //         $('#'+obj.type).find('img').attr('src',obj.path);
            //     }else if(obj.type = 'sijiao'){
            //         $('#'+obj.type).find('img').attr('src',obj.path);
            //     }
            // }
            $('#zaocan').unbind('click');
            $("#zaocan").bind('click',function(){


                if(flag == 'true'){
                    $('#zaocan img').attr('src','images/zaocan_light.png');
                    console.log(config.location.id);
                    $.fn.network.skipToJin(config.location.id);
                }else{
                    $.alert('请先选择取餐点');
                }


            });

            $('#wucan').unbind('click');
            $('#wucan').bind('click',function(){

                $.router.loadPage('help.html');
            });

            $('.level').click(function(){

                $.fn.network.getMerchantList('level',id);
                $.closeModal();
            });

            $('.createtime').click(function(){

                $.fn.network.getMerchantList('createtime',id);
                $.closeModal();
            });

            $.fn.network.getMerchantList(" ",id);
        },
        /**
         * 渲染取餐点下拉框
         */
        renderQcPopover : function(el,id,name){
            $(el).text(name);
            var locObj = {
                "id":id,
                "name":name
            }
            config.location = locObj;

            $('#zaocan img').attr('src','images/zaocan.png');
            $('#yexiao img').attr('src','images/yexiao.png');
            $('#wancan img').attr('src','images/wancan.png');
            $('#wucan img').attr('src','images/wucan.png');
            $("#zaocan,.zaocan").click(function(){

                $('#index_time').text(getDay()+" 09:00");
                $.fn.network.getMerchantList(" ",config.location.id,$(this).attr("data-time"),true,$(this).attr('id'));
                $('#zaocan img').attr('src','images/zaocan_light.png');
                $('#yexiao img').attr('src','images/yexiao.png');
                $('#wancan img').attr('src','images/wancan.png');
                $('#wucan img').attr('src','images/wucan.png');
                ///$.fn.network.skipToJin(config.location.id);

                $.closeModal();
            });
            $("#wucan,.wucan").click(function(){

                $('#index_time').text(getDay()+" 10:00");
                $.fn.network.getMerchantList(" ",config.location.id,$(this).attr("data-time"),true,$(this).attr('id'));
                $('#wucan img').attr('src','images/wucan_light.png');
                $('#zaocan img').attr('src','images/zaocan.png');
                $('#yexiao img').attr('src','images/yexiao.png');
                $('#wancan img').attr('src','images/wancan.png');
                $.closeModal();

            });
            $("#wancan,.wancan").click(function(){

                $('#index_time').text(getDay()+" 16:00");
                $.fn.network.getMerchantList(" ",config.location.id,$(this).attr("data-time"),true,$(this).attr('id'));
                $('#wancan img').attr('src','images/wancan_light.png');
                $('#zaocan img').attr('src','images/zaocan.png');
                $('#yexiao img').attr('src','images/yexiao.png');;
                $('#wucan img').attr('src','images/wucan.png');
                $.closeModal();
            });
            $("#yexiao,.yexiao").click(function(){

                $('#index_time').text(getDay()+" 21:00");
                $.fn.network.getMerchantList(" ",config.location.id,$(this).attr("data-time"),true,$(this).attr('id'));
                $('#yexiao img').attr('src','images/yexiao_light.png');
                $('#zaocan img').attr('src','images/zaocan.png');
                $('#wancan img').attr('src','images/wancan.png');
                $('#wucan img').attr('src','images/wucan.png');
                $.closeModal();

            });

            $('.level').click(function(){

                $.fn.network.getMerchantList('level',id);
                $.closeModal();
            });

            $('.createtime').click(function(){

                $.fn.network.getMerchantList('createtime',id);
                $.closeModal();
            });

            $.fn.network.getMerchantList(" ",id);
        },
        skipToJin : function(destId){
            //获取用户订单列表
            $.ajax({
                url: config.url + '/v1/merchants/merchantslist/'+destId+'/1',
                type: 'GET',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {
                    if(data.status == "true"){

                        if(data.result.length != 0){
                            $(data.result).each(function(index,item){

                                if(item.id == '3806235802887913473'){

                                    if((item.statusCode != '3')&&(item.statusCode != '1')){
                                        var showSellTime = [];
                                        var timeStr="";//拼接时间用
                                        var time = item.sellTime.split("-");

                                        for(var i =0;i<time.length;i++){

                                            if(i != (time.length-1)){
                                                var date = time[i];

                                                var hour = date.substring(0,2);
                                                var min  = date.substring(2,5);

                                                timeStr +=hour+":"+min+" ";

                                                var tempArr = showSellTime;

                                                var tStr = tempArr.join(",");

                                                if(tStr.indexOf(hour+":"+min) == -1){
                                                    showSellTime.push(hour+":"+min);
                                                }
                                            }
                                        }

                                        //拼接几星评价用
                                        var starthtml = template.star(item.merchantLevel);
                                        var skipParam = "store.html?storeid="+item.id+"&src="+item.merchantPic+
                                            "&title="+item.name+"&qsj="+item.startEx+
                                            "&star="+item.merchantLevel+
                                            "&psj="+item.takeOutEx+
                                            "&times="+timeStr+
                                            "&sellTime="+item.sellTime+
                                            "&createTime="+item.createTime+
                                            "&describeTxt="+item.describeTxt+"&merchantAdr="+item.merchantAdr;
                                        $.router.loadPage(skipParam);

                                    }else if((item.statusCode == '3')||(item.statusCode == '1')){

                                        $.alert('该商户已歇业');
                                        $('#zaocan img').attr('src','images/zaocan.png');
                                    }

                                }
                                // else{
                                //     console.log('no1');
                                //     $.alert('该商户已歇业');
                                //     $('#zaocan img').attr('src','images/zaocan.png');
                                // }

                            });
                        }else{
                            $.alert('商户已歇业');
                            $('#zaocan img').attr('src','images/zaocan.png');
                        }

                    }

                },
                error:function(){

                }
            });

        },
        /**
         *获取商户列表
         */
        getMerchantList : function(seq,destId,date_,iscatory,catoryid){
            if(seq != " "){

                var data = JSON.parse(Storage.getItem("datapram"));
                var param = Storage.getItem('seq');

                if(param){
                    var obj = JSON.parse(param);
                    destId = obj.destId;
                    date_ = obj.date_;
                    iscatory = obj.iscatory;
                    catoryid = obj.catoryid;
                }

                if(data.status == "true"){

                    if(data.result != 0){

                        //Storage.setItem("seq",JSON.stringify(lastParam));

                        if(seq != " "){
                            if(seq == "level"){

                                for (var i = 0; i < data.result.length; i++)
                                {
                                    for (var j = i; j < data.result.length; j++)
                                    {
                                        if (Number(data.result[i]['merchantLevel']) < Number(data.result[j]['merchantLevel']))
                                        {
                                            var temp = data.result[i];
                                            data.result[i] = data.result[j];
                                            data.result[j] = temp;
                                        }
                                    }
                                }

                            }
                            if(seq == "createtime"){

                                for (var i = 0; i < data.result.length; i++)
                                {
                                    for (var j = i; j < data.result.length; j++)
                                    {
                                        if (data.result[i]['createTime'] < data.result[j]['createTime'])
                                        {
                                            var temp = data.result[i];
                                            data.result[i] = data.result[j];
                                            data.result[j] = temp;
                                        }
                                    }
                                }

                            }
                        }

                        var html="";
                        if(data.result.length != 0){

                            var showSellTime = [];
                            if(date_ == undefined){

                                $(data.result).each(function(i,item){

                                    var timeStr="";//拼接时间用
                                    var time = item.sellTime.split("-");

                                    for(var i =0;i<time.length;i++){

                                        if(i != (time.length-1)){
                                            var date = time[i];

                                            var hour = date.substring(0,2);
                                            var min  = date.substring(2,5);

                                            timeStr +=hour+":"+min+" ";

                                            var tempArr = showSellTime;

                                            var tStr = tempArr.join(",");

                                            if(tStr.indexOf(hour+":"+min) == -1){
                                                showSellTime.push(hour+":"+min);
                                            }
                                        }
                                    }

                                    //拼接几星评价用
                                    var starthtml = template.star(item.merchantLevel);

                                    /**
                                     * 页面传递时需要的参数
                                     * @type {*|void|string|XML}
                                     */
                                    var skipParam = "store.html?storeid="+item.id+"&src="+item.merchantPic+
                                        "&title="+item.name+"&qsj="+item.startEx+
                                        "&star="+item.merchantLevel+
                                        "&psj="+item.takeOutEx+
                                        "&times="+timeStr+
                                        "&sellTime="+item.sellTime+
                                        "&createTime="+item.createTime+
                                        "&describeTxt="+item.describeTxt+"&merchantAdr="+item.merchantAdr;

                                    html+=template.replace(template.main, {
                                        '${storeid}':skipParam,
                                        //'${src}':'images/1.jpg',//暂时模拟
                                        '${src}':config.picurl+item.merchantPic,
                                        '${title}' : item.name,
                                        '${qsj}': item.startEx,
                                        '${star}':starthtml,
                                        '${psj}':item.takeOutEx,
                                        '${times}':timeStr,
                                        '${cheapen}':' ',//暂时模拟
                                        '${sales}':' ',//暂时模拟
                                        '${case}':' ',
                                        '${parentstyle}':' '
                                    });
                                });

                            }else{

                                $(data.result).each(function(i,item){

                                    var timeStr="";//拼接时间用
                                    var time = item.sellTime.split("-");

                                    for(var i =0;i<time.length;i++){

                                        if(i != (time.length-1)){
                                            var date = time[i];

                                            var hour = date.substring(0,2);
                                            var min  = date.substring(2,5);

                                            timeStr +=hour+":"+min+" ";

                                            var tempArr = showSellTime;

                                            var tStr = tempArr.join(",");

                                            if(tStr.indexOf(hour+":"+min) == -1){
                                                showSellTime.push(hour+":"+min);
                                            }
                                        }
                                    }

                                    //拼接几星评价用
                                    var starthtml = template.star(item.merchantLevel);

                                    /**
                                     * 页面传递时需要的参数
                                     * @type {*|void|string|XML}
                                     */
                                    var skipParam = "store.html?storeid="+item.id+"&src="+item.merchantPic+
                                        "&title="+item.name+"&qsj="+item.startEx+
                                        "&star="+item.merchantLevel+
                                        "&psj="+item.takeOutEx+
                                        "&times="+timeStr+
                                        "&sellTime="+item.sellTime+
                                        "&createTime="+item.createTime+
                                        "&describeTxt="+item.describeTxt+"&merchantAdr="+item.merchantAdr;

                                    if(iscatory){
                                        skipParam += "&catoryid="+catoryid;
                                        if(!isAdapterTime(date_,item.sellTime)){
                                            html+=template.replace(template.main, {
                                                '${storeid}':'#',
                                                //'${src}':'images/1.jpg',//暂时模拟
                                                '${src}':config.picurl+item.merchantPic,
                                                '${title}' : item.name,
                                                '${qsj}': item.startEx,
                                                '${star}':starthtml,
                                                '${psj}':item.takeOutEx,
                                                '${times}':timeStr,
                                                '${cheapen}':' ',//暂时模拟
                                                '${sales}':' ',//暂时模拟
                                                '${case}':'不在售卖时间内',
                                                '${parentstyle}':'background:#ededed'
                                            });
                                        }else{
                                            html+=template.replace(template.main, {
                                                '${storeid}':skipParam,
                                                //'${src}':'images/1.jpg',//暂时模拟
                                                '${src}':config.picurl+item.merchantPic,
                                                '${title}' : item.name,
                                                '${qsj}': item.startEx,
                                                '${star}':starthtml,
                                                '${psj}':item.takeOutEx,
                                                '${times}':timeStr,
                                                '${cheapen}':' ',//暂时模拟
                                                '${sales}':' ',//暂时模拟
                                                '${case}':' ',
                                                '${parentstyle}':' '
                                            });
                                        }


                                    }else{

                                        if(item.sellTime.indexOf(date_) == -1){
                                            html+=template.replace(template.main, {
                                                '${storeid}':'#',
                                                //'${src}':'images/1.jpg',//暂时模拟
                                                '${src}':config.picurl+item.merchantPic,
                                                '${title}' : item.name,
                                                '${qsj}': item.startEx,
                                                '${star}':starthtml,
                                                '${psj}':item.takeOutEx,
                                                '${times}':timeStr,
                                                '${cheapen}':' ',//暂时模拟
                                                '${sales}':' ',//暂时模拟
                                                '${case}':'不在售卖时间内',
                                                '${parentstyle}':'background:#ededed'
                                            });
                                        }else{
                                            html+=template.replace(template.main, {
                                                '${storeid}':skipParam,
                                                //'${src}':'images/1.jpg',//暂时模拟
                                                '${src}':config.picurl+item.merchantPic,
                                                '${title}' : item.name,
                                                '${qsj}': item.startEx,
                                                '${star}':starthtml,
                                                '${psj}':item.takeOutEx,
                                                '${times}':timeStr,
                                                '${cheapen}':' ',//暂时模拟
                                                '${sales}':' ',//暂时模拟
                                                '${case}':' ',
                                                '${parentstyle}':' '
                                            });
                                        }
                                    }

                                });

                            }

                            // if(date_ == undefined){
                            //     $('#index_time').text(getLocDate()+" "+showSellTime[0]);
                            // }
                            var timeHtime = ''
                            if(showSellTime.length == 0){
                                timeHtime = "暂无时间";
                            }else{
                                $(showSellTime.sort()).each(function(index,item){


                                    timeHtime += template.replace(template.qc_list,{
                                        '${name}': getDay()+item,
                                        '${qc_id}':formatDate(item)
                                    });
                                });
                            }

                            $("#qc_list_time").html(timeHtime);

                            $("#qc_list_time").find("input[type=text]").each(function(index,item_){

                                $(item_).click(function(){
                                    var date = $(this).val();
                                    var time = $(this).next().val();
                                    $("#index_time").text(date);

                                    $('#yexiao img').attr('src','images/yexiao.png');
                                    $('#zaocan img').attr('src','images/zaocan.png');
                                    $('#wancan img').attr('src','images/wancan.png');
                                    $('#wucan img').attr('src','images/wucan.png');

                                    $.fn.network.getMerchantList(" ",destId,time,false);
                                    $.closeModal();
                                });

                            });
                        }else{
                            html = "暂无商户信息";
                        }
                        $('#indexList').children().remove();
                        $('#indexList').html(html);

                        var flag = $('#qc_loc').attr('data-flag');

                        if(flag == 'false'){

                            $('#indexList').unbind('click');
                            $('#indexList').bind('click',function(){
                                $(this).find('li a').attr('href','javascript:void(0);');
                                $.alert('请先选择取餐点');
                            });

                        }else{
                            $('#indexList').unbind('click');
                        }

                    }


                }

            }else {


                //获取用户订单列表
                $.ajax({
                    url: config.url + '/v1/merchants/merchantslist/'+destId+'/1',
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", config.token);
                    },
                    success: function (data) {
                       
                        $.hideIndicator();

                        if (data.status == "true") {
                            Storage.setItem("datapram",JSON.stringify(data));

                            if (data.result != 0) {

                                var lastParam = {
                                    destId: destId,
                                    date_: date_,
                                    iscatory: iscatory,
                                    catoryid: catoryid
                                };

                                Storage.setItem("seq", JSON.stringify(lastParam));

                                if (seq != " ") {
                                    if (seq == "level") {

                                        for (var i = 0; i < data.result.length; i++) {
                                            for (var j = i; j < data.result.length; j++) {
                                                if (Number(data.result[i]['merchantLevel']) < Number(data.result[j]['merchantLevel'])) {
                                                    var temp = data.result[i];
                                                    data.result[i] = data.result[j];
                                                    data.result[j] = temp;
                                                }
                                            }
                                        }

                                    }
                                    if (seq == "createtime") {

                                        for (var i = 0; i < data.result.length; i++) {
                                            for (var j = i; j < data.result.length; j++) {
                                                if (data.result[i]['createTime'] < data.result[j]['createTime']) {
                                                    var temp = data.result[i];
                                                    data.result[i] = data.result[j];
                                                    data.result[j] = temp;
                                                }
                                            }
                                        }

                                    }
                                }

                                var html = "";
                                if (data.result.length != 0) {

                                    var showSellTime = [];
                                    if (date_ == undefined) {

                                        $(data.result).each(function (i, item) {

                                            var timeStr = "";//拼接时间用
                                            var time = item.sellTime.split("-");

                                            for (var i = 0; i < time.length; i++) {

                                                if (i != (time.length - 1)) {
                                                    var date = time[i];

                                                    var hour = date.substring(0, 2);
                                                    var min = date.substring(2, 5);

                                                    timeStr += hour + ":" + min + " ";

                                                    var tempArr = showSellTime;

                                                    var tStr = tempArr.join(",");

                                                    if (tStr.indexOf(hour + ":" + min) == -1) {
                                                        showSellTime.push(hour + ":" + min);
                                                    }
                                                }
                                            }

                                            //拼接几星评价用
                                            var starthtml = template.star(item.merchantLevel);

                                            /**
                                             * 页面传递时需要的参数
                                             * @type {*|void|string|XML}
                                             */
                                            var skipParam = "store.html?storeid=" + item.id + "&src=" + item.merchantPic +
                                                "&title=" + item.name + "&qsj=" + item.startEx +
                                                "&star=" + item.merchantLevel +
                                                "&psj=" + item.takeOutEx +
                                                "&times=" + timeStr +
                                                "&sellTime=" + item.sellTime +
                                                "&createTime=" + item.createTime +
                                                "&describeTxt=" + item.describeTxt + "&merchantAdr=" + item.merchantAdr;

                                            html += template.replace(template.main, {
                                                '${storeid}': skipParam,
                                                //'${src}':'images/1.jpg',//暂时模拟
                                                '${src}': config.picurl+item.merchantPic,
                                                '${title}': item.name,
                                                '${qsj}': item.startEx,
                                                '${star}': starthtml,
                                                '${psj}': item.takeOutEx,
                                                '${times}': timeStr,
                                                '${cheapen}': ' ',//暂时模拟
                                                '${sales}': ' ',//暂时模拟
                                                '${case}': ' ',
                                                '${parentstyle}': ' '
                                            });
                                        });

                                    } else {

                                        $(data.result).each(function (i, item) {

                                            var timeStr = "";//拼接时间用
                                            var time = item.sellTime.split("-");

                                            for (var i = 0; i < time.length; i++) {

                                                if (i != (time.length - 1)) {
                                                    var date = time[i];

                                                    var hour = date.substring(0, 2);
                                                    var min = date.substring(2, 5);

                                                    timeStr += hour + ":" + min + " ";

                                                    var tempArr = showSellTime;

                                                    var tStr = tempArr.join(",");

                                                    if (tStr.indexOf(hour + ":" + min) == -1) {
                                                        showSellTime.push(hour + ":" + min);
                                                    }
                                                }
                                            }

                                            //拼接几星评价用
                                            var starthtml = template.star(item.merchantLevel);

                                            /**
                                             * 页面传递时需要的参数
                                             * @type {*|void|string|XML}
                                             */
                                            var skipParam = "store.html?storeid=" + item.id + "&src=" + item.merchantPic +
                                                "&title=" + item.name + "&qsj=" + item.startEx +
                                                "&star=" + item.merchantLevel +
                                                "&psj=" + item.takeOutEx +
                                                "&times=" + timeStr +
                                                "&sellTime=" + item.sellTime +
                                                "&createTime=" + item.createTime +
                                                "&describeTxt=" + item.describeTxt + "&merchantAdr=" + item.merchantAdr;

                                            if (iscatory) {
                                                skipParam += "&catoryid=" + catoryid;
                                                if (!isAdapterTime(date_, item.sellTime)) {
                                                    html += template.replace(template.main, {
                                                        '${storeid}': '#',
                                                        //'${src}':'images/1.jpg',//暂时模拟
                                                        '${src}': config.picurl+item.merchantPic,
                                                        '${title}': item.name,
                                                        '${qsj}': item.startEx,
                                                        '${star}': starthtml,
                                                        '${psj}': item.takeOutEx,
                                                        '${times}': timeStr,
                                                        '${cheapen}': ' ',//暂时模拟
                                                        '${sales}': ' ',//暂时模拟
                                                        '${case}': '不在售卖时间内',
                                                        '${parentstyle}': 'background:#ededed'
                                                    });
                                                } else {
                                                    html += template.replace(template.main, {
                                                        '${storeid}': skipParam,
                                                        //'${src}':'images/1.jpg',//暂时模拟
                                                        '${src}': config.picurl+item.merchantPic,
                                                        '${title}': item.name,
                                                        '${qsj}': item.startEx,
                                                        '${star}': starthtml,
                                                        '${psj}': item.takeOutEx,
                                                        '${times}': timeStr,
                                                        '${cheapen}': ' ',//暂时模拟
                                                        '${sales}': ' ',//暂时模拟
                                                        '${case}': ' ',
                                                        '${parentstyle}': ' '
                                                    });
                                                }


                                            } else {

                                                if (item.sellTime.indexOf(date_) == -1) {
                                                    html += template.replace(template.main, {
                                                        '${storeid}': '#',
                                                        //'${src}':'images/1.jpg',//暂时模拟
                                                        '${src}': config.picurl+item.merchantPic,
                                                        '${title}': item.name,
                                                        '${qsj}': item.startEx,
                                                        '${star}': starthtml,
                                                        '${psj}': item.takeOutEx,
                                                        '${times}': timeStr,
                                                        '${cheapen}': ' ',//暂时模拟
                                                        '${sales}': ' ',//暂时模拟
                                                        '${case}': '不在售卖时间内',
                                                        '${parentstyle}': 'background:#ededed'
                                                    });
                                                } else {
                                                    html += template.replace(template.main, {
                                                        '${storeid}': skipParam,
                                                        //'${src}':'images/1.jpg',//暂时模拟
                                                        '${src}': config.picurl+item.merchantPic,
                                                        '${title}': item.name,
                                                        '${qsj}': item.startEx,
                                                        '${star}': starthtml,
                                                        '${psj}': item.takeOutEx,
                                                        '${times}': timeStr,
                                                        '${cheapen}': ' ',//暂时模拟
                                                        '${sales}': ' ',//暂时模拟
                                                        '${case}': ' ',
                                                        '${parentstyle}': ' '
                                                    });
                                                }
                                            }

                                        });

                                    }

                                    // if(date_ == undefined){
                                    //     $('#index_time').text(getLocDate()+" "+showSellTime[0]);
                                    // }
                                    var timeHtime = ''
                                    if (showSellTime.length == 0) {
                                        timeHtime = "暂无时间";
                                    } else {
                                        $(showSellTime.sort()).each(function (index, item) {


                                            timeHtime += template.replace(template.qc_list, {
                                                '${name}': getDay() + item,
                                                '${qc_id}': formatDate(item)
                                            });
                                        });
                                    }

                                    $("#qc_list_time").html(timeHtime);

                                    $("#qc_list_time").find("input[type=text]").each(function (index, item_) {

                                        $(item_).click(function () {
                                            var date = $(this).val();
                                            var time = $(this).next().val();
                                            $("#index_time").text(date);

                                            $('#yexiao img').attr('src', 'images/yexiao.png');
                                            $('#zaocan img').attr('src', 'images/zaocan.png');
                                            $('#wancan img').attr('src', 'images/wancan.png');
                                            $('#wucan img').attr('src', 'images/wucan.png');

                                            $.fn.network.getMerchantList(" ", destId, time, false);
                                            $.closeModal();
                                        });

                                    });
                                } else {
                                    html = "暂无商户信息";
                                }

                                $('#indexList').children().remove();
                                $('#indexList').html(html);

                                var flag = $('#qc_loc').attr('data-flag');

                                if(flag == 'false'){

                                    $('#indexList').unbind('click');
                                    $('#indexList').bind('click',function(){
                                        $(this).find('li a').attr('href','javascript:void(0);');
                                        $.alert('请先选择取餐点');
                                    });

                                }else{
                                    $('#indexList').unbind('click');
                                }

                            }


                        }

                    },
                    error: function (data) {
                        console.log('do ajax error');
                    }
                });
            }
        },
        /**
         * 获取商户商品类型
         */
        getGoodsCatory : function(merchantId,title,paramArr){

            $.ajax({
                url: config.url + '/v1/goods/category/merchants/'+merchantId,
                type: 'GET',

                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {

                    var html = '';
                    var catoryObj = {};
                    $(data.result).each(function(index,item){
                        
                        catoryObj[item.id] = [];
                        
                        if(index == 0){
                            html = template.replace(template.goodsCatory,{
                                '${catoryid}':"a"+item.id,
                                '${desc}':item.categoryName,
                                '${active}':'active'
                            });
                        }else{

                            html += template.replace(template.goodsCatory,{
                                '${catoryid}':"a"+item.id,
                                '${desc}':item.categoryName,
                                '${active}':'a'
                            });
                        }

                    });

                    $('#storeMenu').children().remove();
                    $("#storeMenu").html(html);
                    $.fn.network.getGoodsList(merchantId,title,catoryObj,paramArr);

                },
                error : function(data){
                    console.log('do ajax error');
                }
            });
        },
        /**
         * 获取商品信息列表
         */
        getGoodsList : function(merchantid,title,catoryObj,paramArr){

            var user = config.user;
            //var user = JSON.parse(Storage.getItem('loginuser'));
            $.ajax({

                url: config.url + '/v1/goods/'+merchantid+'/merchants',
                type: 'GET',

                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {

                    var html = '';
                    $(data.result).each(function(i,item){

                        for(var cid in catoryObj){
                            if(cid == item.categoryID){
                                catoryObj[cid].push(item);
                            }
                        }

                    });


                    $("#goodsInfo").children().remove();

                    for(var cid in catoryObj){

                        //var cdivId = 'a'+cid;
                        var divId = 'b'+cid;

                        var divHtml = $('<div id='+divId+'></div>');
                        var thtml = '';
                        $(catoryObj[cid]).each(function(index,item){

                           thtml += $.fn.network.renderGoodsHtml(merchantid,item,user,paramArr);

                        });

                        $(divHtml).append(thtml);


                        $("#goodsInfo").append(divHtml);

                        $('#goodsInfo').find('.title_').each(function(index,item){
                        
                            // var a = $(item).find('a');
                            //
                            // $(a).unbind('click');
                            // $(a).bind('click',function(e){
                            //     if((e.target.tagName=='DIV')&&(e.currentTarget.tagName=='A')){
                            //         var param = $(this).attr('data-param');
                            //         //location.href = 'detail.html?param='+param;
                            //         //$.router.loadPage('#detail?param='+param);
                            //         $.router.loadPage('detail.html?param='+param);
                            //     }
                            // });
                            $(this).unbind('click');
                            $(this).bind('click',function(e){
                                var param = $(this).attr('data-param');
                                $.router.loadPage('detail.html?param='+param);
                            });
                        
                        });

                        $('#'+divId).attr('data-scrollTop',$('#'+divId).offset().top);
                    }

                    $("#storeMenu").find("li").each(function(index,item_){

                        $(item_).children("a").click(function(){

                            $(this).parent().parent().children("li").children("a").attr('class','');

                            $(this).attr('class','active');
                            var bid = $(this).attr("id");
                            bid = "b"+bid.substring(1,bid.length);

                            var itemTop = $('#'+bid).attr('data-scrollTop');
                            var boxContent = $(".box-content").offset().top
                           // $.alert(itemTop+"--"+boxContent+"="+(itemTop-boxContent));
                            $(".box-content").animate({
                                scrollTop:(itemTop-boxContent-30)+'px'
                            },1500);

                        });

                    });

                    /**
                     * 重新设置跳转 时带入参数
                     */

                    $("#pay").attr("href","payment.html?merchantid="+merchantid+"&title="+title);

                },
                error : function(data){
                    console.log('do ajax error');
                }

            });
        },
        /**
         * 渲染商品html页面
         */
        renderGoodsHtml : function(merchantid,item,user,paramArr){

            var html = '';
            //拼接几星评价用
            var starHtml = template.star(item.level);

            /**
             * 在加载完商品列表后查看是否之前有商品存入购物车中
             */
            var goods = Cart.queryCart(merchantid,item.id);

            if(!goods){

                var obj = {
                    "goodsid":item.id,
                    "src":item.goodsPic,
                    //'src':'images/1.jpg',
                    "title":item.goodsName,
                    "desc":item.describeTxt,
                    "price":item.goodsPrice,
                    "packageEx":item.packageEx,
                    "total":0
                }
                var objstr = config.jsonToStr(obj);

                if(isContainTime(paramArr,item.sellTime)){
                    if(item.statusCode != "1"){

                        if(user.permissions == "0"){
                            if(item.goodsPermissions == "0"){

                                html += template.replace(template.goodsList,{
                                    '${param}':encodeURIComponent(JSON.stringify(item)),
                                    '${goodsid}':"goods"+item.id,
                                    '${src}':config.picurl+item.goodsPic,
                                    //'${src}':'images/1.jpg',
                                    '${title}':item.goodsName,
                                    '${desc}':item.describeTxt,
                                    '${price}':item.goodsPrice,
                                    '${star}':starHtml,
                                    '${addobj}':objstr,
                                    '${delobj}':objstr,
                                    '${total}':' ',
                                    '${style}':'display:none',
                                    '${parentpermission}':true,
                                    '${childplus}':true,
                                    '${childadd}':true,
                                    '${sty}':' ',
                                    '${quan}':'',
                                    '${parentstyle}':' '
                                });
                            }else{

                                html += template.replace(template.goodsList,{
                                    '${param}':encodeURIComponent(JSON.stringify(item)),
                                    '${goodsid}':"goods"+item.id,
                                    '${src}':config.picurl+item.goodsPic,
                                    //'${src}':'images/1.jpg',
                                    '${title}':item.goodsName,
                                    '${desc}':item.describeTxt,
                                    '${price}':item.goodsPrice,
                                    '${star}':starHtml,
                                    '${addobj}':objstr,
                                    '${delobj}':objstr,
                                    '${total}':' ',
                                    '${style}':'display:none',
                                    '${parentpermission}':false,
                                    '${childplus}':false,
                                    '${childadd}':false,
                                    '${sty}':'display:none',
                                    '${quan}':'没有购买权限',
                                    '${parentstyle}':'background:#EDEDED'
                                });
                            }
                        }else if(user.permissions == "1"){
                            if((item.goodsPermissions == "0")||(item.goodsPermissions == "1")){
                                html += template.replace(template.goodsList,{
                                    '${param}':encodeURIComponent(JSON.stringify(item)),
                                    '${goodsid}':"goods"+item.id,
                                    '${src}':config.picurl+item.goodsPic,
                                    //'${src}':'images/1.jpg',
                                    '${title}':item.goodsName,
                                    '${desc}':item.describeTxt,
                                    '${price}':item.goodsPrice,
                                    '${star}':starHtml,
                                    '${addobj}':objstr,
                                    '${delobj}':objstr,
                                    '${total}':' ',
                                    '${style}':'display:none',
                                    '${parentpermission}':true,
                                    '${childplus}':true,
                                    '${childadd}':true,
                                    '${sty}':' ',
                                    '${quan}':'',
                                    '${parentstyle}':' '
                                });
                            }else{
                                html += template.replace(template.goodsList,{
                                    '${param}':encodeURIComponent(JSON.stringify(item)),
                                    '${goodsid}':"goods"+item.id,
                                    '${src}':config.picurl+item.goodsPic,
                                    //'${src}':'images/1.jpg',
                                    '${title}':item.goodsName,
                                    '${desc}':item.describeTxt,
                                    '${price}':item.goodsPrice,
                                    '${star}':starHtml,
                                    '${addobj}':objstr,
                                    '${delobj}':objstr,
                                    '${total}':' ',
                                    '${style}':'display:none',
                                    '${parentpermission}':false,
                                    '${childplus}':false,
                                    '${childadd}':false,
                                    '${quan}':'没有购买权限',
                                    '${sty}':'display:none',
                                    '${parentstyle}':'background:#EDEDED'
                                });
                            }
                        }else if(user.permissions == "2"){
                            html += template.replace(template.goodsList,{
                                '${param}':encodeURIComponent(JSON.stringify(item)),
                                '${goodsid}':"goods"+item.id,
                                '${src}':config.picurl+item.goodsPic,
                                //'${src}':'images/1.jpg',
                                '${title}':item.goodsName,
                                '${desc}':item.describeTxt,
                                '${price}':item.goodsPrice,
                                '${star}':starHtml,
                                '${addobj}':objstr,
                                '${delobj}':objstr,
                                '${total}':' ',
                                '${style}':'display:none',
                                '${parentpermission}':true,
                                '${childplus}':true,
                                '${childadd}':true,
                                '${sty}':' ',
                                '${quan}':'',
                                '${parentstyle}':' '
                            });
                        }


                    }else{

                        html += template.replace(template.goodsList,{
                            '${param}':encodeURIComponent(JSON.stringify(item)),
                            '${goodsid}':"goods"+item.id,
                            '${src}':config.picurl+item.goodsPic,
                            //'${src}':'images/1.jpg',
                            '${title}':item.goodsName,
                            '${desc}':item.describeTxt,
                            '${price}':item.goodsPrice,
                            '${star}':starHtml,
                            '${addobj}':objstr,
                            '${delobj}':objstr,
                            '${total}':' ',
                            '${style}':'display:none',
                            '${parentpermission}':false,
                            '${childplus}':false,
                            '${childadd}':false,
                            '${sty}':'display:none',
                            '${quan}':'商品正在沽清',
                            '${parentstyle}':'background:#EDEDED'
                        });
                    }
                }else{

                    html += template.replace(template.goodsList,{
                        '${param}':encodeURIComponent(JSON.stringify(item)),
                        '${goodsid}':"goods"+item.id,
                        '${src}':config.picurl+item.goodsPic,
                        //'${src}':'images/1.jpg',
                        '${title}':item.goodsName,
                        '${desc}':item.describeTxt,
                        '${price}':item.goodsPrice,
                        '${star}':starHtml,
                        '${addobj}':objstr,
                        '${delobj}':objstr,
                        '${total}':' ',
                        '${style}':'display:none',
                        '${parentpermission}':false,
                        '${childplus}':false,
                        '${childadd}':false,
                        '${quan}':'不在售卖时间内',
                        '${sty}':'display:none',
                        '${parentstyle}':'background:#EDEDED'
                    });
                }

            }else{

                var obj = {
                    "goodsid":item.id,
                    "src":item.goodsPic,
                    "title":item.goodsName,
                    "desc":item.describeTxt,
                    "price":item.goodsPrice,
                    "total":goods.total,
                    "level":item.level
                }
                var objstr = config.jsonToStr(obj);

                if(isContainTime(paramArr,item.sellTime)){
                    if(item.statusCode != "1"){

                        if(user.permissions == "0"){
                            if(item.goodsPermissions == "0"){

                                html += template.replace(template.goodsList,{
                                    '${param}':encodeURIComponent(JSON.stringify(item)),
                                    '${goodsid}':"goods"+item.id,
                                    '${src}':config.picurl+item.goodsPic,
                                    //'${src}':'images/1.jpg',
                                    '${title}':item.goodsName,
                                    '${desc}':item.describeTxt,
                                    '${price}':item.goodsPrice,
                                    '${star}':starHtml,
                                    '${addobj}':objstr,
                                    '${delobj}':objstr,
                                    '${total}':goods.total,
                                    '${style}':'display:block',
                                    '${parentpermission}':true,
                                    '${childplus}':true,
                                    '${childadd}':true,
                                    '${sty}':' ',
                                    '${parentstyle}':' '
                                });
                            }else{

                                html += template.replace(template.goodsList,{
                                    '${param}':encodeURIComponent(JSON.stringify(item)),
                                    '${goodsid}':"goods"+item.id,
                                    '${src}':config.picurl+item.goodsPic,
                                    //'${src}':'images/1.jpg',
                                    '${title}':item.goodsName,
                                    '${desc}':item.describeTxt,
                                    '${price}':item.goodsPrice,
                                    '${star}':starHtml,
                                    '${addobj}':objstr,
                                    '${delobj}':objstr,
                                    '${total}':goods.total,
                                    '${style}':'display:block',
                                    '${parentpermission}':false,
                                    '${childplus}':false,
                                    '${childadd}':false,
                                    '${sty}':'display:none',
                                    '${parentstyle}':'background:#EDEDED'
                                });
                            }
                        }else if(user.permissions == "1"){
                            if((item.goodsPermissions == "0")||(item.goodsPermissions == "1")){
                                html += template.replace(template.goodsList,{
                                    '${param}':encodeURIComponent(JSON.stringify(item)),
                                    '${goodsid}':"goods"+item.id,
                                    '${src}':config.picurl+item.goodsPic,
                                    //'${src}':'images/1.jpg',
                                    '${title}':item.goodsName,
                                    '${desc}':item.describeTxt,
                                    '${price}':item.goodsPrice,
                                    '${star}':starHtml,
                                    '${addobj}':objstr,
                                    '${delobj}':objstr,
                                    '${total}':goods.total,
                                    '${style}':'display:block',
                                    '${parentpermission}':true,
                                    '${childplus}':true,
                                    '${childadd}':true,
                                    '${sty}':' ',
                                    '${parentstyle}':' '
                                });
                            }else{
                                html += template.replace(template.goodsList,{
                                    '${param}':encodeURIComponent(JSON.stringify(item)),
                                    '${goodsid}':"goods"+item.id,
                                    '${src}':config.picurl+item.goodsPic,
                                    //'${src}':'images/1.jpg',
                                    '${title}':item.goodsName,
                                    '${desc}':item.describeTxt,
                                    '${price}':item.goodsPrice,
                                    '${star}':starHtml,
                                    '${addobj}':objstr,
                                    '${delobj}':objstr,
                                    '${total}':goods.total,
                                    '${style}':'display:block',
                                    '${parentpermission}':false,
                                    '${childplus}':false,
                                    '${childadd}':false,
                                    '${sty}':'display:none',
                                    '${parentstyle}':'background:#EDEDED'
                                });
                            }
                        }else if(user.permissions == "2"){
                            html += template.replace(template.goodsList,{
                                '${param}':encodeURIComponent(JSON.stringify(item)),
                                '${goodsid}':"goods"+item.id,
                                '${src}':config.picurl+item.goodsPic,
                                //'${src}':'images/1.jpg',
                                '${title}':item.goodsName,
                                '${desc}':item.describeTxt,
                                '${price}':item.goodsPrice,
                                '${star}':starHtml,
                                '${addobj}':objstr,
                                '${delobj}':objstr,
                                '${total}':goods.total,
                                '${style}':'display:block',
                                '${parentpermission}':true,
                                '${childplus}':true,
                                '${childadd}':true,
                                '${sty}':' ',
                                '${parentstyle}':' '
                            });
                        }
                    }else{

                        html += template.replace(template.goodsList,{
                            '${param}':encodeURIComponent(JSON.stringify(item)),
                            '${goodsid}':"goods"+item.id,
                            '${src}':config.picurl+item.goodsPic,
                            //'${src}':'images/1.jpg',
                            '${title}':item.goodsName,
                            '${desc}':item.describeTxt,
                            '${price}':item.goodsPrice,
                            '${star}':starHtml,
                            '${addobj}':objstr,
                            '${delobj}':objstr,
                            '${total}':goods.total,
                            '${style}':'display:block',
                            '${parentpermission}':false,
                            '${childplus}':false,
                            '${childadd}':false,
                            '${sty}':'display:none',
                            '${parentstyle}':'background:#EDEDED'
                        });

                    }
                }else{



                }


            }
            return html;
        },
        /**
         * 获取商户评价
         */
        getMerchantFeedBack : function(merchantid,merchantname){
            
        },
        /**
         * 确认下单
         */
        confirmOrder : function(merchantid,merchantname){

            var userObj = config.user;
            //var userObj  = JSON.parse(Storage.getItem("loginuser"));
            
            var total   = Cart.countTotal(merchantid);
            var price   = Cart.countPrice(merchantid);

            saleprice = price-((price*0).toFixed(2));

            var select_time = $('#select_time').text();
            var preTime = '';
            if(select_time){
                preTime = getDay()+select_time;
            }else{
                preTime = getDay()+"08:00";
            }

            var ps = $('#psj').text();
            var html = template.replace(template.confirmOrder,{

                '${username}':userObj.nickName,
                '${sex}':' ',//userObj.sex,//默认男
                '${phone}':userObj.userIDWeChat,
                '${loc}':config.location.name,
                '${merchantname}':merchantname,
                '${pretime}':preTime,
                '${total}':total,
                '${price}':price,
                '${grade}':'5',//userObj.grade,
                '${point}':'100',//userObj.point,
                '${sale}':8.8,
                '${psprice}':ps,
                '${saleprice}':saleprice.toFixed(2),
                '${url}':"remark.html?location="+config.location.name+"&merchantname="+merchantname,
                '${crediturl}':'#',//'credit.html?point='+userObj.point,
                '${gradeurl}':'#',//'grade.html?grade='+userObj.grade,
                '${inventoryurl}':'inventory.html?merchantid='+merchantid+"&merchantname="+merchantname,
                '${couponurl}':'coupon.html?merchantid='+merchantid+'&satisfy='+saleprice
            });

            /**
             * 拼接订单数量
             * @type {{destinationPointId: (*|string), merchantId: *, isRealTime: number, sellTime: string, describeTxt: string, items: *[]}}
             */
            var goods = Cart.loopCart(merchantid);

            var items = [];
            $(goods).each(function(index,item){

                var goodsObj = {};
                goodsObj['goodsId'] = item.goodsid;
                goodsObj['goodsQuantity'] = item.total;
                goodsObj['comboItem'] = [0];

                items.push(goodsObj);
            });


            /**
             * 创建订单
             * @type {{destinationPointId: (*|string), merchantId: *, isRealTime: number, sellTime: string, describeTxt: string, items: Array}}
             */
            
            var order = {

                "destinationPointId":config.location.id,
                "merchantId":merchantid,
                "isRealTime":'1',
                "sellTime":formartCTime(preTime),
                "describeTxt":"",
                "items":items

            }


            var psj = Number(ps.substring(1,ps.length));
            Storage.setItem("order",JSON.stringify(order));
            $("#confirmorder").html(html);
            
            $("#totalPrice").text((saleprice+psj).toFixed(2));
           // $("#remark").attr("href","remark.html?location="+locObj.name+"&merchantname="+merchantname);

        },
        /**
         * 渲染商品清单
         */
        renderInventory : function(merchantid){
            
            var goods = Cart.loopCart(merchantid);
            
            var html = '';
            $(goods).each(function(index,item){

                //var s = parseFloat(item.price);
                var fee = (item.total*item.price).toFixed(2);

                html += template.replace(template.inven_goodslist,{

                    '${goodsname}':item.title,
                    '${total}':item.total,
                    '${totalfee}':fee,
                    '${wraptotal}':item.total,
                    '${wrapfee}':((item.total)*(parseFloat(item.packageEx))).toFixed(2)
                });
                
            });
            
            $("#inven_goodslist").html(html);
        },
        /**
         * 提交订单
         */
        submitOrder : function(merchantid){

            if(config.isSubmitOrder == 'false'){

                var data = Storage.getItem("order");

                $.ajax({

                    url: config.url + '/v1/order',
                    type: 'POST',
                    contentType: "application/json",
                    dataType: 'json',
                    data: data,
                    beforeSend: function(request) {
                        request.setRequestHeader("Authorization", config.token);
                    },
                    success: function (data) {

                        if(data.status == "false"){
                            if(data.error.code == "10008"){
                                $.alert(data.error.message);
                            }else if(data.error.code == "10010"){
                                $.alert(data.error.message);
                            }else{
                                $.alert(data.message);
                            }
                        }else{

                            /**
                             * 找到父订单
                             */
                            var parentOrderId = '';
                            $(data.result).each(function(index,item){

                                if(item.parentID == '0'){
                                    parentOrderId = item.id;
                                }

                            });

                            var total_fee = $("#totalPrice").text();
                            // $.confirm('确定要支付¥'+total_fee+'元吗?',
                            //     function(){
                            //         $.fn.network.payOrder(parentOrderId);
                            //     },
                            //     function(){
                            //         config.isSubmitOrder = 'true';
                            //     }
                            // );
                            $.modal({
                                title:  '',
                                text: '确定要支付¥'+total_fee+'元吗?',
                                buttons: [
                                    {
                                        text: '取消',
                                        onClick: function() {
                                            config.isSubmitOrder = 'true';
                                            $('#index_window_').show();

                                            $('.tab-item').each(function(i,item){

                                                var name = $(item).attr('data-value');
                                                if(name != 'order'){
                                                    $(item).removeClass('active');
                                                }else{
                                                    $(item).addClass('active');
                                                }
                                            });
                                            $.router.loadPage("#order");
                                            var id = 'order';
                                            var $page = $(".page-current");
                                            $page.trigger("pageInit", [id, $page]);
                                        }
                                    },
                                    {
                                        text: '校园卡支付',
                                        onClick: function() {
                                            $.fn.network.payOrder(parentOrderId);
                                        }
                                    },
                                    {
                                        text: '<font color="silver">微信支付</font>',
                                        bold: true,
                                        onClick: function() {
                                            $.alert('尽请期待!');
                                        }
                                    },
                                ]
                            });
                        }
                    },
                    error:function(data){
                        console.log("ajax error");
                    }

                });
            }else{
                $.alert('订单已经提交成功!');
            }
        },
        /**
         * 获取用户订单列表
         */
        getOrderList : function(){
            $("#index_orderlist").ajaxSubmit({
                url: config.url + '/v1/order/user',
                type: 'GET',       //请求类型 允许的值 post and get
                dataType: 'json',   //返回数据类型
                data: parseStrToJSON($('#index_form').formSerialize()),
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {

                    if(data.status == 'true'){
                        if(data.result.length != 0){
                            $('input[name=totalPage]').val(data.totalCount);
                            var html = $.fn.network.recursiveOrder(data.result,'now');

                            $("#orderInfo").append(html);
                            
                            $("#orderInfo").find('a').each(function(index,el){

                                $(el).unbind('click');
                                $(el).bind('click',function(e){
                                    if(e.target.nodeName != 'BUTTON'){
                                        var id = $(this).attr('data-param');
                                        $.router.loadPage('orderdetial.html?item='+id);
                                    }else{
                                        var str = $(this).attr('data-item');
                                        //$.router.loadPage('qucan.html?param='+str);
                                        //location.href = "qucan.html?param="+str;
                                        $('#qucan').attr('data-value',str);
                                        $.router.loadPage('#qucan');
                                    }


                                });
                                // $(page).on('click',$(el),function(){
                                //     var id = $(this).attr('data-param');
                                //     $.router.loadPage('orderdetial.html?item='+id);
                                // });

                            });


                            if(data.result.length < 8){
                                $.detachInfiniteScroll($('.infinite-scroll'));
                                $('.infinite-scroll-preloader').remove();
                            }

                        }else{
                            $.detachInfiniteScroll($('.infinite-scroll'));
                            $('.infinite-scroll-preloader').remove();
                        }

                    }
                        
                }
            });

        },
        /**
         * 订单详情
         * @param obj
         */
        orderDetial : function(orderId,token){

            $.ajax({

                url: config.url + '/v1/order/user/'+orderId,
                type: 'GET',
                dataType: 'json',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization",token);
                },
                success: function (data) {
                    //console.log(data);

                    if(data.status == "true"){

                        $(data.result).each(function(index,item){


                            if(item.id == orderId){

                                var orderIdArr = [];

                                $("#orderStatus_title").text(item.id);

                                $("#merchantname").text(item.merchantName);
                                $("#booktime").text(formatTime(item.sellDate,item.sellTime));
                                $("#user_order_status").text(transOrderStatus(item.orderStatus));


                                $.fn.network.getFeeDetail("coupon_detail",orderId);

                                var complainurl = '';
                                var evaluateurl = '';
                                var cancelurl = '';
                                if(item.items){
                                    orderIdArr.push(orderId);
                                    //渲染取餐点
                                    $.fn.network.getDestName(orderIdArr,$("#location"),config.token);
                                    var html = '';
                                    $(item.items).each(function(index,i){

                                        html += template.replace(template.goodsDetail,{
                                            '${name}':i.goodsName,
                                            '${total}':i.goodsQuantity,
                                            '${totalprice}':i.goodsPrice
                                        });

                                    });

                                    $("#goodslist").html(html);

                                    var feehmtl = template.replace(template.fee,{

                                        '${wraptotal}':item.items.length,
                                        '${wrapfee}':item.packAmount,
                                        '${pstotal}':item.items.length,
                                        '${psfee}':item.freightAmount

                                    });

                                    $("#fee").html(feehmtl);

                                    // $("#order_total_fee").text("¥"+item.totalAmount);
                                    // $("#order_fee_").text("¥"+item.totalAmount);
                                    
                                    complainurl = 'complain.html?param='+encodeURIComponent(JSON.stringify(item));
                                    evaluateurl = 'evaluate.html?param='+encodeURIComponent(JSON.stringify(item));
                                    cancelurl = 'cancel.html?param='+encodeURIComponent(JSON.stringify(item));
                                }else{


                                    var items = [];
                                    $(data.result).each(function(index,it){


                                        if(it.parentID == orderId){
                                            orderIdArr.push(it.id);
                                            $(it.items).each(function(index,ite){
                                                items.push(ite);
                                            });
                                        }
                                    });
                                    $.fn.network.getDestName(orderIdArr,$("#location"),config.token);

                                    var html = '';
                                    $(items).each(function(index,i){

                                        html += template.replace(template.goodsDetail,{
                                            '${name}':i.goodsName,
                                            '${total}':i.goodsQuantity,
                                            '${totalprice}':i.goodsPrice
                                        });

                                    });

                                    $("#goodslist").html(html);
                                    var feehmtl = template.replace(template.fee,{

                                        '${wraptotal}':items.length,
                                        '${wrapfee}':item.packAmount,
                                        '${pstotal}':items.length,
                                        '${psfee}':item.freightAmount

                                    });

                                    $("#fee").html(feehmtl);
                                    // $("#order_total_fee").text("¥"+item.totalAmount);
                                    // $("#order_fee_").text("¥"+item.totalAmount);
                                    item.items = items;
                                    complainurl = 'complain.html?param='+encodeURIComponent(JSON.stringify(item));
                                    evaluateurl = 'evaluate.html?param='+encodeURIComponent(JSON.stringify(item));
                                    cancelurl = 'cancel.html?param='+encodeURIComponent(JSON.stringify(item));

                                }
                                var orderStatusHtml = '';

                                var url = 'index.html';

                                if(item.orderStatus == 'UnPaid'){//未付

                                    orderStatusHtml += template.replace(template.order_status_unPaid,{
                                        '${complainurl}':complainurl,
                                        '${url}':url
                                    });
                                }else if(item.orderStatus == 'Paid'){//已订
                                    orderStatusHtml += template.replace(template.order_status_paid,{
                                        '${complainurl}':complainurl,
                                        '${evaluateurl}':cancelurl,
                                        '${url}':url
                                    });
                                }else if(item.orderStatus == 'Refunding'){//退款中
                                    orderStatusHtml += template.replace(template.order_status_delivered,{
                                        '${complainurl}':complainurl,
                                        '${url}':url
                                    });
                                }else if(item.orderStatus == 'Delivered'){//可取
                                    orderStatusHtml += template.replace(template.order_status_delivered,{
                                        '${complainurl}':complainurl,
                                        '${url}':url
                                    });
                                }else if(item.orderStatus == 'Picked'){//已取

                                    orderStatusHtml += template.replace(template.order_status_picked,{
                                        '${complainurl}':complainurl,
                                        '${evaluateurl}':evaluateurl,
                                        '${url}':url
                                    });
                                }else if(item.orderStatus == 'Overdue'){//废餐
                                    orderStatusHtml += template.replace(template.order_status_delivered,{
                                        '${complainurl}':complainurl,
                                        '${url}':url
                                    });
                                }else if(item.orderStatus == 'Refunded'){//已退
                                    orderStatusHtml += template.replace(template.order_status_delivered,{
                                        '${complainurl}':complainurl,
                                        '${url}':url
                                    });
                                }else if(item.orderStatus == 'Cancelled'){//取消
                                    orderStatusHtml += template.replace(template.order_status_delivered,{
                                        '${complainurl}':complainurl,
                                        '${url}':url
                                    });
                                }

                                $("#order_status_label").text("订单状态："+transOrderStatus(item.orderStatus));
                                $("#orderStatus").html(orderStatusHtml);

                                var obj = $('#paid_button');

                                if(obj){
                                    obj.click(function(){

                                        $.modal({
                                            title:  '',
                                            text: '确定要支付¥'+item.totalAmount+'元吗?',
                                            buttons: [
                                                {
                                                    text: '取消',
                                                    onClick: function() {
                                                        // config.isSubmitOrder = 'true';
                                                    }
                                                },
                                                {
                                                    text: '校园卡支付',
                                                    onClick: function() {
                                                        $.fn.network.payOrder(item.id);
                                                    }
                                                },
                                                {
                                                    text: '<font color="silver">微信支付</font>',
                                                    bold: true,
                                                    onClick: function() {
                                                        $.alert('尽请期待!');
                                                    }
                                                },
                                            ]
                                        });

                                    });
                                }
                            }
                        });
                    }else{
                        $.alert("登录失败");
                    }
                },
                error:function(data){
                    console.log("ajax error");
                }

            });

        },
        /**
         * 获取消费金额详细信息
         * @param el
         * @param orderId
         */
        getFeeDetail : function(id,orderId){


            $.ajax({

                url: config.url + '/v1/pay/payMent/wx/'+orderId,
                type: 'GET',
                dataType: 'json',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization",config.token);
                },
                success : function(data){

                    if(data.status=="true"){


                        if(!data.result.couponMoney){
                            data.result.couponMoney = '0';
                        }
                        var html = template.replace(template.fee_detail,{

                           '${coupon}':data.result.couponMoney
                        });

                    }

                    $('#'+id).html(html);
                    $('#order_total_fee').text(data.result.sumMoney);
                    $('#coupon_fee').text(data.result.couponMoney);
                    $('#order_fee_').text(data.result.sumMarktingMoney);

                },
                error : function(){

                    console.log('ajax error');
                }

            });
        },
        getDestName : function(orderIdArr,el,token){
            
            var text;
            $(el).html('');
            $(el).parent().parent().parent().nextAll().remove();
            $(orderIdArr).each(function(index,item){

                $.ajax({

                    url: config.url + '/v1/order/boxInfo/'+item,
                    type: 'GET',
                    dataType: 'json',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", token);
                    },
                    success : function(data){

                        if(data.status == 'true'){

                            var val = $(el).text();
                            if(orderIdArr.length == 1){
                                text = data.result.destName+"-"+data.result.clientName+"-"+data.result.cabinetName+"-"+data.result.boxName;
                                $(el).parent().parent().parent().next().remove();
                                $(el).html(text)
                                //$(el).text(text);
                            }else{
                                //text = val +' '+data.result.boxName;
                                text = data.result.destName+"-"+data.result.clientName+"-"+data.result.cabinetName+"-"+data.result.boxName;
                                var html = '<a href="#" class="item-content">'
                                                +'<div class="item-after">'+text+'</div>'
                                            +'</a>';
                                $(el).parent().parent().parent().after(html);
                            }

                        }else{
                            text = '';
                        }

                    },
                    error : function(){

                        destName = '';
                        console.log('ajax error');
                    }

                });

            });
            //$(el).text(text);


        },
        orderCancel : function (id) {

            $.ajax({

                url: config.url + '/v1/order/user/'+id+'/cancel',
                type: 'GET',
                dataType: 'json',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success : function(data){

                    if(data.status == 'true'){

                        
                        /**
                         * 这里最好返回首页
                         */
                        //刷新订单聊表
                        $.fn.network.getOrderList();
                        $.router.back();
                    }else{
                        $.alert('支付失败');
                    }

                },
                error : function(){

                }

            });

        },
        /**
         * 支付
         */
        payOrder : function(orderId){

            config.isSubmitOrder = 'true';
            $.ajax({

                url: config.url + '/v1/pay/'+orderId+'/campusCard',
                type: 'GET',
                dataType: 'json',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success : function(data){


                    if(data.status == 'true'){

                        $.alert('支付成功!');

                        $(".prev").attr("style","display:none");
                        $(".prev").next().text(" ");
                        $("#totalNum").text('0');
                        $("#totalCash").text('0.00');

                        Storage.removeItem("order");
                        //Cart.removeMerchant(merchantid);

                        config.isSubmitOrder = 'true';

                        //$("#orderInfo").children().remove();
                        //$.fn.network.getOrderList();
                        /**
                         * 这里最好返回首页
                         */
                        $('#index_window_').show();

                        $('.tab-item').each(function(i,item){

                            var name = $(item).attr('data-value');
                            if(name != 'order'){
                                $(item).removeClass('active');
                            }else{
                                $(item).addClass('active');
                            }
                        });
                        $.router.loadPage("#order");
                        var id = 'order';
                        var $page = $(".page-current");
                        $page.trigger("pageInit", [id, $page]);

                    }else{
                        $.alert('支付失败!');

                        $(".prev").attr("style","display:none");
                        $(".prev").next().text(" ");
                        $("#totalNum").text('0');
                        $("#totalCash").text('0.00');

                        Storage.removeItem("order");
                        //Cart.removeMerchant(merchantid);

                        config.isSubmitOrder = 'true';

                        $('#index_window_').show();

                        $('.tab-item').each(function(i,item){

                            var name = $(item).attr('data-value');
                            if(name != 'order'){
                                $(item).removeClass('active');
                            }else{
                                $(item).addClass('active');
                            }
                        });
                        $.router.loadPage("#order");
                        // var id = 'order';
                        // var $page = $(".page-current");
                        // $page.trigger("pageInit", [id, $page]);

                    }

                },
                error : function(){
                    
                }
                
            });
        },
        /**
         *渲染 投诉界面
         */
        renderComplain : function(obj){

            $("#orderid").text(obj.id);
            $("#location").text(config.location.name);
            $("#merchantname").text(obj.merchantName);
            $("#orderStatus_title").text(transOrderStatus(obj.orderStatus));
            $("#booktime").text(formatTime(obj.sellDate,obj.sellTime));

        },
        /**
         * 投诉信息提交
         * @param obj
         */
        submitComplain : function(obj){
            var pic = [];
            $("#previewpic").find("li").each(function(index,item){
               pic.push($(item).attr("data-pic"));
            });

            var param = {
                "orderId":obj.id,
                "feedbackType":"1",
                "content":$("#complaincontent").val(),
                "feedbackPic":pic.join(","),
                "statusCode":obj.orderStatus,
                "merchantID":obj.merchantID
            }
            $.ajax({
                url: config.url + '/v1/feedback',
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify(param),
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {
                    if(data.status == 'true'){
                        $.alert('投诉成功');
                        $.router.back();
                        $("#previewpic").children().remove();
                    }else{
                        $.alert(data.message);
                    }

                }
            });

        },
        /**
         * 上传并预览图片
         */
        PreviewImage:function(fileObj, imgPreviewId, divPreviewId) {

            var formData = new FormData($("#formImageUpload")[0]);

            var url = '';


            // $("#pic_form").ajaxSubmit({
            //     url: config.url + '/v1/feedback/upload',
            //     type: 'GET',       //请求类型 允许的值 post and get
            //     dataType: 'json',   //返回数据类型
            //     data: parseStrToJSON($('#formImageUpload').formSerialize()),
            //     beforeSend: function (request) {
            //         request.setRequestHeader("Authorization", config.token);
            //     },
            //     success: function (data) {
            //         console.log(data);
            //         url = data.result;
            //     }
            // });


            $.ajax({
                url: config.url + '/v1/feedback/upload',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {
                    url = data.result;
                }
            });

            var html = template.replace(template.imgtpl,{
                '${url}':url,
                '${id1}':divPreviewId,
                '${id2}':imgPreviewId
            })
            $("#previewpic").append(html);

            var allowExtention = ".jpg,.bmp,.gif,.png"; //允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;
            var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
            var browserVersion = window.navigator.userAgent.toUpperCase();
            //if (allowExtention.indexOf(extention) > -1) {
                if (fileObj.files) {//HTML5实现预览，兼容chrome、火狐7+等
                    if (window.FileReader) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            document.getElementById(imgPreviewId).setAttribute("src", e.target.result);
                        }
                        reader.readAsDataURL(fileObj.files[0]);
                    } else if (browserVersion.indexOf("SAFARI") > -1) {
                        $.alert("不支持Safari6.0以下浏览器的图片预览!");
                    }
                } else if (browserVersion.indexOf("MSIE") > -1) {
                    if (browserVersion.indexOf("MSIE 6") > -1) {//ie6
                        document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
                    } else {//ie[7-9]
                        fileObj.select();
                        if (browserVersion.indexOf("MSIE 9") > -1)
                            fileObj.blur(); //不加上document.selection.createRange().text在ie9会拒绝访问
                        var newPreview = document.getElementById(divPreviewId + "New");
                        if (newPreview == null) {
                            newPreview = document.createElement("div");
                            newPreview.setAttribute("id", divPreviewId + "New");
                        }
                        var a = document.selection.createRange().text;

                        newPreview.style.height = 390 + "px";
                        newPreview.style.border = "solid 1px #eeeeee";
                        newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
                        var tempDivPreview = document.getElementById(divPreviewId);
                        // tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
                        newPreview.style.display = "block";
                        tempDivPreview.style.display = "none";
                    }
                } else if (browserVersion.indexOf("FIREFOX") > -1) {//firefox
                    var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
                    if (firefoxVersion < 7) {//firefox7以下版本
                        document.getElementById(imgPreviewId).setAttribute("src", fileObj.files[0].getAsDataURL());
                    } else {//firefox7.0+
                        document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(fileObj.files[0]));
                    }
                } else {
                    document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
                }
            // } else {
            //     $.alert("仅支持" + allowExtention + "为后缀名的文件!");
            //     fileObj.value = ""; //清空选中文件
            //     if (browserVersion.indexOf("MSIE") > -1) {
            //         fileObj.select();
            //         document.selection.clear();
            //     }
            //     fileObj.outerHTML = fileObj.outerHTML;
            // }
        },
        /**
         * 渲染评价界面
         * @param obj
         */
        renderEvaluate : function(obj){
            $("#orderid").text(obj.id);
            $("#merchantname").text(obj.merchantName);
            $("#orderStatus_title").text(transOrderStatus(obj.orderStatus));

            var html = '';
            $(obj.items).each(function(index,item){

                html += template.replace(template.evaluateGoods,{
                    '${id}':item.goodsID,
                    '${goodsname}':item.goodsName
                });

            });

            $("#evaluateGoods").html(html);
        },
        /**
         *
         */
        submitEvaluate : function(obj,goodsFeedBack,feedbackMStar){

            var pic = [];
            $("#previewpic").find("li").each(function(index,item){
                pic.push($(item).attr("data-pic"));
            });
            
            var param = {
                "orderId":obj.id,
                "feedbackType":"0",
                "content":$("#evaluatecontent").val(),
                "feedbackPic":pic.join(","),
                "statusCode":obj.orderStatus,
                "goodsFeedBack":goodsFeedBack,
                "feedbackMStar":feedbackMStar,
                "merchantID":obj.merchantID
            }
            $.ajax({
                url: config.url + '/v1/feedback',
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify(param),
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {

                    if(data.status=='true'){
                        $.alert('评价成功');
                        $("#previewpic").children().remove();
                        $.router.back();
                    }else{
                        $.alert(data.message);
                    }


                }
            });
        },
        /**
         * 获取jssdk签名
         * @param wx
         * @param page
         */
        getSignature : function(page){

            $('.button_').click(function(e){

                console.log(e.currentTarget.name);
                console.log(e.target.nodeName);

                // if(event.target==this){
                var str = $(this).attr("data-item");
                //window.location.href = 'qucan.html?param='+str;
                //$.router.loadPage('#qucan');
                $.router.loadPage('qucan.html?param='+str);
                // }
                // if(e.target == e.currentTarget){
                //     var str = $(this).attr("data-item");
                //     //window.location.href = 'qucan.html?param='+str;
                //     //$.router.loadPage('#qucan');
                //     $.router.loadPage('qucan.html?param='+str);
                // }
            });

            // $(page).on("click",".button_",function(e){
            //     console.log(e.currentTarget+'---'+e.target);
            //
            //     // if(event.target==this){
            //         var str = $(this).attr("data-item");
            //         //window.location.href = 'qucan.html?param='+str;
            //         //$.router.loadPage('#qucan');
            //         $.router.loadPage('qucan.html?param='+str);
            //     // }
            //     // if(e.target == e.currentTarget){
            //     //     var str = $(this).attr("data-item");
            //     //     //window.location.href = 'qucan.html?param='+str;
            //     //     //$.router.loadPage('#qucan');
            //     //     $.router.loadPage('qucan.html?param='+str);
            //     // }
            //
            // });
        },
        /**
         * 获取关于我的信息
         */
        getMyInfo : function(){

            //var user = config.user;

            //等级和积分
            var ghtml = template.replace(template.grade_point,{
                '${grade}':'5',//user.grade,
                '${point}':'100',//user.point
                
            });
            $("#grade_point").html(ghtml);
        },
        /**
         * 渲染我的详细信息
         */
        renderMyInfo : function(){
            
            var user = config.user;
            $("#nickname").text(user.nickName);
            $("#phone").text(user.userIDWeChat);

        },
        /**
         * 获取我的历史订单
         */
        getMyHistoryOrder : function(){

            $("#my_index_orderlist").ajaxSubmit({
                url: config.url + '/v1/order/user',
                type: 'GET',       //请求类型 允许的值 post and get
                dataType: 'json',   //返回数据类型
                data: parseStrToJSON($('#my_index_form').formSerialize()),
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {

                    if(data.status == 'true'){
                        if(data.result.length != 0){
                            $('input[name=totalPage]').val(data.totalCount);
                            var html = $.fn.network.recursiveOrder(data.result,'history');

                            $("#historyorder").append(html);


                            // $("#historyorder").find('.time_title_').each(function(index,el){
                            //
                            //     $(el).unbind('click');
                            //     $(el).bind('click',function(e){
                            //
                            //         var id = $(this).attr('data-param');
                            //         $.router.loadPage('orderdetial.html?item='+id);
                            //     });
                            //
                            // });
                            $("#historyorder").find('a').each(function(index,el){

                                $(el).unbind('click');
                                $(el).bind('click',function(e){
                                    if(e.target.nodeName != 'BUTTON'){
                                        var id = $(this).attr('data-param');
                                        $.router.loadPage('orderdetial.html?item='+id);
                                    }else{
                                        var str = decodeURIComponent($(this).attr('data-item'));
                                        $.router.loadPage('qucan.html?param='+str);
                                    }


                                });
                                // $(page).on('click',$(el),function(){
                                //     var id = $(this).attr('data-param');
                                //     $.router.loadPage('orderdetial.html?item='+id);
                                // });

                            });


                            if(data.result.length < 9){
                                $.detachInfiniteScroll($('.infinite-scroll'));
                                $('.infinite-scroll-preloader').remove();
                            }
                        }else{
                            $.detachInfiniteScroll($('.infinite-scroll'));
                            $('.infinite-scroll-preloader').remove();
                        }
                    }
                }
            });
        },
        /**
         *递归获取订单信息
         */
        recursiveOrder : function(obj,status){

            var html = '';
            $(obj).each(function(index,item){

                if(status == 'history'){
                    if(isLtCurrentDay(item.sellDate)){

                        if(item.items){

                            var url = "orderdetial.html?item="+item.id;
                            var button = '<button data-href="qucan.html" style="width:50px; !important;" data-item='+encodeURIComponent(JSON.stringify(item))+' class="button button-danger button-fill button_">取餐</button>';
                            if(item.orderStatus == "Delivered"){

                                if(item.items.length != 0){
                                    html += template.replace(template.orderInfo,{
                                        '${url}':url,
                                        '${item}':encodeURIComponent(JSON.stringify(item)),
                                        '${time}':formatTime(item.sellDate,item.sellTime),
                                        '${price}':item.totalAmount,
                                        '${name}':item.items[0].goodsName,
                                        '${total}':item.items.length,
                                        '${status}':transOrderStatus(item.orderStatus),
                                        '${param}':item.id,
                                        '${button}':button,
                                        '${gainCode}':item.gainCode

                                    });
                                }

                            }else{

                                if(item.items.length != 0){
                                    html += template.replace(template.orderInfo,{
                                        '${url}':url,
                                        '${item}':encodeURIComponent(JSON.stringify(item)),
                                        '${time}':formatTime(item.sellDate,item.sellTime),
                                        '${price}':item.totalAmount,
                                        '${name}':item.items[0].goodsName,
                                        '${total}':item.items.length,
                                        '${status}':transOrderStatus(item.orderStatus),
                                        '${param}':item.id,
                                        '${button}':' ',
                                        '${gainCode}':item.gainCode
                                    });
                                }

                            }
                        }else{

                            var c_total = 0;
                            var first_c = '';
                            $(item.childOrders).each(function(index,t){

                                if(index == 0){
                                    first_c = t.items[0].goodsName;
                                }
                                c_total  += t.items.length;
                            });

                            var url = "orderdetial.html?item="+item.id;
                            var button = '<button data-href="qucan.html" style="width:50px; !important;" data-item='+encodeURIComponent(JSON.stringify(item))+' class="button button-danger button-fill button_">取餐</button>';
                            if(item.orderStatus == "Delivered"){
                                html += template.replace(template.orderInfo,{
                                    '${url}':url,
                                    '${item}':encodeURIComponent(JSON.stringify(item)),
                                    '${time}':formatTime(item.sellDate,item.sellTime),
                                    '${price}':item.totalAmount,
                                    '${name}':first_c,//item.items[0].goodsName,
                                    '${total}':c_total,//item.items.length,
                                    '${status}':transOrderStatus(item.orderStatus),
                                    '${param}':item.id,
                                    '${button}':button,
                                    '${gainCode}':item.gainCode
                                });
                            }else{
                                html += template.replace(template.orderInfo,{
                                    '${url}':url,
                                    '${item}':encodeURIComponent(JSON.stringify(item)),
                                    '${time}':formatTime(item.sellDate,item.sellTime),
                                    '${price}':item.totalAmount,
                                    '${name}':first_c,//item.items[0].goodsName,
                                    '${total}':c_total,//item.items.length,
                                    '${status}':transOrderStatus(item.orderStatus),
                                    '${param}':item.id,
                                    '${button}':' ',
                                    '${gainCode}':item.gainCode
                                });
                            }
                        }
                    }
                }else if(status == 'now'){

                    if(isCurrentDay(item.sellDate)){

                        if(item.items){

                            var url = "orderdetial.html?item="+item.id;
                            var button = '<button data-href="qucan.html" style="width:50px; !important;" data-item='+encodeURIComponent(JSON.stringify(item))+' class="button button-danger button-fill button_">取餐</button>';
                            if(item.orderStatus == "Delivered"){

                                if(item.items.length != 0){
                                    html += template.replace(template.orderInfo,{
                                        '${url}':url,
                                        '${item}':encodeURIComponent(JSON.stringify(item)),
                                        '${time}':formatTime(item.sellDate,item.sellTime),
                                        '${price}':item.totalAmount,
                                        '${name}':item.items[0].goodsName,
                                        '${total}':item.items.length,
                                        '${status}':transOrderStatus(item.orderStatus),
                                        '${param}':item.id,
                                        '${button}':button,
                                        '${gainCode}':item.gainCode

                                    });
                                }

                            }else{

                                if(item.items.length != 0){
                                    html += template.replace(template.orderInfo,{
                                        '${url}':url,
                                        '${item}':encodeURIComponent(JSON.stringify(item)),
                                        '${time}':formatTime(item.sellDate,item.sellTime),
                                        '${price}':item.totalAmount,
                                        '${name}':item.items[0].goodsName,
                                        '${total}':item.items.length,
                                        '${status}':transOrderStatus(item.orderStatus),
                                        '${param}':item.id,
                                        '${button}':' ',
                                        '${gainCode}':item.gainCode
                                    });
                                }

                            }
                        }else{

                            var c_total = 0;
                            var first_c = '';
                            $(item.childOrders).each(function(index,t){

                                if(index == 0){
                                    first_c = t.items[0].goodsName;
                                }
                                c_total  += t.items.length;
                            });

                            var url = "orderdetial.html?item="+item.id;
                            var button = '<button data-href="qucan.html" style="width:50px; !important;" data-item='+encodeURIComponent(JSON.stringify(item))+' class="button button-danger button-fill button_">取餐</button>';
                            if(item.orderStatus == "Delivered"){
                                html += template.replace(template.orderInfo,{
                                    '${url}':url,
                                    '${item}':encodeURIComponent(JSON.stringify(item)),
                                    '${time}':formatTime(item.sellDate,item.sellTime),
                                    '${price}':item.totalAmount,
                                    '${name}':first_c,//item.items[0].goodsName,
                                    '${total}':c_total,//item.items.length,
                                    '${status}':transOrderStatus(item.orderStatus),
                                    '${param}':item.id,
                                    '${button}':button,
                                    '${gainCode}':item.gainCode
                                });
                            }else{
                                html += template.replace(template.orderInfo,{
                                    '${url}':url,
                                    '${item}':encodeURIComponent(JSON.stringify(item)),
                                    '${time}':formatTime(item.sellDate,item.sellTime),
                                    '${price}':item.totalAmount,
                                    '${name}':first_c,//item.items[0].goodsName,
                                    '${total}':c_total,//item.items.length,
                                    '${status}':transOrderStatus(item.orderStatus),
                                    '${param}':item.id,
                                    '${button}':' ',
                                    '${gainCode}':item.gainCode
                                });
                            }
                        }
                    }

                }

            });
            return html;
        },
        /**
         * 获取我的评价
         */
        getMyEvalute : function(merchantid){

            if(merchantid){
                $("#store_my_evaluate").ajaxSubmit({
                    url: config.url + '/v1/feedback/'+merchantid+'/byMerchant',
                    type: 'GET',       //请求类型 允许的值 post and get
                    dataType: 'json',   //返回数据类型
                    data: parseStrToJSON($('#store_evaluate_form').formSerialize()),
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", config.token);
                    },
                    success: function (data) {

                        if(data.status == 'true'){

                            if(data.result.length != 0){
                                $('input[name=totalPage]').val(data.totalCount);
                                var html = '';
                                var temp = [];
                                $(data.result).each(function(index,item){
                                    if(merchantid == item.merchantID){
                                        if(item.feedbackType == "0"){
                                            temp.push(item);
                                            html +=　template.replace(template.myevalute_m,{
                                                '${feedbackid}':encodeURIComponent(JSON.stringify(item)),
                                                '${ca_name}':item.nickName+"评价道:",
                                                '${content}':item.content,
                                                '${date}':formatTime(item.createTime),
                                                '${star}':template.star(item.feedbackMStar)
                                            });
                                        }
                                    }
                                });
                                $("#evaluate").append(html);

                                $('.card_evaluate').each(function(index,el){

                                    $(el).click(function (e) {
                                        var obj = $(this).attr('data-param');
                                        $.router.loadPage('evaluatedetail.html?param='+obj+'&merchantId='+merchantid);
                                    })

                                });
                                if(temp.length < 3){
                                    $.detachInfiniteScroll($('.infinite-scroll'));
                                    $('.infinite-scroll-preloader').remove();
                                }
                            }else{
                                $.detachInfiniteScroll($('.infinite-scroll'));
                                $('.infinite-scroll-preloader').remove();
                            }
                        }
                    }
                });
            }else{

                $("#index_my_evaluate").ajaxSubmit({
                    url: config.url + '/v1/feedback',
                    type: 'GET',       //请求类型 允许的值 post and get
                    dataType: 'json',   //返回数据类型
                    data: parseStrToJSON($('#my_evaluate_form').formSerialize()),
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", config.token);
                    },
                    success: function (data) {
                        console.log(data);

                        if(data.status == 'true'){
                            if(data.result.length != 0){
                                $('input[name=totalPage]').val(data.totalCount);
                                var html = '';
                                var temp = [];
                                $(data.result).each(function(index,item){

                                    if(item.feedbackType != "1"){

                                        html +=　template.replace(template.myevalute,{
                                            '${feedbackid}':encodeURIComponent(JSON.stringify(item)),
                                            '${ca_name}':item.merchantName,
                                            '${pic_url}':template.picuser(item.feedbackPic),
                                            '${content}':item.content,
                                            '${date}':formatTime(item.createTime),
                                            '${star}':template.star(item.feedbackMStar)
                                        });

                                        temp.push(item);
                                    }
                                });
                                $("#evaluate").append(html);

                                $('.card_evaluate').each(function(index,el){

                                    $(el).click(function (e) {
                                        var obj = $(this).attr('data-param');
                                        $.router.loadPage('evaluatedetail.html?param='+obj);
                                    })


                                });

                                if(temp.length <= 4){
                                    $.detachInfiniteScroll($('.infinite-scroll'));
                                    $('.infinite-scroll-preloader').remove();
                                }

                            }else{
                                $.detachInfiniteScroll($('.infinite-scroll'));
                                $('.infinite-scroll-preloader').remove();
                            }
                        }
                    }
                });
            }

        },
        renderEvaluateDetail : function (obj,type,merchantId) {

            $.ajax({

                url: config.url + '/v1/feedback/user/'+obj.id+'/reply',
                type: 'GET',
                dataType: 'json',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {

                    console.log(data);
                    if(data.status == 'true'){

                        var content_hmtl = '';
                        $(data.result).each(function (indx,item) {

                            if(obj.id == item.parentId){
                                content_hmtl += template.replace(template.evaluatedetail_reply,{
                                    '${time}':formatDateTime(item.createTime),
                                    '${content}':item.content
                                });
                            }

                        });
                        
                        if(type == 'evaluate'){

                            if(merchantId){
                                //console.log(obj);


                                var title_html = template.replace(template.evaluatedetail_title_m,{

                                    '${star}':template.star(obj.feedbackMStar),
                                    '${content}':trimLeft(obj.content),
                                    '${pic_url}':template.pic(config.picurl+obj.feedbackPic)
                                });

                                $('#eva_create_time').text(formatDateTime(obj.createTime));
                                $('#evaluatedetail_title').html(title_html);
                                $('#evaluatedetail_reply').html(content_hmtl);
                                $('#detail_my_evaluate').text('详细评价');
                                $('#detail_evaluate_title').text(obj.nickName+"的评价");

                            }else{

                                var title_html = template.replace(template.evaluatedetail_title,{

                                    '${star}':template.star(obj.feedbackMStar),
                                    '${content}':obj.content,
                                    '${pic_url}':template.picuser(obj.feedbackPic)
                                });

                                $('#eva_create_time').text(formatDateTime(obj.createTime));
                                $('#evaluatedetail_title').html(title_html);
                                $('#evaluatedetail_reply').html(content_hmtl);
                                $('#detail_my_evaluate').text('我的评价');
                                $('#detail_evaluate_title').text('我的评价');
                            }

                        }else if(type == 'complain'){

                            var title_html = template.replace(template.evaluatedetail_title,{

                                '${pic_url}':template.picuser(obj.feedbackPic),
                                '${star}':' ',
                                '${content}':obj.content
                            });
                            $('#eva_create_time').text(formatDateTime(obj.createTime));
                            $('#complaindetail_title').html(title_html);
                            $('#complaindetail_reply').html(content_hmtl);
                            
                        }

                        

                    }
                },
                error : function(data){
                    console.log("ajax error");
                }

            });

        },
        /**
         * 获取用户协议
         */
        getProtocal : function(){

            $.ajax({

                url: config.url + '/v1/feedback/',
                type: 'GET',
                dataType: 'json',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {

                },
                error : function(data){
                    console.log("ajax error");
                }

            });

        },
        /**
         * 获取我的投诉
         */
        getMyComplain : function(){


            $("#mycomplain_ajax_form").ajaxSubmit({
                url: config.url + '/v1/feedback',
                type: 'GET',       //请求类型 允许的值 post and get
                dataType: 'json',   //返回数据类型
                data: parseStrToJSON($('#mycomplain_form').formSerialize()),
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {

                    if(data.status == 'true'){

                        if(data.result.length != 0){
                            $('input[name=totalPage]').val(data.totalCount);
                            var html = '';
                            var temp = [];
                            $(data.result).each(function(index,item){

                                $('input[name=totalPage]').val(item.totalCount);
                                if(item.feedbackType == "1"){
                                    temp.push(item);
                                    html +=　template.replace(template.mycomplain,{
                                        '${param-data}':encodeURIComponent(JSON.stringify(item)),
                                        '${date}':formatTime(item.createTime),
                                        '${content}':item.content,
                                        '${pic_url}':template.picuser(item.feedbackPic)
                                    });
                                }
                            });

                            //$('#mycomplain_').children().remove();
                            $("#mycomplain_").append(html);
                            if(temp.length < 4){
                                $.detachInfiniteScroll($('.infinite-scroll'));
                                $('.infinite-scroll-preloader').remove();
                            }
                            $('.click_complain').each(function (index,el) {

                                $(el).click(function(e){

                                    var param = $(this).attr('data-param');

                                    $.router.loadPage('complaindetail.html?param='+param);

                                });
                            })
                        }else{
                            $.detachInfiniteScroll($('.infinite-scroll'));
                            $('.infinite-scroll-preloader').remove();
                        }
                    }
                }
            });
        },
        /**
         * 餐厅用户登录
         */
        cantingLogin : function(username,password){

            var username = $("input[name=c_user_name]").val();
            var password = $("input[name=c_user_passwd]").val();
            
            var param = {
                "userName":username,
                "password":password
            }
            $.ajax({

                url: config.url + '/v1/auth/operate/login',
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                data:JSON.stringify(param),
                success: function (data) {
                    console.log(data);

                    if(data.status == "true"){
                        
                        location.href = 'index.html?param='+encodeURIComponent(JSON.stringify(data));
                        //$.router.loadPage('index.html.bak.2?param='+encodeURIComponent(JSON.stringify(data)));

                    }else{
                        $.alert("登录失败");
                    }
                },
                error:function(data){
                    console.log("ajax error");
                }

            });
        },
        /**
         * 渲染时间
         * @param shopId
         */
        renderAdminIndex : function(shopId){
            var token = $("input[name=ctoken]").val();
            $.ajax({

                url: config.url + '/v1/merchants/'+shopId,
                type: 'GET',
                dataType: 'json',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", token);

                },
                success: function (data) {

                    if(data.status == "true"){
                        var res = data.result.sellTime;
                        var date = res.split("-");
                        var html = ''
                        $(date).each(function(index,item){

                            var time = item.substring(0,2)+":"+item.substring(2,4);
                            html += '<li class="test"><a class="index-item-link list-button item-link">'+time+'</a></li>'
                        });
                        $("#admin_index_time").html(html);

                        $('.index-item-link').click(function () {
                            //$.alert('ok');
                            $('.open-popover').text($(this).html());
                            $.closeModal();
                            //触发事件
                            var date = getLocTime();
                            var time = $(this).html().replace(':','');
                            $("input[name=sellDate]").val(date);
                            $("input[name=sellTime]").val(time);

                            // var html_ = '<div class="row no-gutter row-th">'
                            //     +'<div class="col-30">订单号</div>'
                            //     +'<div class="col-30">取餐点</div>'
                            //     +'<div class="col-20">状态</div>'
                            //     +'<div class="col-20" style="text-align:right;padding-right:10px;">总价</div>'
                            //     +'</div>';
                            // $('#corderlist').html(html_);
                        });
                        
                    }else{

                    }
                },
                error:function(data){
                    console.log("ajax error");
                }

            });
        },
        /**
         * 餐厅获取订单列表
         */
        corderList : function(status){
            var time = $("input[name=sellDate]").val();
            if(time == ""){
                $.alert("请选择时间段");
                return false;
            }else{
                var token = $("input[name=ctoken]").val();

                // var status = '';
                // if(status != undefined){
                //
                //     status = status_;
                // }else{
                //$('input[name=index_status]').val(status);
                $('input[name="indexstatus"]').val(status);
                // }

                //var shopId = $("input[name=adminctid]").val();

                var pageSize = parseInt($('input[name=pageNo]').val());
                var pageTotal = parseInt($('input[name=pageTotal]').val());

                var res = (pageTotal == 0)?true:((pageSize <= pageTotal)?true:false);

                if(res){

                    $("#index_time_info").ajaxSubmit({
                        url: config.url + '/v1/order/dr',
                        type: 'GET',       //请求类型 允许的值 post and get
                        dataType: 'json',   //返回数据类型
                        data: parseStrToJSON($('#c_index_form').formSerialize()),
                        beforeSend: function (request) {
                            request.setRequestHeader("Authorization", token);

                        },
                        success: function (data) {
                            console.log(data);

                            if(data.status == 'true'){

                                var result = [];
                                $('input[name=pageTotal]').val(data.totalCount);
                                //if(parseInt(data.pageSize) < parseInt(data.totalCount)){
                                   // $('input[name=pageNo]').val(parseInt($('input[name=pageNo]').val())+1);
                                $('input[name=pageNo]').val(parseInt(data.pageSize));
                               // }

                                var html = '';
                                $(data.result).each(function(index,item){


                                    if(($('input[name=indexstatus]').val() == "Cancelled")){

                                        if((item.orderStatus != "Paid")&&(item.orderStatus != "Delivered")&&(item.orderStatus != "Picked")){
                                            result.push(item);
                                        }
                                    }else{


                                        if((item.orderStatus == "Paid")||(item.orderStatus == "Delivered")||(item.orderStatus == "Picked")){
                                            result.push(item);
                                        }
                                    }

                                });

                                if((result.length != 0)){

                                    $(result).each(function (index,item) {
                                        var current_seq = $('input[name=current_seq]').val();

                                        $('input[name=current_seq]').val(Number(current_seq)+1);

                                        html += template.replace(template.corderList,{
                                            '${orderid}':item.id,
                                            '${seq}':Number(current_seq)+1,
                                            '${id}':'*****'+(item.id).substring((item.id.length-5),item.id.length),
                                            '${user}':item.desName,//模拟的
                                            '${status}':transOrderStatus(item.orderStatus),
                                            '${totalfee}':item.totalAmount
                                        });


                                    });

                                    $("#corderlist").html(html);

                                    $("#corderlist").find(".mark").each(function(index,item){
                                        $(item).unbind('click');
                                        $(item).bind('click',function(e){
                                            var orderId = $(this).attr("data-orderid");
                                            $.router.loadPage("#adminorderdetail");
                                            $.fn.network.getAdminOrderDetail(orderId,token);
                                        });
                                    });

                                    $("#c_footer").html(template.c_footer_print);
                                    $("#testprint").unbind('click');
                                    $("#testprint").bind('click',function(e){
                                        /**
                                         * 返回按钮点击事件
                                         */
                                        $('#corderlist').html('');
                                        var current_seq = $('input[name=current_seq]').val('0');
                                        $('.open-popover').text('00:00');
                                        $('input[name=sellDate]').val('');
                                        $('input[name=sellTime]').val('');

                                        $("#c_footer").html(template.c_footer_query);
                                    });
                                    $('#hcprint').unbind('click');
                                    $("#hcprint").bind('click',function(e){
                                        $.alert("后厨打印");
                                    });
                                    $('#cprint').unbind('click');
                                    $("#cprint").bind('click',function(e){
                                        $.alert("打印");
                                    });

                                }else{
                                    $.alert("暂无订单");
                                    $('#pageTotal').val('0');
                                    $('input[name=pageNo]').val('0');
                                }

                            }
                        },
                        error:function(){
                            console.log('ajax error');
                        }
                    });
                }else{
                    $.alert('暂无订单');
                    $('#pageTotal').val('0');
                    $('input[name=pageNo]').val('0');

                }

            }
        },
        /**
         * 餐厅端订单详情
         * @param orderid
         * @param token
         */
        getAdminOrderDetail : function(orderid,token){

            $.ajax({

                url: config.url + '/v1/order/dr/'+orderid,
                type: 'GET',
                dataType: 'json',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", token);
                },
                success: function (data) {

                    if(data.status == "true"){

                        $(data.result).each(function(index,item){
                           if(item.id == orderid){

                               var orderIdArr = [];

                               $("#adminorderStatus_title").text(item.id);
                               $("#admin_order_status").text(transOrderStatus(item.orderStatus));
                               //$("#adminlocation").text(item.desName);
                               $("#adminmerchantname").text(item.merchantName);
                               $("#adminbooktime").text(formatTime(item.sellDate,item.sellTime));

                               if(item.items){

                                   orderIdArr.push(orderid);
                                   //设置取餐点
                                   $.fn.network.getDestName(orderIdArr,$("#adminlocation"),token);

                                   var html = '';
                                   $(item.items).each(function(index,i){

                                       html += template.replace(template.goodsDetail,{
                                           '${name}':i.goodsName,
                                           '${total}':i.goodsQuantity,
                                           '${totalprice}':i.goodsPrice
                                       });

                                   });

                                   $("#admingoodslist").html(html);

                                   var feehtml = template.replace(template.fee,{

                                       '${wraptotal}':item.items.length,
                                       '${wrapfee}':item.packAmount,
                                       '${pstotal}':item.items.length,
                                       '${psfee}':item.freightAmount

                                   });

                                   $("#adminfee").html(feehtml);
                                   $('#admin_total_fee').html('¥'+item.totalAmount);

                               }else{

                                  // obj = item;
                                   var items = [];
                                   $(data.result).each(function(index,it){

                                       if(it.parentID == orderid){
                                           orderIdArr.push(it.id);
                                           $(it.items).each(function(index,ite){
                                               items.push(ite);
                                           });
                                       }
                                   });

                                   //设置取餐点
                                   $.fn.network.getDestName(orderIdArr,$("#adminlocation"),token);

                                   var html = '';
                                   $(items).each(function(index,itemm){

                                       html += template.replace(template.goodsDetail,{
                                           '${name}':itemm.goodsName,
                                           '${total}':itemm.goodsQuantity,
                                           '${totalprice}':itemm.goodsPrice
                                       });

                                   });

                                   $("#admingoodslist").html(html);

                                   var feehtml = template.replace(template.fee,{
                                       '${wraptotal}':items.length,
                                       '${wrapfee}':item.packAmount,
                                       '${pstotal}':items.length,
                                       '${psfee}':item.freightAmount
                                   });

                                   $("#adminfee").html(feehtml);
                                   $('#admin_total_fee').html('¥'+item.totalAmount);
                               }
                           }

                        });
                    }else{
                        alert("登录失败");
                    }
                },
                error:function(data){
                    console.log("ajax error");
                }

            });

        },

        /**
         * 配送端登录
         */
        operateLogin : function(Des){

            var username = $("input[name=user_name]").val();
            var password = $("input[name=user_passwd]").val();
            var param = {
                "userName":username,
                "password":password
            }
            $.ajax({

                url: config.url + '/v1/auth/operate/login',
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                data:JSON.stringify(param),
                success: function (data) {
                    console.log(data);

                    if(data.status == "true"){
                        location.href = 'index.html?param='+encodeURIComponent(JSON.stringify(data));
                    }else{
                        $.alert("登录失败");
                    }
                },
                error:function(data){
                    console.log("ajax error");
                }
                
            });
        },
        /**
         * 获取配送端取餐点信息
         */
        getDestinationP : function(obj,shopId){

            var token = $('input[name=pstoken]').val();
            $.ajax({
                url: config.url + '/v1/res/destPoint/'+shopId+'/byMerchant',
                type: 'GET',
                contentType: "application/json",
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", token);
                },
                success: function (data) {

                    $(data.result).each(function(index,item){

                        var des = {
                            'id':item.id,
                            'name':item.dPName
                        }

                        obj.des.push(des);

                    });

                    $("#pospicker").picker({
                        toolbarTemplate: '<header class="bar bar-nav">\
                                  <button class="button button-link pull-right close-picker">确定</button>\
                                  <h1 class="title">选择取餐点</h1>\
                              </header>',
                        cols: [
                            {
                                textAlign: 'center',
                                values: obj.getNameArr()
                            }
                        ]
                    });

                    /**
                     * 绑定改变事件
                     */
                    $("#pospicker").change(function(){
                        var id = obj.query($(this).val());
                        $("input[name=despointId]").val(id);
                    });

                },
                error: function (data) {
                    console.log('do ajax error');
                }
            });

        },
        /**
         * 渲染时间控件
         */
        renderTime : function(id){

            var token = $('input[name=pstoken]').val();
            $.ajax({
                url: config.url + '/v1/merchants/'+id,
                type: 'GET',
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization",token);
                },
                success: function (data) {
                    if(data.status == "true"){

                        var res = data.result.sellTime;

                        var date = res.split("-");

                        var hour = [];
                       // var time = [];
                        $(date).each(function(index,item){


                            // hour.push(item.substring(0,2));
                            // time.push(item.substring(2,4));
                            hour.push(item.substring(0,2)+":"+item.substring(2,4));
                        });

                        $("#timepicker").picker({
                            toolbarTemplate: '<header class="bar bar-nav">\
                                  <button class="button button-link pull-right close-picker">确定</button>\
                                  <h1 class="title">选择时间</h1>\
                              </header>',
                            cols: [
                                {
                                    textAlign: 'center',
                                    values: hour
                                }
                                // , {
                                //     textAlign: 'center',
                                //     values: [':']
                                // }, {
                                //     textAlign: 'center',
                                //     values: time
                                // }
                            ]
                        });
                    }else{

                    }
                },
                error:function(data){
                    console.log("ajax error");
                }

            });

        },
        /**
         *清柜
         */
        getClearCarbinet : function(){

            var token = $('input[name=pstoken]').val();
            var time = $("#timepicker").val();
            var date = time.split(":");

            var res = (date[0]).trim()+(date[1]).trim();
            var OID = $("input[name=puserid]").val();
            var MCID = $("input[name=pshop]").val();
            var DPID = $("input[name=despointId]").val();
            var param = {
                "OID":OID,
                "MCID":MCID,
                "DPID":DPID
                // "SellTime":res+"-"+res
            }

            $.ajax({
                url: config.url + '/v1/delivery/GetOverdueList',
                type: 'GET',
                contentType: "application/json",
                dataType: 'json',
                data: param,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", token);
                },
                success: function (data) {
                    
                    if(data.status == "true"){

                        /**
                         * 如果没有数据
                         */
                        if(data.result.length == 0){
                            var str = '没有柜子需要清理'
                            $.alert(str);
                        }else{
                            var paramboxId = [];
                            $(data.result).each(function(index,item){
                                if(item.orderStatus == 'Overdue'){
                                    paramboxId.push(item.boxID);
                                }
                            });

                            $.fn.network.getCarbinetHtml(paramboxId,'qinggui',param);


                        }
                    }
                },
                error: function () {
                    console.log("ajax error");
                }
            });
        },
        /**
         * 获取柜子的html信息
         * @param param
         */
        getCarbinetHtml : function(paramboxId,catory,param){

            var token = $('input[name=pstoken]').val();
            $.ajax({
                url: config.url + '/v1/res/box/dr/boxInfo',
                type: 'PATCH',
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify(paramboxId),
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", token);
                },
                success: function (data) {


                    if(data.status == "true"){

                        var html = ''
                        if(data.result.length <= 3){

                            html  += '<div id="ps_modal" class="list-block list-small">'
                                +'<ul style="background:#E8E8E8 !important;border:1px solid silver;padding: 5px 0 0 5px;">'
                                +'<div class="item-inner" style="text-align:left;">'
                                +'<div class="item-input">'
                                +'<div>'+$('#pospicker').val()+'</div>';
                            $(data.result).each(function(index,item){

                                html +='<li style="border-bottom: 1px solid silver;">'

                                    +'<div style="width: 100% !important;">'+item.clientName+'的'+item.cabinetName+'将打开</div>'
                                    +'<div style="width: 100% !important;">编号为: '+item.foriegnid+'的格子</div>'

                                    +'</li>';
                            });

                            html += '<div>请尽快处理</div>'
                                +'</div>'
                                +'</div>'
                                +'</ul>'
                                +'</div>';

                        }else{

                            html  += '<div id="ps_modal" class="list-block list-small" style="height: 200px;overflow: auto">'
                                +'<ul style="background:#E8E8E8 !important;border:1px solid silver;padding: 5px 0 0 5px;">'
                                +'<div class="item-inner" style="text-align:left;">'
                                +'<div class="item-input">'
                                +'<div>'+$('#pospicker').val()+'</div>';
                            $(data.result).each(function(index,item){

                                html +='<li style="border-bottom: 1px solid silver;">'

                                    +'<div style="width: 100% !important;">'+item.clientName+'的'+item.cabinetName+'将打开</div>'
                                    +'<div style="width: 100% !important;">编号为: '+item.foriegnid+'的格子</div>'

                                    +'</li>';
                            });

                            html += '<div>请尽快处理</div>'
                                +'</div>'
                                +'</div>'
                                +'</ul>'
                                +'</div>';

                        }

                        if(catory == 'qinggui'){
                            $.confirm(html,
                                function(){
                                    //正确清柜
                                    $.fn.network.openClearCarbinet(param.OID,param.MCID,param.DPID,param.SellTime);
                                }
                            );
                        }else if(catory == 'buhuo'){

                            $.confirm(html,
                                function(){
                                    //正确清柜
                                    $.fn.network.openReplenishment(param.OID,param.MCID,param.DPID,param.SellTime);
                                }
                            );
                        }
                    }
                },
                error: function () {
                    console.log("ajax error");
                }
            });

        },
        /**
         * 清柜
         */
        openClearCarbinet : function(OID,MCID,DPID,res){

            var token = $('input[name=pstoken]').val();
            var param = {
                "OID":OID,
                "MCID":MCID,
                "DPID":DPID,
                "SellTime":res
            }
            $.ajax({
                url: config.url + '/v1/delivery/OpenOverdueBoxList',
                type: 'GET',
                contentType: "application/json",
                dataType: 'json',
                data: param,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", token);
                },
                success: function (data) {

                    if(data.status == "true"){
                        $.alert("清柜成功");
                    }
                },
                error: function () {
                    console.log("ajax error");
                }
            });
        },
        /**
         * 补货
         */
        getReplenishment : function(){
            var token = $('input[name=pstoken]').val();
            var time = $("#timepicker").val();
            var date = time.split(":");
            var res = (date[0]).trim()+(date[1]).trim();
            var OID = $("input[name=puserid]").val();
            var MCID = $("input[name=pshop]").val();
            var DPID = $("input[name=despointId]").val();

            var param = {
                "OID":OID,
                "MCID":MCID,
                "DPID":DPID,
                "SellTime":res+"-"+res
            }

            $.ajax({
                url: config.url + '/v1/delivery/GetDiliverList',
                type: 'GET',
                contentType: "application/json",
                dataType: 'json',
                data: param,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", token);
                },
                success: function (data) {

                    if(data.status == "true"){
                        if(data.result.length == 0){
                            var str = '暂无需要补货的商品'
                            $.alert(str);
                        }else{
                            var paramboxId = [];
                            $(data.result).each(function(index,item){
                                if(item.orderStatus == 'Paid'){
                                    paramboxId.push(item.boxID);
                                }
                            });

                            $.fn.network.getCarbinetHtml(paramboxId,'buhuo',param);

                        }
                    }
                },
                error: function () {
                    console.log("ajax error");
                }
            });
        },
        openReplenishment : function(OID,MCID,DPID,res){
            var param = {
                "OID":OID,
                "MCID":MCID,
                "DPID":DPID,
                "SellTime":res+"-"+res
            }

            var token = $('input[name=pstoken]').val();
            $.ajax({
                url: config.url + '/v1/delivery/OpenDiliverBoxList',
                type: 'GET',
                contentType: "application/json",
                dataType: 'json',
                data: param,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", token);
                },
                success: function (data) {
                    console.log(data);
                    if(data.status == "true"){
                        $.alert("补货成功!");
                    }
                },
                error: function () {
                    console.log("ajax error");
                }
            });
        },
        renderBoxLoc:function(el,arrOrderId){
            // var arrOrderId = [];
            // arrOrderId.push(boxid);
            $.fn.network.getDestName(arrOrderId,el,config.token);
        },
        /**
         * 获取可用的优惠券
         * @param merchantId
         * @param satisfy
         */
        getUseCoupon:function(merchantId,satisfy){

            $.ajax({
                url: config.url + '/v1/discount/coupon/wx/check/'+satisfy+'/'+merchantId,
                type: 'GET',
                contentType: "application/json",
                dataType: 'json',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {
                    console.log(data);

                    if(data.status='true'){
                        var html = '';
                        if(data.result.length > 0){

                            $(data.result).each(function(index,item){

                                html += template.replace(template.coupon,{

                                    '${title}':item.couponName,
                                    '${url}':config.picurl+item.couponImg,
                                    '${desc}':item.describe,
                                    '${time}':item.expireDate,
                                    '${id}':item.id,
                                    '${discount}':item.discount,
                                    '${couponName}':item.couponName
                                });

                            });

                            $('#couponcard').html(html);
                            $('.coupon_button').each(function (index,item) {

                                $(item).unbind('click');
                                $(item).bind('click',function(){

                                    var order = JSON.parse(Storage.getItem('order'));
                                    order.couponId = $(this).attr('data-couponid');
                                    //console.log(order);
                                    Storage.setItem('order',JSON.stringify(order));
                                    var discount = $(this).attr('data-discount');
                                    $('#coupon_use').html('-¥'+discount);
                                    $('#totalPrice').text(Number($('#totalPrice').text())-Number(discount));
                                    $('.coupon_after').text($(this).attr('data-name'));
                                    $.router.back();

                                });
                            });

                        }else{
                            $('#couponcard').html('<div style="text-align:center;margin-top: 20px;color:silver;">暂无优惠券</div>');
                        }

                    }
                }
            });

        },
        getUserCouPonList : function(){

            $("#mycoupon_list_form").ajaxSubmit({
                url: config.url + '/v1/discount/coupon/wx',
                type: 'GET',       //请求类型 允许的值 post and get
                dataType: 'json',   //返回数据类型
                data: parseStrToJSON($('#coupon_form').formSerialize()),
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {

                    if(data.status == 'true'){
                        if(data.result.length != 0){
                            $('input[name=totalPage]').val(data.totalCount);

                            console.log(data);

                            var html = '';
                            $(data.result).each(function(index,item){

                                html += template.replace(template.mycoupon,{

                                    '${title}':item.couponName,
                                    '${url}':config.picurl+item.couponImg,
                                    '${desc}':item.describe,
                                    '${time}':item.expireDate,
                                    '${id}':item.id,
                                    '${discount}':item.discount,
                                    '${merchant}':item.merchantName,
                                    '${status}':$.fn.network.transCouponToWord(item.status)
                                });

                            });

                            $('#mycoupon_list').append(html);

                            if(data.result.length <= 3){
                                $.detachInfiniteScroll($('.infinite-scroll'));
                                $('.infinite-scroll-preloader').remove();
                            }

                        }else{
                            $('#mycoupon_list').html('<div style="text-align:center;margin-top: 20px;color:silver;">暂无优惠券</div>');
                            $.detachInfiniteScroll($('.infinite-scroll'));
                            $('.infinite-scroll-preloader').remove();
                        }

                    }

                }
            });

        },
        transCouponToWord:function(status){

            if(status == '0'){
                return '未使用';
            }else if(status == '1'){
                return '已使用';
            }else if(status == '2'){
                return '已核销';
            }else if(status == '3'){
                return '已过期';
            }else if(status == '4'){
                return '作废';
            }
        },
        /**
         * 同意用户协议
         */
        agree: function () {
            $.ajax({
                url: config.url + '/v1/auth/agreeMent',
                type: 'PATCH',
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify(result),
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", config.token);
                },
                success: function (data) {
                    console.log(data);

                    /**
                     * 模拟登陆用户
                     * @type {{}}
                     */
                }
            });
        }
    }
}($);

var network = $.fn.network;


