/**
 * Created by Landon on 2016/12/21.
 */

var Globals = {
    Helpers: {
        isNullOrUndefinedOrEmpty: function (obj) {
            return obj === '' || obj === undefined || obj === '';
        },
        isLetterOrNumOrUnderline: function (test_str, v_length) {
            var patternEng = /^[a-zA-Z0-9_]+$/;
            return patternEng.test(test_str) && test_str.length <= v_length;
        }
    }

}


String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}


var loading = {
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

var alert2 = {
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
                    <div style="margin-bottom: 15px;overflow: auto;max-height: 300px;">' + message + '</div>\
                  <div style="text-align: center"><button class="button_di_error" id="alert_confirm">关 闭</button></div>\
               </div></div>');
            $('body').prepend(dil);

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

            dil.find('#alert_confirm').click(function () {
                dil.remove();
            });

        }

    }
};

var is_loop_for_exp_imp = false;