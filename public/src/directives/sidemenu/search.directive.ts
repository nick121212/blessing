interface IDirectiveScope extends ng.IScope {
    searchText: string;
    title: string;
}

function Directive(mdSideMenuSections): ng.IDirective {
    return {
        restrict: 'EA',
        template: require("./tpls/search.jade"),
        controllerAs: "searchCtl",
        link: function ($scope: IDirectiveScope) {
            $scope.searchText = "";
            $scope.title = "搜索菜单";
            $scope.$watch("searchText", (newVal, oldVal)=> {
                // console.log(oldVal, newVal);
                mdSideMenuSections.options.filterExpression = newVal;
            });
        }
    };
}

Directive.$inject = ["mdSideMenuSections"];

export default (module: ng.IModule)=> {
    module.directive('fxSideMenuSearch', Directive);
};