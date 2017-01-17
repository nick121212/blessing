'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DB = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelizeImport = require('sequelize-import');

var _sequelizeImport2 = _interopRequireDefault(_sequelizeImport);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _sequelizeRelationsHelper = require('sequelize-relations-helper');

var _sequelizeRelationsHelper2 = _interopRequireDefault(_sequelizeRelationsHelper);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(sequelize, sequelizeModel, modelIntance) {
        var trans, parentModel, parentCount;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return sequelize.transaction();

                    case 2:
                        trans = _context.sent;
                        _context.next = 5;
                        return sequelizeModel.findOne({
                            where: {
                                key: modelIntance.parentKey || ""
                            }
                        });

                    case 5:
                        parentModel = _context.sent;
                        _context.next = 8;
                        return sequelizeModel.count({
                            where: {
                                lft: 1
                            }
                        });

                    case 8:
                        parentCount = _context.sent;

                        if (!(parentCount && !parentModel)) {
                            _context.next = 11;
                            break;
                        }

                        return _context.abrupt('return', trans.commit());

                    case 11:
                        _context.prev = 11;

                        if (!parentModel) {
                            _context.next = 21;
                            break;
                        }

                        _context.next = 15;
                        return sequelize.query('update depart set lft=lft+2 where lft > $1;', {
                            transaction: trans,
                            bind: [parentModel.rgt]
                        });

                    case 15:
                        _context.next = 17;
                        return sequelize.query('update depart set rgt=rgt+2 where rgt >= $1;', {
                            transaction: trans,
                            bind: [parentModel.rgt]
                        });

                    case 17:

                        modelIntance.lft = parentModel.rgt;
                        modelIntance.rgt = parentModel.rgt + 1;
                        _context.next = 23;
                        break;

                    case 21:
                        modelIntance.lft = 1;
                        modelIntance.rgt = 2;

                    case 23:
                        _context.next = 25;
                        return sequelizeModel.create(modelIntance, { transaction: trans });

                    case 25:
                        trans.commit();

                        _context.next = 31;
                        break;

                    case 28:
                        _context.prev = 28;
                        _context.t0 = _context['catch'](11);

                        trans.rollback();

                    case 31:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[11, 28]]);
    }));

    return function create(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var init = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(sequelize, models) {
        var depart1s, depart2s, hash, i, data, _i, _data;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return sequelize.query("select * from depart_1 where parent_dept_id='' order by parent_dept_id;");

                    case 2:
                        depart1s = _context2.sent;
                        _context2.next = 5;
                        return sequelize.query("select node.dept_id,node.descr_short,node.descr,parent.dept_id as parent_dept_id from depart_1 as node inner join depart_1 as parent on node.parent_dept_id = parent.dept_id order by parent.parent_dept_id;");

                    case 5:
                        depart2s = _context2.sent;
                        hash = {};
                        _context2.next = 9;
                        return sequelize.query("delete from depart;");

                    case 9:
                        _context2.next = 11;
                        return models["depart"].create({
                            key: "00000000",
                            title: "红星集团",
                            lft: 1,
                            rgt: 2,
                            description: "红星集团",
                            parentKey: ""
                        });

                    case 11:
                        _context2.prev = 11;
                        i = 0;

                    case 13:
                        if (!(i < depart1s[0].length)) {
                            _context2.next = 20;
                            break;
                        }

                        data = depart1s[0][i];
                        _context2.next = 17;
                        return create(sequelize, models["depart"], {
                            key: data.dept_id,
                            title: data.descr_short,
                            description: data.descr,
                            parentKey: _lodash2.default.trim(data.parent_dept_id) || "00000000"
                        });

                    case 17:
                        i++;
                        _context2.next = 13;
                        break;

                    case 20:
                        _i = 0;

                    case 21:
                        if (!(_i < depart2s[0].length)) {
                            _context2.next = 29;
                            break;
                        }

                        _data = depart2s[0][_i];

                        if (!(_lodash2.default.trim(_data.parent_dept_id) != "")) {
                            _context2.next = 26;
                            break;
                        }

                        _context2.next = 26;
                        return create(sequelize, models["depart"], {
                            key: _data.dept_id,
                            title: _data.descr_short,
                            description: _data.descr,
                            parentKey: _lodash2.default.trim(_data.parent_dept_id) || "00000000"
                        });

                    case 26:
                        _i++;
                        _context2.next = 21;
                        break;

                    case 29:

                        console.log("-------------------;commit");
                        _context2.next = 35;
                        break;

                    case 32:
                        _context2.prev = 32;
                        _context2.t0 = _context2['catch'](11);

                        console.log(_context2.t0);

                    case 35:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[11, 32]]);
    }));

    return function init(_x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * sequelize 操作数据库类
 * 返回sequelize实例，以及所有定义过的model
 */

var DB = exports.DB = function () {
    function DB() {
        (0, _classCallCheck3.default)(this, DB);

        this.sequelize = null;
        this.models = null;
    }

    (0, _createClass3.default)(DB, [{
        key: 'execute',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(config, app) {
                var _this = this;

                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                this.Sequelize = _sequelize2.default;
                                this.sequelize = new _sequelize2.default(config.database, config.username, config.password, config.options);
                                (0, _sequelizeRelationsHelper2.default)(this.sequelize, { debug: false });
                                _context4.next = 5;
                                return (0, _sequelizeImport2.default)(__dirname + '/../models', this.sequelize, {
                                    exclude: ['index.js']
                                });

                            case 5:
                                this.models = _context4.sent;
                                return _context4.abrupt('return', this.sequelize.sync({ force: false }).then((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    console.log("db ok!");

                                                    // await init(this.sequelize, this.models);

                                                case 1:
                                                case 'end':
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee3, _this);
                                }))).catch(function (err) {
                                    console.log(err);
                                    throw err;
                                }));

                            case 7:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function execute(_x6, _x7) {
                return _ref3.apply(this, arguments);
            }

            return execute;
        }()
    }]);
    return DB;
}();

exports.default = new DB();