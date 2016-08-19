/**
 * Created by NICK on 16/8/10.
 */

export class PageController {

    private $rest;

    constructor(private $rootScope, private $timeout, private materialUtils, private restUtils) {
        this.$rest = restUtils.getRestAngular("modules");

        this.$rest.all("menu").getList().then((modules)=> {
            console.log(modules);
        });
    }
}

PageController.$inject = ["$rootScope", "$timeout", "materialUtils", "restUtils"];