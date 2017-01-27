/**
 * Created by caiyu on 2016/6/27.
 * email: caiyuhao2015@gmail.com
 * qq: 404961386
 * ajax请求文件
 */

+function ($) {

    var result;

    $.fn.network = {
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
                }
            });
        }
    }
}($);

var network = $.fn.network;


