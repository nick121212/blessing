/**
 * Created by NICK on 16/8/10.
 */

export class HomeController {
    public static $inject = ["$rootScope", "materialUtils"];

    toolbar: Object|Array<Object>;

    constructor(private $rootScope, private materialUtils) {
        $rootScope.user = "NICK";
        $rootScope.title = "DASHBOARD";

        this.toolbar = [{
            type: 'btn',
            icon: 'dashboard',
            title: "菜单",
            class: "md-icon-button",
            noTitle: true,
            click: ($event)=> {
                this.doOpenNav($event, 'left');
            }
        }, {
            type: "label",
            title: "{{$root.title}}"
        }, {
            type: "placeholder"
        }, {
            type: 'btn',
            title: "{{$root.user}}",
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

