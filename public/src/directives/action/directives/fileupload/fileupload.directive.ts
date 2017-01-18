import { module } from '../../module';
import * as _ from 'lodash';
import "./fileupload.scss";

module.config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider', 'sfBuilderProvider', 'sfErrorMessageProvider',
    (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider, sfBuilderProvider, sfErrorMessageProvider) => {
        var defaultPatternMsg = 'Wrong file type. Allowed types are ',
            defaultMaxSizeMsg1 = 'This file is too large. Maximum size allowed is ',
            defaultMaxSizeMsg2 = 'Current file size:',
            defaultMinItemsMsg = 'You have to upload at least one file',
            defaultMaxItemsMsg = 'You can\'t upload more than one file.';

        var nwpSinglefileUpload = function (name, schema, options) {
            if (schema.type === 'string' && schema.format === 'singlefile') {
                var f = schemaFormProvider.stdFormObj(name, schema, options);
                f.key = options.path;
                f.type = 'nwpFileUpload';
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                return f;
            }
        };

        schemaFormProvider.defaults.array.unshift(nwpSinglefileUpload);

        var nwpMultifileUpload = function (name, schema, options) {
            if (schema.type === 'array' && schema.format === 'multifile') {
                var f = schemaFormProvider.stdFormObj(name, schema, options);
                f.key = options.path;
                f.type = 'nwpFileUpload';
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                return f;
            }
        };

        schemaFormProvider.defaults.array.unshift(nwpMultifileUpload);

        schemaFormDecoratorsProvider.defineAddOn(
            'materialDecorator',
            'nwpFileUpload',
            "./decorators/nwp-file.jade",
            [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, sfBuilderProvider.builders.condition]
        );

        sfErrorMessageProvider.setDefaultMessage("701", "[{{title}}]文件不正确");
        sfErrorMessageProvider.setDefaultMessage("702", "[{{title}}]正在上传文件");
        sfErrorMessageProvider.setDefaultMessage("pattern", "[{{title}}]后缀名不对");
    }
]).run(["$templateCache", ($templateCache) => {
    $templateCache.put('./decorators/nwp-file.jade', require("./nwp-file.jade")());
}]);

interface Scope extends ng.IScope {
    url: string;
    isSinglefileUpload: boolean;
    form: { endpoint: string, schema: any, fuOptions: any }
    picFile: any;
    picFiles: any;
    errorMsg: string;
    progress: number;
    uploadForm: any;

    selectFile(file);
    selectFiles(files);
    uploadFile(file);
    uploadFiles(files);
    validateField();
    submit();
}

module.directive('ngSchemaFile', ['Upload', '$timeout', '$q', 'fxAction', function (Upload, $timeout, $q, fxAction) {
    return {
        restrict: 'A',
        scope: false,
        require: 'ngModel',
        link: (scope: Scope, element, attrs, ngModel: any) => {
            fxAction.getModel(scope.form.fuOptions.actionKey).then((actionModel) => {
                _.forEach(fxAction.getActionModelInterfacesInfo(actionModel, {}), (info) => {
                    scope.url = info.restAngular.getRequestedUrl();
                });
            });
            scope.isSinglefileUpload = false;

            scope.selectFiles = function (files) {
                scope.picFiles = files;
                files.length && this.uploadFiles(scope.picFiles);
            };

            scope.uploadFiles = function (files) {
                files.length && angular.forEach(files, (file, index) => {
                    doUpload(file, index);
                });
            };

            function doUpload(file, index) {
                if (file && !file.$error && scope.url) {
                    file.upload = Upload.upload({
                        url: scope.url,
                        data: {
                            [scope.form.fuOptions.field || "image"]: file
                        }
                    });

                    file.isBusy = true;
                    file.errorMsg = "";
                    file.upload.then((response) => {
                        file.result = response.data;
                        ngModel.$setViewValue(_.map(scope.picFiles, (file: any) => {
                            return file.result.staticUrl || "";
                        }));
                        ngModel.$commitViewValue();
                    }, (response) => {
                        if (response.status > 0) {
                            file.errorMsg = response.status;
                        }
                    }).finally(() => {
                        file.isBusy = false;
                    });

                    file.upload.progress(function (evt) {
                        file.progress = ~~Math.min(100, 100.0 * evt.loaded / evt.total);
                    });
                }
            }

            scope.validateField = function () {
                let errMsg = "";

                if (scope.picFiles) {
                    if (scope.picFiles.$error) {
                        return ngModel.$setValidity("701", false);
                    }
                    angular.forEach(scope.picFiles, function (file) {
                        if (file.$error) {
                            ngModel.$setValidity("701", false);

                            return false;
                        }

                        if (~~file.progress < 100) {
                            ngModel.$setValidity("702", false);

                            return false;
                        }
                    });
                }

                ngModel.$setValidity("", true);
            };
            scope.submit = function () {
                scope.uploadFiles(scope.picFiles);
            };
            scope.$on('schemaFormValidate', scope.validateField);
            scope.$on('schemaFormFileUploadSubmit', scope.submit);
        }
    };
}]);


module.directive('onReadFile', () => {
    return {
        restrict: 'A',
        require: ['ngModel'],
        scope: false,
        link: (scope, element, attrs, ngModelCtrl) => {
            element.on('change', (onChangeEvent: Event) => {
                let reader = new FileReader();

                reader.onload = (onLoadEvent: Event) => {
                    ngModelCtrl[0].$setViewValue(reader.result);
                    console.log(reader.result);
                };

                reader.readAsArrayBuffer((onChangeEvent.srcElement || onChangeEvent.target)["files"][0]);
            });
        }
    };
});