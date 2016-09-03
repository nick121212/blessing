/**
 * Created by NICK on 16/8/17.
 */

/**
 * 登陆controller
 */
export class LoginController {
    key: string = "login";
    formData: Object = {username: "nick", password: "nick"};

    constructor(private $state: ng.ui.IStateService, private fxAction) {
        // console.log($state);
    }

    /**
     * 登陆,触发登陆操作
     * @param form 表单
     */
    doSubmit(form: ng.IFormController) {
        let promise: ng.IPromise<any> = this.fxAction.doAction(this.key, this.formData, form);

        promise && promise.then((results)=> {
            console.log(results);
            this.$state.go("home.page", {key: "modulesListAction"});
        });
    }
}

LoginController.$inject = ["$state", "fxAction"];