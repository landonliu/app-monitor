services = angular.module('webApiService', ['ngResource', 'utilServices']);

var POST = "POST";
var GET = "GET";

services.factory('chartService', ['$resource', function ($resource) {
    return $resource(site_url + ':actionName/', {},
        {
            get_line_chart_data: {method: GET, params: {actionName: 'get_line_chart_data'}, isArray: false}
        });
}]).factory('page3Service', ['$resource', function ($resource) {
    return $resource(site_url + ':actionName/', {},
        {
            page3: {method: GET, params: {actionName: 'page3'}, isArray: false}
        });
}]).factory('userService', ['$resource', function ($resource) {
    return $resource(site_url + ':actionName/', {},
        {
            user_search: {method: GET, params: {actionName: 'user_search'}, isArray: false},
            user_delete: {method: POST, params: {actionName: 'user_delete'}, isArray: false},
            user_create: {method: POST, params: {actionName: 'user_create'}, isArray: false},
            user_modify: {method: POST, params: {actionName: 'user_modify'}, isArray: false}
        });
}])
;//这是结束符，请勿删除