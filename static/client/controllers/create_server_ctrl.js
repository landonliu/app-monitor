/**
 * Created by Landon on 2017/2/23.
 */
controllers.controller('create_server', ["$scope", "serverService", "params", "$modalInstance",
    function ($scope, serverService, params, $modalInstance) {

        $scope.new_server = {};
        $scope.save = function () {
            loading.open();
            serverService.server_create({}, $scope.new_server, function (res) {
                loading.close();
                if (res.result) {
                    $modalInstance.close();
                }
                else {
                    alert2.open(res.message, 'error');
                }
            })
        }
    }]);