/**
 * Created by Landon on 2017/2/23.
 */
controllers.controller('modify_user', ["$scope", "userService", "params", "$modalInstance",
    function ($scope, userService, params, $modalInstance) {

        $scope.new_user = params.user;

        $scope.save = function () {
            loading.open();

            userService.user_modify({}, $scope.new_user, function (res) {
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