webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var ngMaterial = __webpack_require__(1);
	__webpack_require__(10);
	var ngMaterialIcons = __webpack_require__(11);
	var _ = __webpack_require__(13);
	var action_1 = __webpack_require__(15);
	var router_1 = __webpack_require__(131);
	var material_service_1 = __webpack_require__(140);
	var svg_service_1 = __webpack_require__(141);
	var toolbar_1 = __webpack_require__(142);
	var sidemenu_1 = __webpack_require__(151);
	__webpack_require__(163);
	var action_model_1 = __webpack_require__(37);
	__webpack_require__(165);
	__webpack_require__(168);
	var module = angular.module("homeModule", [action_1.default, toolbar_1.default, sidemenu_1.default, svg_service_1.default, material_service_1.default, ngMaterial, 'ui.router', ngMaterialIcons, 'gridster']);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    "$httpProvider",
	    "$mdThemingProvider",
	    "$mdAriaProvider",
	    "$locationProvider",
	    "mdSideMenuSectionsProvider",
	    function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $mdAriaProvider, $locationProvider, mdSideMenuSectionsProvider, cfpLoadingBarProvider) {
	        $mdThemingProvider.alwaysWatchTheme(true);
	        $mdAriaProvider.disableWarnings();
	        $mdThemingProvider.theme('default')
	            .primaryPalette('grey')
	            .accentPalette('blue')
	            .warnPalette('red');
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	        mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider);
	    }])
	    .run(["$rootScope", "$state", "$q", "svgUtils", "fxAction", "fxSideMenuFactory", function ($rootScope, $state, $q, svgUtils, fxAction) {
	        var state = {};
	        var handleResolve = function (isComplete) {
	            state.$$isFinish = true;
	            $state.go(state.toState.name, state.toParams, state.options);
	        };
	        $rootScope.$on("$stateRefresh", function () {
	            console.log("dfadfa");
	            state.$$isFinish = false;
	        });
	        $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
	            console.log("$stateChangeStart", evt, toState, toParams, fromState, fromParams);
	        });
	        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
	            if (!state.$$isFinish) {
	                _.extend(state, {
	                    toState: toState,
	                    toParams: toParams,
	                    fromState: fromState,
	                    fromParams: fromParams,
	                    options: options
	                });
	                event.preventDefault();
	                $q.all({
	                    mdi: svgUtils.loadSvgUrl(__dirname + 'svgs/mdi.svg'),
	                    weibo: svgUtils.loadSvgUrl(__dirname + 'svgs/weibo.svg'),
	                    configConfig: fxAction.doAction("configAction", {}).then(function (result) {
	                        $rootScope["config"] = result.configAction.config;
	                    }),
	                    userinfoAction: fxAction.doAction("userinfoAction", {}).then(function (result) {
	                        result.userinfo && ($rootScope["user"] = result.userinfo.username);
	                    })
	                }).then(function () { handleResolve(true); }, function () { handleResolve(false); });
	            }
	        });
	    }]);
	module.value("iconInfoDetailForm", {
	    key: "iconInfoDetailForm",
	    icon: "search",
	    type: action_model_1.ActionType.form,
	    title: "ICON详情",
	    form: {
	        dataSchema: {
	            type: "object",
	            properties: {
	                key: {
	                    type: "string",
	                    title: "KEY"
	                }
	            }
	        },
	        formSchema: [{
	                key: "key",
	                type: "string",
	                placeHolder: "KEY",
	                htmlClass: "md-block"
	            }]
	    }
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	/**
	 * State-based routing for AngularJS
	 * @version v0.3.1
	 * @link http://angular-ui.github.com/
	 * @license MIT License, http://www.opensource.org/licenses/MIT
	 */
	"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function d(a,b){return R(new(R(function(){},{prototype:a})),b)}function e(a){return Q(arguments,function(b){b!==a&&Q(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function f(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function g(a){if(Object.keys)return Object.keys(a);var b=[];return Q(a,function(a,c){b.push(c)}),b}function h(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function i(a,b,c,d){var e,i=f(c,d),j={},k=[];for(var l in i)if(i[l]&&i[l].params&&(e=g(i[l].params),e.length))for(var m in e)h(k,e[m])>=0||(k.push(e[m]),j[e[m]]=a[e[m]]);return R({},j,b)}function j(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function k(a,b){var c={};return Q(a,function(a){c[a]=b[a]}),c}function l(a){var b={},c=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));return Q(c,function(c){c in a&&(b[c]=a[c])}),b}function m(a){var b={},c=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var d in a)-1==h(c,d)&&(b[d]=a[d]);return b}function n(a,b){var c=P(a),d=c?[]:{};return Q(a,function(a,e){b(a,e)&&(d[c?d.length:e]=a)}),d}function o(a,b){var c=P(a)?[]:{};return Q(a,function(a,d){c[d]=b(a,d)}),c}function p(a,b){var d=1,f=2,i={},j=[],k=i,l=R(a.when(i),{$$promises:i,$$values:i});this.study=function(i){function n(a,c){if(s[c]!==f){if(r.push(c),s[c]===d)throw r.splice(0,h(r,c)),new Error("Cyclic dependency: "+r.join(" -> "));if(s[c]=d,N(a))q.push(c,[function(){return b.get(a)}],j);else{var e=b.annotate(a);Q(e,function(a){a!==c&&i.hasOwnProperty(a)&&n(i[a],a)}),q.push(c,a,e)}r.pop(),s[c]=f}}function o(a){return O(a)&&a.then&&a.$$promises}if(!O(i))throw new Error("'invocables' must be an object");var p=g(i||{}),q=[],r=[],s={};return Q(i,n),i=r=s=null,function(d,f,g){function h(){--u||(v||e(t,f.$$values),r.$$values=t,r.$$promises=r.$$promises||!0,delete r.$$inheritedValues,n.resolve(t))}function i(a){r.$$failure=a,n.reject(a)}function j(c,e,f){function j(a){l.reject(a),i(a)}function k(){if(!L(r.$$failure))try{l.resolve(b.invoke(e,g,t)),l.promise.then(function(a){t[c]=a,h()},j)}catch(a){j(a)}}var l=a.defer(),m=0;Q(f,function(a){s.hasOwnProperty(a)&&!d.hasOwnProperty(a)&&(m++,s[a].then(function(b){t[a]=b,--m||k()},j))}),m||k(),s[c]=l.promise}if(o(d)&&g===c&&(g=f,f=d,d=null),d){if(!O(d))throw new Error("'locals' must be an object")}else d=k;if(f){if(!o(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=l;var n=a.defer(),r=n.promise,s=r.$$promises={},t=R({},d),u=1+q.length/3,v=!1;if(L(f.$$failure))return i(f.$$failure),r;f.$$inheritedValues&&e(t,m(f.$$inheritedValues,p)),R(s,f.$$promises),f.$$values?(v=e(t,m(f.$$values,p)),r.$$inheritedValues=m(f.$$values,p),h()):(f.$$inheritedValues&&(r.$$inheritedValues=m(f.$$inheritedValues,p)),f.then(h,i));for(var w=0,x=q.length;x>w;w+=3)d.hasOwnProperty(q[w])?h():j(q[w],q[w+1],q[w+2]);return r}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function q(a,b,c){this.fromConfig=function(a,b,c){return L(a.template)?this.fromString(a.template,b):L(a.templateUrl)?this.fromUrl(a.templateUrl,b):L(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return M(a)?a(b):a},this.fromUrl=function(c,d){return M(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b,headers:{Accept:"text/html"}}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function r(a,b,e){function f(b,c,d,e){if(q.push(b),o[b])return o[b];if(!/^\w+([-.]+\w+)*(?:\[\])?$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(p[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");return p[b]=new U.Param(b,c,d,e),p[b]}function g(a,b,c,d){var e=["",""],f=a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!b)return f;switch(c){case!1:e=["(",")"+(d?"?":"")];break;case!0:f=f.replace(/\/$/,""),e=["(?:/(",")|/)?"];break;default:e=["("+c+"|",")?"]}return f+e[0]+b+e[1]}function h(e,f){var g,h,i,j,k;return g=e[2]||e[3],k=b.params[g],i=a.substring(m,e.index),h=f?e[4]:e[4]||("*"==e[1]?".*":null),h&&(j=U.type(h)||d(U.type("string"),{pattern:new RegExp(h,b.caseInsensitive?"i":c)})),{id:g,regexp:h,segment:i,type:j,cfg:k}}b=R({params:{}},O(b)?b:{});var i,j=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,k=/([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,l="^",m=0,n=this.segments=[],o=e?e.params:{},p=this.params=e?e.params.$$new():new U.ParamSet,q=[];this.source=a;for(var r,s,t;(i=j.exec(a))&&(r=h(i,!1),!(r.segment.indexOf("?")>=0));)s=f(r.id,r.type,r.cfg,"path"),l+=g(r.segment,s.type.pattern.source,s.squash,s.isOptional),n.push(r.segment),m=j.lastIndex;t=a.substring(m);var u=t.indexOf("?");if(u>=0){var v=this.sourceSearch=t.substring(u);if(t=t.substring(0,u),this.sourcePath=a.substring(0,m+u),v.length>0)for(m=0;i=k.exec(v);)r=h(i,!0),s=f(r.id,r.type,r.cfg,"search"),m=j.lastIndex}else this.sourcePath=a,this.sourceSearch="";l+=g(t)+(b.strict===!1?"/?":"")+"$",n.push(t),this.regexp=new RegExp(l,b.caseInsensitive?"i":c),this.prefix=n[0],this.$$paramNames=q}function s(a){R(this,a)}function t(){function a(a){return null!=a?a.toString().replace(/~/g,"~~").replace(/\//g,"~2F"):a}function e(a){return null!=a?a.toString().replace(/~2F/g,"/").replace(/~~/g,"~"):a}function f(){return{strict:p,caseInsensitive:m}}function i(a){return M(a)||P(a)&&M(a[a.length-1])}function j(){for(;w.length;){var a=w.shift();if(a.pattern)throw new Error("You cannot override a type's .pattern at runtime.");b.extend(u[a.name],l.invoke(a.def))}}function k(a){R(this,a||{})}U=this;var l,m=!1,p=!0,q=!1,u={},v=!0,w=[],x={string:{encode:a,decode:e,is:function(a){return null==a||!L(a)||"string"==typeof a},pattern:/[^\/]*/},"int":{encode:a,decode:function(a){return parseInt(a,10)},is:function(a){return L(a)&&this.decode(a.toString())===a},pattern:/\d+/},bool:{encode:function(a){return a?1:0},decode:function(a){return 0!==parseInt(a,10)},is:function(a){return a===!0||a===!1},pattern:/0|1/},date:{encode:function(a){return this.is(a)?[a.getFullYear(),("0"+(a.getMonth()+1)).slice(-2),("0"+a.getDate()).slice(-2)].join("-"):c},decode:function(a){if(this.is(a))return a;var b=this.capture.exec(a);return b?new Date(b[1],b[2]-1,b[3]):c},is:function(a){return a instanceof Date&&!isNaN(a.valueOf())},equals:function(a,b){return this.is(a)&&this.is(b)&&a.toISOString()===b.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:b.toJson,decode:b.fromJson,is:b.isObject,equals:b.equals,pattern:/[^\/]*/},any:{encode:b.identity,decode:b.identity,equals:b.equals,pattern:/.*/}};t.$$getDefaultValue=function(a){if(!i(a.value))return a.value;if(!l)throw new Error("Injectable functions cannot be called at configuration time");return l.invoke(a.value)},this.caseInsensitive=function(a){return L(a)&&(m=a),m},this.strictMode=function(a){return L(a)&&(p=a),p},this.defaultSquashPolicy=function(a){if(!L(a))return q;if(a!==!0&&a!==!1&&!N(a))throw new Error("Invalid squash policy: "+a+". Valid policies: false, true, arbitrary-string");return q=a,a},this.compile=function(a,b){return new r(a,R(f(),b))},this.isMatcher=function(a){if(!O(a))return!1;var b=!0;return Q(r.prototype,function(c,d){M(c)&&(b=b&&L(a[d])&&M(a[d]))}),b},this.type=function(a,b,c){if(!L(b))return u[a];if(u.hasOwnProperty(a))throw new Error("A type named '"+a+"' has already been defined.");return u[a]=new s(R({name:a},b)),c&&(w.push({name:a,def:c}),v||j()),this},Q(x,function(a,b){u[b]=new s(R({name:b},a))}),u=d(u,{}),this.$get=["$injector",function(a){return l=a,v=!1,j(),Q(x,function(a,b){u[b]||(u[b]=new s(a))}),this}],this.Param=function(a,d,e,f){function j(a){var b=O(a)?g(a):[],c=-1===h(b,"value")&&-1===h(b,"type")&&-1===h(b,"squash")&&-1===h(b,"array");return c&&(a={value:a}),a.$$fn=i(a.value)?a.value:function(){return a.value},a}function k(c,d,e){if(c.type&&d)throw new Error("Param '"+a+"' has two type configurations.");return d?d:c.type?b.isString(c.type)?u[c.type]:c.type instanceof s?c.type:new s(c.type):"config"===e?u.any:u.string}function m(){var b={array:"search"===f?"auto":!1},c=a.match(/\[\]$/)?{array:!0}:{};return R(b,c,e).array}function p(a,b){var c=a.squash;if(!b||c===!1)return!1;if(!L(c)||null==c)return q;if(c===!0||N(c))return c;throw new Error("Invalid squash policy: '"+c+"'. Valid policies: false, true, or arbitrary string")}function r(a,b,d,e){var f,g,i=[{from:"",to:d||b?c:""},{from:null,to:d||b?c:""}];return f=P(a.replace)?a.replace:[],N(e)&&f.push({from:e,to:c}),g=o(f,function(a){return a.from}),n(i,function(a){return-1===h(g,a.from)}).concat(f)}function t(){if(!l)throw new Error("Injectable functions cannot be called at configuration time");var a=l.invoke(e.$$fn);if(null!==a&&a!==c&&!x.type.is(a))throw new Error("Default value ("+a+") for parameter '"+x.id+"' is not an instance of Type ("+x.type.name+")");return a}function v(a){function b(a){return function(b){return b.from===a}}function c(a){var c=o(n(x.replace,b(a)),function(a){return a.to});return c.length?c[0]:a}return a=c(a),L(a)?x.type.$normalize(a):t()}function w(){return"{Param:"+a+" "+d+" squash: '"+A+"' optional: "+z+"}"}var x=this;e=j(e),d=k(e,d,f);var y=m();d=y?d.$asArray(y,"search"===f):d,"string"!==d.name||y||"path"!==f||e.value!==c||(e.value="");var z=e.value!==c,A=p(e,z),B=r(e,y,z,A);R(this,{id:a,type:d,location:f,array:y,squash:A,replace:B,isOptional:z,value:v,dynamic:c,config:e,toString:w})},k.prototype={$$new:function(){return d(this,R(new k,{$$parent:this}))},$$keys:function(){for(var a=[],b=[],c=this,d=g(k.prototype);c;)b.push(c),c=c.$$parent;return b.reverse(),Q(b,function(b){Q(g(b),function(b){-1===h(a,b)&&-1===h(d,b)&&a.push(b)})}),a},$$values:function(a){var b={},c=this;return Q(c.$$keys(),function(d){b[d]=c[d].value(a&&a[d])}),b},$$equals:function(a,b){var c=!0,d=this;return Q(d.$$keys(),function(e){var f=a&&a[e],g=b&&b[e];d[e].type.equals(f,g)||(c=!1)}),c},$$validates:function(a){var d,e,f,g,h,i=this.$$keys();for(d=0;d<i.length&&(e=this[i[d]],f=a[i[d]],f!==c&&null!==f||!e.isOptional);d++){if(g=e.type.$normalize(f),!e.type.is(g))return!1;if(h=e.type.encode(g),b.isString(h)&&!e.type.pattern.exec(h))return!1}return!0},$$parent:c},this.ParamSet=k}function u(a,d){function e(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function f(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function g(a,b,c){if(!c)return!1;var d=a.invoke(b,b,{$match:c});return L(d)?d:!0}function h(d,e,f,g,h){function m(a,b,c){return"/"===q?a:b?q.slice(0,-1)+a:c?q.slice(1)+a:a}function n(a){function b(a){var b=a(f,d);return b?(N(b)&&d.replace().url(b),!0):!1}if(!a||!a.defaultPrevented){p&&d.url()===p;p=c;var e,g=j.length;for(e=0;g>e;e++)if(b(j[e]))return;k&&b(k)}}function o(){return i=i||e.$on("$locationChangeSuccess",n)}var p,q=g.baseHref(),r=d.url();return l||o(),{sync:function(){n()},listen:function(){return o()},update:function(a){return a?void(r=d.url()):void(d.url()!==r&&(d.url(r),d.replace()))},push:function(a,b,e){var f=a.format(b||{});null!==f&&b&&b["#"]&&(f+="#"+b["#"]),d.url(f),p=e&&e.$$avoidResync?d.url():c,e&&e.replace&&d.replace()},href:function(c,e,f){if(!c.validates(e))return null;var g=a.html5Mode();b.isObject(g)&&(g=g.enabled),g=g&&h.history;var i=c.format(e);if(f=f||{},g||null===i||(i="#"+a.hashPrefix()+i),null!==i&&e&&e["#"]&&(i+="#"+e["#"]),i=m(i,g,f.absolute),!f.absolute||!i)return i;var j=!g&&i?"/":"",k=d.port();return k=80===k||443===k?"":":"+k,[d.protocol(),"://",d.host(),k,j,i].join("")}}}var i,j=[],k=null,l=!1;this.rule=function(a){if(!M(a))throw new Error("'rule' must be a function");return j.push(a),this},this.otherwise=function(a){if(N(a)){var b=a;a=function(){return b}}else if(!M(a))throw new Error("'rule' must be a function");return k=a,this},this.when=function(a,b){var c,h=N(b);if(N(a)&&(a=d.compile(a)),!h&&!M(b)&&!P(b))throw new Error("invalid 'handler' in when()");var i={matcher:function(a,b){return h&&(c=d.compile(b),b=["$match",function(a){return c.format(a)}]),R(function(c,d){return g(c,b,a.exec(d.path(),d.search()))},{prefix:N(a.prefix)?a.prefix:""})},regex:function(a,b){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return h&&(c=b,b=["$match",function(a){return f(c,a)}]),R(function(c,d){return g(c,b,a.exec(d.path()))},{prefix:e(a)})}},j={matcher:d.isMatcher(a),regex:a instanceof RegExp};for(var k in j)if(j[k])return this.rule(i[k](a,b));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(a){a===c&&(a=!0),l=a},this.$get=h,h.$inject=["$location","$rootScope","$injector","$browser","$sniffer"]}function v(a,e){function f(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function m(a,b){if(!a)return c;var d=N(a),e=d?a:a.name,g=f(e);if(g){if(!b)throw new Error("No reference point given for path '"+e+"'");b=m(b);for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var l=z[e];return!l||!d&&(d||l!==a&&l.self!==a)?c:l}function n(a,b){A[a]||(A[a]=[]),A[a].push(b)}function p(a){for(var b=A[a]||[];b.length;)q(b.shift())}function q(b){b=d(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!N(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(z.hasOwnProperty(c))throw new Error("State '"+c+"' is already defined");var e=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):N(b.parent)?b.parent:O(b.parent)&&N(b.parent.name)?b.parent.name:"";if(e&&!z[e])return n(e,b.self);for(var f in C)M(C[f])&&(b[f]=C[f](b,C.$delegates[f]));return z[c]=b,!b[B]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){y.$current.navigable==b&&j(a,c)||y.transitionTo(b,a,{inherit:!0,location:!1})}]),p(c),b}function r(a){return a.indexOf("*")>-1}function s(a){for(var b=a.split("."),c=y.$current.name.split("."),d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return"**"===b[0]&&(c=c.slice(h(c,b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(h(c,b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length?!1:c.join("")===b.join("")}function t(a,b){return N(a)&&!L(b)?C[a]:M(b)&&N(a)?(C[a]&&!C.$delegates[a]&&(C.$delegates[a]=C[a]),C[a]=b,this):this}function u(a,b){return O(a)?b=a:b.name=a,q(b),this}function v(a,e,f,h,l,n,p,q,t){function u(b,c,d,f){var g=a.$broadcast("$stateNotFound",b,c,d);if(g.defaultPrevented)return p.update(),D;if(!g.retry)return null;if(f.$retry)return p.update(),E;var h=y.transition=e.when(g.retry);return h.then(function(){return h!==y.transition?A:(b.options.$retry=!0,y.transitionTo(b.to,b.toParams,b.options))},function(){return D}),p.update(),h}function v(a,c,d,g,i,j){function m(){var c=[];return Q(a.views,function(d,e){var g=d.resolve&&d.resolve!==a.resolve?d.resolve:{};g.$template=[function(){return f.load(e,{view:d,locals:i.globals,params:n,notify:j.notify})||""}],c.push(l.resolve(g,i.globals,i.resolve,a).then(function(c){if(M(d.controllerProvider)||P(d.controllerProvider)){var f=b.extend({},g,i.globals);c.$$controller=h.invoke(d.controllerProvider,null,f)}else c.$$controller=d.controller;c.$$state=a,c.$$controllerAs=d.controllerAs,c.$$resolveAs=d.resolveAs,i[e]=c}))}),e.all(c).then(function(){return i.globals})}var n=d?c:k(a.params.$$keys(),c),o={$stateParams:n};i.resolve=l.resolve(a.resolve,o,i.resolve,a);var p=[i.resolve.then(function(a){i.globals=a})];return g&&p.push(g),e.all(p).then(m).then(function(a){return i})}var A=e.reject(new Error("transition superseded")),C=e.reject(new Error("transition prevented")),D=e.reject(new Error("transition aborted")),E=e.reject(new Error("transition failed"));return x.locals={resolve:null,globals:{$stateParams:{}}},y={params:{},current:x.self,$current:x,transition:null},y.reload=function(a){return y.transitionTo(y.current,n,{reload:a||!0,inherit:!1,notify:!0})},y.go=function(a,b,c){return y.transitionTo(a,b,R({inherit:!0,relative:y.$current},c))},y.transitionTo=function(b,c,f){c=c||{},f=R({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},f||{});var g,j=y.$current,l=y.params,o=j.path,q=m(b,f.relative),r=c["#"];if(!L(q)){var s={to:b,toParams:c,options:f},t=u(s,j.self,l,f);if(t)return t;if(b=s.to,c=s.toParams,f=s.options,q=m(b,f.relative),!L(q)){if(!f.relative)throw new Error("No such state '"+b+"'");throw new Error("Could not resolve '"+b+"' from state '"+f.relative+"'")}}if(q[B])throw new Error("Cannot transition to abstract state '"+b+"'");if(f.inherit&&(c=i(n,c||{},y.$current,q)),!q.params.$$validates(c))return E;c=q.params.$$values(c),b=q;var z=b.path,D=0,F=z[D],G=x.locals,H=[];if(f.reload){if(N(f.reload)||O(f.reload)){if(O(f.reload)&&!f.reload.name)throw new Error("Invalid reload state object");var I=f.reload===!0?o[0]:m(f.reload);if(f.reload&&!I)throw new Error("No such reload state '"+(N(f.reload)?f.reload:f.reload.name)+"'");for(;F&&F===o[D]&&F!==I;)G=H[D]=F.locals,D++,F=z[D]}}else for(;F&&F===o[D]&&F.ownParams.$$equals(c,l);)G=H[D]=F.locals,D++,F=z[D];if(w(b,c,j,l,G,f))return r&&(c["#"]=r),y.params=c,S(y.params,n),S(k(b.params.$$keys(),n),b.locals.globals.$stateParams),f.location&&b.navigable&&b.navigable.url&&(p.push(b.navigable.url,c,{$$avoidResync:!0,replace:"replace"===f.location}),p.update(!0)),y.transition=null,e.when(y.current);if(c=k(b.params.$$keys(),c||{}),r&&(c["#"]=r),f.notify&&a.$broadcast("$stateChangeStart",b.self,c,j.self,l,f).defaultPrevented)return a.$broadcast("$stateChangeCancel",b.self,c,j.self,l),null==y.transition&&p.update(),C;for(var J=e.when(G),K=D;K<z.length;K++,F=z[K])G=H[K]=d(G),J=v(F,c,F===b,J,G,f);var M=y.transition=J.then(function(){var d,e,g;if(y.transition!==M)return A;for(d=o.length-1;d>=D;d--)g=o[d],g.self.onExit&&h.invoke(g.self.onExit,g.self,g.locals.globals),g.locals=null;for(d=D;d<z.length;d++)e=z[d],e.locals=H[d],e.self.onEnter&&h.invoke(e.self.onEnter,e.self,e.locals.globals);return y.transition!==M?A:(y.$current=b,y.current=b.self,y.params=c,S(y.params,n),y.transition=null,f.location&&b.navigable&&p.push(b.navigable.url,b.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===f.location}),f.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,j.self,l),p.update(!0),y.current)}).then(null,function(d){return y.transition!==M?A:(y.transition=null,g=a.$broadcast("$stateChangeError",b.self,c,j.self,l,d),g.defaultPrevented||p.update(),e.reject(d))});return M},y.is=function(a,b,d){d=R({relative:y.$current},d||{});var e=m(a,d.relative);return L(e)?y.$current!==e?!1:b?j(e.params.$$values(b),n):!0:c},y.includes=function(a,b,d){if(d=R({relative:y.$current},d||{}),N(a)&&r(a)){if(!s(a))return!1;a=y.$current.name}var e=m(a,d.relative);return L(e)?L(y.$current.includes[e.name])?b?j(e.params.$$values(b),n,g(b)):!0:!1:c},y.href=function(a,b,d){d=R({lossy:!0,inherit:!0,absolute:!1,relative:y.$current},d||{});var e=m(a,d.relative);if(!L(e))return null;d.inherit&&(b=i(n,b||{},y.$current,e));var f=e&&d.lossy?e.navigable:e;return f&&f.url!==c&&null!==f.url?p.href(f.url,k(e.params.$$keys().concat("#"),b||{}),{absolute:d.absolute}):null},y.get=function(a,b){if(0===arguments.length)return o(g(z),function(a){return z[a].self});var c=m(a,b||y.$current);return c&&c.self?c.self:null},y}function w(a,b,c,d,e,f){function g(a,b,c){function d(b){return"search"!=a.params[b].location}var e=a.params.$$keys().filter(d),f=l.apply({},[a.params].concat(e)),g=new U.ParamSet(f);return g.$$equals(b,c)}return!f.reload&&a===c&&(e===c.locals||a.self.reloadOnSearch===!1&&g(c,d,b))?!0:void 0}var x,y,z={},A={},B="abstract",C={parent:function(a){if(L(a.parent)&&a.parent)return m(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?m(b[1]):x},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=d(a.parent.data,a.data)),a.data},url:function(a){var b=a.url,c={params:a.params||{}};if(N(b))return"^"==b.charAt(0)?e.compile(b.substring(1),c):(a.parent.navigable||x).url.concat(b,c);if(!b||e.isMatcher(b))return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},ownParams:function(a){var b=a.url&&a.url.params||new U.ParamSet;return Q(a.params||{},function(a,c){b[c]||(b[c]=new U.Param(c,null,a,"config"))}),b},params:function(a){var b=l(a.ownParams,a.ownParams.$$keys());return a.parent&&a.parent.params?R(a.parent.params.$$new(),b):new U.ParamSet},views:function(a){var b={};return Q(L(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),c.resolveAs=c.resolveAs||a.resolveAs||"$resolve",b[d]=c}),b},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?R({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};x=q({name:"",url:"^",views:null,"abstract":!0}),x.navigable=null,this.decorator=t,this.state=u,this.$get=v,v.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function w(){function a(a,b){return{load:function(a,c){var d,e={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return c=R(e,c),c.view&&(d=b.fromConfig(c.view,c.params,c.locals)),d}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function x(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){return c(function(){a[0].scrollIntoView()},0,!1)}}]}function y(a,c,d,e,f){function g(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function h(a,c){var d=function(){return{enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}}};if(k)return{enter:function(a,c,d){b.version.minor>2?k.enter(a,null,c).then(d):k.enter(a,null,c,d)},leave:function(a,c){b.version.minor>2?k.leave(a).then(c):k.leave(a,c)}};if(j){var e=j&&j(c,a);return{enter:function(a,b,c){e.enter(a,null,b),c()},leave:function(a,b){e.leave(a),b()}}}return d()}var i=g(),j=i("$animator"),k=i("$animate"),l={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,g,i){return function(c,g,j){function k(){if(m&&(m.remove(),m=null),o&&(o.$destroy(),o=null),n){var a=n.data("$uiViewAnim");s.leave(n,function(){a.$$animLeave.resolve(),m=null}),m=n,n=null}}function l(h){var l,m=A(c,j,g,e),t=m&&a.$current&&a.$current.locals[m];if(h||t!==p){l=c.$new(),p=a.$current.locals[m],l.$emit("$viewContentLoading",m);var u=i(l,function(a){var e=f.defer(),h=f.defer(),i={$animEnter:e.promise,$animLeave:h.promise,$$animLeave:h};a.data("$uiViewAnim",i),s.enter(a,g,function(){e.resolve(),o&&o.$emit("$viewContentAnimationEnded"),(b.isDefined(r)&&!r||c.$eval(r))&&d(a)}),k()});n=u,o=l,o.$emit("$viewContentLoaded",m),o.$eval(q)}}var m,n,o,p,q=j.onload||"",r=j.autoscroll,s=h(j,c);g.inheritedData("$uiView");c.$on("$stateChangeSuccess",function(){l(!1)}),l(!0)}}};return l}function z(a,c,d,e){return{restrict:"ECA",priority:-400,compile:function(f){var g=f.html();return function(f,h,i){var j=d.$current,k=A(f,i,h,e),l=j&&j.locals[k];if(l){h.data("$uiView",{name:k,state:l.$$state}),h.html(l.$template?l.$template:g);var m=b.extend({},l);f[l.$$resolveAs]=m;var n=a(h.contents());if(l.$$controller){l.$scope=f,l.$element=h;var o=c(l.$$controller,l);l.$$controllerAs&&(f[l.$$controllerAs]=o,f[l.$$controllerAs][l.$$resolveAs]=m),M(o.$onInit)&&o.$onInit(),h.data("$ngControllerController",o),h.children().data("$ngControllerController",o)}n(f)}}}}}function A(a,b,c,d){var e=d(b.uiView||b.name||"")(a),f=c.inheritedData("$uiView");return e.indexOf("@")>=0?e:e+"@"+(f?f.state.name:"")}function B(a,b){var c,d=a.match(/^\s*({[^}]*})\s*$/);if(d&&(a=b+"("+d[1]+")"),c=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!c||4!==c.length)throw new Error("Invalid state ref '"+a+"'");return{state:c[1],paramExpr:c[3]||null}}function C(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function D(a){var b="[object SVGAnimatedString]"===Object.prototype.toString.call(a.prop("href")),c="FORM"===a[0].nodeName;return{attr:c?"action":b?"xlink:href":"href",isAnchor:"A"===a.prop("tagName").toUpperCase(),clickable:!c}}function E(a,b,c,d,e){return function(f){var g=f.which||f.button,h=e();if(!(g>1||f.ctrlKey||f.metaKey||f.shiftKey||a.attr("target"))){var i=c(function(){b.go(h.state,h.params,h.options)});f.preventDefault();var j=d.isAnchor&&!h.href?1:0;f.preventDefault=function(){j--<=0&&c.cancel(i)}}}}function F(a,b){return{relative:C(a)||b.$current,inherit:!0}}function G(a,c){return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(d,e,f,g){var h,i=B(f.uiSref,a.current.name),j={state:i.state,href:null,params:null},k=D(e),l=g[1]||g[0],m=null;j.options=R(F(e,a),f.uiSrefOpts?d.$eval(f.uiSrefOpts):{});var n=function(c){c&&(j.params=b.copy(c)),j.href=a.href(i.state,j.params,j.options),m&&m(),l&&(m=l.$$addStateInfo(i.state,j.params)),null!==j.href&&f.$set(k.attr,j.href)};i.paramExpr&&(d.$watch(i.paramExpr,function(a){a!==j.params&&n(a)},!0),j.params=b.copy(d.$eval(i.paramExpr))),n(),k.clickable&&(h=E(e,a,c,k,function(){return j}),e.bind("click",h),d.$on("$destroy",function(){e.unbind("click",h)}))}}}function H(a,b){return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(c,d,e,f){function g(b){m.state=b[0],m.params=b[1],m.options=b[2],m.href=a.href(m.state,m.params,m.options),n&&n(),j&&(n=j.$$addStateInfo(m.state,m.params)),m.href&&e.$set(i.attr,m.href)}var h,i=D(d),j=f[1]||f[0],k=[e.uiState,e.uiStateParams||null,e.uiStateOpts||null],l="["+k.map(function(a){return a||"null"}).join(", ")+"]",m={state:null,params:null,options:null,href:null},n=null;c.$watch(l,g,!0),g(c.$eval(l)),i.clickable&&(h=E(d,a,b,i,function(){return m}),d.bind("click",h),c.$on("$destroy",function(){d.unbind("click",h)}))}}}function I(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs","$timeout",function(b,d,e,f){function g(b,c,e){var f=a.get(b,C(d)),g=h(b,c),i={state:f||{name:b},params:c,hash:g};return p.push(i),q[g]=e,function(){var a=p.indexOf(i);-1!==a&&p.splice(a,1)}}function h(a,c){if(!N(a))throw new Error("state should be a string");return O(c)?a+T(c):(c=b.$eval(c),O(c)?a+T(c):a)}function i(){for(var a=0;a<p.length;a++)l(p[a].state,p[a].params)?j(d,q[p[a].hash]):k(d,q[p[a].hash]),m(p[a].state,p[a].params)?j(d,n):k(d,n)}function j(a,b){f(function(){a.addClass(b)})}function k(a,b){a.removeClass(b)}function l(b,c){return a.includes(b.name,c)}function m(b,c){return a.is(b.name,c)}var n,o,p=[],q={};n=c(e.uiSrefActiveEq||"",!1)(b);try{o=b.$eval(e.uiSrefActive)}catch(r){}o=o||c(e.uiSrefActive||"",!1)(b),O(o)&&Q(o,function(c,d){if(N(c)){var e=B(c,a.current.name);g(e.state,b.$eval(e.paramExpr),d)}}),this.$$addStateInfo=function(a,b){if(!(O(o)&&p.length>0)){var c=g(a,b,o);return i(),c}},b.$on("$stateChangeSuccess",i),i()}]}}function J(a){var b=function(b,c){return a.is(b,c)};return b.$stateful=!0,b}function K(a){var b=function(b,c,d){return a.includes(b,c,d)};return b.$stateful=!0,b}var L=b.isDefined,M=b.isFunction,N=b.isString,O=b.isObject,P=b.isArray,Q=b.forEach,R=b.extend,S=b.copy,T=b.toJson;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),p.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",p),q.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",q);var U;r.prototype.concat=function(a,b){var c={caseInsensitive:U.caseInsensitive(),strict:U.strictMode(),squash:U.defaultSquashPolicy()};return new r(this.sourcePath+a+this.sourceSearch,R(c,b),this)},r.prototype.toString=function(){return this.source},r.prototype.exec=function(a,b){function c(a){function b(a){return a.split("").reverse().join("")}function c(a){return a.replace(/\\-/g,"-")}var d=b(a).split(/-(?!\\)/),e=o(d,b);return o(e,c).reverse()}var d=this.regexp.exec(a);if(!d)return null;b=b||{};var e,f,g,h=this.parameters(),i=h.length,j=this.segments.length-1,k={};if(j!==d.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");var l,m;for(e=0;j>e;e++){for(g=h[e],l=this.params[g],m=d[e+1],f=0;f<l.replace.length;f++)l.replace[f].from===m&&(m=l.replace[f].to);m&&l.array===!0&&(m=c(m)),L(m)&&(m=l.type.decode(m)),k[g]=l.value(m)}for(;i>e;e++){for(g=h[e],k[g]=this.params[g].value(b[g]),l=this.params[g],m=b[g],f=0;f<l.replace.length;f++)l.replace[f].from===m&&(m=l.replace[f].to);L(m)&&(m=l.type.decode(m)),k[g]=l.value(m)}return k},r.prototype.parameters=function(a){return L(a)?this.params[a]||null:this.$$paramNames},r.prototype.validates=function(a){return this.params.$$validates(a)},r.prototype.format=function(a){function b(a){return encodeURIComponent(a).replace(/-/g,function(a){return"%5C%"+a.charCodeAt(0).toString(16).toUpperCase()})}a=a||{};var c=this.segments,d=this.parameters(),e=this.params;if(!this.validates(a))return null;var f,g=!1,h=c.length-1,i=d.length,j=c[0];for(f=0;i>f;f++){var k=h>f,l=d[f],m=e[l],n=m.value(a[l]),p=m.isOptional&&m.type.equals(m.value(),n),q=p?m.squash:!1,r=m.type.encode(n);if(k){var s=c[f+1],t=f+1===h;if(q===!1)null!=r&&(j+=P(r)?o(r,b).join("-"):encodeURIComponent(r)),j+=s;else if(q===!0){var u=j.match(/\/$/)?/\/?(.*)/:/(.*)/;j+=s.match(u)[1]}else N(q)&&(j+=q+s);t&&m.squash===!0&&"/"===j.slice(-1)&&(j=j.slice(0,-1))}else{if(null==r||p&&q!==!1)continue;if(P(r)||(r=[r]),0===r.length)continue;r=o(r,encodeURIComponent).join("&"+l+"="),j+=(g?"&":"?")+(l+"="+r),g=!0}}return j},s.prototype.is=function(a,b){return!0},s.prototype.encode=function(a,b){return a},s.prototype.decode=function(a,b){return a},s.prototype.equals=function(a,b){return a==b},s.prototype.$subPattern=function(){var a=this.pattern.toString();return a.substr(1,a.length-2)},s.prototype.pattern=/.*/,s.prototype.toString=function(){return"{Type:"+this.name+"}"},s.prototype.$normalize=function(a){return this.is(a)?a:this.decode(a)},s.prototype.$asArray=function(a,b){function d(a,b){function d(a,b){return function(){return a[b].apply(a,arguments)}}function e(a){return P(a)?a:L(a)?[a]:[]}function f(a){switch(a.length){case 0:return c;case 1:return"auto"===b?a[0]:a;default:return a}}function g(a){return!a}function h(a,b){return function(c){if(P(c)&&0===c.length)return c;c=e(c);var d=o(c,a);return b===!0?0===n(d,g).length:f(d)}}function i(a){return function(b,c){var d=e(b),f=e(c);if(d.length!==f.length)return!1;for(var g=0;g<d.length;g++)if(!a(d[g],f[g]))return!1;return!0}}this.encode=h(d(a,"encode")),this.decode=h(d(a,"decode")),this.is=h(d(a,"is"),!0),this.equals=i(d(a,"equals")),this.pattern=a.pattern,this.$normalize=h(d(a,"$normalize")),this.name=a.name,this.$arrayMode=b}if(!a)return this;if("auto"===a&&!b)throw new Error("'auto' array mode is for query parameters only");return new d(this,a)},b.module("ui.router.util").provider("$urlMatcherFactory",t),b.module("ui.router.util").run(["$urlMatcherFactory",function(a){}]),u.$inject=["$locationProvider","$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",u),v.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],b.module("ui.router.state").factory("$stateParams",function(){return{}}).constant("$state.runtime",{autoinject:!0}).provider("$state",v).run(["$injector",function(a){
	  a.get("$state.runtime").autoinject&&a.get("$state")}]),w.$inject=[],b.module("ui.router.state").provider("$view",w),b.module("ui.router.state").provider("$uiViewScroll",x),y.$inject=["$state","$injector","$uiViewScroll","$interpolate","$q"],z.$inject=["$compile","$controller","$state","$interpolate"],b.module("ui.router.state").directive("uiView",y),b.module("ui.router.state").directive("uiView",z),G.$inject=["$state","$timeout"],H.$inject=["$state","$timeout"],I.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",G).directive("uiSrefActive",I).directive("uiSrefActiveEq",I).directive("uiState",H),J.$inject=["$state"],K.$inject=["$state"],b.module("ui.router.state").filter("isState",J).filter("includedByState",K)}(window,window.angular);

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var home_controller_1 = __webpack_require__(132);
	var sidenavl_controller_1 = __webpack_require__(133);
	var sidenavr_controller_1 = __webpack_require__(134);
	var content_controller_1 = __webpack_require__(135);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $urlRouterProvider.otherwise(function ($injector) {
	        var $state = $injector.get("$state");
	        $state.go("home");
	    });
	    $stateProvider.state("home", {
	        url: "/",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "": {
	                controller: home_controller_1.HomeController,
	                controllerAs: "homeCtl",
	                template: __webpack_require__(136)(),
	            },
	            "sidenavLeft@home": {
	                controller: sidenavl_controller_1.SidenavLeftController,
	                controllerAs: "sideLeftCtl",
	                template: __webpack_require__(137)(),
	            },
	            "sidenavRight@home": {
	                controller: sidenavr_controller_1.SidenavRightController,
	                controllerAs: "sideRightCtl",
	                template: __webpack_require__(138)(),
	            },
	            "content@home": {
	                controller: content_controller_1.ContentController,
	                controllerAs: "contentCtl",
	                template: __webpack_require__(139)(),
	            }
	        }
	    });
	};


/***/ },
/* 132 */
/***/ function(module, exports) {

	"use strict";
	var HomeController = (function () {
	    function HomeController($rootScope, materialUtils, toolbarUtils, fxAction) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.materialUtils = materialUtils;
	        this.toolbarUtils = toolbarUtils;
	        this.fxAction = fxAction;
	        $rootScope["isOpenMenu"] = false;
	        this.toolbars = [
	            toolbarUtils.btnBuilder("打开菜单栏", "md-fab md-raised md-mini", false).iconBuilder("window-closed", {}).btnClick(function ($event) {
	                $rootScope["isOpenMenu"] = true;
	            }).toValue(),
	            toolbarUtils.btnBuilder("", "md-fab md-raised md-mini", false).tooltipBuilder("退出登录").iconBuilder("logout").btnClick(function ($event) {
	                _this.doExit($event);
	            }).toValue(),
	        ];
	    }
	    HomeController.prototype.doExit = function ($event) {
	        var _this = this;
	        this.fxAction.getModel('logout').then(function (model) {
	            var promise = _this.fxAction.doActionModel($event, model);
	            if (promise) {
	                promise.then(function () {
	                    console.log("logout");
	                });
	            }
	        });
	    };
	    HomeController.$inject = ["$rootScope", "materialUtils", "toolbarUtils", "fxAction"];
	    return HomeController;
	}());
	exports.HomeController = HomeController;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(13);
	var SidenavLeftController = (function () {
	    function SidenavLeftController($rootScope, mdSideMenuSections, toolbarUtils, fxAction, $state, $stateParams, $timeout, fxSideMenuFactory) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.mdSideMenuSections = mdSideMenuSections;
	        this.toolbarUtils = toolbarUtils;
	        this.fxAction = fxAction;
	        this.$state = $state;
	        this.$stateParams = $stateParams;
	        this.$timeout = $timeout;
	        this.fxSideMenuFactory = fxSideMenuFactory;
	        this.selectedNodes = {};
	        this.initModules().initToolbar();
	        this.doLinkBind = this.doLink.bind(this);
	        this.toolbar = [
	            toolbarUtils.labelBuilder("").attrBuilder({ flex: "" }).toValue(),
	            toolbarUtils.labelBuilder("{{$root.user}}", "md-subhead").attrBuilder({}).toValue(),
	            toolbarUtils.btnBuilder("", "md-icon-button", false).tooltipBuilder("退出登录").iconBuilder("logout", { minHeight: "12px", minWidth: "12px", height: "12px", width: "12px", }, null, null, "12px").btnClick(function ($event) {
	                _this.doExit($event);
	            }).toValue(),
	        ];
	    }
	    SidenavLeftController.prototype.doExit = function ($event) {
	        var _this = this;
	        this.fxAction.getModel('logout').then(function (model) {
	            var promise = _this.fxAction.doActionModel($event, model);
	            if (promise) {
	                promise.then(function () {
	                    console.log("logout");
	                });
	            }
	        });
	    };
	    SidenavLeftController.prototype.getModules = function () {
	        var _this = this;
	        var promise = this.fxAction.doAction('moduleMenuAction', null);
	        promise && promise.then(function (results) {
	            var nodes = [];
	            _.forEach(results, function (result) {
	                if (_.isArray(result)) {
	                    nodes = nodes.concat(result);
	                }
	            });
	            var nodesGroupByDepth = _.groupBy(_.keyBy(nodes, "key"), "depth");
	            var depth = 0, root = {};
	            var _loop_1 = function() {
	                var nodesIsDepth = nodesGroupByDepth[depth];
	                var parentIsDepth = nodesGroupByDepth[depth - 1];
	                if (nodesIsDepth && nodesIsDepth.length > 0) {
	                    switch (depth) {
	                        case 0:
	                            root = nodesIsDepth[0];
	                            break;
	                        case 1:
	                            root['nodes'] = nodesIsDepth;
	                            break;
	                        default:
	                            _.forEach(parentIsDepth, function (parentNode) {
	                                parentNode["nodes"] = _.filter(nodesIsDepth, function (node) {
	                                    return node.lft > parentNode.lft && parentNode.rgt > node.rgt;
	                                });
	                            });
	                            break;
	                    }
	                }
	                else {
	                    return "break";
	                }
	                depth++;
	            };
	            while (true) {
	                var state_1 = _loop_1();
	                if (state_1 === "break") break;
	            }
	            _this.mdSideMenuSections.sections = root["nodes"];
	            _this.modules = _this.mdSideMenuSections.sections;
	            _this.selectedNodes = _.keyBy(nodesGroupByDepth[1], "key") || {};
	            _this.fxSideMenuFactory.onStateChangeStart(null, _this.$state.current, _this.$state.params);
	        });
	    };
	    SidenavLeftController.prototype.initModules = function () {
	        this.getModules();
	        this.mdSideMenuSections.options = {
	            children: "nodes",
	            key: 'key',
	            dirSelectable: false,
	            orderBy: 'lft',
	            filterField: 'key'
	        };
	        return this;
	    };
	    SidenavLeftController.prototype.initToolbar = function () {
	        var _this = this;
	        this.toolbarBottom = [
	            this.toolbarUtils.layoutBuilder("", "row", "space-around center").toolsBuilder([
	                this.toolbarUtils.btnBuilder("刷新", "md-icon-button", false, "top").iconBuilder("refresh").btnClick(function ($event) {
	                    _this.getModules();
	                }).toValue(),
	                this.toolbarUtils.btnBuilder("全部折叠", "md-icon-button", false, "top").iconBuilder("dehaze").btnClick(function ($event) {
	                    _.forEach(_this.selectedNodes, function (val, key) {
	                        delete _this.selectedNodes[key];
	                    });
	                }).toValue(),
	                this.toolbarUtils.btnBuilder("关掉菜单栏", "md-icon-button", false, "top").iconBuilder("close").btnClick(function ($event) {
	                    _this.$rootScope["isOpenMenu"] = false;
	                }).toValue()
	            ]).toValue()
	        ];
	        return this;
	    };
	    SidenavLeftController.prototype.doLink = function ($event, node) {
	        var _this = this;
	        if (node && node.link && node.key) {
	            this.$timeout(function () {
	                _this.$state.go(node.link, node);
	            }, 200);
	        }
	    };
	    SidenavLeftController.$inject = ["$rootScope", "mdSideMenuSections", "toolbarUtils", "fxAction", "$state", "$stateParams", "$timeout", "fxSideMenuFactory"];
	    return SidenavLeftController;
	}());
	exports.SidenavLeftController = SidenavLeftController;


/***/ },
/* 134 */
/***/ function(module, exports) {

	"use strict";
	var SidenavRightController = (function () {
	    function SidenavRightController($mdColorPalette, fxAction) {
	        this.$mdColorPalette = $mdColorPalette;
	        this.fxAction = fxAction;
	        this.colors = Object.keys($mdColorPalette);
	    }
	    SidenavRightController.prototype.selectTheme = function (color) {
	        console.log(color);
	    };
	    SidenavRightController.prototype.showTheme = function ($event) {
	        console.log($event);
	    };
	    SidenavRightController.prototype.doExit = function ($event) {
	        var _this = this;
	        this.fxAction.getModel('logout').then(function (model) {
	            var promise = _this.fxAction.doActionModel($event, model);
	            if (promise) {
	                promise.then(function () {
	                    console.log("logout");
	                });
	            }
	        });
	    };
	    SidenavRightController.$inject = ["$mdColorPalette", "fxAction"];
	    return SidenavRightController;
	}());
	exports.SidenavRightController = SidenavRightController;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(13);
	var ContentController = (function () {
	    function ContentController($rootScope, $timeout, materialUtils, svgUtils, fxAction, iconInfoDetailForm) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.$timeout = $timeout;
	        this.materialUtils = materialUtils;
	        this.svgUtils = svgUtils;
	        this.fxAction = fxAction;
	        this.iconInfoDetailForm = iconInfoDetailForm;
	        this.icons = [];
	        this.icons.length = 0;
	        _.each(svgUtils.getAllIcons(), function (shape, key) {
	            _this.icons.push(key);
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
	                    widget.class = "md-whiteframe-16dp";
	                },
	                stop: function (event, $element, widget) {
	                    widget.class = "md-whiteframe-1dp";
	                }
	            }
	        };
	    }
	    ContentController.prototype.doOpenIconInfo = function ($event, iconInfo) {
	        this.fxAction.doActionModel($event, this.iconInfoDetailForm, { key: iconInfo });
	    };
	    ContentController.$inject = ["$rootScope", "$timeout", "materialUtils", "svgUtils", "fxAction", "iconInfoDetailForm"];
	    return ContentController;
	}());
	exports.ContentController = ContentController;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-content flex=\"100\" layout=\"row\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-sidenav ui-view=\"sidenavLeft\" md-is-locked-open=\"$root.isOpenMenu\" md-component-id=\"left\" md-whiteframe=\"4\" layout=\"column\" class=\"md-sidenav-left\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-sidenav>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-sidenav md-component-id=\"right\" ui-view=\"sidenavRight\" layout=\"column\" md-whiteframe=\"4\" class=\"md-sidenav-right\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-sidenav>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-content ui-view=\"content\" flex=\"100\" layout=\"column\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<div execute-cmd real-time=\"true\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<div ng-if=\"!homeCtl.isOpenMenu\" class=\"lock-size\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-fab-speed-dial md-direction=\"right\" ng-mouseenter=\"$root.isOpenFab=true\" ng-mouseleave=\"$root.isOpenMFab=false\" md-open=\"$root.isOpenFab\" class=\"md-scale md-fab-bottom-left\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-fab-trigger>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 11, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-button aria-label=\"menu\" ng-click=\"$root.isOpenMenu=true;\" class=\"md-fab md-default\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 13, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<ng-md-icon icon=\"menu\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-fab-trigger>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 14, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-fab-actions>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 15, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<div fx-toolbar layout=\"row\" items=\"homeCtl.toolbars\" ctls=\"homeCtl\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-fab-actions>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-fab-speed-dial>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "//- md-toolbar.md-whiteframe-glow-z1.md-accent(md-style-color=\"{'background-color': 'primary.A200'}\")\n//-     div.md-toolbar-tools(fx-toolbar,items=\"homeCtl.toolbar\",layout=\"row\",ctls=\"homeCtl\")\nmd-content(flex=\"100\",layout=\"row\")\n    md-sidenav.md-sidenav-left(ui-view=\"sidenavLeft\",md-is-locked-open=\"$root.isOpenMenu\",md-component-id=\"left\",md-whiteframe=\"4\",layout=\"column\")\n    md-sidenav.md-sidenav-right(md-component-id=\"right\",ui-view=\"sidenavRight\",layout=\"column\",md-whiteframe=\"4\")\n    md-content(ui-view=\"content\",flex=\"100\",layout=\"column\")\n    div(execute-cmd,real-time=\"true\")\n    div.lock-size(ng-if=\"!homeCtl.isOpenMenu\")\n        md-fab-speed-dial.md-scale.md-fab-bottom-left(md-direction=\"right\",ng-mouseenter=\"$root.isOpenFab=true\",ng-mouseleave=\"$root.isOpenMFab=false\",md-open=\"$root.isOpenFab\")\n            md-fab-trigger\n                md-button.md-fab.md-default(aria-label=\"menu\",ng-click=\"$root.isOpenMenu=true;\")\n                    md-icon\n                        ng-md-icon(icon=\"menu\")\n            md-fab-actions\n                div(fx-toolbar,layout=\"row\",items=\"homeCtl.toolbars\",ctls=\"homeCtl\")");
	}
	}

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-content flex=\"100\" layout=\"column\" ng-cloak>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<section layout=\"row\" ng-href=\"home.page\" flex class=\"logo\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<div fx-toolbar items=\"sideLeftCtl.toolbar\" layout=\"row\" ctls=\"sideLeftCtl\" class=\"md-toolbar-tools\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<fx-side-menu-search>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</fx-side-menu-search>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-content flex=\"100\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<fx-side-menu selected-nodes=\"sideLeftCtl.selectedNodes\" modules=\"sideLeftCtl.modules\" ng-click=\"sideLeftCtl.doLinkBind\" class=\"side-menu\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-button ng-click=\"sideCtl.doLinkPre($event,node)\" md-style-color=\"{'background-color': sideCtl.isSelected(node) ? 'primary.300': 'primary.0'}\" class=\"layout-fill\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<div flex=\"100\" layout=\"row\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 11, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<ng-md-icon icon=\"{{ node.icon||'apps'}}\" md-style-color=\"{'color': sideCtl.isSelected(node) ? 'accent.300': 'primary.500'}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<div flex=\"100\" class=\"md-margin\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 12, jade_debug[0].filename ));
	buf.push("{{node.title}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 13, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 14, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<ng-md-icon options=\"{&quot;rotation&quot;: &quot;none&quot;}\" ng-if=\"!sideCtl.isLeaf(node)\" icon=\"{{ sideCtl.isShowChildren(node)?'expand_more':'chevron_right' }}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</fx-side-menu>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 15, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 16, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<div fx-toolbar items=\"sideLeftCtl.toolbarBottom\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(flex=\"100\",layout=\"column\",ng-cloak)\n    section.logo(layout=\"row\",ng-href=\"home.page\",flex)\n        div.md-toolbar-tools(fx-toolbar,items=\"sideLeftCtl.toolbar\",layout=\"row\",ctls=\"sideLeftCtl\")\n    md-divider\n    fx-side-menu-search\n    md-content(flex=\"100\")\n        fx-side-menu.side-menu(selected-nodes=\"sideLeftCtl.selectedNodes\",modules=\"sideLeftCtl.modules\",ng-click=\"sideLeftCtl.doLinkBind\")\n            md-button.layout-fill(ng-click=\"sideCtl.doLinkPre($event,node)\",md-style-color=\"{'background-color': sideCtl.isSelected(node) ? 'primary.300': 'primary.0'}\")\n                div(flex=\"100\",layout=\"row\")\n                    md-icon\n                        ng-md-icon(icon=\"{{ node.icon||'apps'}}\",md-style-color=\"{'color': sideCtl.isSelected(node) ? 'accent.300': 'primary.500'}\")\n                    div.md-margin(flex=\"100\") {{node.title}}\n                    md-icon\n                        ng-md-icon(options='{\"rotation\": \"none\"}',ng-if=\"!sideCtl.isLeaf(node)\",icon=\"{{ sideCtl.isShowChildren(node)?'expand_more':'chevron_right' }}\")\n    md-divider\n    div(fx-toolbar,items=\"sideLeftCtl.toolbarBottom\")");
	}
	}

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<md-content flex layout=\"column\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<md-content flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<!--md-list-->");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<!--    md-list-item(aria-label=\"样式\", ng-click=\"sideRightCtl.showTheme($event)\")-->");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<!--        md-icon-->");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<!--            ng-md-icon(icon=\"style\")-->");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<!--    md-list-item(ng-repeat=\"color in sideRightCtl.colors\",ng-click=\"sideRightCtl.selectTheme(color)\",md-colors=\"{background: '{{color}}'}\",md-colors-watch=\"false\")-->");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<!--        p {{color}}-->");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<div layout=\"row\" layout-align=\"start center\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 11, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<md-button ng-click=\"sideRightCtl.doExit($event)\" flex aria-label=\"退出\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<md-tooltip md-direction=\"top\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 12, jade_debug[0].filename ));
	buf.push("退出");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-tooltip>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 13, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 14, "/srv/blessing/public/src/pages/home/tpls/sidenavr.template.jade" ));
	buf.push("<ng-md-icon icon=\"settings_power\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(flex,layout=\"column\")\n    md-content(flex)\n        //md-list\n        //    md-list-item(aria-label=\"样式\", ng-click=\"sideRightCtl.showTheme($event)\")\n        //        md-icon\n        //            ng-md-icon(icon=\"style\")\n        //    md-list-item(ng-repeat=\"color in sideRightCtl.colors\",ng-click=\"sideRightCtl.selectTheme(color)\",md-colors=\"{background: '{{color}}'}\",md-colors-watch=\"false\")\n        //        p {{color}}\n    md-divider\n    div(layout=\"row\",layout-align=\"start center\")\n        md-button(ng-click=\"sideRightCtl.doExit($event)\",flex,aria-label=\"退出\")\n            md-tooltip(md-direction=\"top\") 退出\n            md-icon\n                ng-md-icon(icon=\"settings_power\")");
	}
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	buf.push("<md-content flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	buf.push("<md-content gridster=\"contentCtl.gridsterOpts\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	buf.push("<ul flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	buf.push("<li gridster-item=\"item\" ng-repeat=\"item in contentCtl.standardItems\" ng-class=\"item.class\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	buf.push("<md-content flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	buf.push("<md-toolbar class=\"md-hue-2\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	buf.push("<div class=\"md-toolbar-tools\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	buf.push("<h2>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	buf.push("<span>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 10, jade_debug[0].filename ));
	buf.push("{{$index}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</h2>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-toolbar>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 13, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 14, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 15, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 16, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 17, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 18, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 19, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 19, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</li>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</ul>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(flex)\n    //- h1 雅典娜\n    md-content(gridster=\"contentCtl.gridsterOpts\")\n        ul(flex)\n            li(gridster-item=\"item\",ng-repeat=\"item in contentCtl.standardItems\",ng-class=\"item.class\")\n                md-content(flex)\n                    md-toolbar(class=\"md-hue-2\")\n                        div.md-toolbar-tools\n                            h2\n                                span {{$index}}\n                //- md-input-container.md-block.no-errors\n                //-     label 搜索图标\n                //-     input(ng-model=\"contentCtl.filter\")\n                //- md-content(flex)\n                //-     md-button(ng-click=\"contentCtl.doOpenIconInfo($event,icon)\",ng-repeat=\"icon in contentCtl.icons | filter:contentCtl.filter | orderBy | limitTo:50 \")\n                //-         div(layout=\"column\")\n                //-             md-icon\n                //-                 ng-md-icon(icon=\"{{::icon}}\")\n                //-             span {{::icon}}");
	}
	}

/***/ },
/* 140 */,
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(13);
	var ngMaterialIcons = __webpack_require__(11);
	var ngMaterial = __webpack_require__(1);
	var Service = (function () {
	    function Service() {
	    }
	    Service._name = "svgUtils";
	    Service.provider = ["$q", "$templateRequest", "$templateCache", "ngMdIconService", function ($q, $templateRequest, $templateCache, ngMdIconService) {
	            var Service = (function () {
	                function Service() {
	                }
	                Service.prototype.getAllIcons = function () {
	                    return ngMdIconService.getShapes();
	                };
	                Service.prototype.loadSvgUrl = function (url) {
	                    var defer = $q.defer();
	                    var viewBox;
	                    if ($templateCache.get(url)) {
	                        defer.resolve();
	                    }
	                    else {
	                        $templateRequest(url, true).then(function (response) {
	                            var svg = angular.element('<div>').append(response).find('svg')[0];
	                            viewBox = svg.attributes["viewBox"];
	                            _.each(svg.querySelectorAll("[id]"), function (g) {
	                                ngMdIconService.addShape(g.id, g.innerHTML);
	                                if (viewBox && viewBox.value) {
	                                    ngMdIconService.addViewBox(g.id, viewBox.value);
	                                }
	                            });
	                            defer.resolve();
	                        }, defer.resolve);
	                    }
	                    return defer.promise;
	                };
	                return Service;
	            }());
	            return new Service();
	        }];
	    return Service;
	}());
	var module = angular.module("mdSvgModule", [ngMaterialIcons, ngMaterial]);
	module.service(Service._name, Service.provider);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(143);
	__webpack_require__(150);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(13);
	var _name = "fxToolbar";
	var Strategy = (function () {
	    function Strategy() {
	        this.tools = {};
	    }
	    Strategy.prototype.register = function (key, template) {
	        this.tools[key] = template;
	    };
	    Strategy.prototype.get = function (key) {
	        return this.tools[key] || "";
	    };
	    return Strategy;
	}());
	var strategy = new Strategy();
	strategy.register("icon", __webpack_require__(144)());
	strategy.register("btn", __webpack_require__(145)());
	strategy.register("layout", __webpack_require__(146)());
	strategy.register("label", __webpack_require__(147)());
	strategy.register("menu", __webpack_require__(148)());
	strategy.register("menuItem", __webpack_require__(149)());
	var Controller = (function () {
	    function Controller($scope, $rootScope, $compile, $interpolate, materialUtils) {
	        this.$scope = $scope;
	        this.$rootScope = $rootScope;
	        this.$compile = $compile;
	        this.$interpolate = $interpolate;
	        this.materialUtils = materialUtils;
	    }
	    Controller.prototype.openMenu = function ($mdOpenMenu, ev) {
	        $mdOpenMenu(ev);
	    };
	    Controller.prototype.dig = function (models, $ele, $scope) {
	        var _this = this;
	        _.each(models, function (model) {
	            var template = strategy.get(model['type']);
	            var $newScope = $scope.$new(true, $scope);
	            var tmp, $newEle;
	            if (!template) {
	                template = model.template;
	            }
	            if (!template) {
	                return console.error("没有模板或者找不到类型!");
	            }
	            model = _.cloneDeep(model);
	            model.disabled = "" + _this.ngDisabled;
	            model.materialUtils = _this.materialUtils;
	            model.ngModel = _this.ngModel;
	            model.index = _this.index;
	            if (model.conditionInfo && model.conditionInfo.condition) {
	                if (model.conditionInfo.prefix) {
	                    model.condition = model['type'] + "Ctl." + model.conditionInfo.condition;
	                }
	                else {
	                    model.condition = "" + model.conditionInfo.condition;
	                }
	            }
	            else {
	                model.condition = "true";
	            }
	            $newScope[(model['type'] + "Ctl")] = _.clone(model);
	            if (_this.ctls) {
	                $newScope[_this.ctls] = $scope.$parent[_this.ctls] || {};
	            }
	            _this.$scope.$watch(function () {
	                return _this.index;
	            }, function (newValue, oldValue) {
	                if (newValue != oldValue) {
	                    $newScope[(model['type'] + "Ctl")]["index"] = newValue;
	                }
	            });
	            tmp = _this.$interpolate(template)($newScope);
	            $newEle = angular.element(tmp);
	            _.each(model.attributes, function (attr, key) {
	                $newEle.attr(key, attr);
	            });
	            $newEle = _this.$compile($newEle)($newScope);
	            $ele.append($newEle);
	            if (_.isArray(model.tools)) {
	                _this.dig(model.tools, $newEle, $newScope);
	            }
	        });
	    };
	    Controller.$inject = ["$scope", "$rootScope", "$compile", "$interpolate", "materialUtils"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        require: [_name],
	        scope: {},
	        bindToController: {
	            ctls: '@',
	            ngDisabled: '@',
	            items: "=",
	            ngModel: '=',
	            index: '=?'
	        },
	        controllerAs: 'toolbarCtl',
	        controller: Controller,
	        replace: false,
	        link: function ($scope, $ele, $attr, $ctl) {
	            $scope.$watchCollection(function () {
	                return $ctl[0].items;
	            }, function (newValue) {
	                var model = newValue;
	                if (!model)
	                    return;
	                if (!_.isObject(model) && !_.isArray(model)) {
	                    return console.error("items只能是对象或者数组!");
	                }
	                $ctl[0].dig(_.isArray(model) ? model : [model], $ele, $scope);
	            });
	        }
	    };
	}
	Directive.$inject = [];
	exports.module = angular.module(_name + "Module", []).directive(_name, Directive);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/icon.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/icon.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/icon.jade" ));
	buf.push("<md-icon ng-if=\"iconCtl.icon\" md-menu-align-target>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/toolbar/tpls/icon.jade" ));
	buf.push("<ng-md-icon icon=\"{{iconCtl.icon.icon}}\" ng-style=\"iconCtl.icon.style\" options=\"{&quot;rotation&quot;:&quot;none&quot;}\" size=\"{{iconCtl.size}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-icon(ng-if=\"iconCtl.icon\",md-menu-align-target)\n    ng-md-icon(icon=\"{{iconCtl.icon.icon}}\",ng-style=\"iconCtl.icon.style\",options='{\"rotation\":\"none\"}',size='{{iconCtl.size}}')");
	}
	}

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<md-button ng-if=\"{{btnCtl.condition}}\" ng-class=\"btnCtl.className\" aria-label=\"{{btnCtl.title}}\" ng-click=\"btnCtl.onClick($event,btnCtl.ngModel,btnCtl.index)\" ng-disabled=\"{{btnCtl.disabled}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<md-tooltip ng-if=\"btnCtl.tooltip\" md-direction=\"{{btnCtl.tooltip.position}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, jade_debug[0].filename ));
	buf.push("{{btnCtl.tooltip.title || btnCtl.title}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-tooltip>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<md-icon ng-if=\"btnCtl.icon &amp;&amp; btnCtl.icon.icon\" md-menu-align-target ng-style=\"btnCtl.icon.style\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<ng-md-icon icon=\"{{btnCtl.icon.icon}}\" ng-style=\"btnCtl.icon.style\" options=\"{&quot;rotation&quot;:&quot;none&quot;}\" size=\"{{btnCtl.icon.size||'24px'}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<span ng-if=\"btnCtl.showTitle\" layout-padding>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, jade_debug[0].filename ));
	buf.push("{{btnCtl.title}} ");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<span ng-hide=\"true\" ng-bind=\"{{btnCtl.disabled}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<md-icon ng-if=\"btnCtl.icon &amp;&amp; btnCtl.icon.ricon\" md-menu-align-target ng-style=\"btnCtl.icon.style\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<ng-md-icon icon=\"{{btnCtl.icon.ricon}}\" ng-style=\"btnCtl.icon.style\" options=\"{&quot;rotation&quot;:&quot;none&quot;}\" size=\"{{btnCtl.icon.size||'24px'}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-button(ng-if=\"{{btnCtl.condition}}\",ng-class=\"btnCtl.className\",aria-label=\"{{btnCtl.title}}\",ng-click=\"btnCtl.onClick($event,btnCtl.ngModel,btnCtl.index)\",ng-disabled=\"{{btnCtl.disabled}}\")\n    md-tooltip(ng-if=\"btnCtl.tooltip\",md-direction=\"{{btnCtl.tooltip.position}}\") {{btnCtl.tooltip.title || btnCtl.title}}\n    md-icon(ng-if=\"btnCtl.icon && btnCtl.icon.icon\",md-menu-align-target,ng-style=\"btnCtl.icon.style\")\n        ng-md-icon(icon=\"{{btnCtl.icon.icon}}\",ng-style=\"btnCtl.icon.style\",options='{\"rotation\":\"none\"}',size=\"{{btnCtl.icon.size||'24px'}}\")\n    span(ng-if=\"btnCtl.showTitle\",layout-padding) {{btnCtl.title}} \n    span(ng-hide=\"true\",ng-bind=\"{{btnCtl.disabled}}\")\n    md-icon(ng-if=\"btnCtl.icon && btnCtl.icon.ricon\",md-menu-align-target,ng-style=\"btnCtl.icon.style\")\n        ng-md-icon(icon=\"{{btnCtl.icon.ricon}}\",ng-style=\"btnCtl.icon.style\",options='{\"rotation\":\"none\"}',size=\"{{btnCtl.icon.size||'24px'}}\")");
	}
	}

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/layout.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/layout.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/layout.jade" ));
	buf.push("<div layout=\"{{layoutCtl.layout}}\" flex=\"{{layoutCtl.flex}}\" layout-align=\"{{layoutCtl.layoutAlign}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "div(layout=\"{{layoutCtl.layout}}\",flex=\"{{layoutCtl.flex}}\",layout-align=\"{{layoutCtl.layoutAlign}}\")");
	}
	}

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/label.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/label.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/label.jade" ));
	buf.push("<span ng-class=\"labelCtl.cls\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 1, jade_debug[0].filename ));
	buf.push("{{labelCtl.title}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "span(ng-class=\"labelCtl.cls\") {{labelCtl.title}}");
	}
	}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<md-menu md-offset=\"2 0\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<md-button ng-class=\"menuCtl.className\" aria-label=\"菜单\" ng-click=\"menuCtl.materialUtils.openMenu($mdOpenMenu,$event)\" ng-disabled=\"{{menuCtl.disabled}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<md-tooltip ng-if=\"menuCtl.tooltip\" md-direction=\"{{menuCtl.tooltip.position}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, jade_debug[0].filename ));
	buf.push("{{menuCtl.tooltip.title || menuCtl.title}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-tooltip>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<md-icon ng-if=\"menuCtl.icon\" md-menu-origin>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<ng-md-icon icon=\"{{menuCtl.icon.icon}}\" ng-style=\"menuCtl.icon.style\" options=\"{&quot;rotation&quot;:&quot;none&quot;}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<md-menu-content width=\"{{menuCtl.width}}\" fx-toolbar items=\"menuCtl.items\" ng-model=\"menuCtl.ngModel\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-menu-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-menu>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-menu(md-offset=\"2 0\")\n    md-button(ng-class=\"menuCtl.className\",aria-label=\"菜单\",ng-click=\"menuCtl.materialUtils.openMenu($mdOpenMenu,$event)\",ng-disabled=\"{{menuCtl.disabled}}\")\n        md-tooltip(ng-if=\"menuCtl.tooltip\",md-direction=\"{{menuCtl.tooltip.position}}\") {{menuCtl.tooltip.title || menuCtl.title}}\n        md-icon(ng-if=\"menuCtl.icon\",md-menu-origin)\n            ng-md-icon(icon=\"{{menuCtl.icon.icon}}\",ng-style=\"menuCtl.icon.style\",options='{\"rotation\":\"none\"}')\n    md-menu-content(width=\"{{menuCtl.width}}\",fx-toolbar,items=\"menuCtl.items\",ng-model=\"menuCtl.ngModel\")\n");
	}
	}

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menu-item.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/menu-item.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menu-item.jade" ));
	buf.push("<md-menu-item fx-toolbar ng-if=\"{{menuItemCtl.condition}}\" ng-init=\"item = menuItemCtl;item.type='btn'\" items=\"item\" ng-model=\"menuItemCtl.ngModel\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-menu-item>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-menu-item(fx-toolbar,ng-if=\"{{menuItemCtl.condition}}\",ng-init=\"item = menuItemCtl;item.type='btn'\",items=\"item\",ng-model=\"menuItemCtl.ngModel\")\n");
	}
	}

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var module_1 = __webpack_require__(143);
	var _ = __webpack_require__(13);
	__webpack_require__(19);
	var Service = (function () {
	    function Service() {
	    }
	    Service._name = "toolbarUtils";
	    Service.provider = [function () {
	            var Base = (function () {
	                function Base(data) {
	                    this.data = data;
	                }
	                Base.prototype.conditionBuilder = function (condition, prefix) {
	                    if (prefix === void 0) { prefix = true; }
	                    this.data = _.extend({}, this.data, {
	                        conditionInfo: {
	                            condition: condition,
	                            prefix: prefix
	                        }
	                    });
	                    return this;
	                };
	                Base.prototype.noOptions = function (tooltip, icon) {
	                    if (tooltip === void 0) { tooltip = false; }
	                    if (icon === void 0) { icon = false; }
	                    tooltip && delete this.data.tooltip;
	                    icon && delete this.data.icon;
	                    return this;
	                };
	                Base.prototype.tooltipBuilder = function (title, position) {
	                    if (title === void 0) { title = ""; }
	                    if (position === void 0) { position = "bottom"; }
	                    this.data = _.extend({}, this.data, {
	                        tooltip: {
	                            title: title,
	                            position: position
	                        }
	                    });
	                    return this;
	                };
	                Base.prototype.iconBuilder = function (icon, style, ricon, options, size) {
	                    this.data = _.extend({}, this.data, {
	                        icon: {
	                            icon: icon,
	                            ricon: ricon,
	                            style: style,
	                            size: size || '24px'
	                        }
	                    });
	                    return this;
	                };
	                Base.prototype.attrBuilder = function (attributes) {
	                    this.data = _.extend({}, this.data, {
	                        attributes: attributes
	                    });
	                    return this;
	                };
	                Base.prototype.toolsBuilder = function (tools) {
	                    this.data = _.extend({}, this.data, {
	                        tools: tools || []
	                    });
	                    return this;
	                };
	                Base.prototype.btnClick = function (func) {
	                    if (func && _.isFunction(func)) {
	                        this.data = _.extend({}, this.data, {
	                            onClick: func
	                        });
	                    }
	                    return this;
	                };
	                Base.prototype.menuOptionsBuilder = function (width, items) {
	                    if (width === void 0) { width = 4; }
	                    if (items === void 0) { items = []; }
	                    this.data = _.extend({}, this.data, {
	                        width: width || 4,
	                        items: items || []
	                    });
	                    return this;
	                };
	                Base.prototype.toValue = function () {
	                    return this.data;
	                };
	                return Base;
	            }());
	            var Service = (function (_super) {
	                __extends(Service, _super);
	                function Service(data) {
	                    _super.call(this, data);
	                    this.data = data;
	                }
	                Service.prototype.btnBuilder = function (title, className, showTitle, tooltipPosition) {
	                    if (showTitle === void 0) { showTitle = true; }
	                    if (tooltipPosition === void 0) { tooltipPosition = "bottom"; }
	                    var service = new Service({
	                        type: "btn",
	                        title: title,
	                        className: className,
	                        showTitle: showTitle
	                    });
	                    service.tooltipBuilder(title, tooltipPosition);
	                    return service;
	                };
	                Service.prototype.menuBuilder = function (title, className, showTitle, tooltipPosition) {
	                    if (showTitle === void 0) { showTitle = true; }
	                    if (tooltipPosition === void 0) { tooltipPosition = "bottom"; }
	                    var service = this.btnBuilder(title, className, showTitle, tooltipPosition);
	                    service.data.type = "menu";
	                    return service;
	                };
	                Service.prototype.menuItemBuilder = function (title, className, showTitle, tooltipPosition) {
	                    if (showTitle === void 0) { showTitle = true; }
	                    if (tooltipPosition === void 0) { tooltipPosition = "bottom"; }
	                    var service = this.btnBuilder(title, className, showTitle, tooltipPosition);
	                    service.data.type = "menuItem";
	                    return service;
	                };
	                Service.prototype.labelBuilder = function (title, cls) {
	                    return new Service({
	                        type: "label",
	                        title: title,
	                        cls: cls
	                    });
	                };
	                Service.prototype.layoutBuilder = function (flex, layout, layoutAlign) {
	                    if (flex === void 0) { flex = "none"; }
	                    if (layout === void 0) { layout = "none"; }
	                    if (layoutAlign === void 0) { layoutAlign = "none none"; }
	                    return new Service({
	                        type: "layout",
	                        flex: flex,
	                        layout: layout,
	                        layoutAlign: layoutAlign
	                    });
	                };
	                Service.prototype.noneBuilder = function (type) {
	                    return new Service({
	                        type: type
	                    });
	                };
	                return Service;
	            }(Base));
	            return new Service();
	        }];
	    return Service;
	}());
	module_1.module.service(Service._name, Service.provider);


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(152);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(162);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(13);
	__webpack_require__(153);
	var _name = "fxSideMenu", _module = _name + "Module";
	var Controller = (function () {
	    function Controller($scope, $compile, $interpolate, mdSideMenuSections) {
	        this.$scope = $scope;
	        this.$compile = $compile;
	        this.$interpolate = $interpolate;
	        this.mdSideMenuSections = mdSideMenuSections;
	        this.options = {};
	        this.template = $compile($interpolate(__webpack_require__(155)())({
	            opts: mdSideMenuSections.options
	        }));
	        this.options = this.mdSideMenuSections.options;
	    }
	    Controller.prototype.doLinkPre = function ($event, node) {
	        if (_.isFunction(this.doLink)) {
	            this.doLink($event, node);
	        }
	        console.log(node);
	    };
	    Controller.prototype.showChildren = function (node) {
	        var opts = this.mdSideMenuSections.options;
	        if (this.selectedNodes.hasOwnProperty(node[opts.key])) {
	            delete this.selectedNodes[node[opts.key]];
	        }
	        else {
	            if (node[opts.children] && node[opts.children].length) {
	                this.selectedNodes[node[opts.key]] = node;
	            }
	        }
	    };
	    Controller.prototype.isShowChildren = function (node) {
	        var opts = this.mdSideMenuSections.options;
	        return !!this.selectedNodes[node[opts.key]];
	    };
	    Controller.prototype.isLeaf = function (node) {
	        var opts = this.mdSideMenuSections.options;
	        return node.rgt - node.lft == 1 || !node[opts.children] || node[opts.children].length == 0;
	    };
	    Controller.prototype.isSelected = function (node) {
	        var opts = this.mdSideMenuSections.options;
	        return !!this.mdSideMenuSections.selectedNode && this.mdSideMenuSections.selectedNode[opts.key] == node[opts.key];
	    };
	    Controller.$inject = ["$scope", "$compile", "$interpolate", "mdSideMenuSections"];
	    return Controller;
	}());
	function Directive(mdSideMenuSections) {
	    return {
	        restrict: 'EA',
	        replace: false,
	        require: _name,
	        transclude: true,
	        controllerAs: "sideCtl",
	        scope: {
	            modules: '='
	        },
	        bindToController: {
	            selectedNodes: '=',
	            doLink: '=?ngClick'
	        },
	        controller: Controller,
	        compile: function ($ele, $attr, childTranscludeFn) {
	            return function ($scope, $element, attrs, $ctrl) {
	                $scope.$watch("modules", function updateNodeOnRootScope(newValue) {
	                    var opts = mdSideMenuSections.options;
	                    if (_.isArray(newValue)) {
	                        if (angular.isDefined($scope.node) && angular.equals($scope.node[opts.children], newValue)) {
	                            return;
	                        }
	                        $scope.node = {};
	                        $scope.node[opts.children] = newValue;
	                    }
	                    else {
	                        if (angular.equals($scope.node, newValue)) {
	                            return;
	                        }
	                        $scope.node = newValue;
	                    }
	                });
	                $ctrl.template($scope, function (clone) {
	                    $element.html('').append(clone);
	                });
	                $scope.$sideMenuTransclude = childTranscludeFn;
	            };
	        }
	    };
	}
	exports.module = angular.module(_module, ["ngAnimate", "ngMaterial"]).directive(_name, ["mdSideMenuSections", Directive]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(154);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(130)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./sidemenu.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./sidemenu.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(129)();
	// imports
	
	
	// module
	exports.push([module.id, ".side-menu ul, .side-menu li {\n  padding: 0;\n  margin: 0; }\n\n.side-menu ul li button {\n  text-align: left; }\n\n.side-menu button, .side-menu a {\n  padding: 0;\n  margin: 0; }\n  .side-menu button > md-content, .side-menu a > md-content {\n    padding-left: 5px; }\n\n.side-menu .side-menu-child {\n  position: relative;\n  display: block; }\n  .side-menu .side-menu-child button, .side-menu .side-menu-child a {\n    border-radius: 0;\n    background: transparent; }\n    .side-menu .side-menu-child button:hover > md-content:before, .side-menu .side-menu-child a:hover > md-content:before {\n      display: block; }\n  .side-menu .side-menu-child > ul li button, .side-menu .side-menu-child > ul li a {\n    padding-left: 25px; }\n    .side-menu .side-menu-child > ul li button:before, .side-menu .side-menu-child > ul li a:before {\n      display: none;\n      background-color: transparent;\n      padding-left: 20px;\n      content: '';\n      position: absolute;\n      z-index: 1;\n      left: 0px;\n      top: 0;\n      bottom: 0px;\n      border-left: 3px solid #e2e2e2; }\n  .side-menu .side-menu-child .side-menu-child ul li button, .side-menu .side-menu-child .side-menu-child ul li a {\n    padding-left: 50px; }\n", ""]);
	
	// exports


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<ul ng-if=\"node.{{opts.children}}.length\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<li ng-if=\"node.showed\" ng-repeat=\"node in node.{{opts.children}} | filter: sideCtl.options.filterExpression | orderBy:['{{opts.orderBy}}']:true\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<div fx-side-menu-content-transclude ng-click=\"sideCtl.showChildren(node)\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<md-divider ng-if=\"node.depth===1\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<fx-side-menu-child ng-show=\"sideCtl.isShowChildren(node)\" class=\"side-menu-child\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</fx-side-menu-child>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</li>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</ul>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<md-divider ng-if=\"!$last &amp;&amp; node.depth&gt;1\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "ul(ng-if=\"node.{{opts.children}}.length\")\n    li(ng-if=\"node.showed\",ng-repeat=\"node in node.{{opts.children}} | filter: sideCtl.options.filterExpression | orderBy:['{{opts.orderBy}}']:true\")\n        div(fx-side-menu-content-transclude,ng-click=\"sideCtl.showChildren(node)\")\n        md-divider(ng-if=\"node.depth===1\")\n        fx-side-menu-child.side-menu-child(ng-show=\"sideCtl.isShowChildren(node)\")\nmd-divider(ng-if=\"!$last && node.depth>1\")\n");
	}
	}

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(152);
	function Provider() {
	    var _sections = [], _theme, _palettes;
	    this.initWithSections = function (value) {
	        _sections = value ? value : [];
	    };
	    this.initWithTheme = function (value) {
	        _theme = value.theme();
	        _palettes = value._PALETTES;
	    };
	    this.$get = [function () {
	            var MdSideMenuSections = function () {
	                this.sections = _sections;
	                this.selectedNode = null;
	                this.options = {};
	                this.theme = _theme;
	                this.palettes = _palettes;
	                this.searchStr = "";
	            };
	            return new MdSideMenuSections();
	        }];
	}
	module_1.module.provider('mdSideMenuSections', [Provider]);


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(152);
	function Directive() {
	    return {
	        link: function ($scope, $element, $attrs, $ctrl) {
	            $scope['$sideMenuTransclude']($scope, function (clone) {
	                $element.empty();
	                $element.append(clone);
	            });
	        }
	    };
	}
	module_1.module.directive('fxSideMenuContentTransclude', Directive);


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(152);
	function Directive() {
	    return {
	        restrict: 'EA',
	        require: '^fxSideMenu',
	        link: function ($scope, $element, $attrs, $ctrl) {
	            $ctrl['template']($scope, function (clone) {
	                $element.html('').append(clone);
	            });
	        }
	    };
	}
	module_1.module.directive('fxSideMenuChild', Directive);


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(152);
	var _name = "mdStyleColor";
	function Directive(mdSideMenuSections) {
	    return {
	        restrict: 'A',
	        scope: {
	            mdStyleColor: '='
	        },
	        link: function ($scope, $element, $attrs) {
	            var themeColors, split, hueR, colorR, colorA, hueA, colorValue, _apply_color = function () {
	                for (var p in $scope[_name]) {
	                    if ($scope[_name].hasOwnProperty(p)) {
	                        themeColors = mdSideMenuSections.theme.colors,
	                            split = ($scope[_name][p] || '').split('.');
	                        if (split.length < 2) {
	                            split.unshift('primary');
	                        }
	                        hueR = split[1] || 'hue-1';
	                        colorR = split[0] || 'primary';
	                        colorA = themeColors[colorR] ? themeColors[colorR].name : colorR;
	                        hueA = themeColors[colorR] ? (themeColors[colorR].hues[hueR] || hueR) : hueR;
	                        colorValue = mdSideMenuSections.palettes[colorA][hueA] ? mdSideMenuSections.palettes[colorA][hueA].value : mdSideMenuSections.palettes[colorA]['500'].value;
	                        if (hueA !== '0') {
	                            $element.css(p, 'rgb(' + colorValue.join(',') + ')');
	                        }
	                        else {
	                            $element.css(p, 'transparent');
	                        }
	                    }
	                }
	            };
	            if (!mdSideMenuSections.theme || !mdSideMenuSections.palettes) {
	                return console.warn('you probably want to ssSideNavSectionsProvider.initWithTheme($mdThemingProvider)');
	            }
	            $scope.$watch(_name, function (oldVal, newVal) {
	                if ((oldVal && newVal) && oldVal !== newVal) {
	                    _apply_color();
	                }
	            }, true);
	            _apply_color();
	        }
	    };
	}
	module_1.module.directive(_name, ["mdSideMenuSections", Directive]);


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(152);
	function Directive(mdSideMenuSections, $timeout) {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(161),
	        controllerAs: "searchCtl",
	        link: function ($scope) {
	            $scope.searchText = "";
	            $scope.title = "搜索菜单";
	            $scope.$watch("searchText", function (newVal, oldVal) {
	                $timeout.cancel($scope.timeID);
	                $scope.timeID = $timeout(function () {
	                    mdSideMenuSections.options.filterExpression = newVal;
	                }, 1000);
	            });
	        }
	    };
	}
	module_1.module.directive('fxSideMenuSearch', ["mdSideMenuSections", "$timeout", Directive]);


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	buf.push("<md-input-container md-no-float class=\"md-icon-float md-block no-tb-margin no-errors no-borders\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	buf.push("<ng-md-icon icon=\"search\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	buf.push("<input placeholder=\"{{title}}\" aria-label=\"{{title}}\" ng-model=\"searchText\">");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-input-container>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-input-container(md-no-float,class=\"md-icon-float md-block no-tb-margin no-errors no-borders\")\n    md-icon\n        ng-md-icon(icon=\"search\")\n    input(placeholder=\"{{title}}\",aria-label=\"{{title}}\",  ng-model=\"searchText\")\nmd-divider");
	}
	}

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(152);
	var _ = __webpack_require__(13);
	function Factory($rootScope, $timeout, mdSideMenuSections) {
	    var onStateChangeStart = function (event, toState, toParams) {
	        var options = mdSideMenuSections.options;
	        function digest(sections, currentSection) {
	            !mdSideMenuSections.selectedNode && sections &&
	                _.forEach(sections, function (section) {
	                    if (section[mdSideMenuSections.options.children] && section[mdSideMenuSections.options.children].length) {
	                        digest(section[mdSideMenuSections.options.children], section);
	                    }
	                    if (section.showed && toState.name == section.link && toParams.key == section.key) {
	                        mdSideMenuSections.selectedNode = section;
	                        return false;
	                    }
	                });
	            return false;
	        }
	        mdSideMenuSections.selectedNode = null;
	        $timeout(function () {
	            digest(mdSideMenuSections.sections, null);
	        }, 10);
	    };
	    $rootScope.$on('$stateChangeSuccess', onStateChangeStart);
	    return {
	        onStateChangeStart: onStateChangeStart
	    };
	}
	module_1.module.factory('fxSideMenuFactory', ["$rootScope", "$timeout", "mdSideMenuSections", Factory]);


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["SVGMorpheus"] = __webpack_require__(164);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 164 */
/***/ function(module, exports) {

	/*!
	 * SVG Morpheus v0.3.0
	 * https://github.com/alexk111/SVG-Morpheus
	 *
	 * Copyright (c) 2016 Alex Kaul
	 * License: MIT
	 *
	 * Generated at Saturday, May 7th, 2016, 4:52:57 PM
	 */
	var rtn = (function() {
	    'use strict';
	
	    /*
	     * Easing functions
	     */
	
	    var easings = {};
	    easings['circ-in'] = function(t) {
	        return -1 * (Math.sqrt(1 - t * t) - 1);
	    };
	    easings['circ-out'] = function(t) {
	        return Math.sqrt(1 - (t = t - 1) * t);
	    };
	    easings['circ-in-out'] = function(t) {
	        if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
	        return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
	    };
	    easings['cubic-in'] = function(t) {
	        return t * t * t
	    };
	    easings['cubic-out'] = function(t) {
	        return (--t) * t * t + 1
	    };
	    easings['cubic-in-out'] = function(t) {
	        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
	    };
	    easings['elastic-in'] = function(t) {
	        var s = 1.70158;
	        var p = 0;
	        var a = 1;
	        if (t == 0) return 0;
	        if (t == 1) return 1;
	        if (!p) p = .3;
	        if (a < Math.abs(1)) {
	            a = 1;
	            var s = p / 4;
	        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
	        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
	    };
	    easings['elastic-out'] = function(t) {
	        var s = 1.70158;
	        var p = 0;
	        var a = 1;
	        if (t == 0) return 0;
	        if (t == 1) return 1;
	        if (!p) p = .3;
	        if (a < Math.abs(1)) {
	            a = 1;
	            var s = p / 4;
	        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
	        return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
	    };
	    easings['elastic-in-out'] = function(t) {
	        var s = 1.70158;
	        var p = 0;
	        var a = 1;
	        if (t == 0) return 0;
	        if ((t /= 1 / 2) == 2) return 1;
	        if (!p) p = 1 * (.3 * 1.5);
	        if (a < Math.abs(1)) {
	            a = 1;
	            var s = p / 4;
	        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
	        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
	        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * .5 + 1;
	    };
	    easings['expo-in'] = function(t) {
	        return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1));
	    };
	    easings['expo-out'] = function(t) {
	        return (t == 1) ? 1 : 1 - Math.pow(2, -10 * t);
	    };
	    easings['expo-in-out'] = function(t) {
	        if (t == 0) return 0;
	        if (t == 1) return 1;
	        if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
	        return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
	    };
	    easings['linear'] = function(t) {
	        return t
	    };
	    easings['quad-in'] = function(t) {
	        return t * t
	    };
	    easings['quad-out'] = function(t) {
	        return t * (2 - t)
	    };
	    easings['quad-in-out'] = function(t) {
	        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
	    };
	    easings['quart-in'] = function(t) {
	        return t * t * t * t
	    };
	    easings['quart-out'] = function(t) {
	        return 1 - (--t) * t * t * t
	    };
	    easings['quart-in-out'] = function(t) {
	        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
	    };
	    easings['quint-in'] = function(t) {
	        return t * t * t * t * t
	    };
	    easings['quint-out'] = function(t) {
	        return 1 + (--t) * t * t * t * t
	    };
	    easings['quint-in-out'] = function(t) {
	        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
	    };
	    easings['sine-in'] = function(t) {
	        return 1 - Math.cos(t * (Math.PI / 2));
	    };
	    easings['sine-out'] = function(t) {
	        return Math.sin(t * (Math.PI / 2));
	    };
	    easings['sine-in-out'] = function(t) {
	        return 1 / 2 * (1 - Math.cos(Math.PI * t));
	    };
	
	
	    /*
	     * Helper functions
	     */
	
	    var _reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
	    var _cancelAnimFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame;
	
	    // Calculate style
	    function styleNormCalc(styleNormFrom, styleNormTo, progress) {
	        var i, len, styleNorm = {};
	        for (i in styleNormFrom) {
	            switch (i) {
	                case 'fill':
	                case 'stroke':
	                    styleNorm[i] = clone(styleNormFrom[i]);
	                    styleNorm[i].r = styleNormFrom[i].r + (styleNormTo[i].r - styleNormFrom[i].r) * progress;
	                    styleNorm[i].g = styleNormFrom[i].g + (styleNormTo[i].g - styleNormFrom[i].g) * progress;
	                    styleNorm[i].b = styleNormFrom[i].b + (styleNormTo[i].b - styleNormFrom[i].b) * progress;
	                    styleNorm[i].opacity = styleNormFrom[i].opacity + (styleNormTo[i].opacity - styleNormFrom[i].opacity) * progress;
	                    break;
	                case 'opacity':
	                case 'fill-opacity':
	                case 'stroke-opacity':
	                case 'stroke-width':
	                    styleNorm[i] = styleNormFrom[i] + (styleNormTo[i] - styleNormFrom[i]) * progress;
	                    break;
	            }
	        }
	        return styleNorm;
	    }
	
	    function styleNormToString(styleNorm) {
	        var i;
	        var style = {};
	        for (i in styleNorm) {
	            switch (i) {
	                case 'fill':
	                case 'stroke':
	                    style[i] = rgbToString(styleNorm[i]);
	                    break;
	                case 'opacity':
	                case 'fill-opacity':
	                case 'stroke-opacity':
	                case 'stroke-width':
	                    style[i] = styleNorm[i];
	                    break;
	            }
	        }
	        return style;
	    }
	
	    function styleToNorm(styleFrom, styleTo) {
	        var styleNorm = [{}, {}];
	        var i;
	        for (i in styleFrom) {
	            switch (i) {
	                case 'fill':
	                case 'stroke':
	                    styleNorm[0][i] = getRGB(styleFrom[i]);
	                    if (styleTo[i] === undefined) {
	                        styleNorm[1][i] = getRGB(styleFrom[i]);
	                        styleNorm[1][i].opacity = 0;
	                    }
	                    break;
	                case 'opacity':
	                case 'fill-opacity':
	                case 'stroke-opacity':
	                case 'stroke-width':
	                    styleNorm[0][i] = styleFrom[i];
	                    if (styleTo[i] === undefined) {
	                        styleNorm[1][i] = 1;
	                    }
	                    break;
	            }
	        }
	        for (i in styleTo) {
	            switch (i) {
	                case 'fill':
	                case 'stroke':
	                    styleNorm[1][i] = getRGB(styleTo[i]);
	                    if (styleFrom[i] === undefined) {
	                        styleNorm[0][i] = getRGB(styleTo[i]);
	                        styleNorm[0][i].opacity = 0;
	                    }
	                    break;
	                case 'opacity':
	                case 'fill-opacity':
	                case 'stroke-opacity':
	                case 'stroke-width':
	                    styleNorm[1][i] = styleTo[i];
	                    if (styleFrom[i] === undefined) {
	                        styleNorm[0][i] = 1;
	                    }
	                    break;
	            }
	        }
	        return styleNorm;
	    }
	
	    // Calculate transform progress
	    function transCalc(transFrom, transTo, progress) {
	        var res = {};
	        for (var i in transFrom) {
	            switch (i) {
	                case 'rotate':
	                    res[i] = [0, 0, 0];
	                    for (var j = 0; j < 3; j++) {
	                        res[i][j] = transFrom[i][j] + (transTo[i][j] - transFrom[i][j]) * progress;
	                    }
	                    break;
	            }
	        }
	        return res;
	    }
	
	    function trans2string(trans) {
	        var res = '';
	        if (!!trans.rotate) {
	            res += 'rotate(' + trans.rotate.join(' ') + ')';
	        }
	        return res;
	    }
	
	    // Calculate curve progress
	    function curveCalc(curveFrom, curveTo, progress) {
	        var curve = [];
	        for (var i = 0, len1 = curveFrom.length; i < len1; i++) {
	            curve.push([curveFrom[i][0]]);
	            for (var j = 1, len2 = curveFrom[i].length; j < len2; j++) {
	                curve[i].push(curveFrom[i][j] + (curveTo[i][j] - curveFrom[i][j]) * progress);
	            }
	        }
	        return curve;
	    }
	
	    function clone(obj) {
	        var copy;
	
	        // Handle Array
	        if (obj instanceof Array) {
	            copy = [];
	            for (var i = 0, len = obj.length; i < len; i++) {
	                copy[i] = clone(obj[i]);
	            }
	            return copy;
	        }
	
	        // Handle Object
	        if (obj instanceof Object) {
	            copy = {};
	            for (var attr in obj) {
	                if (obj.hasOwnProperty(attr)) {
	                    copy[attr] = clone(obj[attr]);
	                }
	            }
	            return copy;
	        }
	
	        return obj;
	    }
	
	
	
	    /*
	     * Useful things from Adobe's Snap.svg adopted to the library needs
	     */
	
	    /*
	     * Paths
	     */
	
	    var spaces = "\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029";
	    var pathCommand = new RegExp("([a-z])[" + spaces + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + spaces + "]*,?[" + spaces + "]*)+)", "ig");
	    var pathValues = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + spaces + "]*,?[" + spaces + "]*", "ig");
	
	    // Parses given path string into an array of arrays of path segments
	    var parsePathString = function(pathString) {
	        if (!pathString) {
	            return null;
	        }
	
	        if (typeof pathString === typeof []) {
	            return pathString;
	        } else {
	            var paramCounts = { a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0 },
	                data = [];
	
	            String(pathString).replace(pathCommand, function(a, b, c) {
	                var params = [],
	                    name = b.toLowerCase();
	                c.replace(pathValues, function(a, b) {
	                    b && params.push(+b);
	                });
	                if (name == "m" && params.length > 2) {
	                    data.push([b].concat(params.splice(0, 2)));
	                    name = "l";
	                    b = b == "m" ? "l" : "L";
	                }
	                if (name == "o" && params.length == 1) {
	                    data.push([b, params[0]]);
	                }
	                if (name == "r") {
	                    data.push([b].concat(params));
	                } else
	                    while (params.length >= paramCounts[name]) {
	                        data.push([b].concat(params.splice(0, paramCounts[name])));
	                        if (!paramCounts[name]) {
	                            break;
	                        }
	                    }
	            });
	
	            return data;
	        }
	    };
	
	    // http://schepers.cc/getting-to-the-point
	    var catmullRom2bezier = function(crp, z) {
	        var d = [];
	        for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
	            var p = [
	                { x: +crp[i - 2], y: +crp[i - 1] },
	                { x: +crp[i], y: +crp[i + 1] },
	                { x: +crp[i + 2], y: +crp[i + 3] },
	                { x: +crp[i + 4], y: +crp[i + 5] }
	            ];
	            if (z) {
	                if (!i) {
	                    p[0] = { x: +crp[iLen - 2], y: +crp[iLen - 1] };
	                } else if (iLen - 4 == i) {
	                    p[3] = { x: +crp[0], y: +crp[1] };
	                } else if (iLen - 2 == i) {
	                    p[2] = { x: +crp[0], y: +crp[1] };
	                    p[3] = { x: +crp[2], y: +crp[3] };
	                }
	            } else {
	                if (iLen - 4 == i) {
	                    p[3] = p[2];
	                } else if (!i) {
	                    p[0] = { x: +crp[i], y: +crp[i + 1] };
	                }
	            }
	            d.push(["C",
	                (-p[0].x + 6 * p[1].x + p[2].x) / 6,
	                (-p[0].y + 6 * p[1].y + p[2].y) / 6,
	                (p[1].x + 6 * p[2].x - p[3].x) / 6,
	                (p[1].y + 6 * p[2].y - p[3].y) / 6,
	                p[2].x,
	                p[2].y
	            ]);
	        }
	
	        return d;
	
	    };
	
	    var ellipsePath = function(x, y, rx, ry, a) {
	        if (a == null && ry == null) {
	            ry = rx;
	        }
	        x = +x;
	        y = +y;
	        rx = +rx;
	        ry = +ry;
	        if (a != null) {
	            var rad = Math.PI / 180,
	                x1 = x + rx * Math.cos(-ry * rad),
	                x2 = x + rx * Math.cos(-a * rad),
	                y1 = y + rx * Math.sin(-ry * rad),
	                y2 = y + rx * Math.sin(-a * rad),
	                res = [
	                    ["M", x1, y1],
	                    ["A", rx, rx, 0, +(a - ry > 180), 0, x2, y2]
	                ];
	        } else {
	            res = [
	                ["M", x, y],
	                ["m", 0, -ry],
	                ["a", rx, ry, 0, 1, 1, 0, 2 * ry],
	                ["a", rx, ry, 0, 1, 1, 0, -2 * ry],
	                ["z"]
	            ];
	        }
	        return res;
	    };
	
	    var pathToAbsolute = function(pathArray) {
	        pathArray = parsePathString(pathArray);
	
	        if (!pathArray || !pathArray.length) {
	            return [
	                ["M", 0, 0]
	            ];
	        }
	        var res = [],
	            x = 0,
	            y = 0,
	            mx = 0,
	            my = 0,
	            start = 0,
	            pa0;
	        if (pathArray[0][0] == "M") {
	            x = +pathArray[0][1];
	            y = +pathArray[0][2];
	            mx = x;
	            my = y;
	            start++;
	            res[0] = ["M", x, y];
	        }
	        var crz = pathArray.length == 3 &&
	            pathArray[0][0] == "M" &&
	            pathArray[1][0].toUpperCase() == "R" &&
	            pathArray[2][0].toUpperCase() == "Z";
	        for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
	            res.push(r = []);
	            pa = pathArray[i];
	            pa0 = pa[0];
	            if (pa0 != pa0.toUpperCase()) {
	                r[0] = pa0.toUpperCase();
	                switch (r[0]) {
	                    case "A":
	                        r[1] = pa[1];
	                        r[2] = pa[2];
	                        r[3] = pa[3];
	                        r[4] = pa[4];
	                        r[5] = pa[5];
	                        r[6] = +pa[6] + x;
	                        r[7] = +pa[7] + y;
	                        break;
	                    case "V":
	                        r[1] = +pa[1] + y;
	                        break;
	                    case "H":
	                        r[1] = +pa[1] + x;
	                        break;
	                    case "R":
	                        var dots = [x, y].concat(pa.slice(1));
	                        for (var j = 2, jj = dots.length; j < jj; j++) {
	                            dots[j] = +dots[j] + x;
	                            dots[++j] = +dots[j] + y;
	                        }
	                        res.pop();
	                        res = res.concat(catmullRom2bezier(dots, crz));
	                        break;
	                    case "O":
	                        res.pop();
	                        dots = ellipsePath(x, y, pa[1], pa[2]);
	                        dots.push(dots[0]);
	                        res = res.concat(dots);
	                        break;
	                    case "U":
	                        res.pop();
	                        res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
	                        r = ["U"].concat(res[res.length - 1].slice(-2));
	                        break;
	                    case "M":
	                        mx = +pa[1] + x;
	                        my = +pa[2] + y;
	                    default:
	                        for (j = 1, jj = pa.length; j < jj; j++) {
	                            r[j] = +pa[j] + ((j % 2) ? x : y);
	                        }
	                }
	            } else if (pa0 == "R") {
	                dots = [x, y].concat(pa.slice(1));
	                res.pop();
	                res = res.concat(catmullRom2bezier(dots, crz));
	                r = ["R"].concat(pa.slice(-2));
	            } else if (pa0 == "O") {
	                res.pop();
	                dots = ellipsePath(x, y, pa[1], pa[2]);
	                dots.push(dots[0]);
	                res = res.concat(dots);
	            } else if (pa0 == "U") {
	                res.pop();
	                res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
	                r = ["U"].concat(res[res.length - 1].slice(-2));
	            } else {
	                for (var k = 0, kk = pa.length; k < kk; k++) {
	                    r[k] = pa[k];
	                }
	            }
	            pa0 = pa0.toUpperCase();
	            if (pa0 != "O") {
	                switch (r[0]) {
	                    case "Z":
	                        x = +mx;
	                        y = +my;
	                        break;
	                    case "H":
	                        x = r[1];
	                        break;
	                    case "V":
	                        y = r[1];
	                        break;
	                    case "M":
	                        mx = r[r.length - 2];
	                        my = r[r.length - 1];
	                    default:
	                        x = r[r.length - 2];
	                        y = r[r.length - 1];
	                }
	            }
	        }
	
	        return res;
	    };
	
	    var l2c = function(x1, y1, x2, y2) {
	        return [x1, y1, x2, y2, x2, y2];
	    };
	    var q2c = function(x1, y1, ax, ay, x2, y2) {
	        var _13 = 1 / 3,
	            _23 = 2 / 3;
	        return [
	            _13 * x1 + _23 * ax,
	            _13 * y1 + _23 * ay,
	            _13 * x2 + _23 * ax,
	            _13 * y2 + _23 * ay,
	            x2,
	            y2
	        ];
	    };
	    var a2c = function(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
	        // for more information of where this math came from visit:
	        // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
	        var _120 = Math.PI * 120 / 180,
	            rad = Math.PI / 180 * (+angle || 0),
	            res = [],
	            xy,
	            rotate = function(x, y, rad) {
	                var X = x * Math.cos(rad) - y * Math.sin(rad),
	                    Y = x * Math.sin(rad) + y * Math.cos(rad);
	                return { x: X, y: Y };
	            };
	        if (!recursive) {
	            xy = rotate(x1, y1, -rad);
	            x1 = xy.x;
	            y1 = xy.y;
	            xy = rotate(x2, y2, -rad);
	            x2 = xy.x;
	            y2 = xy.y;
	            var cos = Math.cos(Math.PI / 180 * angle),
	                sin = Math.sin(Math.PI / 180 * angle),
	                x = (x1 - x2) / 2,
	                y = (y1 - y2) / 2;
	            var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
	            if (h > 1) {
	                h = Math.sqrt(h);
	                rx = h * rx;
	                ry = h * ry;
	            }
	            var rx2 = rx * rx,
	                ry2 = ry * ry,
	                k = (large_arc_flag == sweep_flag ? -1 : 1) *
	                Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
	                cx = k * rx * y / ry + (x1 + x2) / 2,
	                cy = k * -ry * x / rx + (y1 + y2) / 2,
	                f1 = Math.asin(((y1 - cy) / ry).toFixed(9)),
	                f2 = Math.asin(((y2 - cy) / ry).toFixed(9));
	
	            f1 = x1 < cx ? Math.PI - f1 : f1;
	            f2 = x2 < cx ? Math.PI - f2 : f2;
	            f1 < 0 && (f1 = Math.PI * 2 + f1);
	            f2 < 0 && (f2 = Math.PI * 2 + f2);
	            if (sweep_flag && f1 > f2) {
	                f1 = f1 - Math.PI * 2;
	            }
	            if (!sweep_flag && f2 > f1) {
	                f2 = f2 - Math.PI * 2;
	            }
	        } else {
	            f1 = recursive[0];
	            f2 = recursive[1];
	            cx = recursive[2];
	            cy = recursive[3];
	        }
	        var df = f2 - f1;
	        if (Math.abs(df) > _120) {
	            var f2old = f2,
	                x2old = x2,
	                y2old = y2;
	            f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
	            x2 = cx + rx * Math.cos(f2);
	            y2 = cy + ry * Math.sin(f2);
	            res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
	        }
	        df = f2 - f1;
	        var c1 = Math.cos(f1),
	            s1 = Math.sin(f1),
	            c2 = Math.cos(f2),
	            s2 = Math.sin(f2),
	            t = Math.tan(df / 4),
	            hx = 4 / 3 * rx * t,
	            hy = 4 / 3 * ry * t,
	            m1 = [x1, y1],
	            m2 = [x1 + hx * s1, y1 - hy * c1],
	            m3 = [x2 + hx * s2, y2 - hy * c2],
	            m4 = [x2, y2];
	        m2[0] = 2 * m1[0] - m2[0];
	        m2[1] = 2 * m1[1] - m2[1];
	        if (recursive) {
	            return [m2, m3, m4].concat(res);
	        } else {
	            res = [m2, m3, m4].concat(res).join().split(",");
	            var newres = [];
	            for (var i = 0, ii = res.length; i < ii; i++) {
	                newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
	            }
	            return newres;
	        }
	    };
	
	    var path2curve = function(path, path2) {
	        var p = pathToAbsolute(path),
	            p2 = path2 && pathToAbsolute(path2),
	            attrs = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
	            attrs2 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
	            processPath = function(path, d, pcom) {
	                var nx, ny;
	                if (!path) {
	                    return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
	                }!(path[0] in { T: 1, Q: 1 }) && (d.qx = d.qy = null);
	                switch (path[0]) {
	                    case "M":
	                        d.X = path[1];
	                        d.Y = path[2];
	                        break;
	                    case "A":
	                        path = ["C"].concat(a2c.apply(0, [d.x, d.y].concat(path.slice(1))));
	                        break;
	                    case "S":
	                        if (pcom == "C" || pcom == "S") { // In "S" case we have to take into account, if the previous command is C/S.
	                            nx = d.x * 2 - d.bx; // And reflect the previous
	                            ny = d.y * 2 - d.by; // command's control point relative to the current point.
	                        } else { // or some else or nothing
	                            nx = d.x;
	                            ny = d.y;
	                        }
	                        path = ["C", nx, ny].concat(path.slice(1));
	                        break;
	                    case "T":
	                        if (pcom == "Q" || pcom == "T") { // In "T" case we have to take into account, if the previous command is Q/T.
	                            d.qx = d.x * 2 - d.qx; // And make a reflection similar
	                            d.qy = d.y * 2 - d.qy; // to case "S".
	                        } else { // or something else or nothing
	                            d.qx = d.x;
	                            d.qy = d.y;
	                        }
	                        path = ["C"].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
	                        break;
	                    case "Q":
	                        d.qx = path[1];
	                        d.qy = path[2];
	                        path = ["C"].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
	                        break;
	                    case "L":
	                        path = ["C"].concat(l2c(d.x, d.y, path[1], path[2]));
	                        break;
	                    case "H":
	                        path = ["C"].concat(l2c(d.x, d.y, path[1], d.y));
	                        break;
	                    case "V":
	                        path = ["C"].concat(l2c(d.x, d.y, d.x, path[1]));
	                        break;
	                    case "Z":
	                        path = ["C"].concat(l2c(d.x, d.y, d.X, d.Y));
	                        break;
	                }
	                return path;
	            },
	            fixArc = function(pp, i) {
	                if (pp[i].length > 7) {
	                    pp[i].shift();
	                    var pi = pp[i];
	                    while (pi.length) {
	                        pcoms1[i] = "A"; // if created multiple C:s, their original seg is saved
	                        p2 && (pcoms2[i] = "A"); // the same as above
	                        pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
	                    }
	                    pp.splice(i, 1);
	                    ii = Math.max(p.length, p2 && p2.length || 0);
	                }
	            },
	            fixM = function(path1, path2, a1, a2, i) {
	                if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
	                    path2.splice(i, 0, ["M", a2.x, a2.y]);
	                    a1.bx = 0;
	                    a1.by = 0;
	                    a1.x = path1[i][1];
	                    a1.y = path1[i][2];
	                    ii = Math.max(p.length, p2 && p2.length || 0);
	                }
	            },
	            pcoms1 = [], // path commands of original path p
	            pcoms2 = [], // path commands of original path p2
	            pfirst = "", // temporary holder for original path command
	            pcom = ""; // holder for previous path command of original path
	        for (var i = 0, ii = Math.max(p.length, p2 && p2.length || 0); i < ii; i++) {
	            p[i] && (pfirst = p[i][0]); // save current path command
	
	            if (pfirst != "C") { // C is not saved yet, because it may be result of conversion
	                pcoms1[i] = pfirst; // Save current path command
	                i && (pcom = pcoms1[i - 1]); // Get previous path command pcom
	            }
	            p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath
	
	            if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C"; // A is the only command
	            // which may produce multiple C:s
	            // so we have to make sure that C is also C in original path
	
	            fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1
	
	            if (p2) { // the same procedures is done to p2
	                p2[i] && (pfirst = p2[i][0]);
	                if (pfirst != "C") {
	                    pcoms2[i] = pfirst;
	                    i && (pcom = pcoms2[i - 1]);
	                }
	                p2[i] = processPath(p2[i], attrs2, pcom);
	
	                if (pcoms2[i] != "A" && pfirst == "C") {
	                    pcoms2[i] = "C";
	                }
	
	                fixArc(p2, i);
	            }
	            fixM(p, p2, attrs, attrs2, i);
	            fixM(p2, p, attrs2, attrs, i);
	            var seg = p[i],
	                seg2 = p2 && p2[i],
	                seglen = seg.length,
	                seg2len = p2 && seg2.length;
	            attrs.x = seg[seglen - 2];
	            attrs.y = seg[seglen - 1];
	            attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
	            attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
	            attrs2.bx = p2 && (parseFloat(seg2[seg2len - 4]) || attrs2.x);
	            attrs2.by = p2 && (parseFloat(seg2[seg2len - 3]) || attrs2.y);
	            attrs2.x = p2 && seg2[seg2len - 2];
	            attrs2.y = p2 && seg2[seg2len - 1];
	        }
	
	        return p2 ? [p, p2] : p;
	    };
	
	    var box = function(x, y, width, height) {
	        if (x == null) {
	            x = y = width = height = 0;
	        }
	        if (y == null) {
	            y = x.y;
	            width = x.width;
	            height = x.height;
	            x = x.x;
	        }
	        return {
	            x: x,
	            y: y,
	            w: width,
	            h: height,
	            cx: x + width / 2,
	            cy: y + height / 2
	        };
	    };
	
	    // Returns bounding box of cubic bezier curve.
	    // Source: http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
	    // Original version: NISHIO Hirokazu
	    // Modifications: https://github.com/timo22345
	    var curveDim = function(x0, y0, x1, y1, x2, y2, x3, y3) {
	        var tvalues = [],
	            bounds = [
	                [],
	                []
	            ],
	            a, b, c, t, t1, t2, b2ac, sqrtb2ac;
	        for (var i = 0; i < 2; ++i) {
	            if (i == 0) {
	                b = 6 * x0 - 12 * x1 + 6 * x2;
	                a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
	                c = 3 * x1 - 3 * x0;
	            } else {
	                b = 6 * y0 - 12 * y1 + 6 * y2;
	                a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
	                c = 3 * y1 - 3 * y0;
	            }
	            if (Math.abs(a) < 1e-12) {
	                if (Math.abs(b) < 1e-12) {
	                    continue;
	                }
	                t = -c / b;
	                if (0 < t && t < 1) {
	                    tvalues.push(t);
	                }
	                continue;
	            }
	            b2ac = b * b - 4 * c * a;
	            sqrtb2ac = Math.sqrt(b2ac);
	            if (b2ac < 0) {
	                continue;
	            }
	            t1 = (-b + sqrtb2ac) / (2 * a);
	            if (0 < t1 && t1 < 1) {
	                tvalues.push(t1);
	            }
	            t2 = (-b - sqrtb2ac) / (2 * a);
	            if (0 < t2 && t2 < 1) {
	                tvalues.push(t2);
	            }
	        }
	
	        var x, y, j = tvalues.length,
	            jlen = j,
	            mt;
	        while (j--) {
	            t = tvalues[j];
	            mt = 1 - t;
	            bounds[0][j] = (mt * mt * mt * x0) + (3 * mt * mt * t * x1) + (3 * mt * t * t * x2) + (t * t * t * x3);
	            bounds[1][j] = (mt * mt * mt * y0) + (3 * mt * mt * t * y1) + (3 * mt * t * t * y2) + (t * t * t * y3);
	        }
	
	        bounds[0][jlen] = x0;
	        bounds[1][jlen] = y0;
	        bounds[0][jlen + 1] = x3;
	        bounds[1][jlen + 1] = y3;
	        bounds[0].length = bounds[1].length = jlen + 2;
	
	        return {
	            min: { x: Math.min.apply(0, bounds[0]), y: Math.min.apply(0, bounds[1]) },
	            max: { x: Math.max.apply(0, bounds[0]), y: Math.max.apply(0, bounds[1]) }
	        };
	    };
	
	    var curvePathBBox = function(path) {
	        var x = 0,
	            y = 0,
	            X = [],
	            Y = [],
	            p;
	        for (var i = 0, ii = path.length; i < ii; i++) {
	            p = path[i];
	            if (p[0] == "M") {
	                x = p[1];
	                y = p[2];
	                X.push(x);
	                Y.push(y);
	            } else {
	                var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
	                X = X.concat(dim.min.x, dim.max.x);
	                Y = Y.concat(dim.min.y, dim.max.y);
	                x = p[5];
	                y = p[6];
	            }
	        }
	        var xmin = Math.min.apply(0, X),
	            ymin = Math.min.apply(0, Y),
	            xmax = Math.max.apply(0, X),
	            ymax = Math.max.apply(0, Y),
	            bb = box(xmin, ymin, xmax - xmin, ymax - ymin);
	
	        return bb;
	    };
	
	    var p2s = /,?([a-z]),?/gi;
	    var path2string = function(path) {
	        return path.join(',').replace(p2s, "$1");
	    };
	
	    /*
	     * Styles
	     */
	
	    var hsrg = { hs: 1, rg: 1 },
	        has = "hasOwnProperty",
	        colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
	        commaSpaces = new RegExp("[" + spaces + "]*,[" + spaces + "]*");
	
	    // Converts RGB values to a hex representation of the color
	    // var rgb = function (r, g, b, o) {
	    //   if (isFinite(o)) {
	    //     var round = math.round;
	    //     return "rgba(" + [round(r), round(g), round(b), +o.toFixed(2)] + ")";
	    //   }
	    //   return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
	    // };
	    var rgbToString = function(rgb) {
	        var round = Math.round;
	        return "rgba(" + [round(rgb.r), round(rgb.g), round(rgb.b), +rgb.opacity.toFixed(2)] + ")";
	    };
	    var toHex = function(color) {
	        var i = window.document.getElementsByTagName("head")[0] || window.document.getElementsByTagName("svg")[0],
	            red = "rgb(255, 0, 0)";
	        toHex = function(color) {
	            if (color.toLowerCase() == "red") {
	                return red;
	            }
	            i.style.color = red;
	            i.style.color = color;
	            var out = window.document.defaultView.getComputedStyle(i, "").getPropertyValue("color");
	            return out == red ? null : out;
	        };
	        return toHex(color);
	    };
	
	    var packageRGB = function(r, g, b, o) {
	        r = Math.round(r * 255);
	        g = Math.round(g * 255);
	        b = Math.round(b * 255);
	        var rgb = {
	            r: r,
	            g: g,
	            b: b,
	            opacity: isFinite(o) ? o : 1
	        };
	        return rgb;
	    };
	
	    // Converts HSB values to an RGB object
	    var hsb2rgb = function(h, s, v, o) {
	        if (typeof h === typeof {} && "h" in h && "s" in h && "b" in h) {
	            v = h.b;
	            s = h.s;
	            h = h.h;
	            o = h.o;
	        }
	        h *= 360;
	        var R, G, B, X, C;
	        h = (h % 360) / 60;
	        C = v * s;
	        X = C * (1 - Math.abs(h % 2 - 1));
	        R = G = B = v - C;
	
	        h = ~~h;
	        R += [C, X, 0, 0, X, C][h];
	        G += [X, C, C, X, 0, 0][h];
	        B += [0, 0, X, C, C, X][h];
	        return packageRGB(R, G, B, o);
	    };
	
	    // Converts HSL values to an RGB object
	    var hsl2rgb = function(h, s, l, o) {
	        if (typeof h === typeof {} && "h" in h && "s" in h && "l" in h) {
	            l = h.l;
	            s = h.s;
	            h = h.h;
	        }
	        if (h > 1 || s > 1 || l > 1) {
	            h /= 360;
	            s /= 100;
	            l /= 100;
	        }
	        h *= 360;
	        var R, G, B, X, C;
	        h = (h % 360) / 60;
	        C = 2 * s * (l < .5 ? l : 1 - l);
	        X = C * (1 - Math.abs(h % 2 - 1));
	        R = G = B = l - C / 2;
	
	        h = ~~h;
	        R += [C, X, 0, 0, X, C][h];
	        G += [X, C, C, X, 0, 0][h];
	        B += [0, 0, X, C, C, X][h];
	        return packageRGB(R, G, B, o);
	    };
	
	    // Parses color string as RGB object
	    var getRGB = function(colour) {
	        if (!colour || !!((colour = String(colour)).indexOf("-") + 1)) {
	            return { r: -1, g: -1, b: -1, opacity: -1, error: 1 };
	        }
	        if (colour == "none") {
	            return { r: -1, g: -1, b: -1, opacity: -1 };
	        }!(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
	        if (!colour) {
	            return { r: -1, g: -1, b: -1, opacity: -1, error: 1 };
	        }
	        var res,
	            red,
	            green,
	            blue,
	            opacity,
	            t,
	            values,
	            rgb = colour.match(colourRegExp);
	        if (rgb) {
	            if (rgb[2]) {
	                blue = parseInt(rgb[2].substring(5), 16);
	                green = parseInt(rgb[2].substring(3, 5), 16);
	                red = parseInt(rgb[2].substring(1, 3), 16);
	            }
	            if (rgb[3]) {
	                blue = parseInt((t = rgb[3].charAt(3)) + t, 16);
	                green = parseInt((t = rgb[3].charAt(2)) + t, 16);
	                red = parseInt((t = rgb[3].charAt(1)) + t, 16);
	            }
	            if (rgb[4]) {
	                values = rgb[4].split(commaSpaces);
	                red = parseFloat(values[0]);
	                values[0].slice(-1) == "%" && (red *= 2.55);
	                green = parseFloat(values[1]);
	                values[1].slice(-1) == "%" && (green *= 2.55);
	                blue = parseFloat(values[2]);
	                values[2].slice(-1) == "%" && (blue *= 2.55);
	                rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = parseFloat(values[3]));
	                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	            }
	            if (rgb[5]) {
	                values = rgb[5].split(commaSpaces);
	                red = parseFloat(values[0]);
	                values[0].slice(-1) == "%" && (red /= 100);
	                green = parseFloat(values[1]);
	                values[1].slice(-1) == "%" && (green /= 100);
	                blue = parseFloat(values[2]);
	                values[2].slice(-1) == "%" && (blue /= 100);
	                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
	                rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = parseFloat(values[3]));
	                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	                return hsb2rgb(red, green, blue, opacity);
	            }
	            if (rgb[6]) {
	                values = rgb[6].split(commaSpaces);
	                red = parseFloat(values[0]);
	                values[0].slice(-1) == "%" && (red /= 100);
	                green = parseFloat(values[1]);
	                values[1].slice(-1) == "%" && (green /= 100);
	                blue = parseFloat(values[2]);
	                values[2].slice(-1) == "%" && (blue /= 100);
	                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
	                rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = parseFloat(values[3]));
	                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	                return hsl2rgb(red, green, blue, opacity);
	            }
	            red = Math.min(Math.round(red), 255);
	            green = Math.min(Math.round(green), 255);
	            blue = Math.min(Math.round(blue), 255);
	            opacity = Math.min(Math.max(opacity, 0), 1);
	            rgb = { r: red, g: green, b: blue };
	            rgb.opacity = isFinite(opacity) ? opacity : 1;
	            return rgb;
	        }
	        return { r: -1, g: -1, b: -1, opacity: -1, error: 1 };
	    };
	
	    function SVGMorpheus(element, options, callback) {
	        if (!element) {
	            throw new Error('SVGMorpheus > "element" is required');
	        }
	
	        if (typeof element === typeof '') {
	            element = document.querySelector(element);
	            if (!element) {
	                throw new Error('SVGMorpheus > "element" query is not related to an existing DOM node');
	            }
	        }
	
	        if (!!options && typeof options !== typeof {}) {
	            throw new Error('SVGMorpheus > "options" parameter must be an object');
	        }
	        options = options || {};
	
	        if (!!callback && typeof callback !== typeof(function() {})) {
	            throw new Error('SVGMorpheus > "callback" parameter must be a function');
	        }
	
	        var that = this;
	
	        this._icons = {};
	        this._curIconId = options.iconId || '';
	        this._toIconId = '';
	        this._curIconItems = [];
	        this._fromIconItems = [];
	        this._toIconItems = [];
	        this._morphNodes = [];
	        this._morphG;
	        this._startTime;
	        this._defDuration = options.duration || 750;
	        this._defEasing = options.easing || 'quad-in-out';
	        this._defRotation = options.rotation || 'clock';
	        this._defCallback = callback || function() {};
	        this._duration = this._defDuration;
	        this._easing = this._defEasing;
	        this._rotation = this._defRotation;
	        this._callback = this._defCallback;
	        this._rafid;
	
	        this._fnTick = function(timePassed) {
	            if (!that._startTime) {
	                that._startTime = timePassed;
	            }
	            var progress = Math.min((timePassed - that._startTime) / that._duration, 1);
	            that._updateAnimationProgress(progress);
	            if (progress < 1) {
	                that._rafid = _reqAnimFrame(that._fnTick);
	            } else {
	                if (that._toIconId != '') {
	                    that._animationEnd();
	                }
	            }
	        };
	
	        if (element.nodeName.toUpperCase() === 'SVG') {
	            this._svgDoc = element;
	        } else {
	            this._svgDoc = element.getSVGDocument();
	        }
	        if (!this._svgDoc) {
	            element.addEventListener("load", function() {
	                that._svgDoc = element.getSVGDocument();
	                that._init();
	            }, false);
	        } else {
	            that._init();
	        }
	    }
	
	    SVGMorpheus.prototype._init = function() {
	        if (this._svgDoc.nodeName.toUpperCase() !== 'SVG') {
	            this._svgDoc = this._svgDoc.getElementsByTagName('svg')[0];
	        }
	
	        if (!!this._svgDoc) {
	            var lastIconId = '',
	                i, len, id, items, item, j, len2, icon;
	
	            // Read Icons Data
	            // Icons = 1st tier G nodes having ID
	            for (i = this._svgDoc.childNodes.length - 1; i >= 0; i--) {
	                var nodeIcon = this._svgDoc.childNodes[i];
	                if (nodeIcon.nodeName.toUpperCase() === 'G') {
	                    id = nodeIcon.getAttribute('id');
	                    if (!!id) {
	                        items = [];
	                        for (j = 0, len2 = nodeIcon.childNodes.length; j < len2; j++) {
	                            var nodeItem = nodeIcon.childNodes[j];
	                            item = {
	                                path: '',
	                                attrs: {},
	                                style: {}
	                            };
	
	                            // Get Item Path (Convert all shapes into Path Data)
	                            switch (nodeItem.nodeName.toUpperCase()) {
	                                case 'PATH':
	                                    item.path = nodeItem.getAttribute('d');
	                                    break;
	                                case 'CIRCLE':
	                                    var cx = nodeItem.getAttribute('cx') * 1,
	                                        cy = nodeItem.getAttribute('cy') * 1,
	                                        r = nodeItem.getAttribute('r') * 1;
	                                    item.path = 'M' + (cx - r) + ',' + cy + 'a' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0a' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0z';
	                                    break;
	                                case 'ELLIPSE':
	                                    var cx = nodeItem.getAttribute('cx') * 1,
	                                        cy = nodeItem.getAttribute('cy') * 1,
	                                        rx = nodeItem.getAttribute('rx') * 1,
	                                        ry = nodeItem.getAttribute('ry') * 1;
	                                    item.path = 'M' + (cx - rx) + ',' + cy + 'a' + rx + ',' + ry + ' 0 1,0 ' + (rx * 2) + ',0a' + rx + ',' + ry + ' 0 1,0 -' + (rx * 2) + ',0z';
	                                    break;
	                                case 'RECT':
	                                    var x = nodeItem.getAttribute('x') * 1,
	                                        y = nodeItem.getAttribute('y') * 1,
	                                        w = nodeItem.getAttribute('width') * 1,
	                                        h = nodeItem.getAttribute('height') * 1,
	                                        rx = nodeItem.getAttribute('rx') * 1,
	                                        ry = nodeItem.getAttribute('ry') * 1;
	                                    if (!rx && !ry) {
	                                        item.path = 'M' + x + ',' + y + 'l' + w + ',0l0,' + h + 'l-' + w + ',0z';
	                                    } else {
	                                        item.path = 'M' + (x + rx) + ',' + y +
	                                            'l' + (w - rx * 2) + ',0' +
	                                            'a' + rx + ',' + ry + ' 0 0,1 ' + rx + ',' + ry +
	                                            'l0,' + (h - ry * 2) +
	                                            'a' + rx + ',' + ry + ' 0 0,1 -' + rx + ',' + ry +
	                                            'l' + (rx * 2 - w) + ',0' +
	                                            'a' + rx + ',' + ry + ' 0 0,1 -' + rx + ',-' + ry +
	                                            'l0,' + (ry * 2 - h) +
	                                            'a' + rx + ',' + ry + ' 0 0,1 ' + rx + ',-' + ry +
	                                            'z';
	                                    }
	                                    break;
	                                case 'POLYGON':
	                                    var points = nodeItem.getAttribute('points');
	                                    var p = points.split(/\s+/);
	                                    var path = "";
	                                    for (var k = 0, len = p.length; k < len; k++) {
	                                        path += (k && "L" || "M") + p[k]
	                                    }
	                                    item.path = path + 'z';
	                                    break;
	                                case 'LINE':
	                                    var x1 = nodeItem.getAttribute('x1') * 1,
	                                        y1 = nodeItem.getAttribute('y1') * 1,
	                                        x2 = nodeItem.getAttribute('x2') * 1,
	                                        y2 = nodeItem.getAttribute('y2') * 1;
	                                    item.path = 'M' + x1 + ',' + y1 + 'L' + x2 + ',' + y2 + 'z';
	                                    break;
	                            }
	                            if (item.path != '') {
	                                // Traverse all attributes and get style values
	                                for (var k = 0, len3 = nodeItem.attributes.length; k < len3; k++) {
	                                    var attrib = nodeItem.attributes[k];
	                                    if (attrib.specified) {
	                                        var name = attrib.name.toLowerCase();
	                                        switch (name) {
	                                            case 'fill':
	                                            case 'fill-opacity':
	                                            case 'opacity':
	                                            case 'stroke':
	                                            case 'stroke-opacity':
	                                            case 'stroke-width':
	                                                item.attrs[name] = attrib.value;
	                                        }
	                                    }
	                                }
	
	                                // Traverse all inline styles and get supported values
	                                for (var l = 0, len4 = nodeItem.style.length; l < len4; l++) {
	                                    var styleName = nodeItem.style[l];
	                                    switch (styleName) {
	                                        case 'fill':
	                                        case 'fill-opacity':
	                                        case 'opacity':
	                                        case 'stroke':
	                                        case 'stroke-opacity':
	                                        case 'stroke-width':
	                                            item.style[styleName] = nodeItem.style[styleName];
	                                    }
	                                }
	
	                                items.push(item);
	                            }
	                        }
	
	                        // Add Icon
	                        if (items.length > 0) {
	                            icon = {
	                                id: id,
	                                items: items
	                            };
	                            this._icons[id] = icon;
	                        }
	
	                        // Init Node for Icons Items and remove Icon Nodes
	                        if (!this._morphG) {
	                            lastIconId = id;
	                            this._morphG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	                            this._svgDoc.replaceChild(this._morphG, nodeIcon);
	                        } else {
	                            this._svgDoc.removeChild(nodeIcon);
	                        }
	                    }
	                }
	            }
	            // To Default Icon
	            var defaultIcon = this._curIconId || lastIconId;
	            if (defaultIcon !== '') {
	                this._setupAnimation(defaultIcon);
	                this._updateAnimationProgress(1);
	                this._animationEnd();
	            }
	        }
	
	    };
	
	    SVGMorpheus.prototype._setupAnimation = function(toIconId) {
	        if (!!toIconId && !!this._icons[toIconId]) {
	            this._toIconId = toIconId;
	            this._startTime = undefined;
	            var i, len, j, len2;
	            this._fromIconItems = clone(this._curIconItems);
	            this._toIconItems = clone(this._icons[toIconId].items);
	
	            for (i = 0, len = this._morphNodes.length; i < len; i++) {
	                var morphNode = this._morphNodes[i];
	                morphNode.fromIconItemIdx = i;
	                morphNode.toIconItemIdx = i;
	            }
	
	            var maxNum = Math.max(this._fromIconItems.length, this._toIconItems.length);
	            var toBB;
	            for (i = 0; i < maxNum; i++) {
	                // Add items to fromIcon/toIcon if needed
	                if (!this._fromIconItems[i]) {
	                    if (!!this._toIconItems[i]) {
	                        toBB = curvePathBBox(path2curve(this._toIconItems[i].path));
	                        this._fromIconItems.push({
	                            path: 'M' + toBB.cx + ',' + toBB.cy + 'l0,0',
	                            attrs: {},
	                            style: {},
	                            trans: {
	                                'rotate': [0, toBB.cx, toBB.cy]
	                            }
	                        });
	                    } else {
	                        this._fromIconItems.push({
	                            path: 'M0,0l0,0',
	                            attrs: {},
	                            style: {},
	                            trans: {
	                                'rotate': [0, 0, 0]
	                            }
	                        });
	                    }
	                }
	                if (!this._toIconItems[i]) {
	                    if (!!this._fromIconItems[i]) {
	                        toBB = curvePathBBox(path2curve(this._fromIconItems[i].path));
	                        this._toIconItems.push({
	                            path: 'M' + toBB.cx + ',' + toBB.cy + 'l0,0',
	                            attrs: {},
	                            style: {},
	                            trans: {
	                                'rotate': [0, toBB.cx, toBB.cy]
	                            }
	                        });
	                    } else {
	                        this._toIconItems.push({
	                            path: 'M0,0l0,0',
	                            attrs: {},
	                            style: {},
	                            trans: {
	                                'rotate': [0, 0, 0]
	                            }
	                        });
	                    }
	                }
	
	                // Add Node to DOM if needed
	                if (!this._morphNodes[i]) {
	                    var node = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	                    this._morphG.appendChild(node);
	                    this._morphNodes.push({
	                        node: node,
	                        fromIconItemIdx: i,
	                        toIconItemIdx: i
	                    });
	                }
	            }
	
	            for (i = 0; i < maxNum; i++) {
	                var fromIconItem = this._fromIconItems[i];
	                var toIconItem = this._toIconItems[i];
	
	                // Calculate from/to curve data and set to fromIcon/toIcon
	                var curves = path2curve(this._fromIconItems[i].path, this._toIconItems[i].path);
	                fromIconItem.curve = curves[0];
	                toIconItem.curve = curves[1];
	
	                // Normalize from/to attrs
	                var attrsNorm = styleToNorm(this._fromIconItems[i].attrs, this._toIconItems[i].attrs);
	                fromIconItem.attrsNorm = attrsNorm[0];
	                toIconItem.attrsNorm = attrsNorm[1];
	                fromIconItem.attrs = styleNormToString(fromIconItem.attrsNorm);
	                toIconItem.attrs = styleNormToString(toIconItem.attrsNorm);
	
	                // Normalize from/to style
	                var styleNorm = styleToNorm(this._fromIconItems[i].style, this._toIconItems[i].style);
	                fromIconItem.styleNorm = styleNorm[0];
	                toIconItem.styleNorm = styleNorm[1];
	                fromIconItem.style = styleNormToString(fromIconItem.styleNorm);
	                toIconItem.style = styleNormToString(toIconItem.styleNorm);
	
	                // Calculate from/to transform
	                toBB = curvePathBBox(toIconItem.curve);
	                toIconItem.trans = {
	                    'rotate': [0, toBB.cx, toBB.cy]
	                };
	                var rotation = this._rotation,
	                    degAdd;
	                if (rotation === 'random') {
	                    rotation = Math.random() < 0.5 ? 'counterclock' : 'clock';
	                }
	                switch (rotation) {
	                    case 'none':
	                        if (!!fromIconItem.trans.rotate) {
	                            toIconItem.trans.rotate[0] = fromIconItem.trans.rotate[0];
	                        }
	                        break;
	                    case 'counterclock':
	                        if (!!fromIconItem.trans.rotate) {
	                            toIconItem.trans.rotate[0] = fromIconItem.trans.rotate[0] - 360;
	                            degAdd = -fromIconItem.trans.rotate[0] % 360;
	                            toIconItem.trans.rotate[0] += (degAdd < 180 ? degAdd : degAdd - 360);
	                        } else {
	                            toIconItem.trans.rotate[0] = -360;
	                        }
	                        break;
	                    default: // Clockwise
	                        if (!!fromIconItem.trans.rotate) {
	                            toIconItem.trans.rotate[0] = fromIconItem.trans.rotate[0] + 360;
	                            degAdd = fromIconItem.trans.rotate[0] % 360;
	                            toIconItem.trans.rotate[0] += (degAdd < 180 ? -degAdd : 360 - degAdd);
	                        } else {
	                            toIconItem.trans.rotate[0] = 360;
	                        }
	                        break;
	                }
	            }
	
	            this._curIconItems = clone(this._fromIconItems);
	        }
	    };
	
	    SVGMorpheus.prototype._updateAnimationProgress = function(progress) {
	        progress = easings[this._easing](progress);
	
	        var i, j, k, len;
	        // Update path/attrs/transform
	        for (i = 0, len = this._curIconItems.length; i < len; i++) {
	            this._curIconItems[i].curve = curveCalc(this._fromIconItems[i].curve, this._toIconItems[i].curve, progress);
	            this._curIconItems[i].path = path2string(this._curIconItems[i].curve);
	
	            this._curIconItems[i].attrsNorm = styleNormCalc(this._fromIconItems[i].attrsNorm, this._toIconItems[i].attrsNorm, progress);
	            this._curIconItems[i].attrs = styleNormToString(this._curIconItems[i].attrsNorm);
	
	            this._curIconItems[i].styleNorm = styleNormCalc(this._fromIconItems[i].styleNorm, this._toIconItems[i].styleNorm, progress);
	            this._curIconItems[i].style = styleNormToString(this._curIconItems[i].styleNorm);
	
	            this._curIconItems[i].trans = transCalc(this._fromIconItems[i].trans, this._toIconItems[i].trans, progress);
	            this._curIconItems[i].transStr = trans2string(this._curIconItems[i].trans);
	        }
	
	        // Update DOM
	        for (i = 0, len = this._morphNodes.length; i < len; i++) {
	            var morphNode = this._morphNodes[i];
	            morphNode.node.setAttribute("d", this._curIconItems[i].path);
	            var attrs = this._curIconItems[i].attrs;
	            for (j in attrs) {
	                morphNode.node.setAttribute(j, attrs[j]);
	            }
	            var style = this._curIconItems[i].style;
	            for (k in style) {
	                morphNode.node.style[k] = style[k];
	            }
	            morphNode.node.setAttribute("transform", this._curIconItems[i].transStr);
	        }
	    };
	
	    SVGMorpheus.prototype._animationEnd = function() {
	        for (var i = this._morphNodes.length - 1; i >= 0; i--) {
	            var morphNode = this._morphNodes[i];
	            if (!!this._icons[this._toIconId].items[i]) {
	                morphNode.node.setAttribute("d", this._icons[this._toIconId].items[i].path);
	            } else {
	                morphNode.node.parentNode.removeChild(morphNode.node);
	                this._morphNodes.splice(i, 1);
	            }
	        }
	
	        this._curIconId = this._toIconId;
	        this._toIconId = '';
	
	        this._callback();
	    };
	
	    /*
	     * Public methods
	     */
	
	    // Morph To Icon
	    SVGMorpheus.prototype.to = function(iconId, options, callback) {
	        if (iconId !== this._toIconId) {
	            if (!!options && typeof options !== typeof {}) {
	                throw new Error('SVGMorpheus.to() > "options" parameter must be an object');
	            }
	            options = options || {};
	
	            if (!!callback && typeof callback !== typeof(function() {})) {
	                throw new Error('SVGMorpheus.to() > "callback" parameter must be a function');
	            }
	
	            _cancelAnimFrame(this._rafid);
	
	            this._duration = options.duration || this._defDuration;
	            this._easing = options.easing || this._defEasing;
	            this._rotation = options.rotation || this._defRotation;
	            this._callback = callback || this._defCallback;
	
	            this._setupAnimation(iconId);
	            this._rafid = _reqAnimFrame(this._fnTick);
	        }
	    };
	
	    // Register custom Easing function
	    SVGMorpheus.prototype.registerEasing = function(name, fn) {
	        easings[name] = fn;
	    }
	
	    return SVGMorpheus;
	
	}());
	
	var SVGMorpheus = rtn;
	
	/*** EXPORTS FROM exports-loader ***/
	module.exports = SVGMorpheus;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(166);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(130)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(129)();
	// imports
	
	
	// module
	exports.push([module.id, ".logo {\n  height: 64px;\n  min-height: 64px !important;\n  line-height: 64px;\n  margin: 5px;\n  padding-left: 64px;\n  background: transparent url(" + __webpack_require__(167) + ") no-repeat top left;\n  background-size: contain; }\n  .logo.center {\n    background-position: top center;\n    height: 150px; }\n\n.gridster .gridster-item {\n  overflow: hidden; }\n", ""]);
	
	// exports


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "7af35d2f474641e3a73ea274191a9107.jpg";

/***/ }
]);
//# sourceMappingURL=home.bundle.js.map