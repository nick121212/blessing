/**
 * Created by NICK on 16/8/26.
 */

class CompileDirective {
    /**
     * 指令的名称
     */
    public static _name: string = "dyCompile";
    /**
     * 定义指令
     */
    public static directive: Array<string | Function> = [
        "$compile",
        ($compile) => {
            let directive: angular.IDirective = {
                replace: false,
                restrict: "A",
                scope: {
                    item: "=",
                    $index: "@",
                    parent: "="
                },
                link: ($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes) => {
                    let dummyScope = {
                            $destroy: angular.noop
                        },
                        childScope: angular.IScope,
                        content: string,
                        destoryChildScope = () => {
                            (childScope || dummyScope).$destroy();
                        };
                    $attrs.$observe("html", (html: string) => {
                        if (html) {
                            destoryChildScope();
                            childScope = $scope.$new(false);
                            childScope["item"] = $scope["item"];
                            childScope["$index"] = $scope["$index"];
                            childScope["parent"] = $scope["parent"];
                            if (html.search("<") === 0) {
                                content = $compile(html)(childScope);
                                $element.replaceWith(content);
                            } else {
                                content = childScope.$eval(html);
                                $element.text(content);
                            }
                        }
                    });
                }
            };

            return directive;
        }
    ];
}

/**
 * 初始化函数
 */
export default (module: ng.IModule) => {
    module.directive(CompileDirective._name, CompileDirective.directive);
}
