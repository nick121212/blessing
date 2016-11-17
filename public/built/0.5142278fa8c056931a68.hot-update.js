webpackHotUpdate(0,{

/***/ 29:
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
	buf.push("<div id=\"homed3\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	buf.push("<div ng-repeat=\"item in pageCtl.nodes\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	buf.push("<md-card style=\"width:200px;\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	buf.push("<md-card-title>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	buf.push("<span class=\"md-headline\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 6, jade_debug[0].filename ));
	buf.push("{{item.title}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card-title>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	buf.push("<md-card-content>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	buf.push("<span>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 8, jade_debug[0].filename ));
	buf.push("{{item.description}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card-content>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	buf.push("<md-card-actions>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/pages/page/tpls/paged3.template.jade" ));
	buf.push("<md-button ng-click=\"pageCtl.doTrans()\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 10, jade_debug[0].filename ));
	buf.push("变换节点");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card-actions>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "section(flex)\n    div#homed3(flex)\n        div(ng-repeat=\"item in pageCtl.nodes\")\n            md-card(style=\"width:200px;\")\n                md-card-title\n                    span.md-headline {{item.title}}\n                md-card-content\n                    span {{item.description}}\n                md-card-actions\n                    md-button(ng-click=\"pageCtl.doTrans()\") 变换节点");
	}
	}

/***/ }

})
//# sourceMappingURL=0.5142278fa8c056931a68.hot-update.js.map