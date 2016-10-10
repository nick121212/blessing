/**
 * Created by NICK on 16/10/10.
 */
import _ from 'lodash';

const arrays = {
    in: "$in",
    notIn: "$notIn",
    between: "$between",
    notBetween: "$notBetween",
    overlap: "$overlap",
    contains: "$contains",
    contained: "$contained"
}, comparators = {
    eq: "$eq",
    ne: "$ne",
    gt: "$gt",
    gte: "$gte",
    lt: "$lt",
    lte: "$lte",
    is: "$is",
    not: "$not",
    like: "$like",
    notLike: "$notLike",
    ilike: "$iLike",
    notIlike: "$notILike",
};

class Builder {
    constructor() {
        if (!(this instanceof Builder)) return new Builder();

        this._select = [];
        this._where = {};
        this._order = [];
        this._limit = 10;
        this._offset = 0;

        this.init();
    }

    init() {
        _.forEach(comparators, (comparator, method) => {
            this[method] = (value)=> {
                if (this._context) {
                    this._where[this._context][comparator] = value;
                }

                return this;
            }
        });
        _.forEach(arrays, (comparator, method)=> {
            this[method] = () => {
                if (this._context) {
                    var arr;

                    if (_.isArray(arguments[0])) {
                        arr = arguments[0];
                    } else {
                        arr = _.toArray(arguments);
                    }

                    this._where[this._context][comparator] = arr;
                }

                return this;
            }
        })
    }

    build() {
        let result = {};

        if (!_.isEmpty(this._select)) {
            result.attributes = this._select;
        }

        if (!_.isEmpty(this._where)) {
            result.where = this._where;
        }

        if (!_.isEmpty(this._order)) {
            result.order = this._order;
        }

        if (this._limit) {
            result.limit = this._limit;
        }

        if (this._offset) {
            result.offset = this._offset;
        }

        return result;
    }

    select() {
        this._select = this._select.concat(_.flatten(_.toArray(arguments), true));
        return this;
    }

    order(a, b) {
        if (b) {
            this._order.push([a, b]);
        } else {
            this._order.push(a);
        }

        return this;
    }

    limit(limit) {
        this._limit = ~~limit;
        return this;
    }

    offset(offset) {
        this._offset = ~~offset;
        return this;
    }

    where(a, b) {
        this._context = null;

        if (_.isObject(a)) {
            this._where = _.assign(this._where, a);
        } else {
            this._context = a;
            this._where[a] = this._where[a] || {};

            if (b) return this.eq(b);
        }

        return this;
    }
}


module.exports = (app, log)=> {
    return Builder;
};