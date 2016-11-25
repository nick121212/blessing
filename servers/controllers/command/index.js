import testItem from './testItem';
import auth from '../../auth';

export const routers = {
    'POST /manual/test': [auth.passport, testItem]
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