/**
 * Created by NICK on 16/8/10.
 */

import * as _ from 'lodash';

export class ContentController {
    public static $inject = ["$rootScope", "$timeout", "materialUtils", "svgUtils"];

    icons: Array<string> = [];
    filter: string;

    constructor(private $rootScope, private $timeout, private materialUtils, private svgUtils) {
        this.icons.length = 0;
        _.each(svgUtils.getAllIcons(), (shape, key)=> {
            this.icons.push(key);
        });
    }
}

