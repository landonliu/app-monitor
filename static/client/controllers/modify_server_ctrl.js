/**
 * Created by Landon on 2017/2/23.
 */
controllers.controller('modify_server', ["$scope", "serverService", "params", "$modalInstance",
    function ($scope, serverService, params, $modalInstance) {

        $scope.new_server = params.server;

        $scope.save = function () {
            loading.open();

            serverService.server_modify({}, $scope.new_server, function (res) {
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