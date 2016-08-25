function Factory($rootScope, mdSideMenuSections): any {
    let onStateChangeStart = function (event, toState, toParams) {
        function digest(sections, currentSection) {
            !mdSideMenuSections.selectedNode && sections.forEach(function (section) {
                if (section[mdSideMenuSections.options.children] && section[mdSideMenuSections.options.children].length) {
                    return digest(section[mdSideMenuSections.options.children], section);
                }
                if (section.isShow && section.menuLink.search(location.hash) >= 0) {
                    mdSideMenuSections.selectedNode = section;
                    return false;
                }
            });

            return false;
        }

        mdSideMenuSections.selectedNode = null;
        setTimeout(function () {
            digest(mdSideMenuSections.sections, null);
        }, 10);
    };
    $rootScope.$on('$stateChangeSuccess', onStateChangeStart);

    return {
        onStateChangeStart: onStateChangeStart
    };
}

Factory.$inject = ["$rootScope", "mdSideMenuSections"];

export default (module: ng.IModule)=> {
    module.factory('fxSideMenuFactory', Factory);
};