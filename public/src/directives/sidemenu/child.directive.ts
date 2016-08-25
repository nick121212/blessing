function Directive(): ng.IDirective {
    return {
        restrict: 'EA',
        require: '^fxSideMenu',
        link: function ($scope, $element, $attrs, $ctrl) {
            $ctrl['template']($scope, function (clone) {
                $element.html('').append(clone);
            });
        }
    };
}

export default (module: ng.IModule)=> {
    module.directive('fxSideMenuChild', Directive);
};