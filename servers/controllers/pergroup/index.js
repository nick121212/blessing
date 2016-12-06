import auth from '../../auth';
import getTree from './getTree';
import createItem from './createItem';
import updateItem from './updateItem';
import removeItem from './removeItem';

export const routers = {
    'GET /modAndAct': [auth.passport, auth.permission, getTree],
    'POST /': [auth.passport, auth.permission, createItem],
    'PUT /:key': [auth.passport, auth.permission, updateItem],
    'DELETE /:key': [auth.passport, auth.permission, removeItem]
}

export const init = (router, sequelizeModel) => {

}

export const config = {

}