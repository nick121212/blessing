/**
 * Created by NICK on 16/8/17.
 */


export class LoginController {
    title:string="用户登录";

    constructor(private $rootScope, private $timeout) {

    }
}

LoginController.$inject = ["$rootScope", "$timeout"];