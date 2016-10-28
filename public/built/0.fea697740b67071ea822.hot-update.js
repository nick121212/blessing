webpackHotUpdate(0,{

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var ngMaterial = __webpack_require__(16);
	__webpack_require__(35);
	__webpack_require__(37);
	var rest_service_1 = __webpack_require__(30);
	__webpack_require__(68);
	__webpack_require__(72);
	var _name = "fxAction";
	exports.module = angular.module(_name + "Module", [ngMaterial, rest_service_1.default, "schemaForm", "ng.jsoneditor"]);
	function sfLayout(args) {
	    var layoutDiv = args.fieldFrag.querySelector('[sf-layout]');
	    if (layoutDiv && args.form.grid) {
	        Object.getOwnPropertyNames(args.form.grid).forEach(function (property, idx, array) {
	            layoutDiv.setAttribute(property, args.form.grid[property]);
	        });
	    }
	}
	;
	exports.module
	    .config(["sfErrorMessageProvider", function (sfErrorMessageProvider) {
	        sfErrorMessageProvider.setDefaultMessage("302", "[{{title}}]是必填项");
	        sfErrorMessageProvider.setDefaultMessage("103", "[{{title}}]超过了最大值{{schema.maximum}}");
	        sfErrorMessageProvider.setDefaultMessage("101", "[{{title}}]小于最小值{{schema.minimum}}");
	        sfErrorMessageProvider.setDefaultMessage("200", "[{{title}}]字符长度小于最小值({{schema.minLength}})");
	        sfErrorMessageProvider.setDefaultMessage("201", "[{{title}}]字符长度大于最大值({{schema.maxLength}})");
	        sfErrorMessageProvider.setDefaultMessage("400", "数组长度不正确，{{schema.minItems||0}}-{{schema.maxItems||'∞'}}");
	        sfErrorMessageProvider.setDefaultMessage("500", "格式不正确");
	    }])
	    .config(["sfBuilderProvider", "schemaFormDecoratorsProvider", "jsonEditorBuilderProvider", "autoCompleteBuilderProvider", function (sfBuilderProvider, schemaFormDecoratorsProvider, jsonEditorBuilder, autoCompleteBuilder) {
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'jeditor', "./decorators/jsoneditor.jade", sfBuilderProvider.stdBuilders.concat(jsonEditorBuilder.builder));
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'card', "./decorators/card.jade", [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]);
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'autocomplete-1', "./decorators/autocomplete-1.jade", [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, sfLayout, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion, autoCompleteBuilder.builder]);
	    }])
	    .run(["$templateCache", "autoCompleteBuilder", function ($templateCache) {
	        $templateCache.put('./decorators/jsoneditor.jade', __webpack_require__(138)());
	        $templateCache.put('./decorators/card.jade', __webpack_require__(139)());
	        $templateCache.put('./decorators/autocomplete-1.jade', __webpack_require__(140)());
	        $templateCache.put('./decorators/section-1.jade', __webpack_require__(141)());
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(73);
	__webpack_require__(46);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(50);
	__webpack_require__(51);
	__webpack_require__(53);
	__webpack_require__(55);
	__webpack_require__(56);
	__webpack_require__(58);
	__webpack_require__(60);
	__webpack_require__(62);
	__webpack_require__(64);


/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var _ = __webpack_require__(31);
	function Provider() {
	    this.builder = function (args) {
	        args.form.acOptions = _.extend({
	            textField: "",
	            keyField: "",
	            dataField: "",
	            delay: 300,
	            noCache: false,
	            _where: {},
	            search: "",
	            actionKey: ""
	        }, args.form.acOptions || {});
	    };
	    this.$get = [function () {
	            return {};
	        }];
	}
	index_1.module.provider('autoCompleteBuilder', [Provider]);


/***/ }

})
//# sourceMappingURL=0.fea697740b67071ea822.hot-update.js.map