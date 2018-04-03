/**
 * Created by Landon on 2017/3/25.
 */
controllers.controller('page3', ["$scope", "$modal",
    function ($scope, $modal) {

        $('#example1').cron({
            initial: "42 3 * * 5",
            onChange: function () {
                //alert($(this).cron("value"));
            }, customValues: {
                "5 Minutes": "*/5 * * * *",
                "2 Hours on Weekends": "0 */2 * * 5,6"
            },
            useGentleSelect: false // default: false
        });


    }]);