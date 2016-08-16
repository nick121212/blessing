/**
 * Created by NICK on 16/8/16.
 */

import * as _ from 'lodash';
import section from './section.provider';
import content from './content.directive';
import child from './child.directive';

import "./styles/sidemenu.scss";

const _name = "fxSideMenu", _module = `${_name}Module`;

interface IDirectiveScope extends ng.IScope {
    node: Object;
    $sideMenuTransclude: Object;
}

class Controller {
    template: any;
    selectedNodes: Object = {};

    constructor(private $scope, private $compile, private $interpolate, private mdSideMenuSections) {
        this.template = $compile($interpolate(require("./tpls/sidemenu.jade")())({
            opts: mdSideMenuSections.options
        }));
    }

    showChildren(node) {
        let opts = this.mdSideMenuSections.options;

        if (this.selectedNodes.hasOwnProperty(node[opts.key])) {
            delete this.selectedNodes[node[opts.key]];
        } else {
            if (node[opts.children] && node[opts.children].length) {
                this.selectedNodes[node[opts.key]] = node;
            }
        }
    }

    isShowChildren(node) {
        let opts = this.mdSideMenuSections.options;

        return this.selectedNodes[node[opts.key]];
    }

    isLeaf(node) {
        let opts = this.mdSideMenuSections.options;

        return node.rgt - node.lft == 1 || !node[opts.children] || node[opts.children].length == 0;
    }

    isSelected(node) {
        let opts = this.mdSideMenuSections.options;

        return !!this.mdSideMenuSections.selectedNode && this.mdSideMenuSections.selectedNode[opts.key] == node[opts.key];
    }

}

Controller.$inject = ["$scope", "$compile", "$interpolate", "mdSideMenuSections"];

function Directive(mdSideMenuSections): ng.IDirective {
    return {
        restrict: 'EA',
        replace: false,
        require: _name,
        transclude: true,
        controllerAs: "sideCtl",
        scope: {
            modules: '=',
            selectedNodes: '=',
            orderBy: "@",
            reverseOrder: "@"
        },
        controller: Controller,
        compile: ($ele: ng.IAugmentedJQuery, $attr: ng.IAttributes, childTranscludeFn)=> {
            return ($scope: IDirectiveScope, $element, attrs, $ctrl)=> {
                $scope.$watch("modules", function updateNodeOnRootScope(newValue) {
                    let opts = mdSideMenuSections.options;

                    if (_.isArray(newValue)) {
                        if (angular.isDefined($scope.node) && angular.equals($scope.node[opts.children], newValue)) {
                            return;
                        }
                        $scope.node = {};
                        $scope.node[opts.children] = newValue;
                    }
                    else {
                        if (angular.equals($scope.node, newValue)) {
                            return;
                        }
                        $scope.node = newValue;
                    }
                });

                $ctrl.template($scope, function (clone) {
                    $element.html('').append(clone);
                });
                $scope.$sideMenuTransclude = childTranscludeFn;
            };
        }
    };
}

Directive.$inject = ["mdSideMenuSections"];

const module = angular.module(_module, []).directive(_name, Directive);

section(module);
content(module);
child(module);

export default _module;