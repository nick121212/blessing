import menu from './menu';
import crud from './crud';
import createItem from './createItem';
import removeItem from './removeItem';
import auth from '../../auth';

export const routers = {
    'POST /': [auth.passport, createItem],
    'DELETE /:key': [auth.passport, removeItem],
    'GET /all/menu': [auth.passport, menu],
    'POST /manual/crud': [auth.passport, crud]
}

export const init = (router, sequelizeModel) => {
    console.log(router.getRoutes("/"));
}

export const config = {
    createItem: {
        attributes: []
    },
    list: {
        attributes: []
    },
    updateItem: {
        removeAttributes: []
    }
}