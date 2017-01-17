import { module } from '../../module';
import * as _ from 'lodash';
import * as pointer from 'json-pointer';
import "./treecontrol.provider";

const _name = "fxTreeControlBoost";

class TreeControlDialogController {
    static $inject = ["fxAction", "mdPanelRef"];

    isBusy: boolean = false;
    nodes: any;
    form: any;
    formData: any;
    selected: any;
    expandedNodes = [];
    setItem: Function;

    constructor(private fxAction, private mdPanelRef) {
        !this.nodes && this.query();
    }

    /**
     * 解析数据
     */
    changeDataToNodes(results) {
        let nodes: Array<any> = [];
        let viewModel = null;

        if (!_.isArray(this.form.key)) {
            return;
        }
        if (pointer.has(this.formData, `/${this.form.key.join('/')}`)) {
            viewModel = pointer.get(this.formData, `/${this.form.key.join('/')}`);
        }

        _.forEach(results, (result) => {
            if (result) {
                if (_.isArray(result)) {
                    nodes = nodes.concat(result);
                } else {
                    if (result[this.form.tcOptions.keyField] === viewModel) {
                        this.selected = result;
                    }
                    nodes.push(result);
                }
            }
        });

        let nodesGroupByDepth = _.groupBy(_.keyBy(nodes, "key"), "depth");
        let depth = 0, root = {};

        while (true) {
            let nodesIsDepth = nodesGroupByDepth[depth];
            let parentIsDepth = nodesGroupByDepth[depth - 1];

            if (nodesIsDepth && nodesIsDepth.length > 0) {
                this.selected && (this.expandedNodes = this.expandedNodes.concat(_.filter(nodesIsDepth, (data) => {
                    return data.lft < this.selected.lft && data.rgt > this.selected.rgt && data.rgt - data.lft > 1;
                }) || []));

                switch (depth) {
                    case 0:
                        root = nodesIsDepth[0];
                        break;
                    case 1:
                        root[this.form.tcOptions.nodeChildren] = nodesIsDepth;
                        break;
                    default:
                        _.forEach(parentIsDepth, (parentNode) => {
                            parentNode[this.form.tcOptions.nodeChildren] = _.filter(nodesIsDepth, (node) => {
                                return node.lft > parentNode.lft && parentNode.rgt > node.rgt;
                            });
                        });
                        break;
                }
            } else {
                break;
            }
            depth++;
        }

        return root || {};
    }

    getSelectNode() {

    }
    /**
     * 查询数据，如果存在actionKey，则获取actionKey中的interface数据
     * 查询接口，返回数据
     * @returns {any}
     */
    query() {
        let actionModel, clientData = {};
        let filter = {};

        if (this.form.tcOptions.actionKey && !this.isBusy) {
            // 设置搜索条件
            // pointer.set(filter, this.form.tcOptions.search, this.searchText || this.form.tcOptions.searchPrefix);
            // 设置全局条件
            _.forEach(this.form.tcOptions._where, (val, key) => {
                pointer.set(filter, key, val);
            });
            this.isBusy = true;
            return this.fxAction.getModel(this.form.tcOptions.actionKey).then((aModel) => {
                actionModel = aModel;
                return this.fxAction.doAction(actionModel.key, filter);
            }).then((results) => {
                return this.fxAction.doDealResult(actionModel, results, clientData);
            }).then((results) => {
                this.nodes = this.changeDataToNodes(results);
            }).finally(() => {
                this.isBusy = false;
            });
        }
    }
}

class Builder {
    $panel: ng.material.IPanelRef;
    text: String;
    item: any;

    constructor(private form, private formData, private $mdPanel: ng.material.IPanelService) {
        if (form.tcOptions.init) {

        }
    }

    setItem(item) {
        let curValue = {};

        this.text = "";
        this.item = item;
        if (this.form.tcOptions.textField) {
            if (pointer.has(item, `/${this.form.tcOptions.textField}`)) {
                this.text = pointer.get(item, `/${this.form.tcOptions.textField}`);
            }
        }
        if (this.form.tcOptions.keyField) {
            if (pointer.has(item, `/${this.form.tcOptions.keyField}`)) {
                curValue = pointer.get(item, `/${this.form.tcOptions.keyField}`);
                pointer.set(this.formData, `/${this.form.key.join('/')}`, curValue);
                !this.text && (this.text = curValue.toString());
                return curValue;
            } else {
                console.error(`treecontrol-1-没有在item中找到${this.form.tcOptions.keyField}`);
                return undefined;
            }
        }

        return item;
    }

    showTree($event, id) {
        let position = this.$mdPanel.newPanelPosition()
            // .absolute()
            // .absoTo($event.delegateTarget)
            .bottom("20px")
            .relativeTo(angular.element($event.delegateTarget).parent())
            .addPanelPosition(this.$mdPanel.xPosition.ALIGN_START, this.$mdPanel.yPosition.BELOW);
        let animation = this.$mdPanel.newPanelAnimation();

        animation.openFrom($event.delegateTarget);
        animation.closeTo($event.delegateTarget);
        animation.withAnimation(this.$mdPanel.animation.SCALE);
        let open = this.$mdPanel.open({
            animation: animation,
            attachTo: angular.element(document.body),// angular.element($event.currentTarget).parent(),
            controller: TreeControlDialogController,
            controllerAs: 'ctrl',
            // fullscreen: true,
            template: require("./tree.jade")(),
            position: position,
            trapFocus: true,
            locals: {
                form: this.form,
                formData: this.formData,
                setItem: this.setItem
            },
            zIndex: 150,
            panelClass: "tree-panel ",
            clickOutsideToClose: true,
            disableParentScroll: true,
            // clickEscapeToClose: true,
            hasBackdrop: true,
        }).then((p) => {
            this.$panel = p;
        });
    }
}

class Controller {
    static $inject = ["$scope", "fxAction", "$mdPanel"];

    constructor(private $scope, private fxAction, private $mdPanel) {
        let formWithIndex = $scope.copyWithIndex ? $scope.copyWithIndex($scope.$index) : null;
        let form;
        const compare = (item) => {
            if (!_.isArray(item['key'])) {
                return false;
            }
            return item['key'].join('') === $scope.form["key"].join('') ||
                _.filter(item['key'], (key) => {
                    return key && !_.isNumber(key);
                }).join('') === $scope.form["key"].join('');
        };
        formWithIndex && (form = _.first(_.filter([formWithIndex], compare)));
        // 获取copy，填充数组索引
        !form && formWithIndex && (form = _.first(_.filter(formWithIndex.items, compare)));
        form = form ? form : $scope.form;
        $scope.tcBoost = new Builder(form, $scope.model, $mdPanel);

        $scope.$watch(() => {
            return pointer.has($scope.model, `/${form.key.join('/')}`) ? pointer.get($scope.model, `/${form.key.join('/')}`) : null;
        }, (newVal, oldVal) => {
            if (newVal != oldVal && !newVal) {
                $scope.tcBoost.item = {};
            }
        });

        let setItem = $scope.tcBoost.setItem.bind($scope.tcBoost);
        $scope.tcBoost.setItem = (item) => {
            $scope.ngModel.$setViewValue(setItem(item));
            $scope.ngModel.$commitViewValue();
        }

        $scope.$on("$destroy", () => {
            $scope.tcBoost = null;
        });
    }
}

/**
 * 操作指令,某个表单操作
 * @returns {{restrict: string, template: any, scope: {}, replace: boolean, link: (($scope:IDirectiveScope))}}
 * @constructor
 */
module.directive(_name, () => {
    return {
        restrict: 'A',
        scope: false,
        priority: 9,
        require: "ngModel",
        controller: Controller
    };
});


module.config(["schemaFormDecoratorsProvider", "sfBuilderProvider", "treeControlBuilderProvider", (schemaFormDecoratorsProvider, sfBuilderProvider, treeControlBuilderProvider) => {
    // suggest--schema-form组件化
    schemaFormDecoratorsProvider.defineAddOn(
        'materialDecorator',
        'treecontrol',
        "./decorators/treecontrol.jade",
        [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion, treeControlBuilderProvider.builder]
    );
}]).run(["$templateCache", ($templateCache) => {
    $templateCache.put('./decorators/treecontrol.jade', require("./treecontrol.jade")());
}]);