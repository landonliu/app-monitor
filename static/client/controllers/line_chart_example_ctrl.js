controllers.controller('line_chart_example', ["$scope", "chartService",
    function ($scope, chartService) {

        $scope.lineChartOpt = {
            y_title: '响应时间(s)',
            x_title: '测试时间点'
        };

        $scope.data = {};


        chartService.get_line_chart_data({}, {}, function (res) {
            $scope.data = res.data;
        });

    }]);
