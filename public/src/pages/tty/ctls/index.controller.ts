/**
 * Created by NICK on 16/8/10.
 */

export class TtyController {
    static $inject = ["$stateParams"];
    key: string;

    constructor(private $stateParams: ng.ui.IStateParamsService) {
        this.key = $stateParams["key"];
        this.init();
    }

    init() {
        // const socket = io('http://localhost:3001');
    }
}
