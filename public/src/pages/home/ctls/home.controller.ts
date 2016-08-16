/**
 * Created by NICK on 16/8/10.
 */

export class HomeController {
    public static $inject = ["$rootScope", "materialUtils"];

    toolbar: Object|Array<Object>;

    constructor(private $rootScope, private materialUtils) {
        $rootScope.user = "NICK";
        $rootScope.title = "DASHBOARD";

        this.toolbar = {
            type: 'layout',
            layout: 'row',
            flex: "none",
            attributes: {
                "layout-align": "space-around center"
            },
            tools: [{}]
        };
    }

    doOpenNav($event: MouseEvent, directive: string = "left") {
        this.materialUtils.buildToggler(directive).call(this, $event);
    }
}

