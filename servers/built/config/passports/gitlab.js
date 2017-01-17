"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passportGitlab = require("passport-gitlab2");

var _db = require("../../utils/db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (passport, config) {
    var strategy = new _passportGitlab.Strategy(config, function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(accessToken, refreshToken, profile, done) {
            var member;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            console.log(accessToken, refreshToken, profile);
                            _context.next = 3;
                            return _db2.default.models["member"].findOne({
                                where: {
                                    username: profile._json.email
                                }
                            });

                        case 3:
                            member = _context.sent;

                            if (member) {
                                _context.next = 8;
                                break;
                            }

                            _context.next = 7;
                            return _db2.default.models["member"].create({
                                username: profile._json.email,
                                password: "123456",
                                avatar: profile._json.avatar_url,
                                name: profile._json.name
                            });

                        case 7:
                            member = _context.sent;

                        case 8:
                            return _context.abrupt("return", done(null, member.dataValues));

                        case 9:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
        };
    }());
    passport.use(strategy);
};