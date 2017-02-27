import list from './list';
import auth from '../../auth';

export const routers = {
    'GET /manual/ad': [auth.passport, auth.permission, list],
    'GET /list/ad': [list]
}

export const init = (router, sequelizeModel) => {

}

export const config = {

}