import db from '../utils/db';
import boom from 'boom';
import _ from 'lodash';

export default (app) => {
    const err = () => {
        throw boom.badData("没有操作权限!");
    }

    /**
     * 查找用户
     * 查找用户的角色
     * 查找角色的权限组
     * 查找权限组中的所有的操作
     * 与当前操作最对比
     */
    return async(ctx, next) => {
        let actionKey = ctx.req.headers['action-key'] || ctx.query['action-key'];
        let member = await db.models.member.findOne({
            where: {
                username: ctx.state.user.username
            }
        });

        if (!member) {
            return err();
        }

        let action = await db.models.action.findOne({
            where: {
                key: actionKey
            }
        });
        let role = await db.models.role.findOne({
            where: {
                key: member.role
            }
        });

        if (!action || !role || !_.isArray(role.groups) || !role.groups.length) {
            return err();
        }

        let groups = await db.models.pergroup.findAll({
            attributes: ["id"],
            where: {
                key: {
                    $in: role.groups
                }
            }
        });
        ctx.req.__member__ = member;
        ctx.req.__role__ = role;
        ctx.req.__action__ = action;
        ctx.req.__groups__ = _.map(groups, (group) => {
            return group.id;
        });

        let perGroupAction = await db.models.pergroupaction.findOne({
            where: {
                actionId: action.id,
                perGroupId: {
                    $in: ctx.req.__groups__
                }
            }
        });

        if (!perGroupAction) {
            return err();
        }
        await next();
    };
};