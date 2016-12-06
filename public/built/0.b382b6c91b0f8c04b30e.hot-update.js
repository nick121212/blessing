webpackHotUpdate(0,{

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(11);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-content flex=\"100\" layout=\"row\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-sidenav ui-view=\"sidenavLeft\" md-is-locked-open=\"$mdMedia('gt-md')\" md-component-id=\"left\" md-whiteframe=\"4\" layout=\"column\" class=\"md-sidenav-left\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-sidenav>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-sidenav md-component-id=\"right\" ui-view=\"sidenavRight\" layout=\"column\" md-whiteframe=\"4\" class=\"md-sidenav-right\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-sidenav>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-content ui-view=\"content\" flex=\"100\" layout=\"column\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<div execute-cmd real-time=\"true\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(flex=\"100\",layout=\"row\")\n    md-sidenav.md-sidenav-left(ui-view=\"sidenavLeft\",md-is-locked-open=\"$mdMedia('gt-md')\",md-component-id=\"left\",md-whiteframe=\"4\",layout=\"column\")\n    md-sidenav.md-sidenav-right(md-component-id=\"right\",ui-view=\"sidenavRight\",layout=\"column\",md-whiteframe=\"4\")\n    md-content(ui-view=\"content\",flex=\"100\",layout=\"column\")\n    div(execute-cmd,real-time=\"true\")");
	}
	}

/***/ }

})
//# sourceMappingURL=0.b382b6c91b0f8c04b30e.hot-update.js.map