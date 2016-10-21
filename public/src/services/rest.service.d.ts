declare module 'fxRestModule' {
    var _: string;
    export = _;
}

declare namespace fx.utils {
    interface restStatic {
        params: Object;
        headers: Object;
        setConfig(fn: Function): any;
        getRestAngular(router: string, unique?: boolean, baseUrl?: string): restangular.IElement;
        getCustom(address: string, port: number, path: string): restangular.IElement;
        getCustomRestful(address: string, port: number, path: string): restangular.IElement;
    }
    interface rest {
        new(baseUrl: string): restStatic;
    }
}