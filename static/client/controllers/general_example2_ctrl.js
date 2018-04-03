/**
 * Created by Jan on 2017/11/6.
 */
controllers.controller('general_example2', ["$scope", "$modal", "userService",
    function ($scope, $modal, userService) {

        $scope.all_users = [];
        $scope.paging_users = [];
        $scope.filter = '';


        $scope.search_user = function () {
            userService.user_search({filter: $scope.filter}, {}, function (res) {
                if (res.result) {
                    $scope.all_users = res.data;
                }
                else {
                    alert2.open(res.message, 'error');
                }
            })
        }

        $scope.modify_user = function (row) {
            var modalIns = $modal.open({
                templateUrl: static_url + "client/views/user_info.html",
                windowClass: 'dialog900',
                controller: 'modify_user',
                backdrop: 'static',
                resolve: {
                    params: function () {
                        return {user: row};
                    }
                }
            })

            modalIns.result.then(function () {
                // 窗口关闭回调函数
            });
        };

        $scope.create_user = function () {
            var modalIns = $modal.open({
                templateUrl: static_url + "client/views/user_info.html",
                windowClass: 'dialog900',
                controller: 'create_user',
                backdrop: 'static',
                resolve: {
                    params: function () {
                        return {user: {}};
                    }
                }
            })

            modalIns.result.then(function () {
                // 窗口关闭回调函数
                $scope.search_user();
            });
        };

        $scope.delete_user = function (row) {

            alert2.open('确认要删除服务器 {0} 吗？'.format(row.name), 'confirm', function () {

                userService.user_delete({id: row.id}, {}, function (res) {
                    if (!res.result) {
                        alert2.open(res.message, 'error');
                    } else {
                        $scope.all_users.splice($scope.all_users.indexOf(row), 1);
                    }
                })

            })

        }

        // 初始化页面
        $scope.search_user();

    }]);