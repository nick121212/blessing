webpackHotUpdate(0,{

/***/ 49:
/***/ function(module, exports) {

	angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("decorators/material/actions-trcl.html","<div class=\"btn-group schema-form-actions {{form.htmlClass}}\" ng-transclude=\"\"></div>");
	$templateCache.put("decorators/material/actions.html","<section layout=\"row\" class=\"btn-group schema-form-actions {{form.htmlClass}}\"></section>");
	$templateCache.put("decorators/material/array.html","<div class=\"schema-form-array {{form.htmlClass}}\" sf-field-model=\"sf-new-array\" sf-new-array=\"\"><md-toolbar class=\"md-default\"><div class=\"md-toolbar-tools\"><h2 flex=\"\">{{ ::form.title }}</h2><md-button ng-hide=\"form.readonly || form.add === null\" ng-click=\"appendToArray()\" class=\"md-icon-button {{ form.style.add || \'btn-default\' }}\"><md-tooltip>新增</md-tooltip><md-icon><ng-md-icon icon=\"add_circle_outline\"></ng-md-icon></md-icon></md-button></div></md-toolbar><md-content ng-model=\"modelArray\" flex=\"\" layout-padding=\"\" class=\"md-whiteframe-1dp\"><md-list ui-sortable=\"form.sortOptions\"><md-list-item layout=\"row\" ng-repeat-start=\"item in $$value$$ track by $index\" sf-field-model=\"ng-repeat-start\" form=\"copyWithIndex($index)\" schema-form-array-items=\"\"><md-button flex-order=\"2\" ng-hide=\"form.readonly || form.remove === null\" ng-click=\"deleteFromArray($index)\" class=\"md-icon-button\" aria-label=\"Delete\"><md-tooltip>删除</md-tooltip><md-icon><ng-md-icon icon=\"close-circle-outline\"></ng-md-icon></md-icon></md-button></md-list-item><md-divider ng-repeat-end=\"\"></md-divider></md-list></md-content><md-input-container style=\"margin-top:0;\" class=\"md-block\" md-is-error=\"ngModel.$error && ngModel.$invalid\"><input class=\"ng-hide\" name=\"{{::form.key|sfCamelKey}}\" ng-model=\"modelArray\" sf-changed=\"form\"><div ng-messages=\"ngModel.$error\" aria-live=\"assertive\"><div sf-message=\"\" ng-message=\"\" ng-class=\"{\'fx-invalid\':ngModel.$invalid}\"></div></div><div class=\"hint md-char-counter\" ng-if=\"form.showHints\" ng-bind=\"form.description\"></div></md-input-container></div>");
	$templateCache.put("decorators/material/autocomplete.html","<md-input-container class=\"form-group no-errors schema-form-autocomplete {{form.htmlClass}}\" md-is-error=\"ngModel.$error && ngModel.$invalid\" sf-layout=\"\"><md-autocomplete flex=\"\" style=\"height: 48px;\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" sf-autocomplete=\"\" sf-field-model=\"replaceAll\" ng-init=\"autoData={};form.init($$value$$,autoData,arrayIndex)\" md-no-cache=\"form.noCache\" md-selected-item=\"autoData.selected\" md-search-text=\"autoData.searchText\" md-selected-item-change=\"form.onChange(item, form, model, modelArray, arrayIndex)\" md-items=\"item in form.query(autoData.searchText,modelArray,arrayIndex,$parent)\" md-item-text=\"item[form.textField]\" md-floating-label=\"{{ form.title }}\" placeholder=\"{{ form.placeholder }}\" md-menu-class=\"autocomplete-custom-template\"><md-item-template><span md-highlight-text=\"searchText\">{{item.name}}</span></md-item-template><md-not-found>No matches found</md-not-found></md-autocomplete><input class=\"ng-hide\" name=\"{{::form.key|sfCamelKey}}\" sf-changed=\"form\" sf-field-model=\"\" schema-validate=\"form\"><div ng-messages=\"ngModel.$error\" aria-live=\"assertive\"><div sf-message=\"\" ng-message=\"\"></div></div><div class=\"hint md-char-counter\" ng-if=\"form.showHints\" ng-bind=\"form.description\"></div></md-input-container>");
	$templateCache.put("decorators/material/card-content.html","<md-card-content class=\"schema-form-card-content {{form.htmlClass}}\"></md-card-content>");
	$templateCache.put("decorators/material/card.html","<md-card class=\"schema-form-card {{form.htmlClass}}\"></md-card>");
	$templateCache.put("decorators/material/checkbox.html","<md-input-container class=\"checkbox schema-form-checkbox {{::form.htmlClass}}\" md-is-error=\"!$root.isEmptyObject(ngModel.$error)\"><md-checkbox sf-field-model=\"\" ng-model=\"$$value$$\" ng-disabled=\"form.readonly\" schema-validate=\"form\" sf-changed=\"form\" ng-model-options=\"form.ngModelOptions\" ng-true-value=\"{{form.trueValue || true}}\" ng-false-value=\"{{form.falseValue || false}}\" ng-class=\"form.fieldHtmlClass\" name=\"{{::form.key|sfCamelKey}}\" aria-label=\"{{::form.title}}\"><span>{{::form.title}}</span></md-checkbox><div ng-messages=\"ngModel.$error\" class=\"md-input-messages-animation\"><div sf-message=\"\" ng-message=\"\"></div></div><div class=\"md-char-counter\">{{ form.description }}</div></md-input-container>");
	$templateCache.put("decorators/material/checkboxes.html","<div sf-array=\"form\" sf-field-model=\"\" class=\"form-group schema-form-checkboxes {{::form.htmlClass}}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\" sf-messages=\"\"><label class=\"control-label\" ng-show=\"showTitle()\">{{::form.title}}</label><div class=\"checkbox\" ng-repeat=\"val in titleMapValues track by $index\"><md-checkbox ng-model=\"titleMapValues[$index]\" sf-changed=\"form\" ng-disabled=\"::form.readonly\" name=\"{{::form.key|sfCamelKey}}\" ng-true-value=\"true\" ng-false-value=\"false\" aria-label=\"{{::form.title}}\">{{::form.titleMap[$index].name}}</md-checkbox></div></div>");
	$templateCache.put("decorators/material/chips.html","<md-input-container class=\"form-group schema-form-chips {{form.htmlClass}}\" md-no-float=\"true\" md-is-error=\"ngModel.$error && ngModel.$invalid\"><md-chips sf-field-model=\"\" md-enable-chip-edit=\"enter\" schema-form-array-items=\"\" readonly=\"form.readonly\" md-add-on-blur=\"form.addOnBlur\" class=\"no-errors\" name=\"{{::form.key|sfCamelKey}}\" placeholder=\"{{::form.title}}\"><md-chip-template><strong ng-if=\"!form.template\">{{$chip}}</strong></md-chip-template></md-chips><div class=\"errors\" ng-model=\"modelArray\" schema-validate=\"form\" ng-messages=\"ngModel.$error\" aria-live=\"assertive\"><div sf-message=\"\" ng-message=\"\"></div></div><div class=\"hint md-char-counter\" ng-if=\"form.showHints\" ng-bind=\"form.description\"></div></md-input-container>");
	$templateCache.put("decorators/material/date.html","<div class=\"schema-form-date {{::form.htmlClass}}\"><label ng-show=\"showTitle()\" for=\"{{::form.key|sfCamelKey}}\">{{::form.title}}</label><md-datepicker sf-field-model=\"\" sf-changed=\"form\" schema-validate=\"form\" sf-type-parser=\"form.schema\" id=\"{{::form.key|sfCamelKey}}\" ng-show=\"::form.key\" ng-class=\"::form.fieldHtmlClass\" ng-disabled=\"::form.readonly\" md-placeholder=\"Enter date\" sf-messages=\"\"></md-datepicker></div>");
	$templateCache.put("decorators/material/default.html","<md-input-container class=\"schema-form-{{::form.type}} {{::form.htmlClass}}\" md-is-error=\"ngModel.$error && ngModel.$invalid && ngModel.$dirty\" sf-layout=\"\" sf-material-class=\"md-input-has-value\"><label ng-show=\"showTitle()\" for=\"{{::form.key|sfCamelKey}}\">{{::form.title}}</label><md-icon ng-if=\"form.icon\"><ng-md-icon icon=\"{{ form.icon.leftIcon }}\" ng-style=\"form.icon.style\"></ng-md-icon></md-icon><input sf-field-model=\"replaceAll\" type=\"{{::form.type}}\" step=\"any\" compare-to=\"passwordAgain\" compare-model=\"model\" compare-form=\"form\" ng-model=\"$$value$$\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" id=\"{{::form.key|sfCamelKey}}\" ng-class=\"::form.fieldHtmlClass\" ng-disabled=\"::form.readonly\" schema-validate=\"form\" name=\"{{::form.key|sfCamelKey}}\" aria-describedby=\"{{::form.key|sfCamelKey}}Status\"><div ng-messages=\"ngModel.$error\" aria-live=\"assertive\"><div sf-message=\"\" ng-message=\"\"></div></div><div class=\"hint md-char-counter\" ng-if=\"form.showHints\" ng-bind=\"form.description\"></div></md-input-container>");
	$templateCache.put("decorators/material/fieldset-trcl.html","<fieldset ng-disabled=\"form.readonly\" class=\"standard {{form.htmlClass}}\" flex=\"\"><legend ng-show=\"form.title\">{{ form.title }}</legend><div ng-transclude=\"\"></div></fieldset>");
	$templateCache.put("decorators/material/fieldset.html","<fieldset ng-disabled=\"form.readonly\" class=\"standard {{form.htmlClass}}\" flex=\"\"><legend ng-show=\"form.title\">{{ form.title }}</legend></fieldset>");
	$templateCache.put("decorators/material/help.html","<div class=\"helpvalue schema-form-helpvalue {{form.htmlClass}}\" ng-bind-html=\"form.helpvalue\"></div>");
	$templateCache.put("decorators/material/radio-buttons.html","<div class=\"form-group schema-form-radiobuttons {{form.htmlClass}}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\" sf-layout=\"\" sf-messages=\"\"><div><label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label></div><section layout=\"row\" layout-sm=\"column\" layout-align=\"center center\"><md-input-container ng-repeat=\"item in form.titleMap\"><md-button type=\"button\" class=\"group md-raised\" sf-field-model=\"replaceAll\" ng-model=\"$$value$$\" sf-changed=\"form\" ng-class=\"{\'md-primary\': ($$value$$ == item.value)}\" ng-disabled=\"form.readonly\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" ng-value=\"item.value\" ng-click=\"$$value$$ = item.value\" name=\"{{form.key.join(\'.\')}}\"><span ng-bind-html=\"item.name\"></span></md-button></md-input-container></section></div>");
	$templateCache.put("decorators/material/radios-inline.html","<div class=\"form-group schema-form-radios-inline {{form.htmlClass}}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\" sf-layout=\"\" sf-messages=\"\"><label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label><md-radio-group layout=\"row\" sf-field-model=\"replaceAll\" ng-model=\"$$value$$\" class=\"{{form.fieldHtmlClass}}\" ng-class=\"{ active: item.value === $$value$$ }\" sf-changed=\"form\" schema-validate=\"form\" ng-disabled=\"form.readonly\" name=\"{{form.key.join(\'.\')}}\"><md-radio-button ng-repeat=\"item in form.titleMap\" ng-value=\"item.value\"><span ng-bind-html=\"item.name\"></span></md-radio-button></md-radio-group></div>");
	$templateCache.put("decorators/material/radios.html","<div class=\"form-group schema-form-radios {{form.htmlClass}}\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\"><label class=\"control-label\" ng-show=\"showTitle()\" aria-label=\"{{form.title}}\" layout=\"row\">{{form.title}}</label><div><md-radio-group sf-field-model=\"\" sf-changed=\"form\" ng-disabled=\"form.readonly\" name=\"{{form.key.join(\'.\')}}\" sf-layout=\"\" sf-messages=\"\"><md-radio-button ng-repeat=\"item in form.titleMap\" ng-value=\"item.value\" class=\"{{form.fieldHtmlClass}}\" sf-field-model=\"ng-class\" ng-class=\"{ active: item.value === $$value$$ }\"><span ng-bind-html=\"item.name\"></span></md-radio-button></md-radio-group></div></div>");
	$templateCache.put("decorators/material/section.html","<md-content class=\"schema-form-section {{::form.htmlClass}}\" sf-layout=\"\"></md-content>");
	$templateCache.put("decorators/material/select.html","<md-input-container class=\"form-group {{::form.htmlClass}} schema-form-select\" md-is-error=\"ngModel.$error && ngModel.$invalid\" sf-layout=\"\" sf-material-class=\"md-input-has-value\"><label ng-show=\"::showTitle()\">{{::form.title}}</label><md-select sf-field-model=\"\" schema-validate=\"form\"><md-optgroup ng-repeat-start=\"(key, opt) in form.getOptions(form, evalExpr) | orderBy:\'group\' as optGroups\" ng-if=\"opt.group && opt.group != optGroups[key-1].group\" label=\"{{::opt.group}}\" aria-label=\"{{::opt.group}}\"><md-option ng-repeat=\"(key, filtered) in form.getOptions(form, evalExpr) | filter: {group: opt.group} | orderBy:\'name\' as opts\" ng-value=\"::filtered.value\" aria-label=\"{{::filtered.name}}\">{{::filtered.name}}</md-option></md-optgroup><md-option ng-if=\"!opt.group\" ng-value=\"::opt.value\" ng-repeat-end=\"\">{{::opt.name}}</md-option></md-select><div class=\"md-errors-spacer\"></div><div ng-messages=\"ngModel.$error\" aria-live=\"assertive\"><div sf-message=\"\" ng-message=\"\"></div></div><div class=\"hint md-char-counter\" ng-if=\"form.showHints\" ng-bind=\"form.description\"></div></md-input-container>");
	$templateCache.put("decorators/material/slider.html","<md-input-container class=\"schema-form-slider {{form.htmlClass}}\"><label ng-show=\"showTitle()\" for=\"{{::form.key|sfCamelKey}}\">{{::form.title}}</label><md-slider sf-field-model=\"\" flex=\"\" id=\"{{::form.key|sfCamelKey}}\" min=\"0\" max=\"255\" aria-label=\"blue\"></md-slider></md-input-container>");
	$templateCache.put("decorators/material/submit.html","<section class=\"schema-form-submit {{form.htmlClass}}\" sf-messages=\"\"><md-button class=\"md-raised {{ form.style || \'md-primary\' }} {{form.fieldHtmlClass}}\" type=\"{{::form.type}}\" ng-disabled=\"form.readonly\" aria-label=\"{{::form.title}}\"><md-tooltip ng-if=\"::form.tip\">{{::form.tip}}</md-tooltip>{{::form.title}}</md-button></section>");
	$templateCache.put("decorators/material/switch.html","<md-input-container class=\"schema-form-switch {{::form.htmlClass}}\"><md-switch sf-field-model=\"\" sf-changed=\"form\" sf-type-parser=\"form.schema\" sf-messages=\"\" schema-validate=\"form\" id=\"{{::form.key|sfCamelKey}}\" aria-label=\"{{form.title}}\" ng-show=\"::form.key\" ng-class=\"form.fieldHtmlClass\" ng-disabled=\"::form.readonly\"><span ng-show=\"showTitle()\" for=\"{{::form.key|sfCamelKey}}\">{{::form.title}}</span></md-switch></md-input-container>");
	$templateCache.put("decorators/material/tabarray.html","<div class=\"schema-form-array {{form.htmlClass}}\" name=\"{{::form.key|sfCamelKey}}\" sf-field-model=\"sf-new-array\" sf-new-array=\"\"><md-toolbar class=\"md-warn\"><div class=\"md-toolbar-tools\"><h2 flex=\"\">{{ ::form.title }}</h2><md-button ng-hide=\"form.readonly || form.add === null\" ng-click=\"appendToArray()\" class=\"md-icon-button {{ form.style.add || \'btn-default\' }}\"><md-tooltip>新增</md-tooltip><md-icon><ng-md-icon icon=\"add_circle_outline\"></ng-md-icon></md-icon></md-button><md-button ng-hide=\"form.readonly || form.del === null\" ng-click=\"deleteFromArray(form.selectedIndex)\" class=\"md-icon-button {{ form.style.del || \'btn-default\' }}\"><md-tooltip>删除</md-tooltip><md-icon><ng-md-icon icon=\"close-circle-outline\"></ng-md-icon></md-icon></md-button></div></md-toolbar><md-tabs md-selected=\"form.selectedIndex\" md-dynamic-height=\"\" md-border-bottom=\"\" md-autoselect=\"\"><md-tab ng-repeat=\"item in modelArray track by $index\" ng-disabled=\"item.disabled\" label=\"{{ (form.titleField && item[form.titleField]) || (form.title + ($index+1)) || item.title}}\"><div class=\"tab{{$index%4}} md-padding\" layout-padding=\"\" schema-form-array-items=\"\"></div></md-tab></md-tabs><md-input-container style=\"margin-top:0;\" class=\"md-block\" md-is-error=\"ngModel.$error && ngModel.$invalid\"><div ng-messages=\"ngModel.$error\" aria-live=\"assertive\"><div sf-message=\"\" ng-message=\"\" ng-class=\"{\'fx-invalid\':ngModel.$invalid}\"></div></div><div class=\"hint md-char-counter\" ng-if=\"form.showHints\" ng-bind=\"form.description\"></div></md-input-container></div>");
	$templateCache.put("decorators/material/tabs.html","<div sf-field-model=\"\" class=\"schema-form-tabs {{::form.htmlClass}}\"><md-tabs md-dynamic-height=\"\" md-selected=\"selected\" md-autoselect=\"\" ng-init=\"selected = 0\"></md-tabs></div>");
	$templateCache.put("decorators/material/textarea.html","<md-input-container class=\"{{::form.htmlClass}} schema-form-textarea\" sf-layout=\"\" md-is-error=\"ngModel.$error && ngModel.$invalid\"><label ng-show=\"showTitle()\" for=\"{{::form.key|sfCamelKey}}\">{{::form.title}}</label> <textarea ng-class=\"::form.fieldHtmlClass\" id=\"{{::form.key|sfCamelKey}}\" sf-changed=\"form\" ng-disabled=\"::form.readonly\" sf-field-model=\"\" schema-validate=\"form\" name=\"{{::form.key|sfCamelKey}}\"></textarea><div ng-messages=\"ngModel.$error\" aria-live=\"assertive\"><div sf-message=\"\" ng-message=\"\"></div></div><div class=\"hint md-char-counter\" ng-if=\"form.showHints\" ng-bind=\"form.description\"></div></md-input-container>");}]);
	angular.module('schemaForm').directive('sfMaterialClass', ["$compile", "$timeout", function ($compile, $timeout) {
	    return {
	        restrict: 'A',
	        scope: false,
	        link: function (scope, element, attrs, ngModel) {
	            function reduceHelper(obj, i) {
	                return obj[i]
	            }
	
	            var modelValue;
	
	            try {
	                if (scope.item) {
	                    modelValue = scope.form.key.slice(scope.form.key.length - 1).reduce(reduceHelper, scope.item || scope.model);
	                } else {
	                    modelValue = scope.form.key.reduce(reduceHelper, scope.model);
	
	                    if (!modelValue) {
	                        modelValue = scope.form.schema.default;
	                    }
	                }
	            } catch (e) {
	                modelValue = undefined;
	            }
	
	            // Element class is not set in DOM if executed immediately.
	            // I don't understand exactly why but it's probably related to other directive job.
	            $timeout(function () {
	                if (modelValue !== null && typeof modelValue !== 'undefined' && modelValue !== false) {
	                    element.addClass(attrs.sfMaterialClass);
	                }
	            }, 0);
	        }
	    };
	}]);
	(function(angular, undefined) {
	    'use strict';
	    angular
	        .module('schemaForm')
	        .config(materialDecoratorConfig)
	        .directive('sfmExternalOptions', sfmExternalOptionsDirective)
	        .filter('sfCamelKey', sfCamelKeyFilter);
	
	    materialDecoratorConfig.$inject = [
	        'schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider', '$injector'
	    ];
	
	    function sfLayout(args) {
	        var layoutDiv = args.fieldFrag.querySelector('[sf-layout]');
	
	        if (layoutDiv && args.form.grid) {
	            Object.getOwnPropertyNames(args.form.grid).forEach(function(property, idx, array) {
	                layoutDiv.setAttribute(property, args.form.grid[property]);
	            });
	        }
	    };
	
	    function materialDecoratorConfig(schemaFormProvider, decoratorsProvider, sfBuilderProvider, sfPathProvider, $injector) {
	        var base = 'decorators/material/';
	
	        var simpleTransclusion = sfBuilderProvider.builders.simpleTransclusion;
	        var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
	        var ngModel = sfBuilderProvider.builders.ngModel;
	        var sfField = sfBuilderProvider.builders.sfField;
	        var condition = sfBuilderProvider.builders.condition;
	        var array = sfBuilderProvider.builders.array;
	
	        var sflayout = sfLayout;
	        var sfMessagesNode = sfMessagesNodeHandler();
	        var sfMessages = sfMessagesBuilder;
	        var sfOptions = sfOptionsBuilder;
	        var mdAutocomplete = mdAutocompleteBuilder;
	        var mdSwitch = mdSwitchBuilder;
	        var mdDatepicker = mdDatepickerBuilder;
	        var mdTabs = mdTabsBuilder;
	        var textarea = textareaBuilder;
	
	        var core = [sfField, ngModel, ngModelOptions, condition, sflayout];
	        var defaults = core.concat(sfMessages);
	        var arrays = core.concat(array);
	        // var arrays = core;
	
	        schemaFormProvider.defaults.string.unshift(dateDefault);
	
	        decoratorsProvider.defineDecorator('materialDecorator', {
	            actions: { template: base + 'actions.html', builder: [sfField, simpleTransclusion, condition] },
	            array: { template: base + 'array.html', builder: arrays },
	            autocomplete: { template: base + 'autocomplete.html', builder: defaults.concat(mdAutocomplete) },
	            boolean: { template: base + 'checkbox.html', builder: defaults },
	            button: { template: base + 'submit.html', builder: defaults },
	            checkbox: { template: base + 'checkbox.html', builder: defaults },
	            checkboxes: { template: base + 'checkboxes.html', builder: arrays },
	            date: { template: base + 'date.html', builder: defaults.concat(mdDatepicker) },
	            'default': { template: base + 'default.html', builder: defaults },
	            fieldset: { template: base + 'fieldset.html', builder: [sfField, simpleTransclusion, condition] },
	            help: { template: base + 'help.html', builder: defaults },
	            number: { template: base + 'default.html', builder: defaults },
	            password: { template: base + 'default.html', builder: defaults },
	            radios: { template: base + 'radios.html', builder: defaults },
	            'radios-inline': { template: base + 'radios-inline.html', builder: defaults },
	            radiobuttons: { template: base + 'radio-buttons.html', builder: defaults },
	            section: {
	                template: base + 'section.html',
	                builder: [sfField, simpleTransclusion, condition, sfLayout, ngModel]
	            },
	            select: { template: base + 'select.html', builder: defaults.concat(sfOptions) },
	            submit: { template: base + 'submit.html', builder: defaults },
	            tabs: { template: base + 'tabs.html', builder: [sfField, mdTabs, condition] },
	            tabarray: { template: base + 'tabarray.html', builder: arrays },
	            textarea: { template: base + 'textarea.html', builder: defaults.concat(textarea) },
	            switch: { template: base + 'switch.html', builder: defaults.concat(mdSwitch) },
	            chips: { template: base + 'chips.html', builder: defaults.concat([]) },
	        });
	
	        function sfMessagesNodeHandler() {
	            var html = '<div ng-if="ngModel.$invalid" ng-messages="{dummy: true}" class="ng-active">' +
	                '<div ng-message="dummy" class="md-input-message-animation" sf-message="form.description"></div></div>';
	            var div = document.createElement('div');
	            div.innerHTML = html;
	            return div.firstChild;
	        };
	
	        function sfMessagesBuilder(args) {
	            var messagesDiv = args.fieldFrag.querySelector('[sf-messages]');
	            if (messagesDiv && sfMessagesNode) {
	                var child = sfMessagesNode.cloneNode(true);
	                messagesDiv.appendChild(child);
	            }
	        };
	
	        function textareaBuilder(args) {
	            var textareaFrag = args.fieldFrag.querySelector('textarea');
	            var maxLength = args.form.maxlength || false;
	            if (textareaFrag && maxLength) {
	                textareaFrag.setAttribute('md-maxlength', maxLength);
	            }
	        };
	
	        function mdAutocompleteBuilder(args) {
	            var mdAutocompleteFrag = args.fieldFrag.querySelector('md-autocomplete');
	            var minLength = args.form.minLength || 1;
	            var maxLength = args.form.maxLength || false;
	            var title = args.form.title || args.form.placeholder || args.form.key.slice(-1)[0];
	
	            if (mdAutocompleteFrag) {
	                if (args.form.onChange) {
	                    mdAutocompleteFrag.setAttribute('md-selected-item-change', 'args.form.onChange()');
	                    mdAutocompleteFrag.setAttribute('md-search-text-change', 'args.form.onChange(searchText)');
	                }
	
	                // mdAutocompleteFrag.setAttribute('md-items', 'item in $filter(''autocomplete'')(searchText);');
	                mdAutocompleteFrag.setAttribute('md-min-length', minLength);
	                if (maxLength) {
	                    mdAutocompleteFrag.setAttribute('md-max-length', maxLength);
	                }
	
	                if (title) {
	                    mdAutocompleteFrag.setAttribute('md-floating-label', title);
	                }
	            }
	        };
	
	        function mdSwitchBuilder(args) {
	            var mdSwitchFrag = args.fieldFrag.querySelector('md-switch');
	            if (args.form.schema.titleMap) {
	                mdSwitchFrag.setAttribute('ng-true-value', args.form.schema.titleMap.true);
	                mdSwitchFrag.setAttribute('ng-false-value', args.form.schema.titleMap.false);
	            }
	        };
	
	        function sfOptionsBuilder(args) {
	            var mdSelectFrag = args.fieldFrag.querySelector('md-select');
	            var enumTitleMap = [];
	            var i;
	            var mdSelectFrag;
	
	            args.form.selectOptions = [];
	            args.form.getOptions = getOptionsHandler;
	
	            if (args.form.schema.links && (typeof args.form.schema.links) === 'object') {
	                var link;
	                var related = /({)([^}]*)(})/gm;
	                var source = /{{([^}]*)}}/gm;
	                var matched;
	
	                for (i = 0; i < args.form.schema.links.length; i++) {
	                    link = args.form.schema.links[i];
	                    if (link.rel === 'options') {
	                        // TODO enable filter to allow processing results
	                        // args.form.optionSource = link.href.replace(related, '$1$1 model.$2 | _externalOptionUri $3$3');
	                        args.form.optionSource = link.href.replace(related, '$1$1 model.$2 $3$3');
	                    }
	                }
	
	                mdSelectFrag.setAttribute('sfm-external-options', args.form.optionSource);
	            } else {
	                args.form.selectOptions = sfOptionsProcessor(args.form);
	            }
	        };
	
	        function mdDatepickerBuilder(args) {
	            var mdDatepickerFrag = args.fieldFrag.querySelector('md-datepicker');
	            if (mdDatepickerFrag) {
	                if (args.form.onChange) {
	                    mdDatepickerFrag.setAttribute('ng-change', 'args.form.onChange(searchText)');
	                }
	                // mdDatepickerFrag.setAttribute('md-items', 'item in $filter(''autocomplete'')(searchText);');
	                var minDate = args.form.minimum || false;
	                var maxDate = args.form.maximum || false;
	                if (minDate) {
	                    mdDatepickerFrag.setAttribute('md-min-date', minDate);
	                }
	                if (maxDate) {
	                    mdDatepickerFrag.setAttribute('md-max-date', maxDate);
	                }
	            }
	        };
	
	        function mdTabsBuilder(args) {
	            if (args.form.tabs && args.form.tabs.length > 0) {
	                var mdTabsFrag = args.fieldFrag.querySelector('md-tabs');
	
	                args.form.tabs.forEach(function(tab, index) {
	                    var mdTab = document.createElement('md-tab');
	                    mdTab.setAttribute('label', '{{' + args.path + '.tabs[' + index + '].title}}');
	                    var mdTabBody = document.createElement('md-tab-body');
	                    var childFrag = args.build(tab.items, args.path + '.tabs[' + index + '].items', args.state);
	                    mdTabBody.appendChild(childFrag);
	                    mdTab.appendChild(mdTabBody);
	                    mdTabsFrag.appendChild(mdTab);
	                });
	            }
	        };
	
	        /**
	         * Material Datepicker
	         */
	        function dateDefault(name, schema, options) {
	            if (schema.type === 'string' && (schema.format === 'date' || schema.format === 'date-time')) {
	                var f = schemaFormProvider.stdFormObj(name, schema, options);
	                f.key = options.path;
	                f.type = 'date';
	                options.lookup[sfPathProvider.stringify(options.path)] = f;
	                return f;
	            }
	        };
	    };
	
	    function getOptionsHandler(form, evalExpr) {
	        if (form.optionData) {
	            return evalExpr(form.optionData);
	        }
	
	        if (form.selectOptions) {
	            return form.selectOptions;
	        }
	
	        return [];
	    }
	
	    function sfOptionsProcessor(data) {
	        var enumTitleMap = [];
	
	        if (data.titleMap) {
	            return data.titleMap;
	        } else if (data.enum && data.enum.length) {
	            for (var i = 0; i < data.enum.length; i++) {
	                if (data.enum[i] && data.enum[i].length) {
	                    enumTitleMap.push({ name: data.enum[i], value: data.enum[i] });
	                }
	            }
	        }
	
	        return enumTitleMap;
	    }
	
	    sfmExternalOptionsDirective.$inject = ['$http'];
	
	    function sfmExternalOptionsDirective($http) {
	        var directive = {
	            link: link,
	            restrict: 'A'
	        };
	
	        return directive;
	
	        function link(scope, element, attrs) {
	            attrs.$observe('sfmExternalOptions', function(dataURI) {
	                $http.get(dataURI)
	                    .then(function(response) {
	                        scope.form.selectOptions = sfOptionsProcessor(response.data);
	                    });
	            });
	        }
	    }
	
	    /**
	     * sfCamelKey Filter
	     */
	    function sfCamelKeyFilter() {
	        return function(formKey) {
	            if (!formKey) {
	                return '';
	            }
	            var part, i, key;
	            key = formKey.slice();
	            for (i = 0; i < key.length; i++) {
	                part = key[i].toString().toLowerCase().split('');
	                if (i && part.length) {
	                    part[0] = part[0].toUpperCase();
	                }
	                key[i] = part.join('');
	            }
	
	            return key.join('');
	        };
	    };
	
	})(angular, undefined);
	/*
	 TODO add default filter for autocomplete which allows form.optionFilter or 'autocompleteFilter' to override
	 Something along the following lines...
	 if ($injector.has('autocompleteFilter')) {
	 result = $filter('autocomplete')(input);
	 }
	 else
	 if ($injector.has(args.form.optionFilter + 'Filter')) {
	 result = $filter(args.form.optionFilter)(input);
	 }
	 else {
	 if (args.form.optionFilter) {
	 mdAutocomplete.setAttribute('md-items',
	 'item in evalExpr("this[\""+form.optionFilter+"\"](\""+searchText+"\")")');
	 }
	 }
	
	 .filter('autocompleteMovieTest', function() {
	 function autocompleteMovieTestFilter(array, input){
	 var current = input;
	 // You could also call multiple filters here using:
	 // current = $filter('filterName')(input)
	 if(typeof current === 'string') {
	 current = current.replace(' ','-').toLowerCase();
	 }
	 current = (!current) ? '_undefined' : current;
	 return current;
	 }
	
	 return externalOptionUriFilter;
	 })
	 */
	/**
	 * It might be a bug, but currently input[type=number] does not add
	 * a parser, so the model gets populated with a string. It does however stop non numbers so it
	 * must have some preproccessing. Anyway, this adds parser before schema-validate hooks into it.
	 * FIXME: this is still not a complete solution. Inputting a string in an input[type=number] results
	 * in parsers never firing and ngModel value removed. So no validation from schema-validate either.
	 */
	angular.module('schemaForm').directive('sfTypeParser', function() {
	  return {
	    restrict: 'A',
	    scope: false,
	    require: 'ngModel',
	    link: function(scope, element, attrs, ngModel) {
	      var once = scope.$watch(attrs.sfTypeParser, function(schema) {
	        if (!schema) {
	          return;
	        }
	
	        var isNumber  = schema.type.indexOf('number') !== -1;
	        var isInteger = schema.type.indexOf('integer') !== -1;
	        var numberRE  = /^[0-9]*$/;
	        // Use index of since type can be either an array with two values or a string.
	        if (isNumber || isInteger) {
	          // The timing here seems to work. i.e. we get in before schema-validate
	          ngModel.$parsers.push(function(viewValue) {
	            var value;
	            if (isNumber) {
	              value = parseFloat(viewValue);
	            } else if (numberRE.test(viewValue)) {
	              // We test the value to check that it's a valid integer, otherwise we can easily
	              // get float -> integer parsing behind the scenes.
	              value = parseInt(viewValue, 10);
	            }
	            console.log('parser', numberRE.test(viewValue), viewValue, value)
	            if (value === undefined || isNaN(value)) {
	              //Let the validation fail. @FIXME: it fails with "required" for some reason.
	              return viewValue;
	            }
	            return value;
	          });
	        }
	
	        once();
	      });
	    }
	  };
	});


/***/ }

})
//# sourceMappingURL=0.cd305b4f615c5e744930.hot-update.js.map