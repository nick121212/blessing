/**
 * Created by NICK on 16/8/10.
 */

import * as io from 'socket.io-client';

export class TtyController {
    static $inject = ["$scope", "$stateParams", "toolbarUtils", "materialUtils", "fxAction"];

    toolbar: Array<Object>;
    itemToolbar: Array<Object>;
    socket: SocketIOClient.Socket;
    crawlers: {[id: string]: any};

    constructor(private $scope: ng.IScope, private $stateParams: ng.ui.IStateParamsService, private toolbarUtils, private materialUtils: fx.utils.materialStatic, private fxAction) {
        this.itemToolbar = [
            toolbarUtils.btnBuilder("执行操作", "", true).btnClick(($event, crawler)=> {
                this.fxAction.getModel("crawlerSettingAckAction").then((actionModel)=> {
                    this.fxAction.doActionModel($event, actionModel, crawler, ()=> {
                        console.log(crawler);

                        this.socket.emit('ack', crawler, (result)=> {
                            console.log(result);
                        });

                    });
                });
            }).toValue()
        ];
        this.$scope.$on("$destroy", ()=> {
            this.socket.disconnect();
            this.crawlers = {};
        });
        this.init();
    }

    init() {
        const _this = this;

        _this.crawlers = {};
        _this.socket = io('http://localhost:3000/crawler');
        // this.socket.on('connect', function () {
        //     console.log("connected!!");
        // });
        _this.socket.on('disconnect', ()=> {
            _this.crawlers = {};
        });
        // 爬虫进程退出事件
        _this.socket.on("crawler:left", (socketId)=> {
            if (_this.crawlers.hasOwnProperty(socketId)) {
                _this.materialUtils.safeApply(_this.$scope, ()=> {
                    delete _this.crawlers[socketId];
                });
            }
        });
        // 爬虫进程连接事件
        _this.socket.on('crawler:join', (data)=> {
            if (!_this.crawlers) {
                _this.crawlers = {};
            }
            _this.materialUtils.safeApply(_this.$scope, ()=> {
                _this.crawlers[data.id] = data.data;
            });
        });

        _this.socket.emit("getCrawlers", {}, (crawlers)=> {
            _this.crawlers = crawlers;
        });
    }
}
