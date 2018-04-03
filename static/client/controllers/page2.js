controllers.controller('page2', ["$scope", function ($scope) {

    $scope.all_servers = [];

    $scope.paging_servers = [];

    for (var i = 0; i < 50; i++) {

        $scope.all_servers.push(
            {name: 'server' + i, ip: '192.168.0.' + i}
        )

    }
}]);
