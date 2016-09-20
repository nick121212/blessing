/**
 * Created by NICK on 16/8/10.
 */

export class WizardController {
    static $inject = ["$stateParams"];

    key: string;
    formData = {};

    constructor(private $stateParams: ng.ui.IStateParamsService) {
        this.key = "ModuleWizardAddAction";
    }
}