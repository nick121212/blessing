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
    logs: Array<any>;

    constructor(private $scope: ng.IScope, private $stateParams: ng.ui.IStateParamsService, private toolbarUtils, private materialUtils: fx.utils.materialStatic, private fxAction) {
        this.crawlers = {};
        this.logs = [];
        this.itemToolbar = [
            toolbarUtils.btnBuilder("执行操作", "", true).btnClick(($event, crawler)=> {
                this.fxAction.getModel("crawlerSettingAckAction").then((actionModel)=> {
                    this.fxAction.doActionModel($event, actionModel, crawler, ()=> {
                        this.socket.emit('ack', crawler, (result)=> {
                            if (result.ret === 0) {
                                if (result.showResult) {
                                    return this.fxAction.getModel("resultAction").then((actionModel)=> {
                                        this.fxAction.doActionModel($event, actionModel, result, ()=> {
                                            this.materialUtils.close();
                                        });
                                    });
                                }
                                this.materialUtils.showMsg("操作成功！");
                            } else {
                                this.materialUtils.showErrMsg(result.msg);
                            }
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
        this.socket = io('http://114.55.146.215:3000/crawler');
        // this.socket = io('http://localhost:3000/crawler');
        // 已经连接
        this.socket.on('connect', function () {
            console.log("connected!!");
        });
        // 失去连接
        this.socket.on('disconnect', (()=> {
            this.crawlers = {};
            this.materialUtils.showErrMsg("socket失去连接！！！");
        }).bind(this));
        // 爬虫进程退出事件
        this.socket.on("crawler:left", ((socketId)=> {
            if (this.crawlers.hasOwnProperty(socketId)) {
                this.materialUtils.safeApply(this.$scope, ()=> {
                    delete this.crawlers[socketId];
                });
            }
        }).bind(this));
        // 爬虫进程更新事件
        this.socket.on("crawler:update", ((result)=> {
            if (this.crawlers.hasOwnProperty(result.socketId)) {
                this.materialUtils.safeApply(this.$scope, ()=> {
                    _.extend(this.crawlers[result.socketId], result.data);
                });
            }
        }).bind(this));
        // 爬虫进程更新事件
        this.socket.on("crawler:log", ((result)=> {
            if (this.logs.length > 100) {
                this.logs.pop();
            }
            this.materialUtils.safeApply(this.$scope, ()=> {
                this.logs.unshift(result.data);
            });
        }).bind(this));
        // 爬虫进程连接事件
        this.socket.on('crawler:join', ( (data)=> {
            if (!this.crawlers) {
                this.crawlers = {};
            }
            this.materialUtils.safeApply(this.$scope, ()=> {
                this.crawlers[data.id] = data.data;
            });
        }).bind(this));
        // 获取所有爬虫进程
        this.socket.emit("getCrawlers", {}, ((crawlers)=> {
            this.materialUtils.safeApply(this.$scope, ()=> {
                this.crawlers = crawlers;
            });
        }).bind(this));
    }
}
