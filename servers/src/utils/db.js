import Sequelize from 'sequelize';
import sequelizeImport from 'sequelize-import';
import modelRelation from '../models';
import sequelizeRelationsHelper from 'sequelize-relations-helper';
import _ from "lodash";
import fs from "fs";

const create = async(sequelize, sequelizeModel, modelIntance) => {
    let trans = await sequelize.transaction();
    let parentModel = await sequelizeModel.findOne({
            where: {
                key: modelIntance.parentKey || ""
            }
        }),
        parentCount = await sequelizeModel.count({
            where: {
                lft: 1
            }
        });

    if (parentCount && !parentModel) {
        return trans.commit();
    }

    try {
        if (parentModel) {
            await sequelize.query('update depart set lft=lft+2 where lft > $1;', {
                transaction: trans,
                bind: [parentModel.rgt]
            });
            await sequelize.query('update depart set rgt=rgt+2 where rgt >= $1;', {
                transaction: trans,
                bind: [parentModel.rgt]
            });

            modelIntance.lft = parentModel.rgt;
            modelIntance.rgt = parentModel.rgt + 1;
        } else {
            modelIntance.lft = 1;
            modelIntance.rgt = 2;
        }

        await sequelizeModel.create(modelIntance, { transaction: trans });
        trans.commit();

    } catch (e) {
        trans.rollback();

    }
}

const init = async(sequelize, models) => {
    let depart1s = await sequelize.query("select * from depart_1 where parent_dept_id='' order by parent_dept_id;");
    let depart2s = await sequelize.query("select node.dept_id,node.descr_short,node.descr,parent.dept_id as parent_dept_id from depart_1 as node inner join depart_1 as parent on node.parent_dept_id = parent.dept_id order by parent.parent_dept_id;");
    let hash = {};

    await sequelize.query("delete from depart;");
    await models["depart"].create({
        key: "00000000",
        title: "红星集团",
        lft: 1,
        rgt: 2,
        description: "红星集团",
        parentKey: ""
    });

    // hash = _.keyBy(depart1s[0], "dept_id");

    // _.each(depart2s[0], (data) => {
    //     if (hash[data.parent_dept_id]) {
    //         hash[data.parent_dept_id].nodes = hash[data.parent_dept_id].nodes || {};
    //         hash[data.parent_dept_id].nodes[data.dept_id] = { title: data.descr_short };
    //     } else {
    //         hash[data.dept_id] = { title: data.descr_short };
    //     }
    // });


    // fs.writeFile("aaa.json", JSON.stringify(hash));

    try {
        for (let i = 0; i < depart1s[0].length; i++) {
            let data = depart1s[0][i];
            await create(sequelize, models["depart"], {
                key: data.dept_id,
                title: data.descr_short,
                description: data.descr,
                parentKey: _.trim(data.parent_dept_id) || "00000000"
            });
        }
        for (let i = 0; i < depart2s[0].length; i++) {
            let data = depart2s[0][i];
            if (_.trim(data.parent_dept_id) != "") {
                await create(sequelize, models["depart"], {
                    key: data.dept_id,
                    title: data.descr_short,
                    description: data.descr,
                    parentKey: _.trim(data.parent_dept_id) || "00000000"
                });
            }
        }

        console.log("-------------------;commit");
    } catch (e) {
        console.log(e);
    }
}


/**
 * sequelize 操作数据库类
 * 返回sequelize实例，以及所有定义过的model
 */
export class DB {
    constructor() {
        this.sequelize = null;
        this.models = null;
    }

    async execute(config, app) {
        this.Sequelize = Sequelize;
        this.sequelize = new Sequelize(config.database, config.username, config.password, _.extend({}, config.options, { logging: () => {} }));
        sequelizeRelationsHelper(this.sequelize, { debug: false });
        this.models = await sequelizeImport(__dirname + '/../models', this.sequelize, {
            exclude: ['index.js']
        });

        return this.sequelize.sync({ force: false }).then(async() => {
            console.log("db ok!");

            // await init(this.sequelize, this.models);
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}

export default new DB();