/**
 * Created by NICK on 16/8/9.
 */

const template = require("./loading.directive.jade")();
require('./loading.directive.scss');


interface ILoadingDirectiveScope extends ng.IScope {

}

function LoadingDirective($timeout:ng.ITimeoutService):ng.IDirective {
    return {
        template: template,
        scope: {},
        replace: true,
        link: ($scope:ILoadingDirectiveScope)=> {
            console.log($scope);
        }
    }
}

LoadingDirective.$inject = ["$timeout"];

export default function register(module:ng.IModule):void {
    module.directive('fxLoading', LoadingDirective);
}

