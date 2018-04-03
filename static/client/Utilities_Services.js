//js通用服务

//随机数
var randomIndex = Math.random();
var loadingStack = [];
angular.module('utilServices', []).factory('alert2', ["$modal", function ($modal) {
        return {
            open: function (message, type, confirmCallback) {

                if (type == 'confirm') {

                    if (!message) {
                        message = '确认要执行此操作吗？';
                    }

                    var dil = $('<div class="alert-backdrop"></div><div class="alert-container alert-warning" > \
                    <div style="margin-bottom: 10px;font-weight: bold;font-size: 15px;"><i class="fa fa-warning"></i> 警告</div>\
                    <div style="margin-bottom: 15px;">' + message + '</div>\
                  <div style="text-align: center"><button class="button_di" id="alert_confirm">确 认</button>&emsp;<button class="button_di_gray" id="alert_close">取 消</button></div>\
               </div></div>');
                    $('body').prepend(dil);
                    dil.draggable();

                    dil.find('#alert_confirm').click(function () {
                        confirmCallback();
                        dil.remove();
                    });

                    dil.find('#alert_close').click(function () {
                        dil.remove();
                    });
                } else if (type == 'error') {
                    var dil = $('<div class="alert-backdrop"><div class="alert-container alert-error" > \
                    <div style="margin-bottom: 10px;font-weight: bold;font-size: 15px;"><i class="fa fa-times-circle-o fa-lg"></i> 错误</div>\
                    <div style="margin-bottom: 15px;">' + message + '</div>\
                  <div style="text-align: center"><button class="button_di_error" id="alert_confirm">关 闭</button></div>\
               </div></div>');
                    $('body').prepend(dil);
                    dil.draggable();

                    dil.find('#alert_confirm').click(function () {
                        dil.remove();
                    });

                } else {
                    var dil = $('<div class="alert-backdrop"><div class="alert-container alert-info" > \
                    <div style="margin-bottom: 10px;font-weight: bold;font-size: 15px;"><i class="fa fa-info-circle" aria-hidden="true"></i> 提示</div>\
                    <div style="margin-bottom: 15px;">' + message + '</div>\
                  <div style="text-align: center"><button class="button_op" id="alert_confirm">关 闭</button></div>\
               </div></div>');
                    $('body').prepend(dil);
                    dil.draggable();

                    dil.find('#alert_confirm').click(function () {
                        dil.remove();
                    });

                }

            }
        };
    }])
    .factory('loading', ["$rootScope", function ($rootScope) {
        return {
            open: function (text, scope) {
                var loadingText = "请稍候";
                var loadingScope = 'body';
                var width = "";
                var height = "";
                if (arguments.length > 0 && text != null && text != '' && text != undefined) {
                    loadingText = text;
                }
                if (arguments.length > 1) {
                    loadingScope = scope;
                }
                if ($(loadingScope).children(".showFullLoading").length == 0) {
                    width = $(loadingScope).width();
                    height = $(loadingScope).height();

                    $(loadingScope).prepend('<div class="showFullLoading" style="color:gray;height: ' + height + 'px; width: ' + width + 'px; position: absolute; z-index: 10000; text-align: center; padding-top: 250px;font-size: 16px;opacity:0.5;filter:alpha(opacity=50)"> \
                ' + loadingText + '...<i class="fa fa-spinner fa-pulse"></i>\
               </div>');
                }
            },
            close: function (scope) {
                var loadingScope = 'body';
                if (arguments.length > 0) {
                    loadingScope = scope;
                }
                if ($(loadingScope).children(".showFullLoading").length > 0) {
                    $(loadingScope).children(".showFullLoading").remove();
                }
            }
        };
    }])
    .factory('loading2', ["$rootScope", function ($rootScope) {
        return {
            open: function (text, scope) {
                var loadingText = "请稍候";
                var loadingScope = 'body';
                var width = "";
                var height = "";
                if (arguments.length > 0 && text != null && text != '' && text != undefined) {
                    loadingText = text;
                }
                if (arguments.length > 1) {
                    loadingScope = scope;
                }
                if ($(loadingScope).children(".showFullLoading").length == 0) {
                    width = $(loadingScope).width();
                    height = $(loadingScope).height();

                    $(loadingScope).prepend('<div class="showFullLoading" style="background-color: white;color:gray;height: ' + height + 'px; width: ' + width + 'px; position: absolute; z-index: 10000; text-align: center; padding-top: 250px;font-size: 16px;"> \
                ' + loadingText + '...<i class="fa fa-spinner fa-pulse"></i>\
               </div>');
                }
            },
            close: function (scope) {
                var loadingScope = 'body';
                if (arguments.length > 0) {
                    loadingScope = scope;
                }
                if ($(loadingScope).children(".showFullLoading").length > 0) {
                    $(loadingScope).children(".showFullLoading").remove();
                }
            }
        };
    }])

    ///options说明
    ///service:用于查询数据的服务，需要实现Query(queryString)方法
    ///title:弹出窗口的标题
    ///selectedItems:已经选择的项，数组类型，里面的项需要有id和name属性
    ///callBackFunc:弹出窗关闭时调用的方法，接收参数为所选择的项的数组
    ///multiSelect:是否允许多选
    .factory('selectModal', ["$modal", function ($modal) {
        return {
            open: function (options) {
                var modalInstance = $modal.open({
                    templateUrl: static_url + 'client/views/SelectModal.html?index=' + randomIndex,
                    windowClass: 'AddOrgDialog',
                    controller: 'select',
                    backdrop: 'static',
                    resolve: {
                        service: function () {
                            return options.service
                        },
                        title: function () {
                            return options.title
                        },
                        selectedItems: function () {
                            return options.selectedItems
                        },
                        multiSelect: function () {
                            return options.multiSelect
                        }
                    }
                });
                modalInstance.result.then(function (items) {
                    options.callBackFunc(items);
                });
            }
        };
    }])


    ///options说明
    ///service:用于查询数据的服务，需要实现Query(queryString)方法
    ///title:弹出窗口的标题
    ///selectedItems:已经选择的项，数组类型，里面的项需要有id、name、type属性
    ///callBackFunc:弹出窗关闭时调用的方法，接收参数为所选择的项的数组
    ///multiSelect:是否允许多选
    .factory('selectModalWithType', ["$modal", function ($modal) {
        return {
            open: function (options) {
                var modalInstance = $modal.open({
                    templateUrl: static_url + 'client/views/SelectModalWithType.html?index=' + randomIndex,
                    windowClass: 'AddOrgDialog',
                    controller: 'SelectWithType',
                    backdrop: 'static',
                    resolve: {
                        service: function () {
                            return options.service
                        },
                        title: function () {
                            return options.title
                        },
                        selectedItems: function () {
                            return options.selectedItems
                        },
                        multiSelect: function () {
                            return options.multiSelect
                        }
                    }
                });
                modalInstance.result.then(function (items) {
                    options.callBackFunc(items);
                });
            }
        };
    }])

    .factory('selectModalWithType', ["$modal", function ($modal) {
        return {
            open: function (options) {
                var modalInstance = $modal.open({
                    templateUrl: static_url + 'client/views/SelectModalWithType.html?index=' + randomIndex,
                    windowClass: 'AddOrgDialog',
                    controller: 'SelectWithType',
                    backdrop: 'static',
                    resolve: {
                        service: function () {
                            return options.service
                        },
                        title: function () {
                            return options.title
                        },
                        selectedItems: function () {
                            return options.selectedItems
                        },
                        multiSelect: function () {
                            return options.multiSelect
                        }
                    }
                });
                modalInstance.result.then(function (items) {
                    options.callBackFunc(items);
                });
            }
        };
    }])
;//这是结束符，请勿删除。

