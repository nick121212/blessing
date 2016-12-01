/**
 * Created by NICK on 16/8/10.
 */

import * as _ from 'lodash';

export class ContentController {
    public static $inject = ["$rootScope", "$timeout", "materialUtils", "svgUtils", "fxAction", "iconInfoDetailForm"];

    icons: Array<string> = [];
    filter: string;
    text: string;

    constructor(private $rootScope, private $timeout, private materialUtils, private svgUtils, private fxAction, private iconInfoDetailForm) {
        this.icons.length = 0;

        _.each(svgUtils.getAllIcons(), (shape, key) => {
            this.icons.push(key);
        });

        this.text = `
        Filesystem    512-blocks      Used Available Capacity iused      ifree %iused  Mounted on
        /dev/disk1     487882752 161082016 326288736    34% 2076675 4292890604    0%   /
        devfs                363       363         0   100%     629          0  100%   /dev
        map -hosts             0         0         0   100%       0          0  100%   /net
        map auto_home          0         0         0   100%       0          0  100%   /home
        `;

    }

    doOpenIconInfo($event, iconInfo: string) {
        this.fxAction.doActionModel($event, this.iconInfoDetailForm, { key: iconInfo });
    }
}

