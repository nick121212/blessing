/**
 * Created by NICK on 16/8/10.
 */

export class HomeController {
    public static $inject = ["$rootScope", "$timeout", "materialUtils"];

    toolbar: Object|Array<Object>;

    title: string = "DASHBOARD";

    constructor(private $rootScope, private $timeout, private materialUtils) {
        $rootScope.user = "NICK";

        this.toolbar = [{
            type: 'btn',
            icon: 'biohazard',
            title: "菜单",
            noTitle: true,
            class: "md-icon-button",
            click: ($event)=> {
                this.doOpenNav($event, 'left');
            }
        }, {
            type: "label",
            noBind: true,
            attributes: {
                flex: "100"
            },
            title: this.title
        }, {
            type: 'btn',
            title: '{{$root.user}}',
            icon: 'more_vert',
            click: ($event)=> {
                this.doOpenNav($event, 'right');
            }
        }];
    }

    doOpenNav($event: MouseEvent, directive: string = "left") {
        this.materialUtils.buildToggler(directive).call(this, $event);
    }
}

