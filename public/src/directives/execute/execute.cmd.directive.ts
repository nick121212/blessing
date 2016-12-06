import { IActionModel, ActionType, IClientData } from '../../directives/action/models/action.model';
import * as _ from 'lodash';
import { module } from './module';

interface ICmdClientData extends IClientData {
    cmdResMap?: any;
}

interface IExecuteProcess {
    total: number;
    success: number;
    fail: number;
    buffer?: number;
    complete?: number;
}

export class PageExecuteCmdResultController {
    static $inject = ["$scope", "fxAction", "sockets", "$q", "$timeout", "toolbarUtils", "materialUtils"];

    jid: string;
    toolbars: Array<any>;
    cmdClientData: IClientData = {};
    cmdResClientData: ICmdClientData = {};
    deviceSelected: Array<any> = [];
    command: any;
    cmdResMap: any = {};
    isBusy: boolean;
    isOpen: boolean;
    realTime: boolean;
    resFilter: any;
    listKey: string = 'executeCmdResList';
    process: IExecuteProcess = { fail: 0, success: 0, total: 0 };

    constructor(private $scope, private fxAction, private sockets, private $q: angular.IQService, private $timeout, private toolbarUtils, private materialUtils: fx.utils.materialStatic) {
        if (this.realTime) {
            this.$scope.$on("socket:connect", () => { });
            this.$scope.$on("socket:events", (event, msg) => {

                console.log("socket", msg._source.jid, this.jid);

                if (msg._source.jid !== this.jid) {
                    return;
                }
                this.cmdResMap[msg._id] = msg;
                if (_.isArray(this.cmdResClientData.rows)) {
                    let devices = _.filter(this.cmdResClientData.rows, (item: any) => {
                        return item._id == msg._id;
                    });
                    if (devices.length == 0) {
                        this.cmdResClientData.rows.push(msg);
                    } else {
                        _.each(devices, (dev, key) => {
                            _.extend(devices[key], msg);
                        });
                    }
                    this.setProcess(msg._source.success);
                }
            });
        }
        this.$scope.$on("showExecuteCmdResult", (event, cmdId: string) => {
            this.cmdClientData = {};
            this.cmdResClientData = {};
            this.deviceSelected = [];
            this.cmdResMap = { len: 0 };
            this.jid = "";
            this.getCommandResult(cmdId);
        });

        this.$scope.$on(`${this.listKey}:searchComplete`, (event, data) => {
            this.resetProcess();
            _.each(data.rows, (item, key) => {
                if (this.cmdResMap.hasOwnProperty(item._id)) {
                    _.extend(data.rows[key], this.cmdResMap[item._id]);
                }
                this.setProcess(data.rows[key]._source.success);
            });
            console.log("searchComplete", data.rows);
            // data.rows.length && (this.deviceSelected = [].concat(data.rows));
        });

        this.cmdResClientData = {};
        this.toolbars = [
            this.toolbarUtils.noneBuilder("icon").iconBuilder('apple-keyboard-command', {}).toValue(),
            this.toolbarUtils.labelBuilder('执行命令').attrBuilder({ flex: "" }).toValue()
        ];
    }

    resetProcess() {
        this.process.fail = 0;
        this.process.success = 0;
        // this.process.total = 0;
        this.process.complete = 0;
        this.process.buffer = 0;
    }

    setProcess(success) {
        if (success === true) {
            this.process.success++;
        } else if (success === false) {
            this.process.fail++;
        }

        this.process.complete = (this.process.success + this.process.fail) / this.process.total * 100;
        this.process.buffer = 100;
    }

    getCommandResult(cmdId: string) {
        this.resFilter = { "query": { "and": [{ "match": { "jid": cmdId } }] } };
        this.cmdResMap = {};
        this.jid = cmdId;
        // this.cmdResClientData.rows = _.map(this.cmdResMap);
        this.realTime = true;
        // this.$timeout(() => {
        this.isBusy = true;
        this.isOpen = true;
        this.$q.all([
            this.fxAction.doAction("executeCmdList", { where: { "query": { "and": [{ "match": { "_id": cmdId } }] } } })
            // this.fxAction.doAction("executeCmdResList", { where: { "query": { "and": [{ "match": { "jid": cmdId } }] } } })
        ]).then((results: any) => {
            this.fxAction.doDealResult(results[0].actionModel, results[0], this.cmdClientData);
            // this.fxAction.doDealResult(results[1].actionModel, results[1], this.cmdResClientData);
        }).then(() => {
            if (this.cmdClientData.rows.length) {
                this.command = this.cmdClientData.rows[0]._source.command;
                this.process.total = this.cmdClientData.rows[0]._source.devLen;
                // this.deviceClientData.rows = this.cmdClientData.rows[0]._source.listip;
                // this.deviceClientData.rows.length && (this.deviceSelected = [].concat(this.deviceClientData.rows));
            } else {
                return this.getCommandResult(cmdId);
            }
        }).finally(() => {
            this.isBusy = false;
        });
        // }, 200);
    }
}

function Directive(): ng.IDirective {
    return {
        restrict: 'EA',
        scope: {},
        bindToController: {
            "realTime": '@?'
        },
        // replace: true,
        template: require('./tpls/execute.cmd.tmp.jade'),
        controller: PageExecuteCmdResultController,
        controllerAs: "executeCmdCtl"
    }
}

module.directive("executeCmd", [Directive]);

module.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }
}]);

module.directive('angularTerminal', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs: any) {
            var namespace = 'terminal.' + (attrs.angularTerminal || 'default'),
                t;

            t = element.terminal((input, terminal) => {
                $rootScope.$emit(namespace, input, terminal);
            }, {
                    greetings: attrs.greetings || '',
                    enabled: false
                });

            $rootScope.$on(namespace + '.echo', function (e, msg) {
                t.echo(msg);
            });
        }
    };
}]);