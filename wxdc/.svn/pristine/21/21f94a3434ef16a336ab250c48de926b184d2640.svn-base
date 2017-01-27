/**
 * Created by Paytham on 2016/6/20.
 * E-mail: caiyuhao2015@gmail.com
 * QQ: 404961386
 */

function showRealTime() {
    var now=new Date();
    var year=now.getFullYear();
    var month=now.getMonth();
    var day=now.getDate();
    var hours=now.getHours() < 10 ? "0"+now.getHours() : now.getHours();
    var minutes=now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes();
    var seconds=now.getSeconds() < 10 ? "0"+now.getSeconds() : now.getSeconds();
    $('.bar-time > span').html(""+year+"年"+month+"月"+day+"日 "+hours+":"+minutes+"");
    //一秒刷新一次显示时间
    var timeID=setTimeout(showRealTime, 60 * 1000);
}

$(function () {
    'use strict';

    $(document).on('click','.next', function () {
        var $span = $(this).prev('span'),
            num = Number($span.text());
        $span.text(num+1);
    });

    $(document).on('click','.prev', function () {
        var $span = $(this).next('span'),
            num = Number($span.text());
        $span.text(num-1);
    });

    /* 用户协议 */
    $(document).on('pageInit', '#agreement', function (e, id, page) {
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

    /* 首页 */
    $(document).on('pageInit','#index',function (e, id, page) {
        // 动态刷新时间
        showRealTime();
        //获取符合条件的商家列表
    });

    /* 主页 */
    $(document).on('pageInit','#main',function (e, id, page) {
        // 动态刷新时间
        showRealTime();
        //获取符合条件的商家列表
    });

    $(document).on('pageInit','#store',function (e, id, page) {
        // var menuScroll = new IScroll('.box-menu', { mouseWheel: true, click: true });
        // var itemScroll = new IScroll('.box-content', {mouseWheel: true, click: true });
        //
        // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    });

    $(document).on('pageInit','#remark',function (e) {
        $("#datetime-picker").datetimePicker({
            toolbarTemplate: '<header class="bar bar-nav">' +
                                '<a class="button button-link pull-right close-picker">确定</a>' +
                                '<h1 class="title">选择日期和时间</h1>' +
                             '</header>'
        });
    });

    $(document).on('pageInit','#order',function (e, id, page) {
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
                    text: '已订',
                    onClick: function () {
                        $.alert('你选择了已订');
                    }
                }, {
                    text: '可取',
                    onClick: function () {
                        $.alert('你选择了可取');
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
    });

    $(document).on('pageInit', '#evaluate', function (e, id, page) {
        $('.rating').barrating({
            theme: 'fontawesome-stars',
            showSelectedRating: false,
            onSelect: function (value, text) {
                console.log('value:'+value);
                console.log('text:'+text);
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
    });

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
    });

    $(document).on('pageInit', '#admin', function (e, id, page) {
        $(document).on('click', '.item-link', function () {
            $('.open-popover').text('时间段：'+$(this).html());
            $.closeModal();
            //触发事件
        });
    });

    $(document).on('pageInit', '#delivery', function (e, id, page) {
        $(page).on('click', '#btnLeft', function () {
            $.alert('A02<br>B08<br>C09', '已开清柜格门');
        });

        $(page).on('click', '#btnRight', function () {
            $.alert('A01<br>B09<br>C05', '已开补货格门');
        });

        $("#picker").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
                                  <button class="button button-link pull-right close-picker">\
                                      确定\
                                  </button>\
                                  <h1 class="title">选择餐厅</h1>\
                              </header>',
            cols: [
                {
                    textAlign: 'center',
                    values: ['香樟园餐厅','西部餐厅','教师餐厅']
                }
            ]
        });

        $("#timepicker").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
                                  <button class="button button-link pull-right close-picker">确定</button>\
                                  <h1 class="title">选择时间</h1>\
                              </header>',
            cols: [
                {
                    textAlign: 'center',
                    values: [
                        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
                        '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
                    ]
                }, {
                    textAlign: 'center',
                    values: [':']
                }, {
                    textAlign: 'center',
                    values: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
                }
            ]
        });

        $("#pospicker").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
                                  <button class="button button-link pull-right close-picker">确定</button>\
                                  <h1 class="title">选择取餐点</h1>\
                              </header>',
            cols: [
                {
                    textAlign: 'center',
                    values: [
                        '宿舍楼A','宿舍楼B','宿舍楼C','宿舍楼D'
                    ]
                }
            ]
        });
    });

    $.init();

});

