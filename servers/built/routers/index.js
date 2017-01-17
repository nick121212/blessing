'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = exports.BRouter = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _db = require('../utils/db');

var _db2 = _interopRequireDefault(_db);

var _koaBetterRouter = require('koa-better-router');

var _koaBetterRouter2 = _interopRequireDefault(_koaBetterRouter);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _passport = require('./passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BRouter = exports.BRouter = function () {
    function BRouter() {
        (0, _classCallCheck3.default)(this, BRouter);
    }

    (0, _createClass3.default)(BRouter, [{
        key: 'execute',
        value: function execute(app) {
            this.doInitModelRouter(app);
            this.doInitOtherRoute(app);
        }
    }, {
        key: 'doInitRouter',
        value: function doInitRouter(key, router, model) {
            var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            var controller = void 0;

            if (_fs2.default.existsSync(__dirname + ('/../controllers/' + key))) {
                try {
                    controller = require('../controllers/' + key);

                    try {
                        _lodash2.default.forEach(controller.routers, function (route, routerKey) {
                            router.addRoute(routerKey, _lodash2.default.map(route, function (func) {
                                return func(model, config || controller.config || {});
                            }));
                        });

                        if (_lodash2.default.isFunction(controller.init)) {
                            controller.init(router, model);
                        }
                    } catch (err) {
                        console.error(err);
                    }
                } catch (err) {
                    console.error(err);
                }
            }

            return {
                router: router,
                config: controller ? controller.config : null
            };
        }
    }, {
        key: 'doInitModelRouter',
        value: function doInitModelRouter(app) {
            var _this = this;

            this.routers = {};

            _lodash2.default.each(_db2.default.models, function (model) {
                var router = (0, _koaBetterRouter2.default)({
                    prefix: '/' + model.name + 's'
                });

                var res = _this.doInitRouter(model.name, router, model);
                _this.doInitRouter('common', router, model, res.config);
                _this.routers[model.name] = router;

                app.use(router.middleware());
            });
        }
    }, {
        key: 'doInitOtherRoute',
        value: function doInitOtherRoute(app) {
            app.use((0, _home2.default)(app).middleware());
            app.use((0, _passport2.default)(app).middleware());

            app.use(this.doInitRouter("backup", (0, _koaBetterRouter2.default)({
                prefix: '/backups'
            }), {}).router.middleware());
            app.use(this.doInitRouter("device", (0, _koaBetterRouter2.default)({
                prefix: '/devices'
            }), {}).router.middleware());
            app.use(this.doInitRouter("apply", (0, _koaBetterRouter2.default)({
                prefix: '/applies'
            }), {}).router.middleware());
            app.use(this.doInitRouter("upload", (0, _koaBetterRouter2.default)({
                prefix: '/uploads'
            }), {}).router.middleware());
        }
    }]);
    return BRouter;
}();

var router = exports.router = new BRouter();