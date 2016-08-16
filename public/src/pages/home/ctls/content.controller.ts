/**
 * Created by NICK on 16/8/10.
 */

export class ContentController {
    public static $inject = ["$rootScope", "$timeout", "materialUtils"];

    icon: string = "dashboard";

    constructor(private $rootScope, private $timeout, private materialUtils) {
        $timeout(()=> {
            this.icon = "apps";
        }, 1000);
    }
}

