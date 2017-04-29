(function () {

    function MembershipJsController($scope, dataProvider) {
        var currentUser = document.getElementById("name").innerText;
        var groupings = "api/groupings/" + currentUser + "/myGroupings";
        $scope.membersList = [];
        $scope.optInList = [];
        $scope.loading = true;

        $scope.totalItems = 12;
        $scope.currentPage = 1;

        $scope.init = function () {
            //Loads Data
            dataProvider.loadData(function (d) {
                $scope.membersList = d.groupingsIn;
                $scope.optOutList = d.groupingsToOptOutOf;
                $scope.optInList = d.groupingsToOptInTo;
                if($scope.optInList.length === 0)
                {
                    $scope.optInList.push({'name': "NO GROUPINGS TO OPT IN TO"});
                }
                $scope.loading = false;
                console.log($scope.optOutList);
            }, groupings);
        };


        // Adds user to the exclude group.
        $scope.optOut = function (grouping) {
            console.log(grouping);
            var optOutURL = "optOut?username=" + currentUser + "&grouping=" + $scope.membersList[grouping].path;
            var cancelOptIn = "cancelOptIn?username=" + currentUser + "&grouping=" + $scope.membersList[grouping].path;
            console.log(optOutURL);

            dataProvider.loadData(function (d) {
                console.log(d);
                $scope.membersList = d;
                $scope.loading = true;
                $scope.init();
            }, optOutURL)
        };

        // Adds user to the include group
        $scope.optIn = function (grouping) {
            console.log(grouping);
            var optInURL = "optIn?username=" + currentUser + "&grouping=" + $scope.optInList[grouping].path;
            console.log(optInURL);

            dataProvider.loadData(function (d) {
                console.log(d);
                $scope.membersList = d;
                $scope.loading = true;
                $scope.init();
            }, optInURL)
        };

        //Disables opt in button if there are no groupings to opt into.
        $scope.disabledOptIn = function(index) {
            var optIn = $scope.optInList[index];
            return optIn.name === "NO GROUPINGS TO OPT IN TO";
        };
    }

    membershipApp.controller("MembershipJsController", MembershipJsController);

})();
