/**
 * Created by NICK on 16/8/10.
 */

export class HomeController {
    public static $inject = ["$rootScope", "materialUtils", "toolbarUtils", "fxAction"];

    toolbars: Object | Array<Object>;

    constructor(private $rootScope: ng.IRootScopeService, private materialUtils: fx.utils.materialStatic, private toolbarUtils, private fxAction) {
        $rootScope["isOpenMenu"] = false;

        this.toolbars = [
            toolbarUtils.btnBuilder("打开菜单栏", "md-fab md-raised md-mini", false).iconBuilder("window-closed", {}).btnClick(($event) => {
                $rootScope["isOpenMenu"] = true;
            }).toValue(),
            toolbarUtils.btnBuilder("", "md-fab md-raised md-mini", false).tooltipBuilder("退出登录").iconBuilder("logout").btnClick(($event) => {
                this.doExit($event)
            }).toValue(),
        ];
    }

    /**
    * 退出登录
    * @param $event
    */
    doExit($event: MouseEvent) {
        this.fxAction.getModel('logout').then((model) => {
            const promise = this.fxAction.doActionModel($event, model);

            if (promise) {
                promise.then(() => {
                    console.log("logout");
                });
            }
        });
    }
}

