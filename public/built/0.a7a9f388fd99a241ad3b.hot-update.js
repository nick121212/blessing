webpackHotUpdate(0,{164:function(e,t,n){"use strict";function o(e){return{restrict:"EA",replace:!1,require:a,transclude:!0,controllerAs:"sideCtl",scope:{modules:"="},bindToController:{selectedNodes:"="},controller:p,compile:function(t,n,o){return function(t,n,s,d){t.$watch("modules",function(n){var o=e.options;if(i.isArray(n)){if(angular.isDefined(t.node)&&angular.equals(t.node[o.children],n))return;t.node={},t.node[o.children]=n}else{if(angular.equals(t.node,n))return;t.node=n}}),d.template(t,function(e){n.html("").append(e)}),t.$sideMenuTransclude=o}}}}var i=n(33),s=n(165),d=n(166),r=n(167),c=n(168),l=n(169),u=n(171);n(172);var a="fxSideMenu",h=a+"Module",p=function(){function e(e,t,o,i){this.$scope=e,this.$compile=t,this.$interpolate=o,this.mdSideMenuSections=i,this.options={},this.template=t(o(n(174)())({opts:i.options})),this.options=this.mdSideMenuSections.options}return e.prototype.showChildren=function(e){var t=this.mdSideMenuSections.options;this.selectedNodes.hasOwnProperty(e[t.key])?delete this.selectedNodes[e[t.key]]:e[t.children]&&e[t.children].length&&(this.selectedNodes[e[t.key]]=e)},e.prototype.isShowChildren=function(e){var t=this.mdSideMenuSections.options;return!!this.selectedNodes[e[t.key]]},e.prototype.isLeaf=function(e){var t=this.mdSideMenuSections.options;return e.rgt-e.lft==1||!e[t.children]||0==e[t.children].length},e.prototype.isSelected=function(e){var t=this.mdSideMenuSections.options;return!!this.mdSideMenuSections.selectedNode&&this.mdSideMenuSections.selectedNode[t.key]==e[t.key]},e.$inject=["$scope","$compile","$interpolate","mdSideMenuSections"],e}(),e=angular.module(h,["ngAnimate","ngMaterial"]).directive(a,["mdSideMenuSections",o]);s["default"](e),d["default"](e),r["default"](e),c["default"](e),l["default"](e),u["default"](e),Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=e.name},171:function(e,t){"use strict";function n(e,t){console.log(e,t);var n=function(e,n,o){function i(e,n){return!t.selectedNode&&e.forEach(function(e){return e[t.options.children]&&e[t.options.children].length?i(e[t.options.children],e):e.isShow&&e.menuLink.search(location.hash)>=0?(t.selectedNode=e,!1):void 0}),!1}t.selectedNode=null,setTimeout(function(){i(t.sections,null)},10)};return e.$on("$stateChangeSuccess",n),{onStateChangeStart:n}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=function(e){e.factory("fxSideMenuFactory",["$rootScope","mdSideMenuSections",n])}}});
//# sourceMappingURL=0.a7a9f388fd99a241ad3b.hot-update.js.map