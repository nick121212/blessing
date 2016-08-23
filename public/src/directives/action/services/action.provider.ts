/**
 * Created by NICK on 16/8/16.
 */

class Provider {
    private restUtils: fx.utils.restStatic;

    constructor() {
        console.log("getModule");
    }

    $get: Array<string|Function> = ["restUtils", (restUtils)=> {

        this.restUtils = restUtils;

        return {
            getModule: ()=> {
                return this.getModule();
            }
        };
    }];

    getModule() {
        this.restUtils.getRestAngular("module").getList().then(res=>console.log(res));
    }
}

export default (module: ng.IModule)=> {
    module.provider('fxAction', [Provider]);
};