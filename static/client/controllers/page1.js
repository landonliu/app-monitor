controllers.controller('page1', ["$scope", function ($scope) {

    $scope.word = 'hello';

    $scope.show_msg = function () {
        $scope.word = 'hello 小明!';
    }

}]);
