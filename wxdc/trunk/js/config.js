/**
 * Created by caiyu on 2016/6/24.
 * 全局默认配置
 * E-mail: caiyuhao2015@gmail.com
 * QQ: 404961386
 */

'use strict';

+ function ($) {
    $.fn.config = {
        /**
         * api接口地址
         */

        //测试环境ip
        url:'http://211.149.170.248/api',//接口路径
        picurl:'http://211.149.170.248',//图片路径

        //学校定制版本接口ip
        //url:'http://yunctdev.shnu.edu.cn/api',
        //picurl:'http://yunctdev.shnu.edu.cn',

        //微信token 测试用
        token: '9519bc95c65b6c3ec7c5d338028bfe68',
        //百度地图使用的ak
        ak:'z2l81F7aEGq6GiUGC5HSpd7T3KvMgu1t',
        issetsdk:false,

        //是否为定制版本
        iscustomization:false,//默认不定制
        
        //上海经纬度wgs-48
        lat:0,//纬度
        lng:0,//经度

        userId: '3783092492669419520',
        jssdk_signature:{},
        userIDWeChat: "3781295945505964032",
        isSubmitOrder:'false',
        jsonToStr:function(jsonObj){

            var str = '';
            for(var item in jsonObj){
                str += item+":"+jsonObj[item]+",";
            }
    
            return str.substring(0,str.length);
        },
        strToObj:function(str){

            var obj = {}
            var objs = str.split(",");
            for(var i=0;i<objs.length;i++){
                var oj = objs[i].split(":");
                obj[oj[0]] = oj[1];
            }
            return obj;
        }

    }
}($);

var config = $.fn.config;


