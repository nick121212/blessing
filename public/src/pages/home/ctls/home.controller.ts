/**
 * Created by NICK on 16/8/10.
 */

export class HomeController {
    public static $inject = ["$rootScope", "materialUtils", "toolbarUtils"];

    toolbar: Object|Array<Object>;
    title: string = "DASHBOARD";

    constructor(private $rootScope: ng.IRootScopeService, private materialUtils: fx.utils.materialStatic, private toolbarUtils) {
        $rootScope["user"] = "NICK";

        this.toolbar = [
            toolbarUtils.btnBuilder("logo", "md-icon-button", false).iconBuilder("biohazard").btnClick(($event)=> {
                this.doOpenNav($event);
            }).toValue(),
            toolbarUtils.labelBuilder(this.title).attrBuilder({flex: ""}).toValue(),
            toolbarUtils.btnBuilder($rootScope["user"], null, true).iconBuilder("more_vert").btnClick(($event)=> {
                this.doOpenNav($event, 'right');
            }).toValue(),
        ];
    }

    doOpenNav($event: MouseEvent, directive: string = "left") {
        this.materialUtils.buildToggler(directive).call(this, $event);
    }
}

