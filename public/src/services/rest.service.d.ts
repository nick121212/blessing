declare module 'fxRestModule' {
    var _: string;
    export = _;
}

declare namespace fx.utils {
    interface restStatic {
        setConfig(fn: Function): any;
        getRestAngular(router: string, unique?: boolean, baseUrl?: string): restangular.IElement;
    }
    interface rest {
        new(baseUrl: string): restStatic;
    }
}