/**
 * Created by NICK on 16/8/10.
 */

import * as _ from 'lodash';

export class ContentController {
    public static $inject = ["$rootScope", "$timeout", "materialUtils", "svgUtils", "fxAction", "iconInfoDetailForm"];

    icons: Array<string> = [];
    filter: string;
    text: string;
    standardItems: any;
    gridsterOpts: any;

    constructor(private $rootScope, private $timeout, private materialUtils, private svgUtils, private fxAction, private iconInfoDetailForm) {
        this.icons.length = 0;

        _.each(svgUtils.getAllIcons(), (shape, key) => {
            this.icons.push(key);
        });

        this.standardItems = [
            { sizeX: 2, sizeY: 1, row: 0, col: 0, class: "md-whiteframe-1dp" },
            { sizeX: 2, sizeY: 2, row: 0, col: 2, class: "md-whiteframe-1dp" },
            { sizeX: 1, sizeY: 1, row: 0, col: 4, class: "md-whiteframe-1dp" },
            { sizeX: 1, sizeY: 1, row: 0, col: 5, class: "md-whiteframe-1dp" },
            { sizeX: 2, sizeY: 1, row: 1, col: 0, class: "md-whiteframe-1dp" },
            { sizeX: 1, sizeY: 1, row: 1, col: 4, class: "md-whiteframe-1dp" },
            { sizeX: 1, sizeY: 2, row: 1, col: 5, class: "md-whiteframe-1dp" },
            { sizeX: 1, sizeY: 1, row: 2, col: 0, class: "md-whiteframe-1dp" },
            { sizeX: 2, sizeY: 1, row: 2, col: 1, class: "md-whiteframe-1dp" },
            { sizeX: 1, sizeY: 1, row: 2, col: 3, class: "md-whiteframe-1dp" },
            { sizeX: 1, sizeY: 1, row: 2, col: 4, class: "md-whiteframe-1dp" }
        ];
        this.gridsterOpts = {
            draggable: {
                start: function (event, $element, widget) {
                    widget.class = "md-whiteframe-16dp"
                }, // optional callback fired when drag is started,
                stop: function (event, $element, widget) {
                    widget.class = "md-whiteframe-1dp"
                } // optional callback fired when item is finished dragging
            }
        };
    }

    doOpenIconInfo($event, iconInfo: string) {
        this.fxAction.doActionModel($event, this.iconInfoDetailForm, { key: iconInfo });
    }
}

