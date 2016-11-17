webpackHotUpdate(0,{

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(13);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	buf.push("<section flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	buf.push("<md-button ng-click=\"pageCtl.doTrans()\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, jade_debug[0].filename ));
	buf.push("变换节点");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	buf.push("<svg id=\"homed3\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</svg>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "section(flex)\n    md-button(ng-click=\"pageCtl.doTrans()\") 变换节点\n\n    \n\n    svg#homed3(flex)");
	}
	}

/***/ }

})
//# sourceMappingURL=0.093d5bb46616a2362900.hot-update.js.map