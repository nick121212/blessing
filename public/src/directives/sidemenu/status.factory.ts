import * as _ from 'lodash';

function Factory($rootScope, mdSideMenuSections): any {
    let onStateChangeStart = function (event, toState, toParams) {
        let options = mdSideMenuSections.options;

        function digest(sections, currentSection) {
            !mdSideMenuSections.selectedNode && sections &&

            _.forEach(sections, (section)=> {
                if (section[mdSideMenuSections.options.children] && section[mdSideMenuSections.options.children].length) {
                    return digest(section[mdSideMenuSections.options.children], section);
                }
                if (section.showed && toState.name == section.link && toParams.key == section.key) {
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

export default (module: ng.IModule)=> {
    module.factory('fxSideMenuFactory', ["$rootScope", "mdSideMenuSections", Factory]);
};