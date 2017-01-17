'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaBetterRouter = require('koa-better-router');

var _koaBetterRouter2 = _interopRequireDefault(_koaBetterRouter);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _auth = require('../auth');

var _auth2 = _interopRequireDefault(_auth);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    var router = (0, _koaBetterRouter2.default)({
        prefix: '/home'
    });

    router.addRoute('GET /config', [_auth2.default.passport(app), function (ctx) {
        ctx.body = {
            config: _config2.default.site
        };
    }]);

    router.addRoute('GET /userinfo', [_auth2.default.passport(app), function (ctx) {
        ctx.body = _lodash2.default.extend(_lodash2.default.pick(ctx.req.user, ['username', 'id']), {
            __event: "userinfo"
        });
    }]);

    return router;
};