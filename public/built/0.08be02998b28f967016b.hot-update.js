webpackHotUpdate(0,{71:function(e,t){angular.module("schemaForm").run(["$templateCache",function(e){e.put("decorators/material/actions-trcl.html",'<div class="btn-group schema-form-actions {{form.htmlClass}}" ng-transclude=""></div>'),e.put("decorators/material/actions.html",'<section layout="row" class="btn-group schema-form-actions {{form.htmlClass}}"></section>'),e.put("decorators/material/array.html",'<div class="schema-form-array {{form.htmlClass}}" sf-field-model="sf-new-array" sf-new-array=""><md-toolbar class="md-default"><div class="md-toolbar-tools"><h2 flex="">{{ ::form.title }}</h2><md-button ng-hide="form.readonly || form.add === null" ng-click="appendToArray()" class="md-icon-button {{ form.style.add || \'btn-default\' }}"><md-tooltip>新增</md-tooltip><md-icon><ng-md-icon icon="add_circle_outline"></ng-md-icon></md-icon></md-button></div></md-toolbar><md-content ng-model="modelArray" flex="" layout-padding="" class="md-whiteframe-1dp"><md-list ui-sortable="form.sortOptions"><md-list-item layout="row" ng-init="fieldClass = form.fieldHtmlClass;copyWithIndex($index)" ng-repeat-start="item in modelArray track by $index" schema-form-array-items=""><md-button flex-order="2" ng-hide="form.readonly || form.remove === null" ng-click="deleteFromArray($index)" class="md-icon-button" aria-label="Delete"><md-tooltip>删除</md-tooltip><md-icon><ng-md-icon icon="close-circle-outline"></ng-md-icon></md-icon></md-button></md-list-item><md-divider ng-repeat-end=""></md-divider></md-list></md-content><md-input-container style="margin-top:0;" class="md-block" md-is-error="ngModel.$error && ngModel.$invalid"><div ng-messages="ngModel.$error" aria-live="assertive"><div sf-message="" ng-message=""></div></div><div class="hint md-char-counter" ng-if="form.showHints" ng-bind="form.description"></div></md-input-container></div>'),e.put("decorators/material/autocomplete.html",'<md-input-container class="form-group no-errors schema-form-autocomplete {{form.htmlClass}}" md-is-error="ngModel.$error && ngModel.$invalid" sf-layout=""><md-autocomplete flex="" style="height: 48px;" ng-disabled="form.readonly" ng-model="$$value$$" sf-autocomplete="" sf-field-model="replaceAll" ng-init="autoData={};form.init($$value$$,autoData,arrayIndex)" md-no-cache="form.noCache" md-selected-item="autoData.selected" md-search-text="autoData.searchText" md-selected-item-change="form.onChange(item, form, model, modelArray, arrayIndex)" md-items="item in form.query(autoData.searchText,modelArray,arrayIndex,$parent)" md-item-text="item[form.textField]" md-floating-label="{{ form.title }}" placeholder="{{ form.placeholder }}" md-menu-class="autocomplete-custom-template"><md-item-template><span md-highlight-text="searchText">{{item.name}}</span></md-item-template><md-not-found>No matches found</md-not-found></md-autocomplete><input class="ng-hide" name="{{::form.key|sfCamelKey}}" sf-changed="form" sf-field-model="" schema-validate="form"><div ng-messages="ngModel.$error" aria-live="assertive"><div sf-message="" ng-message=""></div></div><div class="hint md-char-counter" ng-if="form.showHints" ng-bind="form.description"></div></md-input-container>'),e.put("decorators/material/card-content.html",'<md-card-content class="schema-form-card-content {{form.htmlClass}}"></md-card-content>'),e.put("decorators/material/card.html",'<md-card class="schema-form-card {{form.htmlClass}}"></md-card>'),e.put("decorators/material/checkbox.html",'<md-input-container class="checkbox schema-form-checkbox {{::form.htmlClass}}" md-is-error="!$root.isEmptyObject(ngModel.$error)"><md-checkbox sf-field-model="" ng-model="$$value$$" ng-disabled="form.readonly" schema-validate="form" sf-changed="form" ng-model-options="form.ngModelOptions" ng-true-value="{{form.trueValue || true}}" ng-false-value="{{form.falseValue || false}}" ng-class="form.fieldHtmlClass" name="{{::form.key|sfCamelKey}}" aria-label="{{::form.title}}"><span>{{::form.title}}</span></md-checkbox><div ng-messages="ngModel.$error" class="md-input-messages-animation"><div sf-message="" ng-message=""></div></div><div class="md-char-counter">{{ form.description }}</div></md-input-container>'),e.put("decorators/material/checkboxes.html",'<div sf-array="form" sf-field-model="" class="form-group schema-form-checkboxes {{::form.htmlClass}}" ng-class="{\'has-error\': hasError(), \'has-success\': hasSuccess()}" sf-messages=""><label class="control-label" ng-show="showTitle()">{{::form.title}}</label><div class="checkbox" ng-repeat="val in titleMapValues track by $index"><md-checkbox ng-model="titleMapValues[$index]" sf-changed="form" ng-disabled="::form.readonly" name="{{::form.key|sfCamelKey}}" ng-true-value="true" ng-false-value="false" aria-label="{{::form.title}}">{{::form.titleMap[$index].name}}</md-checkbox></div></div>'),e.put("decorators/material/chips.html",'<md-input-container class="form-group schema-form-chips {{form.htmlClass}}" sf-field-model="sf-new-array" sf-new-array="" md-no-float="true" md-is-error="ngModel.$error && ngModel.$invalid"><md-chips sf-field-model="" schema-form-array-items="" readonly="form.readonly" class="no-errors" name="{{::form.key|sfCamelKey}}" placeholder="{{::form.title}}"><md-chip-template><strong ng-if="!form.template">{{$chip}}</strong></md-chip-template></md-chips><div class="errors" ng-model="modelArray" schema-validate="form" ng-messages="ngModel.$error" aria-live="assertive"><div sf-message="" ng-message=""></div></div><div class="hint md-char-counter" ng-if="form.showHints" ng-bind="form.description"></div></md-input-container>'),e.put("decorators/material/date.html",'<div class="schema-form-date {{::form.htmlClass}}"><label ng-show="showTitle()" for="{{::form.key|sfCamelKey}}">{{::form.title}}</label><md-datepicker sf-field-model="" sf-changed="form" schema-validate="form" sf-type-parser="form.schema" id="{{::form.key|sfCamelKey}}" ng-show="::form.key" ng-class="::form.fieldHtmlClass" ng-disabled="::form.readonly" md-placeholder="Enter date" sf-messages=""></md-datepicker></div>'),e.put("decorators/material/default.html",'<md-input-container class="schema-form-{{::form.type}} {{::form.htmlClass}}" md-is-error="hasError()" sf-layout="" sf-material-class="md-input-has-value"><label ng-show="showTitle()" for="{{::form.key|sfCamelKey}}">{{::form.title}}</label><md-icon ng-if="form.icon"><ng-md-icon icon="{{ form.icon.leftIcon }}" ng-style="form.icon.style"></ng-md-icon></md-icon><input sf-field-model="" type="{{::form.type}}" step="any" ng-model="$$value$$" sf-changed="form" placeholder="{{form.placeholder}}" id="{{::form.key|sfCamelKey}}" ng-class="::form.fieldHtmlClass" ng-disabled="::form.readonly" schema-validate="form" name="{{::form.key|sfCamelKey}}" aria-describedby="{{::form.key|sfCamelKey}}Status"><div ng-messages="ngModel.$error" aria-live="assertive"><div sf-message="" ng-message=""></div></div><div class="hint md-char-counter" ng-if="form.showHints" ng-bind="form.description"></div></md-input-container>'),e.put("decorators/material/fieldset-trcl.html",'<fieldset ng-disabled="form.readonly" class="standard {{form.htmlClass}}" flex=""><legend ng-show="form.title">{{ form.title }}</legend><div ng-transclude=""></div></fieldset>'),e.put("decorators/material/fieldset.html",'<fieldset ng-disabled="form.readonly" class="standard {{form.htmlClass}}" flex=""><legend ng-show="form.title">{{ form.title }}</legend></fieldset>'),e.put("decorators/material/help.html",'<div class="helpvalue schema-form-helpvalue {{form.htmlClass}}" ng-bind-html="form.helpvalue"></div>'),e.put("decorators/material/radio-buttons.html",'<div class="form-group schema-form-radiobuttons {{form.htmlClass}}" ng-class="{\'has-error\': hasError(), \'has-success\': hasSuccess()}" sf-layout="" sf-messages=""><div><label class="control-label" ng-show="showTitle()">{{form.title}}</label></div><section layout="row" layout-sm="column" layout-align="center center"><md-input-container ng-repeat="item in form.titleMap"><md-button type="button" class="group md-raised" sf-field-model="replaceAll" ng-model="$$value$$" sf-changed="form" ng-class="{\'md-primary\': ($$value$$ == item.value)}" ng-disabled="form.readonly" ng-model-options="form.ngModelOptions" schema-validate="form" ng-value="item.value" ng-click="$$value$$ = item.value" name="{{form.key.join(\'.\')}}"><span ng-bind-html="item.name"></span></md-button></md-input-container></section></div>'),e.put("decorators/material/radios-inline.html",'<div class="form-group schema-form-radios-inline {{form.htmlClass}}" ng-class="{\'has-error\': hasError(), \'has-success\': hasSuccess()}" sf-layout="" sf-messages=""><label class="control-label" ng-show="showTitle()">{{form.title}}</label><md-radio-group layout="row" sf-field-model="replaceAll" ng-model="$$value$$" class="{{form.fieldHtmlClass}}" ng-class="{ active: item.value === $$value$$ }" sf-changed="form" schema-validate="form" ng-disabled="form.readonly" name="{{form.key.join(\'.\')}}"><md-radio-button ng-repeat="item in form.titleMap" ng-value="item.value"><span ng-bind-html="item.name"></span></md-radio-button></md-radio-group></div>'),e.put("decorators/material/radios.html",'<div class="form-group schema-form-radios {{form.htmlClass}}" ng-class="{\'has-error\': hasError(), \'has-success\': hasSuccess()}"><label class="control-label" ng-show="showTitle()" aria-label="{{form.title}}" layout="row">{{form.title}} {{form.titleMap | json}}</label><div><md-radio-group sf-field-model="" sf-changed="form" ng-disabled="form.readonly" name="{{form.key.join(\'.\')}}" sf-layout="" sf-messages=""><md-radio-button ng-repeat="item in form.titleMap" ng-value="item.value" class="{{form.fieldHtmlClass}}" sf-field-model="ng-class" ng-class="{ active: item.value === $$value$$ }"><span ng-bind-html="item.name"></span></md-radio-button></md-radio-group></div></div>'),e.put("decorators/material/section.html",'<md-content class="schema-form-section {{::form.htmlClass}}" sf-layout=""></md-content>'),e.put("decorators/material/select.html",'<md-input-container class="form-group {{::form.htmlClass}} schema-form-select" md-is-error="ngModel.$error && ngModel.$invalid" sf-layout="" sf-material-class="md-input-has-value"><label ng-show="::showTitle()">{{::form.title}}</label><md-select sf-field-model="" schema-validate="form"><md-optgroup ng-repeat-start="(key, opt) in form.getOptions(form, evalExpr) | orderBy:\'group\' as optGroups" ng-if="opt.group && opt.group != optGroups[key-1].group" label="{{::opt.group}}" aria-label="{{::opt.group}}"><md-option ng-repeat="(key, filtered) in form.getOptions(form, evalExpr) | filter: {group: opt.group} | orderBy:\'name\' as opts" ng-value="::filtered.value" aria-label="{{::filtered.name}}">{{::filtered.name}}</md-option></md-optgroup><md-option ng-if="!opt.group" ng-value="::opt.value" ng-repeat-end="">{{::opt.name}}</md-option></md-select><div ng-messages="ngModel.$error" aria-live="assertive"><div sf-message="" ng-message=""></div></div><div class="hint md-char-counter" ng-if="form.showHints" ng-bind="form.description"></div></md-input-container>'),e.put("decorators/material/slider.html",'<md-input-container class="schema-form-slider {{form.htmlClass}}"><label ng-show="showTitle()" for="{{::form.key|sfCamelKey}}">{{::form.title}}</label><md-slider sf-field-model="" flex="" id="{{::form.key|sfCamelKey}}" min="0" max="255" aria-label="blue"></md-slider></md-input-container>'),e.put("decorators/material/submit.html",'<section class="schema-form-submit {{form.htmlClass}}" sf-messages=""><md-button class="md-raised {{ form.style || \'md-primary\' }} {{form.fieldHtmlClass}}" type="{{::form.type}}" ng-disabled="form.readonly" aria-label="{{::form.title}}"><md-tooltip ng-if="::form.tip">{{::form.tip}}</md-tooltip>{{::form.title}}</md-button></section>'),e.put("decorators/material/switch.html",'<md-input-container class="schema-form-switch {{::form.htmlClass}}"><md-switch sf-field-model="" sf-changed="form" sf-type-parser="form.schema" sf-messages="" schema-validate="form" id="{{::form.key|sfCamelKey}}" aria-label="{{form.title}}" ng-show="::form.key" ng-class="form.fieldHtmlClass" ng-disabled="::form.readonly"><span ng-show="showTitle()" for="{{::form.key|sfCamelKey}}">{{::form.title}}</span></md-switch></md-input-container>'),e.put("decorators/material/tabarray.html",'<div class="schema-form-array {{form.htmlClass}}" sf-field-model="sf-new-array" sf-new-array=""><md-toolbar class="md-warn"><div class="md-toolbar-tools"><h2 flex="">{{ ::form.title }}</h2><md-button ng-hide="form.readonly || form.add === null" ng-click="appendToArray()" class="md-icon-button {{ form.style.add || \'btn-default\' }}"><md-tooltip>新增</md-tooltip><md-icon><ng-md-icon icon="add_circle_outline"></ng-md-icon></md-icon></md-button><md-button ng-hide="form.readonly || form.del === null" ng-click="deleteFromArray(form.selectedIndex)" class="md-icon-button {{ form.style.del || \'btn-default\' }}"><md-tooltip>删除</md-tooltip><md-icon><ng-md-icon icon="close-circle-outline"></ng-md-icon></md-icon></md-button></div></md-toolbar><md-tabs md-selected="form.selectedIndex" md-dynamic-height="" md-border-bottom="" md-autoselect=""><md-tab ng-repeat="item in modelArray track by $index" ng-disabled="item.disabled" label="{{ (form.title + ($index+1)) || item.title}}"><div class="tab{{$index%4}}" layout-padding="" schema-form-array-items="" ng-init="copyWithIndex($index)"></div></md-tab></md-tabs></div>'),e.put("decorators/material/tabs.html",'<div sf-field-model="" class="schema-form-tabs {{::form.htmlClass}}"><md-tabs md-dynamic-height="" md-selected="selected" md-autoselect="" ng-init="selected = 0"></md-tabs></div>'),e.put("decorators/material/textarea.html",'<md-input-container class="{{::form.htmlClass}} schema-form-textarea" sf-layout="" md-is-error="ngModel.$error && ngModel.$invalid"><label ng-show="showTitle()" for="{{::form.key|sfCamelKey}}">{{::form.title}}</label> <textarea ng-class="::form.fieldHtmlClass" id="{{::form.key|sfCamelKey}}" sf-changed="form" ng-disabled="::form.readonly" sf-field-model="" schema-validate="form" name="{{::form.key|sfCamelKey}}"></textarea><div ng-messages="ngModel.$error" aria-live="assertive"><div sf-message="" ng-message=""></div></div><div class="hint md-char-counter" ng-if="form.showHints" ng-bind="form.description"></div></md-input-container>')}]),angular.module("schemaForm").directive("sfMaterialClass",["$compile","$timeout",function(e,t){return{restrict:"A",scope:!1,link:function(e,a,r,o){function l(e,t){return e[t]}var m;try{m=e.item?e.form.key.slice(e.form.key.length-1).reduce(l,e.item||e.model):e.form.key.reduce(l,e.model)}catch(s){m=void 0}t(function(){null!==m&&"undefined"!=typeof m&&m!==!1&&a.addClass(r.sfMaterialClass)},0)}}}]),function(e,t){"use strict";function a(e,t,a,l,m){function s(e){var t=e.fieldFrag.querySelector("[sf-layout]");t&&e.form.grid&&Object.getOwnPropertyNames(e.form.grid).forEach(function(a,r,o){t.setAttribute(a,e.form.grid[a])})}function i(){var e='<div ng-if="ngModel.$invalid" ng-messages="{dummy: true}" class="ng-active"><div ng-message="dummy" class="md-input-message-animation" sf-message="form.description"></div></div>',t=document.createElement("div");return t.innerHTML=e,t.firstChild}function n(e){var t=e.fieldFrag.querySelector("[sf-messages]");if(t&&w){var a=w.cloneNode(!0);t.appendChild(a)}}function d(e){var t=e.fieldFrag.querySelector("textarea"),a=e.form.maxlength||!1;t&&a&&t.setAttribute("md-maxlength",a)}function c(e){var t=e.fieldFrag.querySelector("md-autocomplete"),a=e.form.minLength||1,r=e.form.maxLength||!1,o=e.form.title||e.form.placeholder||e.form.key.slice(-1)[0];t&&(e.form.onChange&&(t.setAttribute("md-selected-item-change","args.form.onChange()"),t.setAttribute("md-search-text-change","args.form.onChange(searchText)")),t.setAttribute("md-min-length",a),r&&t.setAttribute("md-max-length",r),o&&t.setAttribute("md-floating-label",o))}function f(e){var t=e.fieldFrag.querySelector("md-switch");e.form.schema.titleMap&&(t.setAttribute("ng-true-value",e.form.schema.titleMap["true"]),t.setAttribute("ng-false-value",e.form.schema.titleMap["false"]))}function u(e){var t,a,a=e.fieldFrag.querySelector("md-select");if(e.form.selectOptions=[],e.form.getOptions=r,e.form.schema.links&&"object"==typeof e.form.schema.links){var l,m=/({)([^}]*)(})/gm;for(t=0;t<e.form.schema.links.length;t++)l=e.form.schema.links[t],"options"===l.rel&&(e.form.optionSource=l.href.replace(m,"$1$1 model.$2 $3$3"));a.setAttribute("sfm-external-options",e.form.optionSource)}else e.form.selectOptions=o(e.form)}function h(e){var t=e.fieldFrag.querySelector("md-datepicker");if(t){e.form.onChange&&t.setAttribute("ng-change","args.form.onChange(searchText)");var a=e.form.minimum||!1,r=e.form.maximum||!1;a&&t.setAttribute("md-min-date",a),r&&t.setAttribute("md-max-date",r)}}function p(e){if(e.form.tabs&&e.form.tabs.length>0){var t=e.fieldFrag.querySelector("md-tabs");e.form.tabs.forEach(function(a,r){var o=document.createElement("md-tab");o.setAttribute("label","{{"+e.path+".tabs["+r+"].title}}");var l=document.createElement("md-tab-body"),m=e.build(a.items,e.path+".tabs["+r+"].items",e.state);l.appendChild(m),o.appendChild(l),t.appendChild(o)})}}function g(t,a,r){if("string"===a.type&&("date"===a.format||"date-time"===a.format)){var o=e.stdFormObj(t,a,r);return o.key=r.path,o.type="date",r.lookup[l.stringify(r.path)]=o,o}}var b="decorators/material/",v=a.builders.simpleTransclusion,y=a.builders.ngModelOptions,$=a.builders.ngModel,x=a.builders.sfField,C=a.builders.condition,k=a.builders.array,s=s,w=i(),M=n,A=u,T=c,F=f,O=h,K=p,H=d,E=[x,$,y,C,s],S=E.concat(M),j=E.concat(k);e.defaults.string.unshift(g),t.defineDecorator("materialDecorator",{actions:{template:b+"actions.html",builder:[x,v,C]},array:{template:b+"array.html",builder:j},autocomplete:{template:b+"autocomplete.html",builder:S.concat(T)},"boolean":{template:b+"checkbox.html",builder:S},button:{template:b+"submit.html",builder:S},checkbox:{template:b+"checkbox.html",builder:S},checkboxes:{template:b+"checkboxes.html",builder:j},date:{template:b+"date.html",builder:S.concat(O)},"default":{template:b+"default.html",builder:S},fieldset:{template:b+"fieldset.html",builder:[x,v,C]},help:{template:b+"help.html",builder:S},number:{template:b+"default.html",builder:S},password:{template:b+"default.html",builder:S},radios:{template:b+"radios.html",builder:S},"radios-inline":{template:b+"radios-inline.html",builder:S},radiobuttons:{template:b+"radio-buttons.html",builder:S},section:{template:b+"section.html",builder:[x,v,C,s,$]},select:{template:b+"select.html",builder:S.concat(A)},submit:{template:b+"submit.html",builder:S},tabs:{template:b+"tabs.html",builder:[x,K,C]},tabarray:{template:b+"tabarray.html",builder:j},textarea:{template:b+"textarea.html",builder:S.concat(H)},"switch":{template:b+"switch.html",builder:S.concat(F)},chips:{template:b+"chips.html",builder:S.concat([])}})}function r(e,t){return e.optionData?t(e.optionData):e.selectOptions?e.selectOptions:[]}function o(e){var t=[];if(e.titleMap)return e.titleMap;if(e["enum"]&&e["enum"].length)for(var a=0;a<e["enum"].length;a++)e["enum"][a]&&e["enum"][a].length&&t.push({name:e["enum"][a],value:e["enum"][a]});return t}function l(e){function t(t,a,r){r.$observe("sfmExternalOptions",function(a){e.get(a).then(function(e){t.form.selectOptions=o(e.data)})})}var a={link:t,restrict:"A"};return a}function m(){return function(e){if(!e)return"";var t,a,r;for(r=e.slice(),a=0;a<r.length;a++)t=r[a].toString().toLowerCase().split(""),a&&t.length&&(t[0]=t[0].toUpperCase()),r[a]=t.join("");return r.join("")}}e.module("schemaForm").config(a).directive("sfmExternalOptions",l).filter("sfCamelKey",m),a.$inject=["schemaFormProvider","schemaFormDecoratorsProvider","sfBuilderProvider","sfPathProvider","$injector"],l.$inject=["$http"]}(angular,void 0),angular.module("schemaForm").directive("sfTypeParser",function(){return{restrict:"A",scope:!1,require:"ngModel",link:function(e,t,a,r){var o=e.$watch(a.sfTypeParser,function(e){if(e){var t=e.type.indexOf("number")!==-1,a=e.type.indexOf("integer")!==-1,l=/^[0-9]*$/;(t||a)&&r.$parsers.push(function(e){var a;return t?a=parseFloat(e):l.test(e)&&(a=parseInt(e,10)),console.log("parser",l.test(e),e,a),void 0===a||isNaN(a)?e:a}),o()}})}}})}});
//# sourceMappingURL=0.08be02998b28f967016b.hot-update.js.map