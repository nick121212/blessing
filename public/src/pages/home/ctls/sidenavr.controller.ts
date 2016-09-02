/**
 * Created by NICK on 16/8/10.
 */

export class SidenavRightController {
    public static $inject = ["fxAction"];

    constructor(private fxAction) {

    }

    doExit($event: MouseEvent) {
        this.fxAction.getModel('logout').then((model)=> {
            const promise = this.fxAction.doActionModel($event, model);

            if (promise) {
                promise.then(()=> {
                    console.log("logout");
                });
            }
        });

    }
}

