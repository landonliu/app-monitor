/**
 * Created by Jan on 2017/11/6.
 */
controllers.controller('create_user', ["$scope", "userService", "params", "$modalInstance",
    function ($scope, userService, params, $modalInstance) {

        $scope.new_user = {};
        $scope.save = function () {
            loading.open();
            userService.user_create({}, $scope.new_user, function (res) {
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