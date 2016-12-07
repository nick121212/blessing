webpackHotUpdate(1,{49:function(t,o,e){"use strict";e(180),e(176),e(179),e(177),e(178),e(181),e(175),e(171),e(172),e(167),e(169),e(173),e(174),e(170),e(168);var i=e(4);e(160),Object.defineProperty(o,"__esModule",{value:!0}),o["default"]=i["default"]},172:function(t,o,e){"use strict";function i(){return{restrict:"EA",template:e(120)(),scope:!0,bindToController:{key:"@",selected:"=?",_filter:"=?filter",clientData:"=?",showToolbar:"=?",multiple:"=?",autoSelect:"=?",local:"=?",itemToolbars:"=?",topToolbars:"=?",qtCtl:"=?"},controller:r,controllerAs:"listCtl",replace:!0,transclude:!0}}var n=e(4),l=e(6),a=e(7),s=e(3),r=function(){function t(t,o,e,i,n,l,a){var r=this;this.$rootScope=t,this.$scope=o,this.$q=e,this.$timeout=i,this.fxAction=n,this.toolbarUtils=l,this.materialUtils=a,this.mdLimitOptions=[1,10,30,50,100,300],this.isBusy=!1,this.showPage=!0,!this.clientData&&(this.clientData={}),!this.selected&&(this.selected=[]),n.getModel(this.key).then(function(t){r.actionModel=s.cloneDeep(t),r.queryData=s.extend({offset:0,limit:10,page:1},r.actionModel.list.queryData||{},r.queryData||{}),r.local?(r.actionModel.list.itemToolbars=r.itemToolbars||[],r.actionModel.list.toolbars=r.topToolbars||[]):(r.initToolbar(),r.initItemToolbar(),r.doSearch(),r.initEvents())}),this.onOrderChange=this.orderChange.bind(this),this.onPageChange=this.pageChange.bind(this),this.doSearchBind=this.doSearch.bind(this),this.$scope.$on("$destroy",function(){r.actionModel=null,r.queryData=null,r.onOrderChange=null,r.onPageChange=null,r.doSearchBind=null,r.selected=null,r.itemToolbars=null,r.topToolbars=null}),this.$scope.$watch(function(){return r._filter},function(t,o){t&&t!=o&&r.doSearch()})}return t.prototype.initEvents=function(){var t,o=this;this.$rootScope.$on(this.key+":refresh",function(){t&&o.$timeout.cancel(t),t=o.$timeout(function(){o.doSearch(o.queryData.where||{})},500)})},t.prototype.orderFunc=function(){return this.queryData&&this.queryData.order?this.queryData.order.replace(/\-/gi,""):[]},t.prototype.doClickActionMenu=function(t,o,e){var i=this,n=s.clone(e);if(o.cancel=!1,this.$rootScope.$broadcast(this.key+":clickItem",o,e),!o.cancel){o.type!==l.ActionType.form&&o.type!==l.ActionType.wizard||(n={},a.has(e,o.path||"")&&(n=a.get(e,o.path||"")));var r=this.fxAction.doActionModel(t,o,n);r&&r.then(function(t){i.materialUtils.showMsg(""+(o.successMsg||"操作成功!")),i.$timeout(function(){o.refreshList&&i.doSearch(i.queryData.where||{})},200)})}},t.prototype.initToolbar=function(){var t=this;this.actionModel.list.toolbars=[],this.fxAction.getModels(this.actionModel.actions).then(function(o){t.actionModel.list.toolbars.push(t.toolbarUtils.noneBuilder("icon").iconBuilder(t.actionModel.icon,{}).toValue()),t.actionModel.list.toolbars.push(t.toolbarUtils.labelBuilder(""+t.actionModel.title).attrBuilder({flex:""}).toValue()),s.forEach(o,function(o){o.type!==l.ActionType.list&&t.actionModel.list.toolbars.push(t.toolbarUtils.btnBuilder(o.title,"md-icon-button",!1).tooltipBuilder("").iconBuilder(o.icon,{}).btnClick(function(e,i){t.doClickActionMenu(e,o,i||{})}).toValue())}),t.actionModel.list.showRefreshBtn&&t.actionModel.list.toolbars.push(t.toolbarUtils.btnBuilder("刷新","md-icon-button",!1).iconBuilder("refresh",{}).btnClick(function(o){t.doSearch(t.queryData.where||{})}).toValue()),t.actionModel.list.showSearchBtn&&t.actionModel.list.toolbars.push(t.toolbarUtils.btnBuilder("{{listCtl.actionModel.list.showSearchPanel?'关闭搜索栏':'打开搜索栏'}}","md-icon-button",!1).iconBuilder("{{listCtl.actionModel.list.showSearchPanel?'window-open':'window-closed'}}",{}).btnClick(function(o){t.actionModel.list.showSearchPanel=!t.actionModel.list.showSearchPanel}).toValue()),t.$rootScope.$broadcast(t.key+":toolbarComplete",t.actionModel.list.toolbars)})},t.prototype.initItemToolbar=function(){var t=this,o=this.toolbarUtils.menuBuilder("","md-icon-button").tooltipBuilder("操作菜单").iconBuilder("expand_more").menuOptionsBuilder().toValue(),e=[],i=s.keyBy(this.actionModel.itemActions,"key");s.each(this.actionModel.itemActions,function(t){e.push(t.key)}),e.length&&this.fxAction.getModels(e).then(function(n){s.each(e,function(e){var a=n[e];if(a){var s=i[e].condition;switch(a.type){case l.ActionType.none:case l.ActionType.form:case l.ActionType.wizard:case l.ActionType.confirm:var r=t.toolbarUtils.menuItemBuilder(a.title,null,!0).tooltipBuilder("").noOptions(!0,!1).iconBuilder(a.icon).btnClick(function(o,e){t.doClickActionMenu(o,a,e)});s&&r.conditionBuilder(s),o.items.push(r.toValue())}}}),o.items.length&&(t.actionModel.list.itemToolbars=[o]),t.$rootScope.$broadcast(t.key+":itemToolbarComplete",o.items)})},t.prototype.orderChange=function(t){this.queryData.order=t,this.doSearch(this.queryData.where||{}),this.orderFunc()},t.prototype.pageChange=function(t,o){o!==this.queryData.limit&&(t=1),this.queryData.page=t,t>0&&(this.queryData.offset=(t-1)*o),this.doSearch(this.queryData.where||{})},t.prototype.doSearch=function(t){var o=this;this.local||(this.isBusy=!0,this.queryData.where=t||{},s.isObject(this._filter)&&s.isObject(this.queryData.where)&&s.extend(this.queryData.where,this._filter),this.promise=this.fxAction.doAction(this.key,this.queryData),this.promise&&this.promise.then(function(t){o.fxAction.doDealResult(o.actionModel,t,o.clientData),o.$rootScope.$broadcast(o.key+":searchComplete",o.clientData)})["finally"](function(){o.isBusy=!1}))},t.$inject=["$rootScope","$scope","$q","$timeout","fxAction","toolbarUtils","materialUtils"],t}();n.module.filter("skip",function(){return function(t,o,e){return t?o&&e?s.drop(t.concat([]),o):t:[]}}),n.module.directive("fxListAction",i)}});
//# sourceMappingURL=1.c3a4646135a892ae3623.hot-update.js.map