/**
 * Created by Landon on 2017/5/2.
 */
controllers.controller("tree_example", ["$scope", function ($scope) {

        $scope.zTreeOptions = {
            onClick: function (event, treeId, treeNode) {
                alert('click!');
            },
            asyncUrl: site_url + 'get_tree_data',
            autoParam: ["id", "node_type"],
            showRemoveBtn: false,
            onRemoveClick: function (treeId, treeNode) {
                //防止自动删除节点
                return false;
            }
        };

}]);