/**
 * Created by NICK on 16/8/10.
 */

export class PageController {

    private $rest;

    key: string;

    constructor(private $stateParams: ng.ui.IStateParamsService) {
        this.key = $stateParams["key"];
    }
}

PageController.$inject = ["$stateParams"];