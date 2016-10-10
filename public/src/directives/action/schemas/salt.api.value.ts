import {IActionModel, ActionType} from '../models/action.model';
import {MethodType} from '../models/interface.model';

class Login {
    static key: string = "saltApiLogin";

    constructor() {
        let actionModel: IActionModel = {
            key: Login.key,
            type: ActionType.form,
            title: "登陆",
            icon: "login",
            form: {
                dataSchema: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: {
                            type: "string",
                            minLength: 4,
                            maxLength: 20,
                            title: "用户名"
                        },
                        eauth: {
                            type: "string",
                            default: "pam"
                        },
                        password: {
                            type: "string",
                            title: "密码",
                            minLength: 4,
                            maxLength: 20
                        }
                    }
                },
                formSchema: [{
                    key: "username",
                    type: "string",
                    placeHolder: "用户名",
                    icon: {
                        leftIcon: "account"
                    },
                    htmlClass: "md-icon-left md-block"
                }, {
                    key: "password",
                    type: "password",
                    icon: {
                        leftIcon: "lock"
                    },
                    htmlClass: "md-icon-left md-block"
                }]
            },
            refreshList: true,
            closeDialog: true,
            interfaces: [{
                key: "saltApiLogin",
                method: MethodType.POST,
                address: "https://172.16.140.164",
                port: 8888,
                path: "login",
                isRestful: false
            }]
        };

        return actionModel;
    }
}

export default (module: ng.IModule)=> {
    const services = [Login];

    _.each(services, (model)=> {
        module.service(model.key, model);
    });
}
