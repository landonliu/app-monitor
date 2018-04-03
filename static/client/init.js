var app = angular.module("myApp", ['myController', 'utilServices', 'ui.bootstrap', 'ui.router', 'webApiService', 'smart-table'])
    .run(['$rootScope', function ($rootScope) {
        String.prototype.format = function () {
            var s = this,
                i = arguments.length;
            while (i--) {
                s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
            }
            return s;
        };
    }]);
var controllers = angular.module("myController", []);


app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider",
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['X-CSRFToken'] = $("#csrf").val();

        // 路由配置开始，新路由规则请在此处添加
        $urlRouterProvider.otherwise("/home");//默认展示页面
        $stateProvider.state('home', {
            url: "/home",
            controller: "home",
            templateUrl: static_url + "client/views/home.html"
        }).state('general_example1', {
            url: "/general_example1",
            controller: "general_example1",
            templateUrl: static_url + "client/views/general_example1.html"
        }).state('general_example2', {
            url: "/general_example2",
            controller: "general_example2",
            templateUrl: static_url + "client/views/general_example2.html"
        }).state('line_chart_example', {
            url: "/line_chart_example",
            controller: "line_chart_example",
            templateUrl: static_url + "client/views/line_chart_example.html"
        }).state('page1', {
            url: "/page1",
            controller: "page1",
            templateUrl: static_url + "client/views/page1.html"
        }).state('page2', {
            url: "/page2",
            controller: "page2",
            templateUrl: static_url + "client/views/page2.html"
        }).state('page3', {
            url: "/page3",
            controller: "page3",
            templateUrl: static_url + "client/views/page3.html"
        }).state('tree_example', {
            url: "/tree_example",
            controller: "tree_example",
            templateUrl: static_url + "client/views/tree_example.html"
        })
        // 路由配置结束

        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    }]).factory('authHttpResponseInterceptor', ['$q', function ($q) {
    return {
        responseError: function (rejection) {
            loading.close();
            if (rejection.status === 500) {
                alert('服务器未知异常, 请截图并联系管理员！');
            }
            if (rejection.status === 403) {
                alert('权限不足, 请联系管理员！');
            }
            return $q.reject(rejection);
        }
    }
}])
;
