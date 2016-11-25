export default {
    getUniqueFields: (Model) => {
        let uniqueFields = [];
        let primaryKey = "";

        _.forEach(Model.attributes, (attr, key) => {
            if (attr.unique) {
                uniqueFields.push(key);
            }
            if (attr.primaryKey) {
                primaryKey = key;
            }
        });

        return {
            uniqueFields: uniqueFields,
            primaryKey: primaryKey
        };
    },

    checkUniqueFields: async(Model, modelIntance) => {
        let { uniqueFields } = this.getUniqueFields(Model);

        if (_.isArray(uniqueFields) && uniqueFields.length) {
            let where = [];

            _.each(uniqueFields, (field) => {
                if (modelIntance[field]) {
                    where.push({
                        [field]: modelIntance[field]
                    });
                } else {
                    throw boom.badData(`【${field}】没有填写完整!`);
                }
            });

            if (where.length) {
                let findModel = await Model.count({
                    where: {
                        $or: where
                    }
                });

                if (findModel) {
                    throw boom.badData(`主键${_.join(uniqueFields,',')}已经存在!`);
                }
            }
        }
    },
    removeAttributes: async(modelIntance, Model) => {
        _.forEach(modelIntance, (val, key) => {
            if (!Model.attributes.hasOwnProperty(key)) {
                delete model[key];
            }
        });
    }
}