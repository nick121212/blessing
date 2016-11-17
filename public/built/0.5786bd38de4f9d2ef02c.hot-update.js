webpackHotUpdate(0,{

/***/ 35:
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
	buf.push("<section flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<section fx-list-action key=\"interface\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<section fx-list-action key=\"action\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<section fx-list-action key=\"schemaListAction\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, jade_debug[0].filename ));
	buf.push("  ");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "section(flex)\n    section(fx-list-action,key=\"interface\")\n    section(fx-list-action,key=\"action\")\n    section(fx-list-action,key=\"schemaListAction\")   ");
	}
	}

/***/ }

})
//# sourceMappingURL=0.5786bd38de4f9d2ef02c.hot-update.js.map