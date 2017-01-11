import list from './list';
import auth from '../../auth';

export const routers = {
    'GET /manual/opera': [auth.passport, auth.permission, list]
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
        removeAttributes: ["createdAt", "updatedAt"]
    },
    getItem: {

    }
}