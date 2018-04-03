/**
 * Created by Landon on 2017/3/25.
 */
controllers.controller('page3_modal', ["$scope","$modalInstance",
    function ($scope, $modalInstance) {

        $scope.test = function () {
            $modalInstance.dismiss('cancel');
        }

}]);