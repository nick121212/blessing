import tree from './tree';
import auth from '../../auth';

export const routers = {
    'GET /manual/tree': [auth.passport, auth.permission, tree]
}

export const init = (router, sequelizeModel) => {}

export const config = {

}