/**
 * Created by NICK on 16/8/10.
 */

export class PageController {

    private $rest;

    key: string;

    constructor(private $rootScope, private $timeout, private $stateParams: ng.ui.IStateParamsService, private materialUtils, private restUtils) {
        // this.$rest = restUtils.getRestAngular("modules");
        //
        // this.$rest.all("menu").getList().then((modules)=> {
        //     console.log(modules);
        // });

        // console.log($stateParams);

        this.key = $stateParams["key"];
    }
}

PageController.$inject = ["$rootScope", "$timeout", "$stateParams", "materialUtils", "restUtils"];