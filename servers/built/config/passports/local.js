"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passportLocal = require("passport-local");

var _cryptoBrowserify = require("crypto-browserify");

var _cryptoBrowserify2 = _interopRequireDefault(_cryptoBrowserify);

var _db = require("../../utils/db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_passportLocal.Strategy);

exports.default = function (passport) {
    // passport.serializeUser(function(u, done) {
    //     done(null, u);
    // });
    // passport.deserializeUser(async function(id, done) {
    //     done(null, id);
    // });
    passport.use(new _passportLocal.Strategy({
        passReqToCallback: false,
        session: true
    }, function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(username, password, done) {
            var member, sha1;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _db2.default.models["member"].findOne({
                                where: {
                                    username: username
                                }
                            });

                        case 2:
                            member = _context.sent;

                            if (!member) {
                                _context.next = 10;
                                break;
                            }

                            sha1 = _cryptoBrowserify2.default.createHash("sha1");

                            sha1.update(password);
                            password = sha1.digest("hex");

                            if (!(member.password === password)) {
                                _context.next = 10;
                                break;
                            }

                            delete member.password;
                            return _context.abrupt("return", done(null, member.dataValues));

                        case 10:
                            return _context.abrupt("return", done(null, false, new Error("账号或者密码错误!")));

                        case 11:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }()));
};