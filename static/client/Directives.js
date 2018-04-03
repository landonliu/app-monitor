app.directive('ztree', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            //Tree 主要操作对象
            scope.treeObj = {};
            //选项
            var opts;
            var viewSetting;
            opts = angular.extend({
                onClick: function (event, treeId, treeNode) {
                },
                onAddClick: function (treeId, treeNode) {
                },
                onRemoveClick: function (treeId, treeNode) {
                },
                showRemoveBtn: false,
                showAddBtn: false,
                asyncUrl: '',
                check: {},
                autoParam: [],
                data: {
                    key: {
                        // name: "displayName"
                        name: "name"
                    }
                },
                onCheck: function (event, treeId, treeNode) {
                }
            }, scope.$eval(attrs.ztree));

            var addHoverDom = function (treeId, treeNode) {
                var aObj = $("#" + treeNode.tId + "_a");
                if ($("#diyBtn_" + treeNode.id).length > 0) return;
                var editStr = "<a class='treeAdd' style='width:18px;margin-left:3px;' id='diyBtn_" + treeNode.id
                    + "'onfocus='this.blur();'></a>";
                aObj.append(editStr);
                var btn = $("#diyBtn_" + treeNode.id);
                if (btn) btn.bind("click", function () {
                    opts.onAddClick(treeId, treeNode);
                });
            };

            var removeHoverDom = function (treeId, treeNode) {
                $("#diyBtn_" + treeNode.id).unbind().remove();
                $("#diyBtn_space_" + treeNode.id).unbind().remove();
            };
            if (opts.showAddBtn) {
                viewSetting = {
                    addHoverDom: addHoverDom,
                    removeHoverDom: removeHoverDom
                };
            }
            else {
                viewSetting = {
                    showIcon: false
                };
            }


            //Tree 设置
            var setting = {
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        scope.$apply(opts.onClick(event, treeId, treeNode));
                    },
                    beforeRemove: opts.onRemoveClick,
                    onCheck: opts.onCheck
                },
                async: {
                    enable: true,
                    type: "get",
                    url: opts.asyncUrl,
                    autoParam: opts.autoParam
                },
                edit: {
                    enable: true,
                    showRemoveBtn: opts.showRemoveBtn,
                    showRenameBtn: false,
                    removeTitle: "删除组织",
                    drag: {
                        isCopy: false,
                        isMove: false
                    }
                },
                data: opts.data,
                view: viewSetting,
                check: opts.check
            };
            scope.$watch(attrs.ngModel, function (v) {
                if (v) {
                    scope.treeObj = $.fn.zTree.init(element, setting, v);
                    var nodes = scope.treeObj.getNodes();
                    if (nodes.length > 0) {
                        scope.treeObj.expandNode(nodes[0], true, true, true);
                    }
                }
            });
        }
    };
});

app.directive('dragable', ["$modalStack", function ($modalStack) {
    return {
        restrict: 'EA',
        template: ' <div class=\"modal-header2\" style=\"cursor:move;\" ng-mouseup=\"releaseMe()\" ng-mousedown=\"dragMe()\">\
                        <div style=\"float: left;font-size:14px;\"><span>{{dialogTitle}}</span></div>\
                        <div style=\"float:right;overflow:hidden\">\
                            <div style=\"cursor: pointer;\" ng-click=\"closeDialog();\">\
                                <i class="fa fa-times fa-lg on-red" aria-hidden="true"></i>\
                            </div>\
                        </div>\
                    </div>',
        scope: {dialogTitle: '@'},
        replace: true,
        transclude: true,
        link: function (scope, elem, attr) {
            $(elem.parent()).css('borderRadius', '0px');
            scope.dragMe = function () {
                //scope.dialogTitle
                elem.parent().draggable();
            }
            scope.releaseMe = function () {
                elem.parent().draggable('destroy');
            }
            scope.closeDialog = function () {
                var modal = $modalStack.getTop();
                $modalStack.dismiss(modal.key, 'backdrop click');
            };

        }
    }
}]);

app.directive('cwAdaptbody', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs, ngModel) {

            var adaptHeight = function () {
                CWApp.InitSiteHeight();
                var v = scope.$eval(attrs.cwAdaptbody);
                var winHeight = 0;
                if (window.innerHeight)
                    winHeight = window.innerHeight;
                if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
                    winHeight = document.documentElement.clientHeight;
                }
                $(element).css("height", (winHeight - CWApp.HeaderHeight - CWApp.BodyTopBarHeight - CWApp.FooterHeight - v) + 'px');
                $(element).css("overflowY", 'auto');
            };
            adaptHeight();
            window.onresize = adaptHeight;
        }
    }
});

app.directive('cwUnderline', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        replace: true,
        link: function (scope, element, attrs, ngModel) {
            scope.$watch(attrs.cwUnderline, function (v) {
                if (v) {
                    $(element).css('textDecoration', 'underline');
                } else {
                    $(element).css('textDecoration', 'none');
                }
            });
        }
    }
});

app.directive('cwEmptyinput', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs, ngModel) {
            var input_id = attrs.cwEmptyinput;
            $(element).click(function () {
                $('#' + input_id).val('').trigger('input');
            })
        }
    }
});

app.directive('inputHint', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        replace: false,
        scope: true,
        compile: function () {
            return {
                pre: function ($scope, element, attrs, ngModel) {
                    $scope.hint = attrs.inputHint;
                    var IType = $(element)[0].type;
                    var inputValue = $scope.$parent.$eval(attrs.ngModel);
                    $(element).on('focus', function () {
                        if ($(element)[0].value == $scope.hint) {
                            if (IType == "password")
                                $(element)[0].type = IType;
                            $(element)[0].value = '';
                        }
                        $(element)[0].style.color = 'black';
                    });

                    $(element).on('blur', function () {
                        if ($(element)[0].value == '') {
                            if (IType == "password")
                                $(element)[0].type = "text";
                            $(element)[0].style.color = 'gray';
                            $(element)[0].value = $scope.hint;
                        }
                    });

                    $scope.$watch($(element)[0].value, function (a) {
                        if (a == undefined || a == null || a == "") {
                            if (inputValue == null || inputValue == "") {
                                if (IType == "password")
                                    $(element)[0].type = "text";
                                $(element)[0].value = $scope.hint;
                            }
                        }
                    })
                }
            }
        }
    }
});

app.directive('cwSlider', function () {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
            $(element).nivoSlider();
        }
    }
});

app.directive('cwBtndropdown', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs, ngModel) {
            var is_c = false;
            $(element).click(function () {
                var drop_down_body_obj = $(element).next();
                if (drop_down_body_obj) {
                    var dis_value = drop_down_body_obj.css('display');
                    if (dis_value == 'none') {
                        drop_down_body_obj.css('display', 'block');
                    } else {
                        drop_down_body_obj.css('display', 'none');
                    }
                }
            })

            $(element).mouseenter(function () {
                is_c = true;
            })

            $(element).mouseleave(function () {
                is_c = false;
            })

            $(window).click(function () {
                if (!is_c) {
                    var drop_down_body_obj = $(element).next();
                    if (drop_down_body_obj) {
                        drop_down_body_obj.css('display', 'none');
                    }
                }
            })
        }
    }
});

app.directive('cwTip', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs, ngModel) {
            var is_c = false;
            var value = attrs.cwTip;
            var html = '<div style="display: none;background-color: #FFE13A;position: absolute;z-index: 1000;border-radius: 3px;padding:10px 5px 5px 5px;">\
                            <span></span>\
                            <div style="font-size:30px;position: absolute;top: -22px;left: 15%;color: #FFE13A">&#9670</div>\
                        </div>';
            var j_html = $(html);

            $(element).click(function () {
                j_html.remove();
            });

            scope.$watch(attrs.cwTip, function (v) {
                if (v.is_valid) {
                    j_html.remove();
                } else {
                    var top = $(element).offset().top + $(element).outerHeight() + 6;
                    var left = $(element).offset().left + 5;
                    j_html.find('span').html(v.value);
                    $('body').append(j_html);
                    j_html.css({'left': left + 'px', 'top': top + 'px'});
                    j_html.css('display', 'block');
                    is_c = true;
                    isc2 = false;
                }
            });

            var isc2 = false;
            $(window).click(function () {
                if (isc2) {
                    j_html.remove();
                }
                if (is_c) {
                    isc2 = true;
                }
            })
        }
    }
});

app.directive('ngSelect2', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs, ngModel) {
            var opt = scope.$eval(attrs.ngSelect2);
            var data = opt.data;
            var value_f_name = opt.value;
            var name_f_name = opt.name;
            $.each(data, function (index, item) {
                $(element).append('<option value="{0}">{1}</option>'.format(item[value_f_name], item[name_f_name]))
            })
            $(element).select2();

            scope.$watch(attrs.ngModel, function (v) {
                $(element).select2("val", v)
            });

        }
    }
});

app.directive('ngDatepicker', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs, ngModel) {

            $(element).datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: "yy-mm-dd",
                dayNamesMin: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
            });

        }
    }
});

app.directive('cwShow', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs, ngModel) {
            scope.$watch(attrs.cwShow, function (v) {
                if (v) {
                    $(element).css('display', 'block');
                } else {
                    $(element).css('display', 'none');
                }
            });
        }
    }
});

app.directive('kendoUpload', function (alert2) {
    return {
        require: '?ngModel',
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs, ngModel) {
            var app_id = attrs.kendoUpload;
            var up_obj = $(element).find('input').kendoUpload({
                localization: {
                    select: "点击更改Logo",
                    remove: '删除',//删除按钮的tips
                    headerStatusUploading: '开始上传',
                    headerStatusUploaded: "Logo更改成功"
                },
                async: {
                    autoUpload: true,
                    saveUrl: site_url + "upload_app_logo?app_id=" + app_id, //文件上传对应的接口
                    removeUrl: '' //文件删除对应的接口
                },
                upload: function (e) {
                    var xhr = e.XMLHttpRequest;
                    if (!e.data) {
                        e.data = {};
                    }
                    var data = {'csrfmiddlewaretoken': csrf_token};
                    $.extend(true, e.data, data);
                },
                multiple: false,
                success: function (e) {
                    if (!e.response.result) {
                        alert(e.response.message);
                    }
                },
                select: function (e) {
                    if (e.files[0].size > 100 * 1024) {
                        alert2.open('文件大小不能超过100KB！', 'error')
                        up_obj.cancel();
                    }
                }
            });
        }
    }
});

app.directive('cwCancelModal', ["$modalStack", function ($modalStack) {
    return {
        restrict: 'EA',
        link: function (scope, elem, attr) {
            $(elem).click(function () {
                var modal = $modalStack.getTop();
                $modalStack.dismiss(modal.key, 'backdrop click');
            })

        }
    }
}]);

app.directive('cwLineChart', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs, ngModel) {

            var opts = angular.extend({
                title: '',
                pointClick: function (event) {
                }
            }, scope.$eval(attrs.cwLineChart));

            var j_element = $(element);

            scope.$watch(attrs.ngModel, function (v) {

                if (v) {

                    Highcharts.chart(j_element.attr('id'), {
                        chart: {
                            type: 'spline',
                            backgroundColor: 'rgba(0,0,0,0.1)'
                        },
                        credits: {
                            text: '',
                            href: ''
                        },
                        title: {
                            text: opts.title,
                            style: {
                                color: 'white',
                                fontWeight: 'bold'
                            }
                        },
                        subtitle: {
                            text: ''
                        },
                        xAxis: {
                            type: 'datetime',
                            labels: {
                                style: {
                                    color: 'white'
                                },
                                formatter: function () {
                                    return Highcharts.dateFormat('%m-%d %H:%M', this.value);
                                }
                            },
                            title: {
                                text: opts.x_title,
                                style: {
                                    color: 'white',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        yAxis: {
                            title: {
                                text: opts.y_title,
                                style: {
                                    color: 'white'
                                }
                            },
                            labels: {
                                style: {
                                    color: 'white'
                                }
                            },
                            min: 0
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.x:%m-%d %H:%M}： {point.y:.2f} s'
                        },
                        plotOptions: {
                            spline: {
                                marker: {
                                    enabled: true
                                }
                            },
                            series: {
                                lineWidth: 3,
                                cursor: 'pointer',
                                events: {
                                    click: function (event) {
                                        if (opts.pointClick)
                                            opts.pointClick(event);
                                    }
                                }
                            }
                        },
                        series: v.record_data
                    });

                }

            });

        }
    }
});


app.directive('cwEchart', function () {
    return {
        require: '?ngModel',
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attrs, ngModel) {
            //var myChart = echarts.init(document.getElementById('test01'));
            var myChart = echarts.init($(element)[0]);
            var opts = scope.$eval(attrs.cwEchart);
            scope.$watch(ngModel, function (v) {
                myChart.setOption({
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        }
                    ]
                })

            })
        }
    }
});

app.directive('ztree', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            //Tree 主要操作对象
            scope.treeObj = {};
            //选项
            var opts;
            var viewSetting;
            opts = angular.extend({
                onClick: function (event, treeId, treeNode) {
                },
                onAddClick: function (treeId, treeNode) {
                },
                onRemoveClick: function (treeId, treeNode) {
                },
                onInit:function (treeNode) {

                },
                showRemoveBtn: false,
                showAddBtn: false,
                asyncUrl: '',
                check: {},
                autoParam: [],
                data: {
                    key: {
                        // name: "displayName"
                        name: "name"
                    }
                },
                onCheck: function (event, treeId, treeNode) {
                }
            }, scope.$eval(attrs.ztree));

            var addHoverDom = function (treeId, treeNode) {
                var aObj = $("#" + treeNode.tId + "_a");
                if ($("#diyBtn_" + treeNode.id).length > 0) return;
                var editStr = "<a class='treeAdd' style='width:18px;margin-left:3px;' id='diyBtn_" + treeNode.id
                    + "'onfocus='this.blur();'></a>";
                aObj.append(editStr);
                var btn = $("#diyBtn_" + treeNode.id);
                if (btn) btn.bind("click", function () {
                    opts.onAddClick(treeId, treeNode);
                });
            };

            var removeHoverDom = function (treeId, treeNode) {
                $("#diyBtn_" + treeNode.id).unbind().remove();
                $("#diyBtn_space_" + treeNode.id).unbind().remove();
            };
            if (opts.showAddBtn) {
                viewSetting = {
                    addHoverDom: addHoverDom,
                    removeHoverDom: removeHoverDom
                };
            }
            else {
                viewSetting = {
                    showIcon: true
                };
            }


            //Tree 设置
            var setting = {
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        scope.$apply(opts.onClick(event, treeId, treeNode));
                    },
                    beforeRemove: opts.onRemoveClick,
                    onCheck: opts.onCheck
                },
                async: {
                    enable: true,
                    type: "get",
                    url: opts.asyncUrl,
                    autoParam: opts.autoParam
                },
                edit: {
                    enable: true,
                    showRemoveBtn: opts.showRemoveBtn,
                    showRenameBtn: false,
                    removeTitle: "删除组织",
                    drag: {
                        isCopy: false,
                        isMove: false
                    }
                },
                data: opts.data,
                view: viewSetting,
                check: opts.check
            };

            scope.treeObj = $.fn.zTree.init(element, setting, []);
            scope.treeObj.expandNode(null, true, true, true);
            opts.onInit(scope.treeObj);
            // scope.treeObj = $.fn.zTree.init(element, setting, [{uid: 0, name: 'Policy', type: 'root'}]);
            // var nodes = scope.treeObj.getNodes();
            // if (nodes.length > 0) {
            //     scope.treeObj.expandNode(nodes[0], true, true, true);
            // }
        }
    };
});

