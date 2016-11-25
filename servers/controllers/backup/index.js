import createItem from './createItem';
import getItem from './getItem';
import removeItem from './removeItem';
import updateItem from './updateItem';
import list from './list';
import auth from '../../auth';

export const routers = {
    'GET /': [auth.passport, list],
    'GET /:key': [auth.passport, getItem],
    'POST /': [auth.passport, createItem],
    'DELETE /:key': [auth.passport, removeItem],
    'PUT /:key': [auth.passport, updateItem]
}

export const init = (router, sequelizeModel) => {

}

export const config = {
    createItem: {

    },
    list: {

    },
    removeItem: {

    },
    updateItem: {

    },
    getItem: {

    }
}