/**
 * Created by Landon on 2017/2/23.
 */
controllers.controller('general_example1', ["$scope", "$modal", "serverService",
    function ($scope, $modal, serverService) {

        $scope.all_servers = [];
        $scope.paging_servers = [];
        $scope.filter = '';


        $scope.search_server = function () {
            serverService.server_search({filter: $scope.filter}, {}, function (res) {
                if (res.result) {
                    $scope.all_servers = res.data;
                }
                else {
                    alert2.open(res.message, 'error');
                }
            })
        }

        $scope.modify_server = function (row) {
            var modalIns = $modal.open({
                templateUrl: static_url + "client/views/server_info.html",
                windowClass: 'dialog900',
                controller: 'modify_server',
                backdrop: 'static',
                resolve: {
                    params: function () {
                        return {server: row};
                    }
                }
            })

            modalIns.result.then(function () {
                // 窗口关闭回调函数
            });
        };

        $scope.create_server = function () {
            var modalIns = $modal.open({
                templateUrl: static_url + "client/views/server_info.html",
                windowClass: 'dialog900',
                controller: 'create_server',
                backdrop: 'static',
                resolve: {
                    params: function () {
                        return {server: {}};
                    }
                }
            })

            modalIns.result.then(function () {
                // 窗口关闭回调函数
                $scope.search_server();
            });
        };

        $scope.delete_server = function (row) {

            alert2.open('确认要删除服务器 {0} 吗？'.format(row.name), 'confirm', function () {

                serverService.server_delete({id: row.id}, {}, function (res) {
                    if (!res.result) {
                        alert2.open(res.message, 'error');
                    } else {
                        $scope.all_servers.splice($scope.all_servers.indexOf(row), 1);
                    }
                })

            })

        }

        // 初始化页面
        $scope.search_server();

    }]);