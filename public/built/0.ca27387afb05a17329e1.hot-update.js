webpackHotUpdate(0,{

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(13);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<md-content flex layout=\"row\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<section fx-list-action key=\"{{pageCtl.key}}\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(flex,layout=\"row\")\nsection(fx-list-action,key=\"{{pageCtl.key}}\",flex)");
	}
	}

/***/ }

})
//# sourceMappingURL=0.ca27387afb05a17329e1.hot-update.js.map