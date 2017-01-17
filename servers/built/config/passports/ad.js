"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passportActivedirectory = require("passport-activedirectory");

var _passportActivedirectory2 = _interopRequireDefault(_passportActivedirectory);

var _activedirectory = require("activedirectory");

var _activedirectory2 = _interopRequireDefault(_activedirectory);

var _db = require("../../utils/db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (passport, config) {
    var ad = new _activedirectory2.default(config);

    // ad.findUsers({}, function(err, users) {
    //     if (err) {
    //         console.log('ERROR: ' + JSON.stringify(err));
    //         return;
    //     }

    //     if ((!users) || (users.length == 0)) console.log('No users found.');
    //     else {
    //         console.log('findUsers: ' + JSON.stringify(users));
    //     }
    // });

    // ad.findGroups({}, function(err, groups) {
    //     if (err) {
    //         console.log('ERROR: ' + JSON.stringify(err));
    //         return;
    //     }
    //     console.log(groups);
    //     if ((!groups) || (groups.length == 0)) console.log('No groups found.');
    //     else {
    //         console.log('findGroups: ' + JSON.stringify(groups));
    //     }
    // });

    passport.use(new _passportActivedirectory2.default({
        integrated: false,
        ldap: ad
    }, function (profile, ad, done) {
        ad.isUserMemberOf(profile._json.dn, 'AccessGroup', function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(err, isMember) {
                var member;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!err) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return", done(err));

                            case 2:
                                _context.next = 4;
                                return _db2.default.models["member"].findOne({
                                    where: {
                                        username: profile._json.mail
                                    }
                                });

                            case 4:
                                member = _context.sent;

                                if (member) {
                                    _context.next = 9;
                                    break;
                                }

                                _context.next = 8;
                                return _db2.default.models["member"].create({
                                    username: profile._json.mail,
                                    password: "123456",
                                    name: profile._json.displayName
                                });

                            case 8:
                                member = _context.sent;

                            case 9:
                                return _context.abrupt("return", done(null, member.dataValues));

                            case 10:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }());
    }));
};