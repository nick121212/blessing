/**
 * Created by NICK on 16/8/10.
 */


export class HomeController {
    public static $inject = ["$rootScope", "materialUtils", "toolbarUtils", "fxAction"];

    toolbars: Object | Array<Object>;

    constructor(private $rootScope: ng.IRootScopeService, private materialUtils: fx.utils.materialStatic, private toolbarUtils, private fxAction) {
        $rootScope["isOpenMenu"] = false;

        this.toolbars = [
            toolbarUtils.labelBuilder("").attrBuilder({ flex: "" }).toValue(),
            toolbarUtils.noneBuilder("icon").className("md-margin").iconBuilder("people", {}, null, null, "24px").toValue(),
            toolbarUtils.labelBuilder("{{$root.user.username}}", "md-subhead").attrBuilder({}).toValue(),
            toolbarUtils.menuBarBuilder().className("md-no-padding").removeTooltip().items([
                toolbarUtils.menuBuilder("", "md-icon-button").attrBuilder({ "md-position-mode": "left bottom" }).iconBuilder("expand_more").menuOptionsBuilder().items([
                    // toolbarUtils.menuItemBuilder("系统设置", "", true).iconBuilder("settings").btnClick(($event) => {
                    // }).toValue(),
                    // toolbarUtils.noneBuilder("menuDivider").toValue(),
                    // toolbarUtils.menuItemBuilder("修改密码", "", true).iconBuilder("key-change").btnClick(($event) => {
                    //     this.doExit($event);
                    // }).toValue(),
                    toolbarUtils.menuItemBuilder("退出登录", "", true).iconBuilder("power-settings").btnClick(($event) => {
                        this.doExit($event);
                    }).toValue(),
                ]).toValue()
            ]).toValue()
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

